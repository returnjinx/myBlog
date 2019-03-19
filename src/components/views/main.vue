<template>
    <div id="main">
        <!--<mt-button  icon="back" size="small"  type="primary" @click="logout">退出登录</mt-button>-->
        <mt-header :title="'欢迎，'+username">
            <div slot="right">
                <mt-button @click.native="logout">退出登录</mt-button>
            </div>
        </mt-header>
        <div class="music" v-if="!musicEffect" @click="musicShow=true;musicEffect=true;"></div>
        <musicList @close="close()" v-if="musicShow" class="animated" :class="musicEffect ?'bounceInRight':'bounceOutRight'"></musicList>
    </div>
</template>
<style lang="less">
    #main{
        width: 100%;
        height: 100vh;
        background: #fff;
        position: relative;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .mint-header{
            position: fixed;
            top:0;
            left: 0;
            width: 100%;
            z-index: 999;
            height: 1rem;
            font-size: .3rem;
        }
        .music{
            width: .5rem;
            height: .5rem;
            background: url("../../img/musicIcon.png")no-repeat;
            background-size: 100%;
            position: fixed;
            top:1.2rem;
            right:.24rem;
        }
    }
</style>
<script>
    import {Toast,Header} from 'mint-ui';
    import musicList from'./musicList.vue';

    export default{
        //数据处理
        name: 'backlogin',
        data() {
            return {
                username: "",
                musicEffect:false,
                musicShow:false,
                num:'',
            }
        },
        //引用的组件
        components: {musicList},
        //方法
        methods: {
            close(){
                this.musicEffect=false;
                let s =setTimeout(()=>{
                    this.musicShow = false;
                    clearTimeout(s)
                },1000)
            },
            logout(){
                this.axios.get('/logout').then( (res) =>{
                    console.log(res)
                    if(res.data.status==1){
                        sessionStorage.removeItem('username');
                        this.$router.replace('/login');
                    }

                }).catch(function (err) {

                })
            },
            listen(){
                // audio.removeEventListener("ended",this.listen,false);
                let audio = document.getElementById('audio');
                audio.addEventListener('ended',  ()=> {
                    this.num = this.$store.state.playIndex;
                    if(this.num>=this.$store.state.musicList.length-1){
                        this.num=0;
                    }else{
                        this.num++;
                    }
                    this.$store.commit('chooseMusic', this.num);
                    audio.play();
                }, false);
            },

        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){
            this.axios.get('/checkLogin').then( (res) =>{
//                console.log(res)
                if(res.data.status==1){
                    // sessionStorage.setItem('username',res.data.username);
                    this.$router.replace('/main');
                    this.username=res.data.username;
                    this.axios.post('/getMusic').then( (res) =>{
                        console.log(res)
                        if(res.data.status==1){
                            
                            setTimeout(()=>{
                                this.$store.state.musicList = res.data.data;
                                this.$store.commit('setMusicList', res.data.data[0].url);
                                this.num = this.$store.state.playIndex;
                                let audio = document.getElementById('audio');
                                console.log(audio)
                                audio.play();
                                document.addEventListener("WeixinJSBridgeReady", ()=> {
                                    audio.play();
                                }, false);
                                this.listen()
                            },0)



                        }
                    }).catch(function (err) {

                    })
                }else{
                    this.$router.replace('/login');
                    sessionStorage.removeItem('username');
                }
            }).catch(function (err) {

            })


        }
    }
</script>
