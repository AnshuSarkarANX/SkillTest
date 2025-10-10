import CourseCard from "../../Components/CourseCard";

const MyCourses = () => {

    const coursesData = [
      {
        title: "Introduction to React Basics",
        earnedScore: 85,
        totalScore: 100,
        date: "2025-10-05",
      },
      {
        title: "Advanced JavaScript Concepts",
        earnedScore: 92,
        totalScore: 100,
        date: "2025-09-28",
      },
      {
        title: "CSS Grid and Flexbox Mastery",
        earnedScore: 78,
        totalScore: 100,
        date: "2025-09-15",
      },
      {
        title: "Node.js Backend Development",
        earnedScore: 88,
        totalScore: 100,
        date: "2025-08-22",
      },
      {
        title: "MongoDB Database Fundamentals",
        earnedScore: 95,
        totalScore: 100,
        date: "2025-08-10",
      },
    ];
  return (
    <div>
      <div className="H-18 font-bold my-[20px]">Select a course</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {coursesData.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}

export default MyCourses