import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { GradeSelector } from '@/components/GradeSelector';
import { ContentDisplay } from '@/components/ContentDisplay';
import { useEducation } from '@/contexts/educationContext';
import { motion } from 'framer-motion';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { selectedGrade, selectedSubject, resourceFiles } = useEducation();
  
  // 计算资源统计数据
  const totalResources = resourceFiles.length;
  const documentCount = resourceFiles.filter(file => file.type === 'document').length;
  const videoCount = resourceFiles.filter(file => file.type === 'video').length;

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* 顶部导航栏 */}
      <header className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'} shadow-md px-6 py-4 flex items-center justify-between`}>
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fa-solid fa-graduation-cap text-blue-600 text-2xl"></i>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">教育资源管理系统</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            <motion.div 
              className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedGrade && selectedSubject 
                ? `${selectedGrade} - ${selectedSubject}` 
                : '请选择年级和学科'}
            </motion.div>
            
            {/* 资源统计 */}
            <motion.div 
              className="text-sm flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-medium">{totalResources}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${totalResources > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span>资源</span>
            </motion.div>
          </div>
          
          {/* 主题切换按钮 */}
          <motion.button 
            onClick={toggleTheme} 
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-800'} hover:opacity-80 transition-all`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </motion.button>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex flex-1 overflow-hidden">
        {/* 左侧功能列表 - 仅保留年级选择 */}
        <motion.aside 
          className={`w-full md:w-64 lg:w-72 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex-shrink-0 overflow-y-auto`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <i className="fa-solid fa-layer-group mr-2 text-blue-500"></i>
                年级选择
              </h2>
              <GradeSelector />
            </div>
            
            {/* 资源统计卡片 */}
            <motion.div 
              className={`p-4 rounded-xl mb-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} border border-gray-200 dark:border-gray-600 card-hover`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">资源统计</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fa-solid fa-file-lines text-blue-500 mr-2"></i>
                    <span className="text-sm">文档</span>
                  </div>
                  <span className="text-sm font-medium">{documentCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fa-solid fa-video text-purple-500 mr-2"></i>
                    <span className="text-sm">视频</span>
                  </div>
                  <span className="text-sm font-medium">{videoCount}</span>
                </div>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <i className="fa-solid fa-folder-open text-green-500 mr-2"></i>
                    <span className="text-sm">总计</span>
                  </div>
                  <span className="text-sm font-bold">{totalResources}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.aside>

        {/* 右侧内容展示区 - 包含学科选择、上传功能和文件详情 */}
        <section className="flex-1 overflow-y-auto p-4 md:p-6">
          <ContentDisplay />
        </section>
      </main>

      {/* 底部 */}
      <footer className={`py-4 text-center text-sm ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-book-open text-blue-500 mr-2"></i>
          © 2025 教育资源管理系统 - 让学习更高效
        </div>
      </footer>
    </div>
  );
}