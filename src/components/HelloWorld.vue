<template>
  <div id="helloWorld">
    <div class="desktop">
      <!-- <img alt="Vue logo" width="100%" src="../assets/img_background.png"> -->
    </div>
    <!-- 测评页面 -->
    <transition name="fade">
      <div class="visitEvaluation" v-if="visitEvaluation == 1">
        <div class="close" @click="close()">
          <img src="../assets/icon_closew.png" alt="icon_closew.png" />
        </div>
        <div class="questionOne">{{question.title1}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in question.answer"
            :key="index"
            :class="{active:active==item.title}"
            @click="active=item.title"
          >{{item.title}}</div>
        </div>
        <div class="questionOne">{{question.title2}}</div>
          <div class="questionOneBut">
            <div
            v-for="(item,index) in question.answer"
            :key="index"
            :class="{active:activeTwo==item.title}"
            @click="activeTwo=item.title"
          >{{item.title}}</div>
          </div>
        <div class="submit" @click="stop(question,active,activeTwo)">
          <img src="../assets/bnt_tijiao.png" alt="bnt_tijiao.png" />
        </div>
      </div>
    </transition>
    <!-- 试穿页面 -->
    <transition name="fade">
      <div class="visitEvaluation" v-if="visitEvaluation == 2">
        <div class="close" @click="close()">
          <img src="../assets/icon_closew.png" alt="icon_closew.png" />
        </div>
        <div class="questionOne">{{questionThree.title1}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in questionThree.answer"
            :key="index"
            :class="{active:active==item.title}"
            @click="active=item.title"
          >{{item.title}}</div>
        </div>
        <div class="questionOne">{{questionThree.title2}}</div>
        <div class="questionOneBut">
          <div
            v-for="(item,index) in questionThree.answerTwo"
            :key="index"
            :class="{active:activeThree==item.title}"
            @click="activeThree=item.title"
          >{{item.title}}</div>
        </div>
       <div class="submit" @click="stop(questionThree,active,activeThree)">
          <img src="../assets/bnt_tijiao.png" alt="bnt_tijiao.png" />
        </div>
      </div>
    </transition>
    <!-- 测评人员评价 -->
    <transition name="fade">
      <div class="visitEvaluation" v-if="visitEvaluation == 3">
        <div class="close" @click="close()">
          <img src="../assets/icon_closew.png" alt="icon_closew.png" />
        </div>
        <div class="title">{{questionTwo.title1}}</div>
        <div class="evaluatorPeople">
          <el-image :src="evaluator.imgUrl" id="img">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="center margin-t-20 margin-b-20 font-20 color-fff">{{evaluator.title}}</div>
        <div class="ceping">
          <div
            v-for="(item,index) in questionTwo.answer"
            :key="index"
            :class="{active:activeTwo==item.title}"
            @click="activeTwo=item.title"
          >{{item.title}}</div>
        </div>
        <div v-if="is_sc" class="submit" @click="stop(questionTwo.title1,activeTwo)">
          <img src="../assets/bnt_tijiao.png" alt="bnt_tijiao.png" />
        </div>
        <div v-else class="submit" @click="next(questionTwo.title1,activeTwo)">
          <h1 class="next">下一步</h1>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  // props: {
  //   msg: String
  // }
  data() {
    return {
      active: null,
      activeTwo: null,
      activeThree: null,
      visitEvaluation: null,
      // tryOn: false,
      // evaluationStaff: false,
      obj: null,
      time: null,
      question: {
        title1: "1.您现在对孩子的病情有清晰的认知吗？",
        title2: "2.您现在对病情恢复周期有清晰的认知吗？",
        answer: [
          { title: "有清晰认知" },
          { title: "没有清晰认知" },
          { title: "完全不知道" }
        ],
      },
      questionThree: {
        title1: "1.您是否学会了穿戴产品？",
        title2: "2.您是否清楚穿戴注意事项？",
        answer: [
          { title: "学会了" },
          { title: "没学会" }
        ],
        answerTwo: [
          { title: "清楚" },
          { title: "差不多" },
          { title: "不清楚" }
        ],
        
      },
      questionTwo: {
        title1: "为了提高我们的服务质量，请您为本次服务人员进行评价",
        answer: [
          { title: "十分满意" },
          { title: "满意" },
          { title: "一般" },
          { title: "不满意" },
          { title: "十分不满意" }
        ],
      },
      evaluator:{
        title:null,
        imgUrl:null,
      },
      typeName:null,
      is_sc:true,
      // baseUrl:'http://117.34.105.87:8087' //正式版本
      baseUrl:'http://192.168.3.108:8080'    //加盟版本
    };
  },
  mounted() {
    this.time = setInterval(this.obtain, 2000);
    // this.time=setTimeout(this.obtain, 3000);
    // this.obtain()
  },
  methods: {
    obtain() {
      // console.log(1);
      // this.visitEvaluation = 1;
       this.$axios.get(this.baseUrl+"/member/assign/getPjType").then(res=>{
         if (res.data.returnCode != 0) {
          this.$message({
            type: "warning",
            message: res.data.returnMsg,
            center: true
          });
        } else {
          if(!!res.data.data.type){
            this.visitEvaluation=res.data.data.type
            this.typeName=res.data.data.name
            if(res.data.data.name === "试穿"){
                this.is_sc=false
            }
            clearInterval(this.time);
          }
          if(!!res.data.data.name || !!res.data.data.photo){
              this.evaluator.title=res.data.data.name
              this.evaluator.imgUrl=res.data.data.photo
          }
        }
       }).catch(err=>{
         console.log(err)
       })
    },
    next(){
      this.active=null;
      this.visitEvaluation = 2;
      // this.tryOn = false;
      // this.evaluationStaff = false;
    },
    stop(question,active,activeTwo) {
      //暂停
      // clearInterval(this.time);
      let params = {
        info: "对孩子的病情有" + active + ",对病情恢复周期" + activeTwo,
        question1:this.activeTwo,
        answer1:active,
        question2:question.title2,
        answer2:activeTwo
      };
      console.log(params)
      this.$axios
        .get(this.baseUrl+"/member/assign/setPjInfo", {params})
        .then(res => {
          if (res.data.returnCode != 0) {
            this.$message({
              type: "warning",
              message: res.data.returnMsg,
              center: true
            });
          } else {
            this.close()
            this.$message({
              type: "success",
              message:"评价完成！",
              center: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.visitEvaluation = null;
    },
    close() {
      this.time = setInterval(this.obtain, 2000)
      this.active=null;
      this.activeTwo=null;
      this.activeThree=null,
      this.visitEvaluation = null;
      this.typeName=null;
      this.is_sc=true;
      // this.tryOn = false;
      // this.evaluationStaff = false;
    }
  }
};
</script>
<style scoped lang='scss'>
#helloWorld {
  height: 100%;
  position: relative;
}
.desktop {
  width: 100%;
  height: 100%;
  background: url(../assets/img_background.png) center no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.visitEvaluation {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2;
  .close {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .questionOne {
    color: #ffffff;
    font-size: 50px;
    margin-left: 10%;
    margin-top: 8%;
  }
  .questionOneBut {
    color: #ffffff;
    font-size: 50px;
    margin-left: 10%;
    margin-top: 40px;
    div {
      display: inline-block;
      width: 300px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-left: 40px;
      padding: 30px;
      border: 4px solid #84bc4b;
      border-radius: 20px;
    }
    div:hover {
      background: #84bc4b;
      cursor: pointer;
      transition: all 0.5s;
    }
    .active {
      background: #84bc4b;
    }
  }
  .evaluatorPeople {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 20%;
    margin: 20px auto;
    height: 300px;
    .el-image{
      height: 100%;
      width: auto;
    }
  //   .evaluatorPeople #img {
  //   // height: 100%;
  // }
  }
  .title {
    text-align: center;
    color: #ffffff;
    font-size: 48px;
    margin-top: 3%;
  }
  .ceping {
    color: #ffffff;
    font-size: 0px;
    text-align: center;
    div {
      display: inline-block;
      width: 12%;
      height: 50px;
      font-size: 45px;
      line-height: 50px;
      text-align: center;
      margin-left: 2%;
      padding: 30px;
      border: 4px solid #84bc4b;
      border-radius: 20px;
    }
    div:hover {
      background: #84bc4b;
      cursor: pointer;
      transition: all 0.5s;
    }
    .active {
      background: #84bc4b;
    }
  }
  .submit {
    display: inline-block;
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
  }
}
//离开动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.next{
  font-size: 35px;
    color: #fff;
    padding: 20px;
    background: #ffa800;
    border-radius: 50px;
    border: 10px solid #d38d01;
}
  
</style>
<style>
#img {
    width: auto;
  }
</style>
