<template>
    <div id="register">
        <input type="text" v-model="username">
        <input type="password" v-model="password">
        <input type="text" v-model="nickname">
        <button @click="register">注册</button>

        <button @click="$router.push('/login')">去登陆</button>
    </div>
</template>
<style lang="less">
    #register{

    }
</style>
<script>
    export default{
        //数据处理
        data(){
            return {
                nickname:'叫我世民',
                username:'lsm',
                password:'123456'
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            register() {
                this.loginText = "登陆中";
                this.axios.post('/register', {
                    username: this.username,
                    password: this.password,
                    nickname:this.nickname

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
