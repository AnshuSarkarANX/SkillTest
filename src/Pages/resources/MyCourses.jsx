import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CourseCard from "../../Components/CourseCard";
import Button from "../../Components/Button";
import { topBar } from "../../state/store";

const MyCourses = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const coursesData = [
    {
      id: "course-001",
      title: "Introduction to React Basics",
      earnedScore: 85,
      totalScore: 100,
      date: "2025-10-05",
    },
    {
      id: "course-002",
      title: "Advanced JavaScript Concepts",
      earnedScore: 92,
      totalScore: 100,
      date: "2025-09-28",
    },
    {
      id: "course-003",
      title: "CSS Grid and Flexbox Mastery",
      earnedScore: 78,
      totalScore: 100,
      date: "2025-09-15",
    },
    {
      id: "course-004",
      title: "Node.js Backend Development",
      earnedScore: 88,
      totalScore: 100,
      date: "2025-08-22",
    },
    {
      id: "course-005",
      title: "MongoDB Database Fundamentals",
      earnedScore: 95,
      totalScore: 100,
      date: "2025-08-10",
    },
  ];

   const useTopBar = topBar((state) => state);
   useEffect(() => {
     useTopBar.setHasBackButton(true);
   }, []);

  const navigate = useNavigate();
  const location = window.location.pathname;

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId === selectedCourseId ? null : courseId);
  };

  return (
    <div>
      <div className="H-18 font-bold my-[20px]">Select a course</div>
      <div className="flex flex-col gap-[20px]">
        {coursesData.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isSelected={selectedCourseId === course.id}
            onSelect={handleCourseSelect}
          />
        ))}
      </div>
      {location === "/add-resource" && (
        <div className="mt-[20px] sticky bottom-[50px]">
          <Button
            text={"Next"}
            onClick={() => navigate("")}
            disabled={!selectedCourseId}
          />
        </div>
      )}
    </div>
  );
};

export default MyCourses;
