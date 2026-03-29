export const getMcqPoints = (response, questions) => {
  let totalEarned = 0;
  let totalPossible = 0;
  const results = {};

  response.forEach((resp) => {
    if (resp.type !== "mcq") return;

    const questionObj = questions.find(
      (q) => q.question_details.question_sn === resp.question_sn,
    );

    if (!questionObj) return;

    const { correct_answer, points } = questionObj.question_details;
    const userAnswer = parseInt(resp.answer);
    const isCorrect = userAnswer === correct_answer;
    const earnedPoints = isCorrect ? points : 0;

    totalEarned += earnedPoints;
    totalPossible += points;

    results[resp.question_sn] = {
      user_answer: userAnswer,
      correct_answer,
      points_earned: earnedPoints,
    };
  });

  return {
    total_earned: totalEarned,
    total_possible: totalPossible,
    percentage:
      totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0,
    results,
  };
};

export const textEvaluationPayload = (
  responses,
  questions,
  user_id,
  test_id,
) => {
  const textResponses = responses
    .filter((r) => r.type === "text" && r.answer && r.answer.trim() !== "")
    .map((r) => {
      const questionObj = questions.find(
        (q) => q.question_details.question_sn === r.question_sn,
      );
      const { question, points, difficulty, max_words, evaluation_rubric } =
        questionObj.question_details;

      return {
        question_sn: r.question_sn,
        question,
        answer: JSON.stringify(r.answer),
        points,
        difficulty,
        max_words,
        evaluation_rubric,
      };
    });

  return { user_id, test_id, text_responses: textResponses };
};
