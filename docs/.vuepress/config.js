module.exports = {
  title: "兿芝梅",
  base: "/my-blog/",
  description: "只有出发，总会到达；只有出发，才会到达！",
  serviceWorker: true,
  head: [
    ["link", { rel: "shortcut icon", href: "/images/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/style/style.css" }],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "前端之路", link: "/frontEnd/" },
      { text: "平凡之路", link: "/life/" },
      { text: "Github", link: "https://github.com/arieltlm/" }
    ],
    sidebarDepth: 0,
    sidebar: {
      "/frontEnd/": [
        {
          title: "前端日常", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/front-daily/ES6", // 你的md文件地址
            "/frontEnd/front-daily/daterangepicker",
            "/frontEnd/front-daily/checkbox-css",
            "/frontEnd/front-daily/solarSystem",
            "/frontEnd/front-daily/css-secret",
            "/frontEnd/front-daily/node-http",
            "/frontEnd/front-daily/twothreelayout",
            "/frontEnd/front-daily/module",
            "/frontEnd/front-daily/regexp",
            "/frontEnd/front-daily/browser-cache",
            "/frontEnd/front-daily/babel-es6",
            "/frontEnd/front-daily/JSON",
          ]
        },
        {
          title: "vue 故事", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/vue/",
            "/frontEnd/vue/checklist",
            "/frontEnd/vue/vue-getData",
            "/frontEnd/vue/bus",
            "/frontEnd/vue/vue-next",
          ]
        },
        {
          title: "react 哈", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/react/",
            "/frontEnd/react/react-smallbook",
            "/frontEnd/react/yaqiGuoReact",
            "/frontEnd/react/getDerivedStateFromProps",
        ]
        },
        {
          title: "项目相随", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/project/IE8",
            "/frontEnd/project/git",
            "/frontEnd/project/immutable",
            "/frontEnd/project/antd",
            "/frontEnd/project/webpack-fe-ml",
            "/frontEnd/project/dll",
        ]
        },
        {
          title: "折腾折腾", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/interest/",
            "/frontEnd/interest/npm_package",
          ]
        },
        {
          title: "碎片时间", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/review/",
            "/frontEnd/review/181217-21",
            "/frontEnd/review/js5skill",
            "/frontEnd/review/jsskills",
            "/frontEnd/review/1117-22_1",
            "/frontEnd/review/1123-30_2",
            "/frontEnd/review/1201-07_3",
            "/frontEnd/review/1208-15_4",
            "/frontEnd/review/1216-22_5",
            "/frontEnd/review/20_0328_6",
            "/frontEnd/review/20_0405_7",
            "/frontEnd/review/20_0412_8",
          ]
        }, {
          title: "工具收藏", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/tools/",
            "/frontEnd/tools/debucsser",
            "/frontEnd/tools/chrome-devtool",
            "/frontEnd/tools/npm",
          ]
        }
      ],
      "/life/": ["", "one", "two"]
    }
  }
};