import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// 所以只在生产中使用延迟加载

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');


/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');


const PersonalInfo = _import('index/personalInfo');
const Readme = _import('index/readme');
/* example*/
const TableList = _import('example/tableList');
const controlLog = _import('example/controlLog');

// 豆瓣电影
const NewMovie = _import('movie/newMovie');
const MovieSearch = _import('movie/movieSearch');

const Form = _import('example/form');
const Tinymce = _import('example/tinymce');
const Mixin = _import('example/mixin');



const fileList= _import('fileViews/fileList');
const fileShow = _import('fileViews/fileShow');

Vue.use(Router);

 /**
  * icon : 菜单图标
  * hidden : true不显示在菜单栏
  * redirect : noredirect 为不重定向
  * noDropdown : true 不显示子菜单
  * meta : { role: ['admin'] }  will control the page role
  **/

const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: authRedirect, hidden: true },
  { path: '/sendpwd', component: sendPWD, hidden: true },
  { path: '/reset', component: reset, hidden: true },
  { path: '/404', component: Err404, hidden: true },  //假地址时重定向
  { path: '/401', component: Err401, hidden: true },  //无权限时重定向

  {
    path: '/',
    //component: Layout,
    redirect: '/index/readme',  //重定向到默认首页
   
    hidden: true,
    
  },
  {
    path: '/index',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'EXCEL',
    noDropdown: true,
    children: [
        { path: 'readme', component: Readme, name: '系统说明' },
        { path: 'personalInfo', component: PersonalInfo, name: '个人信息' }
    ]
  }, 
  {
    path: '/fileViews',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    noDropdown: true,
    children: [
      { path: 'fileShow', component: fileShow, name: '文件展示' },
      { path: 'fileList', component: fileList, name: '文件列表' }
      
    ]
  },

  {
    path: '/movie',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'EXCEL',
    noDropdown: true,
    children: [
        { path: 'newMovie', component: NewMovie, name: 'issue列表' },
        { path: 'movieSearch', component: MovieSearch, name: '活动仓库' }
    ]
  },
  
  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    // icon: '404',
    children: [
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
    ]
  },
 
  
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'zonghe',
    children: [
      { path: 'tableList', component: TableList, name: 'github仓库' },
      { path: 'controlLog', component: controlLog, name: '操作日志' },
      { path: 'form', component: Form, name: 'form表单编辑' },

      { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      { path: 'mixin', component: Mixin, name: '小组件' },
      { path: '31', component: Form, name: '三级菜单1' },
    ]
  },
  // { path: '/', redirect: '/excel', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
  

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   hidden: true,
  //   children: [{ path: 'dashboard', component: dashboard, name: '首页'  }]
  // },

  
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

// export const asyncRouterMap = [
  
// ];
