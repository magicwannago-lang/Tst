import { useEffect, useState } from "react";
import { useEducation, ResourceFile } from "@/contexts/educationContext";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { SubjectSelector } from "./SubjectSelector";
import { UploadSection } from "./UploadSection";
import { DocumentViewer } from "./DocumentViewer";

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else return `${(bytes / 1048576).toFixed(2)} MB`;
};

// 格式化日期
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// 获取文件图标
const getFileIcon = (fileType: string): JSX.Element => {
  switch (fileType) {
    case 'document':
      return <i className="fa-solid fa-file-lines text-blue-500"></i>;
    case 'video':
      return <i className="fa-solid fa-video text-purple-500"></i>;
    default:
      return <i className="fa-solid fa-file text-gray-500"></i>;
  }
};

// 文件卡片组件
const FileCard = ({ file, onDelete }: { file: ResourceFile; onDelete: (id: string) => void }) => {
  const { theme } = useTheme();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const openViewer = () => {
    setIsViewerOpen(true);
  };
  
  const closeViewer = () => {
    setIsViewerOpen(false);
  };
  
  // 文件类型对应的渐变背景
  const getTypeGradient = () => {
    switch (file.type) {
      case 'document':
        return theme === 'dark' 
          ? 'from-blue-900/20 to-blue-700/10' 
          : 'from-blue-50 to-blue-100';
      case 'video':
        return theme === 'dark'
          ? 'from-purple-900/20 to-purple-700/10' 
          : 'from-purple-50 to-purple-100';
      default:
        return theme === 'dark'
          ? 'from-gray-800/50 to-gray-700/20' 
          : 'from-gray-50 to-gray-100';
    }
  };
  
  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`
          p-4 rounded-xl border flex items-start justify-between card-hover
          bg-gradient-to-br ${getTypeGradient()}
          ${theme === 'dark' 
            ? 'border-gray-700 shadow-lg shadow-gray-900/10' 
            : 'border-gray-200 shadow-md shadow-gray-200/50'
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start space-x-4 flex-1">
          <div className={`p-3 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-800/80 backdrop-blur-sm' 
              : 'bg-white/80 backdrop-blur-sm'
          } shadow-sm`}>
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium mb-1 truncate">{file.name}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0 sm:space-x-4">
              <span>{formatFileSize(file.size)}</span>
              <span>{file.grade} - {file.subject}</span>
              <span>{formatDate(file.uploadDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-blue-500/10"
            onClick={openViewer}
          >
            <i className="fa-solid fa-eye text-blue-500"></i>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-red-500/10"
            onClick={() => onDelete(file.id)}
          >
            <i className="fa-solid fa-trash-can text-red-500"></i>
          </motion.button>
        </div>
      </motion.div>
      
      {/* 文档查看器 */}
      <DocumentViewer 
        isOpen={isViewerOpen} 
        file={file} 
        onClose={closeViewer} 
      />
    </>
  );
};

export function ContentDisplay() {
  const { selectedGrade, selectedSubject, filterFilesByGradeAndSubject, resourceFiles } = useEducation();
  const { theme } = useTheme();
  
  const [filteredFiles, setFilteredFiles] = useState<ResourceFile[]>([]);
  
  // 当选择的年级或学科变化时，过滤文件列表
  useEffect(() => {
    setFilteredFiles(filterFilesByGradeAndSubject());
  }, [selectedGrade, selectedSubject, resourceFiles]);
  
  // 删除文件
  const handleDeleteFile = (id: string) => {
    // 在实际应用中，这里会调用API删除文件
    // 由于我们使用的是模拟数据，这里只是模拟删除操作
    toast.success('文件已删除');
  };
  
  // 清空所有文件
  const handleClearAll = () => {
    // 在实际应用中，这里会调用API清空文件
    toast.success('所有文件已清空');
  };
  
  // 添加示例文件
  const addSampleFiles = () => {
    // 在实际应用中，这里会调用API获取示例文件
    toast.info('示例文件已添加');
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 学科选择区域 - 移至右侧 */}
      <motion.div 
        className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white'} shadow-md border border-gray-200 dark:border-gray-700 card-hover`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <i className="fa-solid fa-book mr-2 text-green-500"></i>
          学科选择
        </h2>
        <SubjectSelector />
      </motion.div>

      {/* 文件上传区域 - 移至右侧 */}
      <motion.div 
        className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white'} shadow-md border border-gray-200 dark:border-gray-700 card-hover`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="upload-section-title text-lg font-semibold mb-3 flex items-center">
          <i className="fa-solid fa-cloud-arrow-up mr-2 text-purple-500"></i>
          资源上传
        </h2>
        <UploadSection />
      </motion.div>
      
      {/* 标题和操作按钮 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
        <h2 className="text-xl font-bold flex items-center">
          <i className="fa-solid fa-folder-open mr-2 text-blue-500"></i>
          {selectedGrade && selectedSubject 
            ? `${selectedGrade} ${selectedSubject} 资源文件` 
            : '资源文件'}
          {filteredFiles.length > 0 && (
            <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${
              theme === 'dark' ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-blue-100'
            }`}>
              {filteredFiles.length} 个文件
            </span>
          )}
        </h2>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300
              ${theme === 'dark' 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            onClick={addSampleFiles}
          >
            <i className="fa-solid fa-file-circle-plus mr-1.5"></i>
            示例文件
          </motion.button>
          
          {filteredFiles.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-red-900/30 text-red-400 hover:bg-red-900/40 border border-red-800/50' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                }`}
              onClick={handleClearAll}
            >
              <i className="fa-solid fa-trash-can mr-1.5"></i>
              清空
            </motion.button>
          )}
        </div>
      </div>
      
      {/* 文件列表 - 点击学科后显示对应文件详情 */}
      {selectedGrade && selectedSubject ? (
        filteredFiles.length > 0 ? (
          <AnimatePresence>
            <div className="grid grid-cols-1 gap-4 mt-2">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FileCard key={file.id} file={file} onDelete={handleDeleteFile} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        ) : (
          <motion.div 
            className={`
              h-80 flex flex-col items-center justify-center rounded-xl border border-dashed
              ${theme === 'dark' ? 'border-gray-700/50 text-gray-400 bg-gray-800/30' : 'border-gray-200 text-gray-500 bg-gray-50'}
              backdrop-blur-sm
            `}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`p-4 rounded-full mb-4 ${
              theme === 'dark' ? 'bg-gray-700/30' : 'bg-white'
            } shadow-md`}>
              <i className="fa-solid fa-folder-open text-3xl text-blue-500"></i>
            </div>
            <h3 className="text-lg font-medium mb-2">没有找到资源文件</h3>
            <p className="text-center max-w-md mb-6 opacity-80">
              还没有为 {selectedGrade} {selectedSubject} 上传任何资源文件
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20"
              onClick={() => {
                // 滚动到上传区域
                const uploadSection = document.querySelector('.upload-section-title')?.parentElement;
                uploadSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <i className="fa-solid fa-cloud-arrow-up mr-2"></i>
              上传新文件
            </motion.button>
          </motion.div>
        )
      ) : (
        <motion.div 
          className={`
            h-80 flex flex-col items-center justify-center rounded-xl border border-dashed
            ${theme === 'dark' ? 'border-gray-700/50 text-gray-400 bg-gray-800/30' : 'border-gray-200 text-gray-500 bg-gray-50'}
            backdrop-blur-sm
          `}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-4 rounded-full mb-4 ${
            theme === 'dark' ? 'bg-gray-700/30' : 'bg-white'
          } shadow-md`}>
            <i className="fa-solid fa-book-open text-3xl text-blue-500"></i>
          </div>
          <h3 className="text-lg font-medium mb-2">请选择学习资源</h3>
          <p className="text-center max-w-md opacity-80">
            请先从左侧选择年级，然后在上方选择学科，即可查看相关学习资源
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}