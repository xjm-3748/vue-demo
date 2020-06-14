<template>
  <div class="app-container">
   <el-row :gutter="20">
      <el-col :span="9">
      <!-- <div> -->
        <el-card class="box-card" height="100" max-height="200" >
        <div slot="header" class="clearfix">
            <h3 >项目名称:     {{issueEntity.projectName}}</h3>
           <h3 >项目作者:     {{issueEntity.userName}}</h3>
            <h3 >issue编号:     {{issueEntity.issueId.replace(/[^0-9]/ig,"")}}</h3>
        </div>
                <div>
              <p v-html=' issueEntity.issueTitle'></p>
              <p v-html=' issueEntity.issueContent'></p>
        </div>
      </el-card>

         <div style="margin-top: 20px">
   <el-card class="box-card" height="100" max-height="200" >
        <div >
          <span style="font-size:28px">备注</span>  
            
            <el-button style="margin-left:170px; " ref='btn1'   @click="biaoji($event)"   type="primary">标记</el-button>

           <el-button style="margin-left:30px; " @click="beizhu"   type="primary">添加备注</el-button>
        </div>
      </el-card>
    </div>

         <div v-for="o in remark" :key="o" class="text item">
            <el-card class="box-card" height="100" max-height="200" >
        <div >
         {{ o }}
        </div>
      </el-card>
            
           
         </div>

      </el-col>
      <el-col :span="2">
      </el-col>
  
      <el-col :span="13 "><div class="grid-content bg-purple">
           <el-table ref="multipleTable" :data="fileData" v-loading.body="listLoading"  element-loading-text="拼命加载中" border fit highlight-current-row  >

          <el-table-column align="left"  label="路径" width="">
            <template scope="scope">
              
                  <p v-html='scope.row'></p>
            </template>
          </el-table-column>

          <el-table-column align="left"  label="操作">
                <template scope="scope">
                  
                  <el-badge :value="parseInt(Math.random()*0.01)"  ref='btn1'  class="item" type="warning">
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情 </el-button>
                    </el-badge>
                   <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">隐藏</el-button> -->
                </template>
            </el-table-column>
        </el-table>

 

    </div>
    </el-col>
    </el-row>
    <!-- 表格 -->
      
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
        numbadge:0,
        list: null,//表格list [].push({})
        total: null,
        issueEntity:null,
        listQuery: {
            currPage: 1,
            pageSize: 10,

            // importance: undefined,
            title: '',
            type: null,//类型
               
        },
        fileData:[],
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
    vm.listLoading=true



  },
  methods: {
    initTemp(){
      let vm = this;
      // this.listLoading = true;
      // // this.$store.issueSave=tempstr;
      let tempstr=(this.$route.query.userName);
      this.listLoading = true;
      
      if(tempstr!=null)
      {
        this.$axios.get('http://localhost:8080/getIssueById',{
                params : {
                        issueId:this.$route.query.aimIssueId
                    }
      })
      .then(response => {
                    vm.issueEntity = response.data;
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });

        
        
        this.$axios.get('http://localhost:8080/getTopTenFileList',{
                params : {
                        userName: this.$route.query.userName,
                        projectName:this.$route.query.projectName,
                        issueId:this.$route.query.aimIssueId
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
      setTimeout(() => {
          this.listLoading = false;
        }, 2000);


      vm.listLoading = true;
    
  },
   //编辑
    handleEdit(index,row){
        let vm = this;
        this.numbadge++;
        console.log('编辑的row：',index,'-----',row);
        this.$router.push( { path: '/fileViews/fileShow', 
        query: {  fileName: row, 
                  issueId:this.$route.query.aimIssueId } } );
    }
  }
};
</script>
<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
