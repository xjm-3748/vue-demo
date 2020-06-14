<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="项目名称" v-model="listQuery.title">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <!-- <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button> -->
      <!-- <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">添加</el-button> -->

      <el-button class="filter-item" type="danger" @click="handleDelAll"  icon="delete">批量隐藏</el-button>
      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="star-off">批量移动</el-button>
      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="view">更新</el-button>
      
      <!-- <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
    </div>
   
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="100">
            <template scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="项目名称" width="">
            <template scope="scope">
              {{scope.row.chnlId}}
            </template>
          </el-table-column>

          <el-table-column label="类型"   align="center"  width="">
            <template scope="scope">
              <span>{{scope.row.hisChnlId}}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建日期"  align="center" width="">
            <template scope="scope">
              {{scope.row.createDate}}
            </template>
          </el-table-column>
          <el-table-column label="最近更新"  align="center" width="">
            <template scope="scope">
              {{scope.row.chnlName}}
            </template>
          </el-table-column>
          <el-table-column align="center"  label="操作" >
                <template scope="scope">
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">移动到活动</el-button>
                   <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">隐藏</el-button>
                </template>
            </el-table-column>
    </el-table>

    
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
  
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
        listQuery: {
            currPage: 1,
            pageSize: 10,

            // importance: undefined,
            title: '',
            type: null,//类型
               
        },
        temp: {
          "chnlId": "",
          "hisChnlId": "",
          "chnlName": "",
          "state": "",
          "isavailable": "",
          "orderNum": 10
        },
        typeOptions:[
          { key: '001', display_name: 'java' },
          { key: '002', display_name: 'c++' },
          { key: '003', display_name: 'JavaScript' },
          { key: '004', display_name: 'python' },
          { key: '005', display_name: 'html' },
          { key: '006', display_name: 'c#' },
          { key: '007', display_name: 'php' }
         
        ],
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


           vm.list =[
      {
        "chnlId": "White-Jotter",
        "hisChnlId": "Java",
        "createDate":"2020-05-11T13:03:46Z",
        
        "chnlName": "2020-05-11T13:03:46Z",
      },
      {
        "chnlId": "SpringBoot-Shiro-Vue",
        "hisChnlId": "Vue",
        "createDate":"2020-05-08T06:24:03Z",
        "chnlName": "2020-05-08T06:24:03Z",
      },
      {
        "chnlId": "fernflower",
        "hisChnlId": "java",
        "createDate":"2019-06-10T11:55:56Z",
        "chnlName": "2019-06-10T11:55:59Z",
      },
      {
        "chnlId": "file-download-upload-zip-demo",
        "hisChnlId": "null",
        "createDate":"2020-03-19T01:12:42Z",
        "chnlName": "2020-03-19T01:12:44Z",
      },
      {
        "chnlId": "HelloWorld",
        "hisChnlId": "null",
        "createDate":"2020-03-19T01:07:40Z",
        "chnlName": "2020-03-19T01:07:48Z",
      },  {
        "chnlId": "react-admin-master",
        "hisChnlId": "null",
        "createDate":"2020-03-19T01:07:40Z",
        "chnlName": "2020-03-19T01:07:48Z",
      }




    ];
      vm.listLoading = false;
    },
    
    //编辑
    handleEdit(index,row){
         let vm = this;
        this.$router.push( { path: '/movie/movieSearch', query: { id: row.chnlId } } ); //带参跳转
    },
    //单个删除
    handleDelete(index,row){
        let vm = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        vm.list.splice(index,1)
    },
    //批量删除
    handleDelAll(){
        let vm = this;
        console.log('批量删除选择的row：',vm.multipleSelection)
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
