<template>

  <div class="app-container">



    <el-row :gutter="20">
      <el-col :span="9">
      <div>
      <el-card class="box-card" height="100" max-height="200" >
        <div slot="header" class="clearfix">
            <h3 >项目名称:     {{issueEntity.projectName}}</h3>
           <h3 >项目作者:     {{issueEntity.userName}}</h3>
            <h3 >issue编号:     {{issueEntity.issueId.replace(/[^0-9]/ig,"")}}</h3>
        </div>
        <div>
          <!-- <span style="color ="red""></span> -->
              <p v-html=' fileData.fileName'></p>
        </div>
      </el-card>
      </div>
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
           <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h3 >代码文本</h3>
        </div>
        <div>
         <p v-html=' fileData.fileContent'></p>
        </div>
      </el-card>

 

    </div></el-col>
    </el-row>

  </div>
  
</template>


<script>
// import { getList } from 'api/article';
// import {global} from 'src/global/global';
// import {api} from 'src/global/api';  
import axios from 'axios'
// import Global from '../static/config/global'   //引用
// Vue.prototype.GLOBAL = Global;   //挂载原型，可以使用this.GLOBAL拿到global.js的内容
import ElementUI from 'element-ui';


export default {
  data() {
    return {
      fileData:{
        "fileName":"ffffffffff",
        "fileContent":""
      },
      fileName:"",
      issueEntity:null,
      remark:[],
      indexOfRemark:0
    }
  },
  mounted() {
    let vm = this;
    this.getFileData();
    // var str = JSON.stringify(vm.fileData); 
    // alert(str);

  },
  
  methods: {
    
    biaoji(val){
          var name = '已标记';
          // this.stuname = this.$refs.btn1.$el.innerText;
          
          this.$refs.btn1.$el.innerText = name


    },
    beizhu(){
          this.$prompt('请添加备注', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

      }).then(({ value }) => {
        
        let vm= this;
        this.remark.push(value);

          this.$message({
            type: 'success',
            message: '添加备注: ' + value
            
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });



    },
    getFileData(){
        let vm = this;
      this.listLoading = true;
      // this.$store.issueSave=tempstr;
      let tempstr=(this.$route.query.issueId);
      if(tempstr!=null)
      {
         this.$axios.get('http://localhost:8080/getIssueById',{
                params : {
                        issueId:this.$route.query.issueId
                    }
      })
      .then(response => {
                    vm.issueEntity = response.data;
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
        

        
        this.$axios.get('http://localhost:8080/readColorFileContent',{
                params : {
                        fileName:this.$route.query.fileName,
                        issueId:this.$route.query.issueId
                    }
      })
      .then(response => {
                    vm.fileData = response.data;
                    let str=JSON.stringify(response.data);
                    // alert(str);
                    
      vm.listLoading = false;


      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      
      }else{
        // alert(this.$store.state.issueSave);

      }

      vm.listLoading = false;
    

    }
   
  }
};
</script>
<style>
    h1 {
        font-family: 'Marcellus SC', Times, serif;
        font-size: 60px;
        letter-spacing: 0.6em;
        text-align: center;
        padding-left: 0.7em; 
        /* Required for centering */
    }
    a.blacklink {
        color: #000000;
    }
    .subheading {
        letter-spacing: 0.4em;
        text-align: center;
    }
    .natural{
       color: red;
    }
    .code{
        color:blue;
    }
    .stack{
        color:teal;
    }

</style>