<template>
    <div id="register">

        <div class="box">


            <mt-field v-model="username" placeholder="请输入用户名"></mt-field>
            <mt-field v-model="password" placeholder="请输入密码" type="password"></mt-field>
            <mt-field v-model="nickname" placeholder="请输入昵称" type="text"></mt-field>
        </div>
        <div style="width: 80%;padding: 0 10%;box-sizing: border-box;margin: 0 auto;">
            <mt-button size="large"  type="primary" @click="register">注册</mt-button>
            <mt-button size="large"  type="default" @click="$router.replace('/login')">已有账号，返回登录</mt-button>
        </div>
    </div>
</template>
<style lang="less">
    #register{
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
    import { Field,Toast } from 'mint-ui';
    export default{
        //数据处理
        data(){
            return {
                nickname:'',
                username:'',
                password:''
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            register(){
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
                if(this.nickname==""){
                    Toast({
                        message: '输入昵称',
                    });
                    return false;
                }

                this.axios.post('/register',{
                    'nickname':this.nickname,
                    'username':this.username,
                    'password':this.password
                }).then((res)=>{
                    console.log(res);
                    if(res.data.status==1){
                        Toast('注册成功');
                        this.$router.replace('/login');
                    }else if(res.data.status==0){
                        Toast(res.data.Msg);
                    }

                }).catch((err)=>{
                    console.log(err)
                })
        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){


        }
    }
    }
</script>
