---
trigger: manual
---
# Qoder AI 助手项目规则

## 项目概述
- **项目名称**: FlowGram.AI
- **项目类型**: 基于节点的流程构建引擎 (Monorepo)
- **技术栈**: React, TypeScript, Rush.js, Motion库
- **主要目录**: apps/, packages/, config/

## 上下文读取规范

### 1. 文件优先级
1. **核心业务文件**: `apps/demo-free-layout/src/` 下的组件和逻辑
2. **类型定义**: `src/typings/` 目录下的接口定义
3. **配置文件**: `package.json`, `rush.json`, `tsconfig.json`
4. **样式文件**: `styles.tsx`, `*.scss` 文件

### 2. 读取策略
- 优先读取与当前任务相关的文件
- 遵循依赖关系，先读取被依赖的文件
- 对于大型文件，分段读取关键部分

### 3. 上下文范围控制
- 单次上下文不超过 3-5 个文件
- 优先选择最相关的代码片段
- 避免读取过多无关的配置文件

## 编码规范

### 1. React 组件开发
- 使用函数组件 + Hooks
- 遵循 `motion/react` 导入规范
- 使用 `useCallback` 优化性能
- 职责分离：Hooks文件不包含JSX

### 2. TypeScript 规范
- 优先使用项目现有的类型定义
- 接口命名使用 PascalCase
- 避免重复定义相同接口

### 3. 样式规范
- 使用 styled-components
- 遵循 `shouldForwardProp` 规范
- 动画使用 motion 库而非 CSS

### 4. 文件组织
- 组件文件结构: `index.tsx`, `styles.tsx`, `types.ts`
- Hook 文件放在 `hooks/` 目录
- 常量配置放在 `constants/` 目录

## 项目特定规则

### 1. Rush.js 项目管理
- 依赖安装使用rush进行管理，根据不同子项目运行不同的命令
- 项目运行使用: `rush dev:demo-free-layout`
- 构建使用: `rush build`

### 2. Motion 动画库
- 导入方式: `import { motion } from "motion/react"`
- 动画配置统一管理
- 避免动画触发内容变化

### 3. 状态管理
- 使用对象展开语法更新状态
- WebSocket 消息处理需要ID一致性
- 状态同步使用事件驱动更新

### 4. 组件设计
- 动画边框使用独立的 `AnimateBorderWrapper` 组件
- 通用配置使用 `Partial<Record<>>` 类型
- 错误处理机制完整

## 代码审查要点

### 1. 必须检查项
- [ ] TypeScript 类型定义正确
- [ ] React Hooks 依赖项完整
- [ ] Motion 库使用规范
- [ ] 性能优化（useCallback）

### 2. 项目规范遵循
- [ ] 文件命名符合项目约定
- [ ] 导入路径使用相对路径
- [ ] 组件职责单一清晰

### 3. Rush.js 相关
- [ ] package.json 依赖正确
- [ ] 构建和运行命令有效

## 工具使用指南

### 1. 文件操作优先级
1. `search_codebase` - 查找相关代码
2. `read_file` - 读取具体文件
3. `search_replace` - 精确修改代码

### 2. 并行操作规范
- 可并行: 多个 `read_file`, `search_codebase`
- 必须串行: `search_replace`, `run_in_terminal`

### 3. 错误处理
- 使用 `get_problems` 验证代码
- 修改后必须验证语法正确性

## 更新日志
- 2025-01-XX: 初始版本创建
