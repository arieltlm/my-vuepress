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
            "/frontEnd/front-daily/", // 你的md文件地址
            "/frontEnd/front-daily/one",
            "/frontEnd/front-daily/two",
            "/frontEnd/front-daily/three",
            "/frontEnd/front-daily/four",
            "/frontEnd/front-daily/webpack-fe-ml",
            "/frontEnd/front-daily/five",
          ]
        },
        {
          title: "vue 故事", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/vue/",
            "/frontEnd/vue/one",
            "/frontEnd/vue/two",
            "/frontEnd/vue/three",
            "/frontEnd/vue/four",
          ]
        },
        {
          title: "react大事", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/react/",
            "/frontEnd/react/react-smallbook",
            "/frontEnd/react/yaqiGuoReact",
        ]
        },
        {
          title: "项目相随", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/project-get/",
            "/frontEnd/project-get/one",
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
            "/frontEnd/review/17-21",
          ]
        }, {
          title: "工具收藏", // 侧边栏名称
          collapsable: true, // 可折叠
          children: [
            "/frontEnd/tools/",
            "/frontEnd/tools/debucsser",
            "/frontEnd/tools/chrome-devtool",
          ]
        }
      ],
      "/life/": ["", "one", "two"]
    }
  }
};