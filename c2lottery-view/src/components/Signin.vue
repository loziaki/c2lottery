<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎注册 
      </span>
      <el-row>
        <el-input 
          v-model="uname" 
          placeholder="昵称"
          type="text">
        </el-input>
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
        <el-button @click="signinToDo" type="primary">注册</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      uname: '',
      account: '',
      password: ''
    };
  },
  methods: {
    signinToDo() {
      let obj = {
        name: this.uname,
        account: this.account,
        password: this.password
      } 
      this.$http.post('/auth/signin', obj) // 将信息发送给后端
        .then((res) => { // axios返回的数据都在res.data里
          if(res.data.error == 0){ // 如果成功
            sessionStorage.setItem('demo-token',res.data.token); // 用sessionStorage把token存下来
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '注册成功！'
            }); 
            this.$router.push('/auth/login') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
          }
        }, (err) => {
            this.$message.error('请求错误！')
            sessionStorage.setItem('demo-token',null); // 将token清空
        })
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
</style>