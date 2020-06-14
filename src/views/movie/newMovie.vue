<template>
  <div class="app-container">
    <!-- issue页面 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="项目名称" v-model="listQuery.title">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <!-- <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button> -->
      <el-button class="filter-item" type="primary"  icon="edit">显示隐藏</el-button>
      <el-button class="filter-item" type="danger"  icon="delete">批量隐藏</el-button>

      <!-- <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
    </div>
   
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="fileData" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='issue序号' width="100">
            <template scope="scope">
              {{scope.row.issueId.replace(/[^0-9]/ig,"")}}
            </template>
          </el-table-column>

          <el-table-column align="left" :show-overflow-tooltip="true" label="title" width="">
            <template scope="scope">
              {{scope.row.issueTitle}}
            </template>
          </el-table-column>
          <el-table-column label="详细描述" :show-overflow-tooltip="true"	  align="center" width="">
            <template scope="scope">
              {{scope.row.issueContent}}
            </template>
          </el-table-column>
          
          <el-table-column align="center"  label="操作" >
                <template scope="scope">
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">搜索文件 </el-button>
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
        fileData:[{"issueId":"HotBitmapGGbilibili-android-client54","issueTitle":"请教下VideoPlayerView 中的 currentState 和 targetState 分别代表什么？有点没看懂 ","issueContent":"                      No description provided.          ","projectName":"bilibili-android-client","userName":"HotBitmapGG"},],
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
      let tempstr=(this.$route.query.id);
      if(tempstr!=null)
      {this.$axios.get('http://localhost:8080/jsonIssueList',{
                params : {
                        userName: tempstr.split('/')[0],
                        projectName: tempstr.split('/')[1]
                    }
      })
      .then(response => {
                    vm.fileData = response.data;

      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      
      }else{
        alert(this.$store.state.issueSave);
      }
      vm.listLoading = false;
    },
    
    //编辑
    handleEdit(index,row){
        let vm = this;
        console.log('编辑的row：',index,'-----',row);
        let tempstr=(this.$route.query.id);
        //跳页面进行修改
        //this.$router.push('/example/form'); 
        // alert(row.issueId);
        this.$router.push( { path: '/fileViews/fileList', query: { userName: tempstr.split('/')[0],
                        projectName: tempstr.split('/')[1],aimIssueId : row.issueId } } ); //带参跳转
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
