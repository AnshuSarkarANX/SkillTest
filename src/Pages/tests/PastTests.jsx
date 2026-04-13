import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getHistory } from "../../apis/resultApis";
import Loading from "../../Components/Loading";

const getScoreColor = (pct) => {
  if (pct >= 80) return { text: "text-green-500", bg: "bg-green-500/50" };
  if (pct >= 60) return { text: "text-primary", bg: "bg-primary/50" };
  if (pct >= 40) return { text: "text-yellow-500", bg: "bg-yellow-500/50" };
  return { text: "text-red-400", bg: "bg-red-400/50" };
};

const PastTests = () => {
  const [pastTests, setPastTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setPastTests(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <p className="H-14 text-red-400 text-center py-10">{error}</p>;
  if (!pastTests.length)
    return (
      <div className="flex flex-col items-center gap-[8px] py-[40px]">
        <p className="H-24">📋</p>
        <p className="H-16 font-semibold text-text">No tests taken yet</p>
        <p className="H-13 text-text2">Your completed tests will appear here</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-[14px]">
      {pastTests.map((test) => {
        const { text: scoreText, bg: scoreBg } = getScoreColor(
          test.overallPercentage,
        );
        return (
          <div
            key={test._id}
            onClick={() =>
              test.hasDetailedResult && navigate(`/result/${test.testResultId}`)
            }
            className={`bg-white smallShadow rounded-[16px] p-[18px] flex items-center gap-[16px] ${
              test.hasDetailedResult
                ? "cursor-pointer active:scale-[0.98] transition-transform"
                : "opacity-70"
            }`}
          >
            {/* Score Circle */}
            <div
              className={`w-[40px] h-[40px] rounded-full border-[2px] ${scoreBg}  border-opacity-30 flex items-center justify-center flex-shrink-0`}
              style={{ borderColor: "currentColor" }}
            >
              <span className={`font-bold H-14 text-white`}>
                {test.overallPercentage}%
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="H-15 font-semibold text-text truncate">
                {test.skill}
              </p>
              <p className="H-12 text-text2 mt-[2px]">{test.level}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-[4px] mt-[8px]">
                <div
                  className={`${scoreBg} h-[4px] rounded-full transition-all duration-700`}
                  style={{ width: `${test.overallPercentage}%` }}
                />
              </div>
            </div>

            {/* Right badge */}
            <div className="flex-shrink-0 text-right">
              {test.hasDetailedResult ? (
                <span className="H-12 text-primary font-semibold">View →</span>
              ) : (
                <span className="H-11 text-text2 bg-gray-100 rounded-full px-[10px] py-[4px]">
                  Expired
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PastTests;
