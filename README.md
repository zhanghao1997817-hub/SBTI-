# SBTI 人格测试 - 微信小程序版

从 [thzhangbio/SBTI](https://github.com/thzhangbio/SBTI) Web 页面完整移植的微信小程序。

## 使用方法

### 1. 下载微信开发者工具
- 官网：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 2. 导入项目
- 打开微信开发者工具 → **导入项目**
- 目录选择本文件夹 `SBTI-miniprogram`
- AppID：选 **测试号**（体验功能）或填你自己的 AppID
- 点击 **确定**

### 3. 运行
- 导入后直接在模拟器中预览
- 所有功能无需后端，纯前端运行

## 图片域名白名单（重要！）

本小程序的人格图片托管在 GitHub。如果图片加载不出来，需要在小程序后台配置：

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 开发 → 开发管理 → 开发设置 → **服务器域名**
3. 在 `downloadFile合法域名` 中添加：
   ```
   https://raw.githubusercontent.com
   ```

> **建议**：正式上线前将图片迁移到微信云存储或自有 CDN，避免 GitHub 在国内访问不稳定。

## 上线步骤

1. 将 `project.config.json` 中的 `"appid"` 改为你的真实 AppID
2. 在微信开发者工具中点击 **上传**
3. 登录微信公众平台提交审核
4. 审核通过后发布

## 功能说明

| 功能 | 说明 |
|------|------|
| 人格测试 | 30道题 + 2道特殊条件题（饮酒隐藏人格） |
| 15维度分析 | S1-S3(自我) / E1-E3(情感) / A1-A3(态度) / Ac1-Ac3(行动) / So1-So3(社交) |
| 27种人格 | 含隐藏人格(DRUNK)和兜底人格(HHHH) |
| 题目随机化 | 每次测试题目顺序不同 |
| 结果分享 | 支持分享给微信好友 |

## 项目结构

```
SBTI-miniprogram/
├── app.js                 # 小程序入口
├── app.json               # 页面路由配置
├── app.wxss               # 全局样式
├── project.config.json    # 开发者工具配置
├── utils/
│   ├── data.js            # 题库 + 27种人格数据
│   └── compute.js         # 计算引擎（洗牌、匹配）
├── pages/
│   ├── index/             # 首页
│   ├── test/              # 答题页
│   └── result/            # 结果页
└── images/                # 本地图片（可选）
```
