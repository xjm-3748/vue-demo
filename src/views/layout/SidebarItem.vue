<template>
    <div>
        <!-- 注意：路由表不能配置在后端，不然前端无法配置跳转到某些路由，例如提交成功后返回至某个固定路由 lss 2017-6-27 -->
        <!-- 菜单权限json（调试专用）：==={{ routes | json }} -->
        <template v-if="routes">
            <!-- 一级菜单 示例-->
            <router-link  to="/index/readme"  v-if="routes['/index/readme']" >
                <el-menu-item index="/index/readme">
                    <i class="el-icon-star-on" aria-hidden="true"></i> 系统说明
            
                </el-menu-item>
            </router-link>
            <router-link  to="/index/personalInfo"  v-if="routes['/index/personalInfo']" >
                <el-menu-item index="/index/personalInfo">
                    <i class="el-icon-star-on" aria-hidden="true"></i> 首页
             
                </el-menu-item>
            </router-link>

            <router-link  to="/example/tableList"  v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="el-icon-search" aria-hidden="true"></i> GitHub仓库
                </el-menu-item>
            </router-link>
            
            <router-link  to="/movie/movieSearch"  v-if="routes['/movie/movieSearch']" >
                <el-menu-item index="/movie/movieSearch">
                    <i class="el-icon-search" aria-hidden="true"></i> 活动仓库
            
                </el-menu-item>
            </router-link>




            <router-link  to="/movie/newMovie"  v-if="routes['/movie/newMovie']" >
                <el-menu-item index="/movie/newMovie">
                    <i class="el-icon-search" aria-hidden="true"></i> issue页面
            
                </el-menu-item>
            </router-link>
           
        

            <router-link  to="/example/controlLog"  v-if="routes['/example/controlLog']" >
                <el-menu-item index="/example/controlLog">
                    <i class="el-icon-search" aria-hidden="true"></i> 操作日志
                </el-menu-item>
            </router-link>
            
            
            <router-link  to="/fileViews/fileShow"  v-if="routes['/fileViews/fileShow']" >
                <el-menu-item index="/fileViews/fileShow">
                    <i class="el-icon-search" aria-hidden="true"></i>文件展示
                </el-menu-item>
            </router-link>
            
            <router-link  to="/fileViews/fileList"  v-if="routes['/fileViews/fileList']" >
                <el-menu-item index="/fileViews/fileList">
                    <i class="el-icon-search" aria-hidden="true"></i> 文件列表
                </el-menu-item>
            </router-link>
            
        </template>    
    </div>
</template>

<script>
    //获取vuex中的菜单权限 进行菜单show展示。登陆成功时直接 返回菜单json 并包含帐户信息
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          // type: Array
        }
      },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .fa{
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>

