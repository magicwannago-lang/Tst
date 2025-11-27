import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResourceFile } from "@/contexts/educationContext";
import { useTheme } from "@/hooks/useTheme";

interface DocumentViewerProps {
  isOpen: boolean;
  file: ResourceFile | null;
  onClose: () => void;
}

// 模拟文档内容生成函数
const generateMockContent = (file: ResourceFile): string => {
  switch (file.type) {
    case 'document':
      return `# ${file.name}

## ${file.grade} ${file.subject}资源

这是一个${file.grade} ${file.subject}学科的文档资源。

### 内容摘要

这是文档的主要内容区域。在实际系统中，这里会显示文档的实际内容。

### 资源信息
- 上传时间：${new Date(file.uploadDate).toLocaleString()}
- 文件大小：${formatFileSize(file.size)}
- 适用年级：${file.grade}
- 适用学科：${file.subject}

### 内容详情
这里可以展示文档的详细内容预览。由于这是一个演示系统，我们显示的是模拟内容。在实际系统中，您将能够看到上传文档的真实内容。`;
    
    case 'video':
      return `# ${file.name}

## ${file.grade} ${file.subject}视频资源

这是一个${file.grade} ${file.subject}学科的视频资源。

### 视频信息
- 上传时间：${new Date(file.uploadDate).toLocaleString()}
- 文件大小：${formatFileSize(file.size)}
- 适用年级：${file.grade}
- 适用学科：${file.subject}

### 播放提示
在实际系统中，这里将嵌入视频播放器。由于这是演示系统，我们显示的是视频信息预览。`;
    
    default:
      return `# ${file.name}

## 文件详情
- 上传时间：${new Date(file.uploadDate).toLocaleString()}
- 文件大小：${formatFileSize(file.size)}
- 适用年级：${file.grade}
- 适用学科：${file.subject}

这是一个不支持直接预览的文件类型。`;
  }
};

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else return `${(bytes / 1048576).toFixed(2)} MB`;
};

export function DocumentViewer({ isOpen, file, onClose }: DocumentViewerProps) {
  const { theme } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // 点击遮罩层关闭预览
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // 按ESC键关闭预览
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  if (!file) return null;
  
  // 根据文件类型设置渐变背景
  const getViewerGradient = () => {
    switch (file.type) {
      case 'document':
        return theme === 'dark' 
          ? 'from-blue-900/20 to-gray-900/50' 
          : 'from-blue-50 to-white';
      case 'video':
        return theme === 'dark'
          ? 'from-purple-900/20 to-gray-900/50' 
          : 'from-purple-50 to-white';
      default:
        return theme === 'dark'
          ? 'from-gray-800/50 to-gray-900/50' 
          : 'from-gray-50 to-white';
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={overlayRef}
            className={`w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b ${getViewerGradient()} shadow-2xl border border-gray-200 dark:border-gray-700`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className={`p-5 border-b flex items-center justify-between ${
              theme === 'dark' ? 'border-gray-700/50 bg-gray-800/80' : 'border-gray-200 bg-white/80'
            } backdrop-blur-sm`}>
              <div className="flex items-center space-x-3">
                {file.type === 'document' && <i className="fa-solid fa-file-lines text-blue-500"></i>}
                {file.type === 'video' && <i className="fa-solid fa-video text-purple-500"></i>}
                <h2 className="font-semibold truncate max-w-md">{file.name}</h2>
              </div>
              <motion.button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fa-solid fa-times"></i>
              </motion.button>
            </div>
            
            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-6">
              {file.type === 'document' && (
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`p-6 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800/60' : 'bg-white'
                    } shadow-md`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generateMockContent(file)}
                    </pre>
                  </motion.div>
                  
                  {/* 模拟文档预览效果 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-4 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800/60 border border-gray-700' : 'bg-white border border-gray-100'
                    } shadow-md`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex space-x-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      </div>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        文档预览
                      </span>
                    </div>
                    <div className={`h-64 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                    } flex items-center justify-center`}>
                      <div className="text-center">
                        <i className="fa-solid fa-file-lines text-4xl mb-3 text-blue-500"></i>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          点击下载查看完整文档内容
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {file.type === 'video' && (
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`w-full aspect-video rounded-xl overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                    } shadow-md relative`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button 
                        className="w-16 h-16 rounded-full bg-purple-500/90 text-white flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <i className="fa-solid fa-play text-xl"></i>
                      </motion.button>
                    </div>
                    {/* 模拟视频播放控制条 */}
                    <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                      theme === 'dark' ? 'bg-black/70' : 'bg-black/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white">00:00</span>
                        <div className="flex space-x-2">
                          <button className="text-white"><i className="fa-solid fa-step-backward"></i></button>
                          <button className="text-white"><i className="fa-solid fa-pause"></i></button>
                          <button className="text-white"><i className="fa-solid fa-step-forward"></i></button>
                        </div>
                        <span className="text-xs text-white">05:24</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`w-full p-5 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800/60' : 'bg-white'
                    } shadow-md`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {generateMockContent(file)}
                    </pre>
                  </motion.div>
                </div>
              )}
              
              {file.type === 'other' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-80 text-center space-y-6"
                >
                  <div className={`p-6 rounded-full ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <i className="fa-solid fa-file text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium">不支持此文件类型的预览</h3>
                  <p className={`max-w-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    此文件类型无法在浏览器中直接预览，请下载后查看完整内容
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* 底部 */}
            <div className={`p-5 border-t flex items-center justify-between ${
              theme === 'dark' ? 'border-gray-700/50 bg-gray-800/80' : 'border-gray-200 bg-white/80'
            } backdrop-blur-sm`}>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <span>{file.grade} - {file.subject}</span>
                <span className="mx-2">•</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <motion.button 
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md shadow-blue-500/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className="fa-solid fa-download mr-2"></i>下载
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}