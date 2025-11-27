import { useEducation } from "@/contexts/educationContext";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function GradeSelector() {
  const { grades, selectedGrade, setSelectedGrade } = useEducation();
  const { theme } = useTheme();
  
  // 分段展示年级，便于用户选择
  const gradeGroups = [
    grades.slice(0, 6), // 小学
    grades.slice(6, 9), // 初中
    grades.slice(9, 12) // 高中
  ];
  
  const gradeGroupLabels = ['小学', '初中', '高中'];

  return (
    <div className="space-y-3">
      {gradeGroupLabels.map((label, index) => (
        <div key={index} className="space-y-2">
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {gradeGroups[index].map((grade) => (
              <motion.button
                key={grade}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedGrade === grade
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedGrade(grade)}
              >
                {grade}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}