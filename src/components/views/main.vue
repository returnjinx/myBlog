<template>
    <div id="main">
        <!--<mt-button  icon="back" size="small"  type="primary" @click="logout">退出登录</mt-button>-->
        <mt-header :title="'欢迎，'+username">
            <div slot="right">
                <mt-button @click.native="logout">退出登录</mt-button>
            </div>
            <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
    </div>
</template>
<style lang="less">
    #main{
        width: 100%;
        height: 100vh;
        background: #fff;
    }
</style>
<script>
    import {Toast,Header} from 'mint-ui';
    export default{
        //数据处理
        name: 'backlogin',
        data() {
            return {
                username: "",
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
                        sessionStorage.removeItem('username');
                        this.$router.replace('/login');
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
            this.axios.get('/checkLogin').then( (res) =>{
                console.log(res)
                if(res.data.status==1){
                    // sessionStorage.setItem('username',res.data.username);
                    this.$router.replace('/main');
                    this.username=res.data.username
                }else{
                    this.$router.replace('/login');
                    sessionStorage.removeItem('username');
                }
            }).catch(function (err) {

            })
            // let timeout = setTimeout(()=>{
            //     this.username=sessionStorage.getItem('username');
            //
            // },0)

        }
    }
</script>
