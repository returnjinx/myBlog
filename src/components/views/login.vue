<template>
    <div id="login">
        <input type="text" v-model="username">
        <input type="password" v-model="password">
        <button @click="login">登录</button>
        <button @click="$router.push('/register')">注册</button>
    </div>
</template>
<style lang="less">
    #login{

    }
</style>
<script>
    export default{
        //数据处理
        data(){
            return {
                username:'lsm',
                password:'123456'
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            login() {
                this.loginText = "登陆中";
                this.axios.post('/login', {
                    username: this.username,
                    password: this.password
                }).then( (res) =>{
                    console.log(res)
                    Toast({
                        message: res.data,
                    });

                }).catch(function (err) {

                })
            }
        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){


        }
    }
</script>
