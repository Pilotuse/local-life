export default [
  { name: 'local life 用户登录', path: '/login', component: './Login', },
  { name: 'local life 密码重置', path: '/reset/:id', component: 'Reset' },
  { name: 'local life 用户注册', path: '/register', component: 'Register' },
  { name: 'local life 用户注册确认', path: '/register-confirm', component: 'RegisterConfirm' },
  { name: 'local life 用户注册确认', path: '/register-confirm/:id', component: 'RegisterConfirm' },
  { name: '跨端上传', path: '/upload/image/:id', component: 'CrossEnd' },

  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      { path: '/home', component: 'Home' },
      { path: '/insurance', component: 'Insurance' },
      // { path: '/crawl_task', component: 'CrawlTask' },
      { path: '/account_safe', component: 'AccountAndSafe' },
      { path: '/plugin_market', component: 'PluginMarket' },
      
    ],
  },
]