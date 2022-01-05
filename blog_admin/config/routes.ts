export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  {
    path: '/dashboard',
    exact: true,
    name: '仪表盘',
    icon: 'BarChartOutlined',
    component: './Dashboard',
  },
  {
    name: '说说管理',
    icon: 'FileTextOutlined',
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
      { component: './404' },
    ],
  },
  { component: './404' },
];
