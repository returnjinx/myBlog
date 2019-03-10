<template>
    <div id="main">
        <mt-button size="large"  type="primary" @click="logout">退出登录</mt-button>

    </div>
</template>
<style lang="less">
    #main{

    }
</style>
<script>
    import {Toast} from 'mint-ui';
    export default{
        //数据处理
        name: 'backlogin',
        data() {
            return {
                username: "xjxq",
                password: "12",
                disablebtn: false,
                loginText: "登录"
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            logout(){

                this.axios.get('/logout').then( (res) =>{
                    console.log(res)
                    if(res.data.status==1){
                        this.$router.replace('/login')
                    }

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
