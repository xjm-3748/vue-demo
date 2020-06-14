<template>
  <div class="app-container">
   
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row  >

       
          <el-table-column label="序号"  align="时间" width="">
            <template scope="scope">
              {{scope.row.hisChnlId}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="项目" width="">
            <template scope="scope">
              {{scope.row.chnlId}}
            </template>
          </el-table-column>

          <el-table-column label="文件名"  align="时间" width="">
            <template scope="scope">
              {{scope.row.chnlName}}
            </template>
          </el-table-column>
          <el-table-column label="时间"  align="center" width="">
            <template scope="scope">
              {{scope.row.state}}
            </template>
          </el-table-column>
          <el-table-column align="center"  label="操作" >
                <template scope="scope">
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情 </el-button>
                   <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">隐藏</el-button> -->
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
        "chnlId": "HotBitmapGG/bilibili-android-client",
           "hisChnlId": "54",
          "chnlName": "请教下VideoPlayerView 中的 currentState 和 targetState 分别代表什么？有点没看懂",
          "state": "2020-05-08T06:24:03Z",
      },{
        "chnlId": "HotBitmapGG/bilibili-android-client",
           "hisChnlId": "68",
          "chnlName": "RuntimeException occurs when clicking the username and password input boxes",
          "state": "2020-05-08T06:23:13Z",
      },{
        "chnlId": "HotBitmapGG/bilibili-android-client",
           "hisChnlId": "64",
          "chnlName": "是不是不能用了",
          "state": "2020-05-08T06:22:01Z",
      },{
        "chnlId": "HotBitmapGG/bilibili-android-client",
           "hisChnlId": "54",
          "chnlName": "请教下VideoPlayerView 中的 currentState 和 targetState 分别代表什么？有点没看懂",
          "state": "2020-05-08T06:24:03Z",
      },
      {
        "chnlId": "xjm-3748/SpringBoot-Shiro-Vue",
        "hisChnlId": "1",
        "chnlName": "testIssue",
        "state": "2020-05-08T06:24:03Z",
      }
    ];
      vm.listLoading = false;
    },
    
    
  },
   //编辑
    handleEdit(index,row){
        let vm = this;
        console.log('编辑的row：',index,'-----',row);
        //跳页面进行修改
        //this.$router.push('/example/form'); 
        this.$router.push( { path: '/fileViews/fileShow', query: { id: row.chnlId } } ); //带参跳转
    }
  
};
</script>
