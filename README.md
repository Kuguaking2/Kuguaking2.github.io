# 苦瓜大王的个人网站

一个纯静态（HTML + CSS + JavaScript）的个人自我介绍网站：科技感风格、蓝色主色调、支持深色/浅色模式、手机电脑自适应。无需安装任何环境，双击 `index.html` 即可打开。

## 文件结构

```
personal-website/
├── index.html        页面结构（一般不用改）
├── css/style.css     样式：颜色、间距、动画都在这里
├── js/config.js      ⭐ 网站所有文字内容 —— 改内容只需要动这个文件
├── js/main.js        渲染与交互逻辑（一般不用改）
├── images/           项目卡片配图（作品运行截图）
├── ancient-tour/     🎮 参赛作品的网页版（构建产物，项目卡片里可在线试玩）
└── README.md         本说明文件
```

## 如何修改内容

打开 `js/config.js`，每一项都有中文注释，改完保存，浏览器按 **Ctrl + F5** 强制刷新即可。

- **换头像**：把图片放到网站文件夹里（比如 `avatar.jpg`），然后把 `basic.avatarImg` 改成 `"./avatar.jpg"`；不填则显示 `basic.avatarText` 里的文字。
- **项目配图**：同样把图片放进文件夹，在对应项目的 `image` 里填路径（如 `"./images/project1.png"`）；留空就显示 emoji。
- **联系方式**：目前填的是占位示例（`your-email@example.com` 等），记得改成你自己的邮箱 / GitHub / 微信。
- **换主色调**：打开 `css/style.css` 第 01 部分，改 `--primary` 等几个变量即可全局生效。

## 如何更新内嵌的作品演示（ancient-tour）

项目卡片里的「在线试玩」来自 `ancient-tour/` 文件夹，它是参赛项目构建后的产物。
参赛项目代码有更新时，重新生成并覆盖：

```bash
# 1. 在参赛项目文件夹里执行（--base=./ 不能省，否则部署到子路径后会白屏）
npm run build -- --base=./

# 2. 把 dist 文件夹里的所有内容复制到本网站的 ancient-tour/ 里，替换旧文件
```

想给演示换上真实模型：把 GLB 模型放进参赛项目 `public/models/` 对应目录后，按上面两步重新构建即可。

## 本地预览

- **方式一**：直接双击 `index.html` 用浏览器打开，最简单。
- **方式二（推荐，更接近线上效果）**：
  - 用 VS Code 安装 "Live Server" 插件，右键 `index.html` → Open with Live Server；或
  - 命令行进入网站文件夹后运行 `python -m http.server 8000`，然后访问 http://localhost:8000

## 免费部署到 GitHub Pages

1. 注册/登录 [GitHub](https://github.com)，右上角 **+** → New repository 新建仓库。
   - 想让网址就是 `https://你的用户名.github.io`，仓库名就填 `你的用户名.github.io`；
   - 用其他仓库名也可以，网址会变成 `https://你的用户名.github.io/仓库名/`。
2. 把本文件夹里的**所有文件**上传到仓库（仓库页点 "uploading an existing file" 直接拖拽上传即可）。
3. 打开仓库 **Settings → Pages**，Source 选择 `main` 分支、目录 `/ (root)`，点 Save。
4. 等待 1~3 分钟，访问 `https://你的用户名.github.io` 就能看到你的网站了。
5. 以后想更新内容：改好 `js/config.js` 后重新上传/提交，网站会自动更新。

## 常见问题

- **改了内容没生效？** 浏览器会缓存 CSS/JS，按 Ctrl + F5 强制刷新。
- **GitHub Pages 打开是 404？** 确认仓库根目录下有 `index.html`（不是嵌套在文件夹里），再检查 Settings → Pages 是否已启用。
- **部署后头像/图片不显示？** 检查 config 里写的路径大小写是否和文件名完全一致（服务器区分大小写）。
