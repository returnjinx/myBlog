<template>
    <div id="login">
        <div class="box">


            <mt-field v-model="username" placeholder="请输入用户名"></mt-field>
            <mt-field v-model="password" placeholder="请输入密啊码" type="password"></mt-field>
        </div>
        <div style="width: 80%;padding: 0 10%;box-sizing: border-box;margin: 0 auto;">
            <mt-button size="large"  type="primary" @click="login">登录</mt-button>
            <mt-button size="large"  type="default" @click="$router.replace('/register')">去注册</mt-button>
        </div>



    </div>
</template>
<style lang="less">
    #login{
        .box{
              /*width: 50%;*/
              height: auto;
              margin: 2rem auto .3rem;
              .mint-cell-value{
                  >input{
                      text-align: center;
                  }
              }
          }
        .mint-button{
            margin :0 auto .2rem;

        }
        width: 100%;
        height: 100vh;
        background: #fff;
    }
</style>
<script>
    import { Field ,Toast} from 'mint-ui';
    export default{
        //数据处理
        data(){
            return {
                openSimple: false,
                username:'',
                password:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            login() {
                if(this.username==""){
                    Toast({
                        message: '输入用户名',
                    });
                    return false;
                }
                if(this.password==""){
                    Toast({
                        message: '输入密码',
                    });
                    return false;
                }
               this.axios.post('/login', {
                   username: this.username,
                   password: this.password
               }).then( (res) =>{
                   console.log(res)
                   Toast({
                       message: res.data.Msg,
                   });
                   if(res.data.status==1){
                       this.$router.replace('/main');
                   }
               }).catch(function (err) {

               })
            },

        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){


        }
    }
</script>
