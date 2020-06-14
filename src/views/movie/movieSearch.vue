<template>
  <div class="app-container">
    <!-- 这里是活动仓库 -->
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="项目名称" v-model="listQuery.title">
      </el-input>
 
      <!-- <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button> -->
      <el-button class="filter-item" type="primary"   icon="search">搜索</el-button>
      <el-button class="filter-item" type="primary"   icon="edit">显示隐藏</el-button>

      <!-- <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
    </div>
   
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="gitProjectList" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="100">
            <template scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column>

          <el-table-column align="left" label="项目名称" width="">
            <template scope="scope">
              {{scope.row.projectName}}
            </template>
          </el-table-column>

          <el-table-column label="所有者"   align="center"  width="">
            <template scope="scope">
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="添加日期"  align="center" width="">
            <template scope="scope">
              {{scope.row.addDate}}
            </template>
          </el-table-column>
          <el-table-column align="center"  label="操作" >
                <template scope="scope">
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看issue </el-button>
                   <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div  class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>


      <el-form-item label="活动性质"></el-form-item>
      <!-- <v-t></el-menu-item> -->
      直接添加项目：
      <el-input v-model="addUserName" style="width: 200px;" class="filter-item" placeholder="作者id"></el-input>
      <el-input v-model="addProjectName" class="filter-item" style="width: 130px"  placeholder="项目名称"></el-input>

      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">添加项目</el-button>


    </div>
     
     

  </div>
</template>

<script>
// import { getList } from 'api/article';
// import {global} from 'src/global/global';
// import {api} from 'src/global/api';

export default {
  data() {
    return {
        // list: null,
        // listLoading: true,

        list: null,//表格list [].push({})
        total: null,
        listLoading: false,
        gitProjectList:[{
          "projectName":"",
          "userName":"",
          "shortProjectName":"",
          "addDate":""},
        ],
       
        listQuery: {
            currPage: 1,
            pageSize: 10,

            // importance: undefined,
            title: '',
            type: null,//类型
               
        },
        
       
        dialogFormVisible: false,
        multipleSelection: []

    }
  },
  mounted() {
    let vm = this;
      // vm.listLoading = false;
    vm.initTemp();



  },
  methods: {
    initTemp(){
      let vm = this;
      vm.listLoading = true;
      if(this.$route.query.id!=null){
          this.$axios.get('http://localhost:8080/vueDownload',{
                  params: {
                          userName: this.$store.state.user.userInfo.nickname,
                          projectName: this.$route.query.id
                      }
              })
        .then(response => {
                      this.fileData = response.data;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
      }

      this.$axios.get('http://localhost:8080/jsonGetProjectList')
      .then(response => {
                    this.gitProjectList = response.data;
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      vm.listLoading = false;
    },


    handleCreate(){
      let vm = this;
            vm.listLoading = true;

      this.$axios.get('http://localhost:8080/vueDownload',{
                params: {
                        userName: this.addUserName,
                        projectName: this.addProjectName
                    }
            })
      .then(response => {
                    this.fileData = response.data;
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

      vm.listLoading = false;



    },
    


    //编辑
    handleEdit(index,row){
        let vm = this;
        // console.log('编辑的row：',index,'-----',row);
        
        
        
        //跳页面进行修改
        //this.$router.push('/example/form'); 
        this.$router.push( { path: '/movie/newMovie', query: { id: row.projectName } } ); //带参跳转
    },
    //单个删除
    handleDelete(index,row){
        let vm = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        vm.list.splice(index,1)
    },
    //搜索
    handleFilter() {
      this.getList();
    },
    //操作分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //操作分页
    handleCurrentChange(val) {
        console.log('--------',val)
      this.listQuery.currPage = val;
      this.getList();
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },

    handleDownload() {
      let vm = this;

      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['项目名称', '类别', '最近更新'];
        const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'isavailable'];
        const list = vm.list;
        const data = vm.formatJson(filterVal, list);
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>
