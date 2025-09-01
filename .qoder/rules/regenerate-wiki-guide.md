---
trigger: manual
---
# Qoder仓库Wiki重新生成指南

## 前提条件检查

### 1. 环境要求
- Node.js 18+
- PNPM 9.12.0
- Rush.js 5.140.1

### 2. 项目依赖检查
```bash
# 检查当前环境
node --version
pnpm --version
rush --version
```

## 重新生成Wiki的方法

### 方法一：完整重新生成（推荐）

#### 步骤1：清理现有文档
```bash
# 切换到项目根目录
cd d:\workspace\ts\react\workflow

# 清理文档构建目录
rush run-script docs:clean
# 或者手动删除
shx rm -rf apps/docs/doc_build
shx rm -rf apps/docs/src/zh/auto-docs
shx rm -rf apps/docs/src/en/auto-docs
```

#### 步骤2：生成API文档
```bash
# 生成TypeDoc API文档
cd apps/docs
rushx docs

# 或者使用完整命令
cross-env NODE_OPTIONS=--max-old-space-size=8192 && tsx ./scripts/auto-generate.ts
```

#### 步骤3：构建完整文档站点
```bash
# 构建生产版本
rushx build

# 或者使用完整命令
cross-env NODE_OPTIONS=--max-old-space-size=8192 && shx rm -rf ./doc_build && rspress build && shx cp -r llms/* doc_build/
```

#### 步骤4：本地预览验证
```bash
# 启动预览服务器
rushx preview

# 或者开发服务器
rushx dev
```

### 方法二：使用Rush项目级别命令

#### 全项目重新生成
```bash
# 在项目根目录执行
rush build

# 专门的文档生成命令
rush dev:docs
```

#### 验证生成结果
```bash
# 检查生成的文件
ls -la apps/docs/doc_build/

# 检查API文档
ls -la apps/docs/src/zh/auto-docs/
ls -la apps/docs/src/en/auto-docs/
```

### 方法三：自定义脚本重新生成

#### 创建重新生成脚本
```bash
# 创建自定义重新生成脚本
cat > regenerate-wiki.sh << 'EOF'
#!/bin/bash

echo "🚀 开始重新生成Wiki..."

# 1. 清理现有文档
echo "📁 清理现有文档目录..."
rm -rf apps/docs/doc_build
rm -rf apps/docs/src/zh/auto-docs
rm -rf apps/docs/src/en/auto-docs

# 2. 重新安装依赖（如果需要）
echo "📦 检查依赖..."
rush install

# 3. 生成API文档
echo "📚 生成API文档..."
cd apps/docs
cross-env NODE_OPTIONS=--max-old-space-size=8192 tsx ./scripts/auto-generate.ts

# 4. 构建完整文档
echo "🏗️ 构建完整文档..."
cross-env NODE_OPTIONS=--max-old-space-size=8192 rspress build

# 5. 复制附加文件
echo "📄 复制附加文件..."
shx cp -r llms/* doc_build/

echo "✅ Wiki重新生成完成！"
echo "🌐 访问 http://localhost:4173 预览"

# 6. 启动预览（可选）
# rspress preview

EOF

chmod +x regenerate-wiki.sh
```

#### 执行脚本
```bash
./regenerate-wiki.sh
```

## 生成过程详解

### 1. API文档生成机制
- **TypeDoc扫描**：扫描 `packages/` 目录下的所有包
- **Markdown生成**：使用 `typedoc-plugin-markdown` 转换为Markdown
- **结构化输出**：生成到 `src/zh/auto-docs/` 和 `src/en/auto-docs/`

### 2. 文档构建流程
```
源码注释 → TypeDoc → Markdown → RSPress → 静态站点
```

### 3. 关键配置文件
- `apps/docs/rspress.config.ts` - RSPress配置
- `apps/docs/scripts/auto-generate.ts` - API文档生成脚本
- `apps/docs/scripts/constants.ts` - 文档标签映射
- `apps/docs/scripts/patch.ts` - 链接修复

## 自定义Wiki内容

### 1. 修改生成脚本
编辑 `apps/docs/scripts/auto-generate.ts` 来定制生成行为：

```typescript
// 修改文档标签映射
export const docLabelMap = {
  classes: 'Classes',
  enums: 'Enums',
  functions: 'Functions',
  interfaces: 'Interfaces',
  modules: 'Namespaces',
  types: 'Types',
  variables: 'Variables',
  // 添加自定义映射
  'event-system': '事件系统',
  'canvas-engine': '画布引擎',
};
```

### 2. 添加自定义内容
在 `apps/docs/src/zh/guide/` 或 `apps/docs/src/en/guide/` 添加自定义文档：

```markdown
---
title: 自定义Wiki页面
description: 自定义的wiki内容
---

# 自定义Wiki页面

这里是自定义的wiki内容...
```

### 3. 修复Mermaid图表
在生成后的文档中查找并修复mermaid语法错误：

```bash
# 查找包含mermaid的文件
find apps/docs/doc_build -name "*.html" -exec grep -l "mermaid" {} \;

# 或者在源文件中修复
find apps/docs/src -name "*.md" -exec grep -l "class Emitter<T>" {} \;
```

## 常见问题解决

### 1. 内存不足错误
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=8192"
```

### 2. 权限问题
```bash
# 确保有写入权限
chmod -R 755 apps/docs/
```

### 3. 依赖问题
```bash
# 重新安装依赖
rush purge
rush install
rush build
```

### 4. TypeDoc生成失败
```bash
# 检查TypeScript配置
npx tsc --noEmit --project apps/docs/tsconfig.json

# 检查包结构
find packages -name "package.json" | head -10
```

## 验证生成结果

### 1. 检查文件结构
```bash
tree apps/docs/doc_build -d -L 2
```

### 2. 检查内容质量
```bash
# 检查是否包含mermaid图表
grep -r "mermaid" apps/docs/doc_build/

# 检查链接完整性
grep -r "\.md)" apps/docs/doc_build/ | wc -l
```

### 3. 本地预览测试
```bash
cd apps/docs
rushx preview

# 访问以下URL进行测试
# http://localhost:4173/zh/
# http://localhost:4173/en/
# http://localhost:4173/zh/auto-docs/
```

## 部署和发布

### 1. 生产构建
```bash
# 确保生产环境配置
NODE_ENV=production rushx build
```

### 2. 静态文件检查
```bash
# 检查生成的静态文件
ls -la apps/docs/doc_build/
du -sh apps/docs/doc_build/
```

### 3. 集成到CI/CD
在项目的GitHub Actions或其他CI/CD中集成wiki生成：

```yaml
# .github/workflows/docs.yml
name: Generate Docs
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Rush
        run: npm install -g @microsoft/rush@5.140.1
      - name: Install dependencies
        run: rush install
      - name: Generate docs
        run: |
          cd apps/docs
          rushx docs
          rushx build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/docs/doc_build
```

## 总结

通过以上步骤，您可以完全重新生成Qoder仓库的wiki文档。关键要点：

1. **清理旧文档**：确保从干净状态开始
2. **依次执行**：API生成 → 文档构建 → 预览验证
3. **问题排查**：内存、权限、依赖问题的解决
4. **质量检查**：文件结构、内容完整性、链接有效性
5. **持续集成**：自动化生成和部署流程

这样生成的wiki将包含最新的API文档和修复后的mermaid图表。