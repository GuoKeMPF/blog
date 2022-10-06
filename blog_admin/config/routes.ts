export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [{ name: '登录', path: '/user/login', component: './user/Login' }],
      },
      { component: './404' },
    ],
  },

  {
    path: '/dashboard',
    exact: true,
    name: '仪表盘',
    icon: 'BarChartOutlined',
    component: './dashboard/index',
  },

  {
    name: '说说',
    icon: 'FileTextOutlined',
    path: '/texts',
    routes: [
      {
        path: '/texts/drafts',
        name: '草稿箱',
        icon: 'FileTextOutlined',
        component: './texts/draft',
      },
      {
        path: '/texts/text',
        name: '说说',
        icon: 'FileTextOutlined',
        component: './texts/text',
      },
    ],
  },
  {
    path: '/picture',
    name: '图片',
    icon: 'FileImageOutlined',
    component: './picture/index',
  },
  {
    path: '/audio',
    name: '音频',
    icon: 'SoundOutlined',
    component: './audio/index',
  },
  { component: './404' },
];
