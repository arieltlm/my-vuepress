module.exports = {
	title: "兿芝梅",
	base: "/my-blog/",
	description: "只有出发，总会到达；只有出发，才会到达！",
	serviceWorker: true,
	head: [
		["link", { rel: "shortcut icon", href: "/images/favicon.ico" }],
		["link", { rel: "stylesheet", href: "/style/style.css" }],
	],
	// markdown配置
	markdown: {
		lineNumbers: true,
		toc: { includeLevel: [1, 2,3,4] },
	},
	// vuepress中的wepack配置
	configureWebpack: {
		resolve: {
			alias: {
				'@alias': '../images' 
			}
		}
	},
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
					"/frontEnd/front-daily/require-context",
					"/frontEnd/front-daily/less",
					"/frontEnd/front-daily/you-dont-know-js-mid",
					"/frontEnd/front-daily/BFC",
					"/frontEnd/front-daily/typescript",
					"/frontEnd/front-daily/echarts",

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
					"/frontEnd/vue/vue3-first",
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
					"/frontEnd/project/npm",
					"/frontEnd/project/IE8",
					"/frontEnd/project/git",
					"/frontEnd/project/immutable",
					"/frontEnd/project/antd",
					"/frontEnd/project/webpack-fe-ml",
					"/frontEnd/project/dll",
					"/frontEnd/project/css-module",
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
                    "/frontEnd/review/js5skill",
					"/frontEnd/review/jsskills",
					"/frontEnd/review/",
					"/frontEnd/review/181217-21",
					"/frontEnd/review/1117-22_1",
					"/frontEnd/review/1123-30_2",
					"/frontEnd/review/1201-07_3",
					"/frontEnd/review/1208-15_4",
					"/frontEnd/review/1216-22_5",
					"/frontEnd/review/20_0328_6",
					"/frontEnd/review/20_0405_7",
					"/frontEnd/review/20_0412_8",
					"/frontEnd/review/20_0419_9",
				]
				}, {
				title: "工具收藏", // 侧边栏名称
				collapsable: true, // 可折叠
				children: [
					"/frontEnd/tools/",
					"/frontEnd/tools/debucsser",
					"/frontEnd/tools/chrome-devtool",
					"/frontEnd/tools/ohmyzsh",
				]
				}, {
				title: "解决方案", // 侧边栏名称
				collapsable: true, // 可折叠
				children: [
					"/frontEnd/solution/vscode",
					"/frontEnd/solution/gitloadimg",
					"/frontEnd/solution/mac-install-software",
					"/frontEnd/solution/mac-chrome-https",
					"/frontEnd/solution/x64-node-sass",
				]
				}
			],
			"/life/": [
                "", 
                // "one", 
                "two"
            ]
		}
  	}
};