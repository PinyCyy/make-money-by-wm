import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/menu',
    },
    {
      name: '菜单设置',
      path: '/menu',
      component: './Menu',
    },
    {
      name: '模版演示',
      path: '/access',
      component: './Access',
    },
  ],
  npmClient: 'pnpm',
});
