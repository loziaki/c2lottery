<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录 
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="账号 (example: example@example.com)"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="密码"
          type="password">
        </el-input>
        <el-button @click="loginToDo" type="primary">登录</el-button>
        <el-button @click="jumpSignin">注册</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    loginToDo() {
      let obj = {
        name: this.account,
        password: this.password
      } 
      this.$http.post('/auth/login', obj) // 将信息发送给后端
        .then((res) => { // axios返回的数据都在res.data里
          if(res.data.error == 0){ // 如果成功
            sessionStorage.setItem('demo-token',res.data.token);
            sessionStorage.setItem('uid',res.data.uid);
            sessionStorage.setItem('uname',res.data.uname);
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '登录成功！'
            }); 
            this.$router.push('/commentList') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            sessionStorage.setItem('demo-token',null); // 将token清空
          }
        }, (err) => {
            this.$message.error('请求错误！')
            sessionStorage.setItem('demo-token',null); // 将token清空
        })
    },
    jumpSignin() {
      this.$router.push('/signin');
    }
    
  }
};
</script>
<style>
  .el-row.content {
    padding:16px;
  }
    
  .title {
    font-size:28px;
  }
    
  .el-input {
    margin:12px 0;
  }
    
  .el-button {
    width:100%;
    margin-top:12px; 
  }

  .el-button+.el-button {
    margin-left: 0;
  }
</style>