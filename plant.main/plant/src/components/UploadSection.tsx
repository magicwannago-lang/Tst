import { useRef, useState } from "react";
import { useEducation } from "@/contexts/educationContext";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

// 支持的文件类型
const SUPPORTED_DOC_TYPES = ['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'];
const SUPPORTED_VIDEO_TYPES = ['mp4', 'webm', 'mov', 'avi'];

export function UploadSection() {
  const { selectedGrade, selectedSubject, addResourceFile } = useEducation();
  const { theme } = useTheme();
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 处理文件上传
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    if (!selectedGrade || !selectedSubject) {
      toast.warning('请先选择年级和学科');
      return;
    }
    
    Array.from(files).forEach((file) => {
      // 获取文件扩展名
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // 确定文件类型
      let fileType: 'document' | 'video' | 'other' = 'other';
      if (SUPPORTED_DOC_TYPES.includes(extension)) {
        fileType = 'document';
      } else if (SUPPORTED_VIDEO_TYPES.includes(extension)) {
        fileType = 'video';
      }
      
      // 添加文件到资源列表
      addResourceFile({
        name: file.name,
        type: fileType,
        size: file.size,
        grade: selectedGrade,
        subject: selectedSubject
      });
      
      toast.success(`已上传: ${file.name}`);
    });
  };
  
  // 处理拖放事件
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };
  
  // 触发文件选择对话框
  const triggerFileInput = (accept: string) => {
    if (!fileInputRef.current) return;
    
    fileInputRef.current.accept = accept;
    fileInputRef.current.click();
  };
  
  // 处理文件选择变化
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
    // 重置input，允许再次选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="space-y-4">
      {/* 拖拽上传区域 */}
      <motion.div
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer card-hover
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/5' 
            : theme === 'dark' 
              ? 'border-gray-700 bg-gray-700/30' 
              : 'border-gray-200 bg-gray-50'
          }
          transition-all duration-300
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => triggerFileInput('*')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDragging 
            ? 'bg-blue-500/10' 
            : theme === 'dark' 
              ? 'bg-gray-800' 
              : 'bg-white'
        } shadow-md`}>
          <i className={`fa-solid fa-cloud-arrow-up text-2xl ${isDragging ? 'text-blue-500' : 'text-gray-500'}`}></i>
        </div>
        <h3 className="text-base font-medium mb-1">拖拽文件到此处或点击上传</h3>
        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
          支持文档和视频文件
        </p>
        <div className={`text-xs px-3 py-1 rounded-full inline-block ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {selectedGrade && selectedSubject 
            ? `将上传到: ${selectedGrade} - ${selectedSubject}` 
            : '请先选择年级和学科'}
        </div>
      </motion.div>
      
      {/* 快速上传按钮 */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className={`py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-900/50 to-blue-800/50 text-blue-200 border border-blue-700/50 hover:from-blue-800/50 hover:to-blue-700/50' 
              : 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-blue-200'
            } shadow-sm`}
          onClick={() => triggerFileInput(SUPPORTED_DOC_TYPES.map(type => `.${type}`).join(','))}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="fa-solid fa-file-lines mr-2"></i>
          上传文档
        </motion.button>
        
        <motion.button
          className={`py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-900/50 to-purple-800/50 text-purple-200 border border-purple-700/50 hover:from-purple-800/50 hover:to-purple-700/50' 
              : 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200 hover:from-purple-100 hover:to-purple-200'
            } shadow-sm`}
          onClick={() => triggerFileInput(SUPPORTED_VIDEO_TYPES.map(type => `.${type}`).join(','))}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="fa-solid fa-video mr-2"></i>
          上传视频
        </motion.button>
      </div>
      
      {/* 支持的文件类型提示 */}
      <div className={`text-xs p-3 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'
      }`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center">
            <i className="fa-solid fa-file-lines text-blue-500 mr-1"></i>
            <span>支持文档: PDF, DOC, DOCX, TXT, PPT, PPTX, XLS, XLSX</span>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-video text-purple-500 mr-1"></i>
            <span>支持视频: MP4, WEBM, MOV, AVI</span>
          </div>
        </div>
      </div>
      
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
}