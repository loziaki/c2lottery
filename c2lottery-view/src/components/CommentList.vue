<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！
      </span>
      <el-input placeholder="请输入评论" v-model="comments" @keyup.enter.native="addcomments"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="评论列表" name="first">
          <el-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="comment-list" :data-id="item.cid">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button v-if="item.status == false" size="small" type="primary" @click="liked(index)">赞</el-button>
                    <el-button v-else-if="item.status == true" size="small">已赞</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="Done">
              暂无评论
            </div>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      name: 'unknown',
      uid: 0,
      comments: '',
      list:[],
      activeName: 'first'
    };
  },
  mouted () {
    this.methods.getlist(0,10);
    this.name = sessionStorage.getItem('uname');
    this.uid = sessionStorage.getItem('uid');
  },
  computed: { // 计算属性用于计算是否已经完成了所有任务
    Done(){
      let length = this.list.length;
      if(length == 0){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    getlist(offset,size) {
      let obj = {
        offset: offset,
        size: size
      };
      this.$http.post('/api/getlist', obj) // 将信息发送给后端
      .then((res) => { // axios返回的数据都在res.data里
        if(res.data.error == 0){ // 如果成功
          this.$set(this.list,res.data.list);
        }else{
          this.$set(this.list,[]);
        }
      }, (err) => {
        console.log('[error]get comments list fail,check the api');
      });
    },
    addcomments() {
      if(this.comments == '')
        return
      let obj = {
        uid: this.uid,
        fcid: '',
        type: 1,
        content: this.comments 
      };
      this.$http.post('/api/addmsg', obj) // 将信息发送给后端
      .then((res) => { // axios返回的数据都在res.data里
        if(res.data.error == 0){ // 如果成功
          this.list.push(obj);
          this.$message({
            type: 'success',
            message: '评论成功'
          });
        }else{
          this.$message.error(res.data.info); // 登录失败，显示提示语
        }
      }, (err) => {
        this.$message.error('网络有点抽风')
      });
      this.comments = '';
    },
    liked(index) {
      let obj = {
        uid: this.uid,
        fcid: '',
        type: 2,
        content: '' 
      } 
      this.$http.post('/api/addmsg', obj) // 将信息发送给后端
      .then((res) => { // axios返回的数据都在res.data里
        if(res.data.error == 0){ // 如果成功
          this.$set(this.list[index],'status',true); // 通过set的方法让数组的变动能够让Vue检测到
          this.$message({
            type: 'success',
            message: '点赞成功'
          });
        }else{
          this.$message.error(res.data.info); // 登录失败，显示提示语
        }
      }, (err) => {
        this.$message.error('网络有点抽风')
      });
    }
  }
};
</script>
<style>
  .el-input {
    margin: 20px auto;
  }
    
  .comment-list {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
  }
    
  .comment-list .item {
    font-size: 20px;
  }
      
  .comment-list .item.liked {
    text-decoration: line-through;
    color: #ddd;
  }

  .pull-right {
    float: right;
  }
</style>