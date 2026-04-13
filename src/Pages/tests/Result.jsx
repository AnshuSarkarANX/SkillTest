import { useEffect, useState } from "react";
import QuestionCard from "../../Components/QuestionCard";
import { bottomBar, topBar } from "../../state/store";
import Button from "../../Components/Button";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import api from "../../apis/api";
import { saveResult } from "../../apis/resultApis";
import Loading from "../../Components/Loading";

const ScoreRing = ({ earned, total, label, color = "text-primary" }) => {
  const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
  return (
    <div className="flex flex-col items-center gap-[6px] bg-white rounded-[16px] p-[20px] smallShadow flex-1">
      <div className={`font-bold H-28 ${color}`}>
        {earned}
        <span className="H-16 text-gray-400">/{total}</span>
      </div>
      <p className="H-12 text-text2 font-semibold text-center">{label}</p>
      <div className="w-full bg-gray-100 rounded-full h-[6px] mt-[4px]">
        <div
          className="bg-primary h-[6px] rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="H-12 text-text2">{percentage}%</p>
    </div>
  );
};

const Result = () => {
  const { testId } = useParams(); // present if coming from history
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const useTopBar = topBar((state) => state);
  const navigate = useNavigate();
  const useBottomBar = bottomBar();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // useTopBar.setHasBackButton(false);
    useBottomBar.setActive(testId ? true : false);
  }, []);

  useEffect(() => {
    if (testId) return;
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [testId]);

  const handleGoHome = async () => {
    try {
      await saveResult(testResult); // save full result
    } catch (e) {
      console.error("Failed to save result", e);
    } finally {
      sessionStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    if (testId) {
      // ── Historical result — fetch from DB ──
      setLoading(true);
      api
        .get(`/api/results/${testId}`)
        .then((res) => setTestResult(res.data.result))
        .catch((err) => {
          if (err.response?.status === 404) setExpired(true);
        })
        .finally(() => setLoading(false));
    } else {
      // ── Fresh result — read from sessionStorage ──
      setTestResult(JSON.parse(sessionStorage.getItem("testResult")));
    }
  }, [testId]);

  const mcqEarned = testResult?.mcq_results?.total_earned ?? 0;
  const mcqTotal = testResult?.mcq_results?.total_possible ?? 0;
  const textEarned =
    testResult?.text_results?.evaluation_summary?.total_text_score ?? 0;
  const textTotal =
    testResult?.text_results?.evaluation_summary?.total_max_score ?? 0;
  const totalEarned = testResult?.total_score ?? 0;
  const totalPossible = testResult?.total_possible ?? 0;
  const overallPercent = testResult?.overall_percentage ?? 0;

  const getResultLabel = () => {
    if (overallPercent >= 80)
      return { text: "Excellent!", color: "text-green-500" };
    if (overallPercent >= 60)
      return { text: "Good Job!", color: "text-primary" };
    if (overallPercent >= 40)
      return { text: "Keep Practicing", color: "text-yellow-500" };
    return { text: "Needs Improvement", color: "text-red-400" };
  };

  const resultLabel = getResultLabel();

  if (loading) return <Loading />;
  if (expired)
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="H-18 font-bold text-text2">This result has expired</p>
        <p className="H-14 text-text2">
          Detailed results are only kept for 7 days.
        </p>
        <Button text="Go to Home" onClick={() => navigate("/")} />
      </div>
    );

  if (!testResult) return null;

  return (
    <div className="space-y-[20px] mb-[40px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-[6px] py-[10px]">
        <p className="H-14 text-text2 font-semibold uppercase tracking-widest">
          {testResult.skill} · {testResult.level}
        </p>
        <h1 className={`font-bold H-32 ${resultLabel.color}`}>
          {resultLabel.text}
        </h1>
        <p className="H-14 text-text2">Here's how you did</p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-[20px] p-[24px] smallShadow flex flex-col items-center gap-[10px]">
        <p className="H-14 text-text2 font-semibold">Overall Score</p>
        <p className="font-bold H-50 text-primary">
          {totalEarned}
          <span className="H-24 text-gray-400">/{totalPossible}</span>
        </p>
        <div className="w-full bg-gray-100 rounded-full h-[10px]">
          <div
            className="bg-primary h-[10px] rounded-full transition-all duration-700"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="H-16 text-text2">{overallPercent}% Score</p>
      </div>

      {/* MCQ & Text Score Cards */}
      <div className="flex gap-[14px]">
        <ScoreRing earned={mcqEarned} total={mcqTotal} label="MCQ Score" />
        <ScoreRing earned={textEarned} total={textTotal} label="Text Score" />
      </div>

      {/* Toggle Detailed Results */}
      <button
        className="w-full flex items-center justify-between bg-white rounded-[16px] px-[20px] py-[16px] smallShadow font-semibold H-16 text-text"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        <span>View Detailed Results</span>
        <span
          className="transition-transform duration-300 text-primary H-20"
          style={{
            display: "inline-block",
            transform: showDetails ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {/* Detailed Question Cards — accordion */}
      {showDetails && (
        <div className="space-y-[16px]">
          {testResult.questions.map((q) => (
            <QuestionCard
              allPage={true}
              key={q.question_details.question_sn}
              propData={q.question_details}
              resultMode={true}
              mcqResult={
                q.question_details.type === "mcq"
                  ? testResult.mcq_results.results[
                      q.question_details.question_sn
                    ]
                  : null
              }
              textResult={
                q.question_details.type === "text"
                  ? testResult.text_results?.evaluations?.find(
                      (e) => e.question_sn === q.question_details.question_sn,
                    )
                  : null
              }
              onSelectOption={() => {}}
            />
          ))}
        </div>
      )}

      {/* Go to Home — will save metrics to DB */}
      {!testId && <Button text="Go to Home" onClick={handleGoHome} />}
    </div>
  );
};

export default Result;
