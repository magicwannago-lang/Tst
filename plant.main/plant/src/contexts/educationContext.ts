import React, { createContext, useContext, useState, ReactNode } from "react";

// 定义资源文件类型
export type ResourceType = 'document' | 'video' | 'other';

export interface ResourceFile {
  id: string;
  name: string;
  type: ResourceType;
  size: number;
  uploadDate: Date;
  grade: string;
  subject: string;
  url?: string;
}

// 定义上下文类型
interface EducationContextType {
  grades: string[];
  subjects: string[];
  selectedGrade: string | null;
  selectedSubject: string | null;
  setSelectedGrade: (grade: string | null) => void;
  setSelectedSubject: (subject: string | null) => void;
  resourceFiles: ResourceFile[];
  addResourceFile: (file: Omit<ResourceFile, 'id' | 'uploadDate'>) => void;
  filterFilesByGradeAndSubject: () => ResourceFile[];
}

// 创建上下文
export const EducationContext = createContext<EducationContextType | undefined>(undefined);

// 提供上下文的组件
export const EducationContextProvider = ({ children }: { children: ReactNode }) => {
  // 预设的年级和学科
  const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'];
  const subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治'];

  // 状态 - 设置默认值以便更好地展示功能
  const [selectedGrade, setSelectedGrade] = useState<string | null>('一年级');
  const [selectedSubject, setSelectedSubject] = useState<string | null>('语文');
  
  // 添加一些模拟数据，以便更好地展示功能
  const [resourceFiles, setResourceFiles] = useState<ResourceFile[]>([
    {
      id: 'demo-1',
      name: '小学语文作文指导.pdf',
      type: 'document',
      size: 2560000,
      uploadDate: new Date(Date.now() - 86400000 * 2),
      grade: '一年级',
      subject: '语文',
    },
    {
      id: 'demo-2',
      name: '一年级数学基础算术.mp4',
      type: 'video',
      size: 15728640,
      uploadDate: new Date(Date.now() - 86400000),
      grade: '一年级',
      subject: '数学',
    },
    {
      id: 'demo-3',
      name: '英语单词记忆技巧.docx',
      type: 'document',
      size: 1048576,
      uploadDate: new Date(),
      grade: '三年级',
      subject: '英语',
    }
  ]);

  // 添加资源文件
  const addResourceFile = (fileData: Omit<ResourceFile, 'id' | 'uploadDate'>) => {
    const newFile: ResourceFile = {
      ...fileData,
      id: `file-${Date.now()}`,
      uploadDate: new Date(),
    };
    setResourceFiles(prev => [...prev, newFile]);
  };

  // 根据选择的年级和学科筛选文件
  const filterFilesByGradeAndSubject = () => {
    return resourceFiles.filter(file => {
      const gradeMatch = !selectedGrade || file.grade === selectedGrade;
      const subjectMatch = !selectedSubject || file.subject === selectedSubject;
      return gradeMatch && subjectMatch;
    });
  };

  const contextValue = {
    grades,
    subjects,
    selectedGrade,
    selectedSubject,
    setSelectedGrade,
    setSelectedSubject,
    resourceFiles,
    addResourceFile,
    filterFilesByGradeAndSubject,
  };

  return React.createElement(EducationContext.Provider, { value: contextValue }, children);
};

// 自定义钩子来使用上下文
export const useEducation = () => {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationContextProvider');
  }
  return context;
};