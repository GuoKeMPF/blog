export const routes = [
  {
    path: '/',
    component: '@/layouts/BaseLayout',
    routes: [
      {
        path: '/',
        component: '@/pages/home/index',
      },
      {
        path: '/texts',
        component: '@/pages/texts/index',
      },
      {
        path: '/text/:id',
        component: '@/pages/text/index',
      },
    ],
  },
];
