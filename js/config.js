/* ======================================================================
   个人网站 · 内容配置文件 ⭐
   ----------------------------------------------------------------------
   你只需要修改这个文件里的文字，就能更新整个网站的内容，
   完全不用碰 HTML 和 CSS。
   修改保存后，浏览器按 Ctrl + F5 强制刷新即可看到效果。
   ====================================================================== */

window.SITE_CONFIG = {

  /* ---------- 导航栏 ---------- */
  nav: {
    logo: "<苦瓜 />", // 左上角 logo 文字，可以随便改成自己喜欢的
    links: [
      { text: "关于我", href: "#about" },
      { text: "技能",   href: "#skills" },
      { text: "项目",   href: "#projects" },
      { text: "经历",   href: "#timeline" },
      { text: "荣誉",   href: "#honors" },
      { text: "联系我", href: "#contact" },
    ],
  },

  /* ---------- 跑马灯 + 底部常驻操作条 ---------- */
  // 跑马灯：滚动页面时像滚筒一样转动，奇数项显示为描边字
  marquee: {
    items: ["信息安全", "AI AGENT", "THREE.JS", "CTF", "WEB 安全", "3D 交互", "PYTHON", "OPEN SOURCE"],
  },
  // 常驻操作条：滚过首屏后从底部升起，保证核心按钮不被埋没
  ctaBar: {
    primary: { text: "🎮 试玩我的作品", target: "#projects" },
    ghost:   { text: "联系我", target: "#contact" },
  },

  /* ---------- 基础信息（首屏 Hero）---------- */
  basic: {
    greeting: "你好，我是",
    name: "苦瓜大王",
    role: "信息安全专业在校大学生",
    slogan: "热爱用 AI Agent 解决实际问题",
    description: "课堂上学习网络攻防，课堂外折腾 AI Agent —— 喜欢把奇思妙想变成真正能用的工具，也乐于把踩过的坑分享出来。",
    // 首屏的小标签，展示你最亮的几个关键词
    tags: ["CTF 爱好者", "AI Agent", "3D 交互开发", "Web 安全"],
    // 两个按钮：style 只能是 "primary"（实心蓝）或 "ghost"（描边）
    buttons: [
      { text: "查看我的项目", target: "#projects", style: "primary" },
      { text: "联系我",       target: "#contact", style: "ghost" },
    ],
    // 头像：填了 avatarImg（本地图片或网络链接）就优先显示图片，否则显示 avatarText 文字
    avatarImg: "",  // 例如 "./avatar.jpg"，把图片放到和 index.html 同一个文件夹
    avatarText: "苦",
  },

  /* ---------- 关于我 ---------- */
  about: {
    title: "关于我",
    subtitle: "简单介绍一下我自己",
    // 2~3 段自我介绍
    paragraphs: [
      "我是苦瓜大王，一名信息安全专业的在校大学生。课堂上学习网络攻防与密码学，课堂外更喜欢动手实践：打 CTF、写小工具、研究 AI Agent 的各种玩法，最近刚完成一个 Vue3 + Three.js 的古建筑虚拟漫游参赛作品。",
      "性格上好奇心强、喜欢钻研，遇到问题习惯先自己拆解一遍再动手解决。我理解的“安全”不只是修补漏洞，更是搞懂系统运转的底层逻辑。",
      "未来我希望往“安全 + AI”的方向深耕，用自动化和 AI Agent 把重复繁琐的安全工作变得高效有趣。如果你对类似方向感兴趣，欢迎找我交流！",
    ],
    // 亮点小卡片（icon 填 emoji 即可）
    highlights: [
      { icon: "🎓", label: "信息安全专业在读" },
      { icon: "🛡️", label: "CTF 比赛爱好者" },
      { icon: "🤖", label: "AI Agent 折腾者" },
      { icon: "⚡", label: "喜欢动手造工具" },
    ],
  },

  /* ---------- 技能（level 是 0~100 的数字，控制进度条长度）---------- */
  skills: {
    title: "技能",
    subtitle: "一直在学习的路上",
    items: [
      { name: "Python",                 level: 85 },
      { name: "网络安全 / 渗透测试基础", level: 75 },
      { name: "Linux 基础",             level: 75 },
      { name: "AI Agent 应用开发",      level: 72 },
      { name: "Vue3 / Three.js 3D 开发", level: 70 },
      { name: "JavaScript / 前端基础",  level: 65 },
      { name: "CTF（Web 方向）",        level: 60 },
      { name: "英语读写",               level: 70 },
    ],
  },

  /* ---------- 项目 / 作品 ----------
     featured: true 的项目会以通栏大卡片展示（推荐放最重要的作品）
     image: 配图路径（如 "./images/project1.png"），留空则显示 emoji
     link:  项目演示地址；repo: 代码仓库地址；没有就留空 "" */
  projects: {
    title: "项目 / 作品",
    subtitle: "认真做过的作品，会持续更新在这里",
    items: [
      {
        title: "古建筑虚拟漫游 Web 交互程序",
        emoji: "🏛️",
        image: "./images/competition-bridge.png",
        featured: true,
        description: "计算机大赛「AI + 数媒游戏与交互设计」赛道参赛作品。基于 Vue3 + Three.js 的古建筑 3D 虚拟漫游系统：覆盖故宫太和殿、北京四合院、赵州桥、平遥县衙四大场景；轨道旋转 + 第一人称 WASD 双视角漫游，自研防穿模碰撞检测；构件热点点击联动结构化知识库（年代、结构参数、营造技艺）；接入阿里云百炼实现 AI 古建问答、CosyVoice 语音讲解与 Qwen-VL 截图智能识别，三层降级兜底设计保证不配 API Key 也能完整体验。纯代码驱动，渲染管线与交互逻辑全部手写，共 4700+ 行。",
        tags: ["Vue3", "Three.js", "Pinia", "Element Plus", "阿里云百炼"],
        // 作品已打包进网站 ancient-tour 文件夹：link = 新窗口完整体验，embed = 在卡片里直接试玩
        link: "./ancient-tour/",
        embed: "./ancient-tour/",
        repo: "",
      },
      {
        title: "这个个人网站",
        emoji: "🌐",
        image: "",
        description: "就是你现在看到的页面！纯 HTML/CSS/JS 手写，支持深色模式和响应式布局。",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "",
        repo: "",
      },
    ],
  },

  /* ---------- 经历时间线（按时间从早到晚排列）---------- */
  timeline: {
    title: "我的经历",
    subtitle: "教育与成长轨迹",
    items: [
      {
        time: "2023.09 - 至今",
        title: "江西警察学院 · 信息安全专业（本科在读）",
        description: "系统学习计算机网络、操作系统、密码学、Web 安全等课程，喜欢把课上知识动手做成项目。",
      },
      {
        time: "2026.04",
        title: "计算机大赛 ·《古建筑虚拟漫游》参赛作品",
        description: "「AI + 数媒游戏与交互设计」赛道：独立完成 Vue3 + Three.js + 阿里云百炼 AI 的 3D 虚拟漫游系统，4700+ 行代码。",
      },
    ],
  },

  /* ---------- 荣誉证书墙 ⚠️ 下面是示例占位，请替换成你自己的证书 ----------
     image: 证书扫描件路径（如 "./images/cert1.jpg"），填了图片后点击卡片可放大查看；
            留空则显示 emoji 占位，无法放大 */
  honors: {
    title: "荣誉证书",
    subtitle: "证书展示墙（⚠️ 目前是示例占位，请替换成你自己的证书）",
    items: [
      {
        title: "中国大学生计算机设计大赛 · 参赛证明",
        issuer: "计算机设计大赛组委会",
        time: "2026.04",
        emoji: "🏆",
        image: "",
      },
      {
        title: "校级奖学金（示例）",
        issuer: "江西警察学院",
        time: "2025.12",
        emoji: "🎖️",
        image: "",
      },
      {
        title: "CTF 竞赛获奖证书（示例）",
        issuer: "XX 杯网络安全竞赛",
        time: "2025.05",
        emoji: "🥈",
        image: "",
      },
      {
        title: "大学英语四级证书（示例）",
        issuer: "全国大学英语四六级考试委员会",
        time: "2024.06",
        emoji: "📜",
        image: "",
      },
    ],
  },

  /* ---------- 联系我 ⚠️ 下面是占位示例，记得改成你自己的 ---------- */
  contact: {
    title: "联系我",
    subtitle: "无论是交流技术、组队打比赛还是随便聊聊，都欢迎找我！",
    // icon 可选：email / github / chat / link
    items: [
      { icon: "email",  label: "邮箱",   value: "your-email@example.com", link: "mailto:your-email@example.com" },
      { icon: "github", label: "GitHub", value: "@yourname",              link: "https://github.com/yourname" },
      { icon: "chat",   label: "微信",   value: "your-wechat-id",         link: "" },
    ],
  },

  /* ---------- 页脚（{year} 会自动替换成当前年份）---------- */
  footer: {
    copyright: "© {year} 苦瓜大王 · 保持热爱，保持折腾",
  },
};
