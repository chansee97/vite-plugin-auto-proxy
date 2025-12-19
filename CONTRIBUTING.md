# 贡献指南

感谢您考虑为 vite-plugin-auto-proxy 做出贡献！在提交贡献之前，请花点时间阅读以下指南。

## 开发环境设置

1. Fork 本仓库
2. 克隆您的 Fork：
   ```bash
   git clone https://github.com/your-username/vite-plugin-auto-proxy.git
   ```
3. 安装依赖：
   ```bash
   cd vite-plugin-auto-proxy
   npm install
   ```

## 开发流程

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b bugfix/your-bugfix-name
```

### 2. 进行更改

确保您的代码遵循项目的编码规范。

### 3. 运行测试

```bash
npm test
```

### 4. 构建项目

```bash
npm run build
```

### 5. 提交更改

```bash
git add .
git commit -m "feat: describe your changes"
```

### 6. 推送并创建 Pull Request

```bash
git push origin feature/your-feature-name
```

## 编码规范

- 使用 TypeScript 编写代码
- 遵循项目中已有的代码风格
- 添加适当的注释和文档
- 确保所有功能都有相应的测试

## 测试

- 所有新功能都应包含测试
- 运行测试套件确保没有破坏现有功能
- 测试覆盖率应尽可能高

## 提交消息格式

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

常见的提交类型：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `test`: 测试相关
- `refactor`: 代码重构
- `style`: 代码样式调整
- `chore`: 构建过程或辅助工具的变动

## 报告 Bug

- 使用 GitHub Issues 搜索是否有重复的问题
- 如果没有，请创建一个新的 Issue
- 详细描述问题和复现步骤
- 提供环境信息（Node.js 版本、操作系统等）

## 提议新功能

- 使用 GitHub Issues 提交功能请求
- 清楚地描述功能的需求和用途
- 提供可能的实现方案（如果有的话）

## 许可证

通过贡献代码，您同意您的贡献将根据 MIT 许可证进行许可。