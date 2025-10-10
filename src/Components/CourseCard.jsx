 const CourseCard = ({course}) => {
   const { title, earnedScore, totalScore, date } = course || {};
   return (
     <div className="bg-white rounded-[20px] p-4 smallShadow border border-gray-200 w-full max-w-sm">
       {/* Header with date and score */}
       <div className="flex justify-between items-center mb-3">
         <div className="flex items-center gap-2 text-gray-500 text-sm">
           <svg
             className="w-4 h-4"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
             />
           </svg>
           <span>{date}</span>
         </div>

         <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
           <span>
             ★ Score - {earnedScore}/{totalScore}
           </span>
         </div>
       </div>

       {/* Course title */}
       <h3 className="text-gray-900 font-semibold text-base">{title}</h3>
     </div>
   );
 };

export default CourseCard;
