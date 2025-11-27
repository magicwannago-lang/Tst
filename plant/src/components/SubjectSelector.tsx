import { useEducation } from "@/contexts/educationContext";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function SubjectSelector() {
  const { subjects, selectedSubject, setSelectedSubject, selectedGrade } = useEducation();
  const { theme } = useTheme();

  // 滚动到文件列表的函数
  const scrollToFileList = () => {
    // 获取所有h2元素并查找包含"资源文件"文本的元素
    const h2Elements = document.querySelectorAll('h2');
    let fileListSection = null;
    
    for (const element of h2Elements) {
      if (element.textContent?.includes('资源文件')) {
        fileListSection = element;
        break;
      }
    }
    
    if (fileListSection) {
      fileListSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 点击学科时的处理函数
  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    // 如果年级已选择，点击学科后滚动到文件列表区域
    if (selectedGrade) {
      setTimeout(scrollToFileList, 100); // 延迟一下以确保状态已更新
    }
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {subjects.map((subject, index) => (
        <motion.button
          key={subject}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
            selectedSubject === subject
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20'
              : theme === 'dark'
              ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-700 border border-gray-600/50'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}
          onClick={() => handleSubjectClick(subject)}
        >
          {subject}
        </motion.button>
      ))}
    </div>
  );
}