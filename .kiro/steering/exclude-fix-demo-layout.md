---
inclusion: always
---

# 排除其他apps项目规则

## 文件搜索和分析规则
- 在使用grepSearch、fileSearch等工具时，自动排除除demo-free-layout之外的所有apps子目录
- 专注于demo-free-layout项目的开发和维护
- 忽略其他演示项目和应用

## 需要排除的目录列表
- apps/create-app/**
- apps/demo-fixed-layout/**
- apps/demo-fixed-layout-simple/**
- apps/demo-free-layout-simple/**
- apps/demo-nextjs/**
- apps/demo-nextjs-antd/**
- apps/demo-node-form/**
- apps/demo-playground/**
- apps/demo-react-16/**
- apps/demo-vite/**
- apps/docs/**

## 工具使用指导
- grepSearch: 使用excludePattern排除上述所有目录
- fileSearch: 使用excludePattern排除上述所有目录
- listDirectory: 避免列出除demo-free-layout之外的其他apps子目录内容
- 代码分析和修改只针对demo-free-layout项目

## 上下文理解
- 当用户提到"项目"时，默认指apps/demo-free-layout
- 忽略其他apps子目录中的组件、配置和代码
- 保持专注于demo-free-layout的开发工作
