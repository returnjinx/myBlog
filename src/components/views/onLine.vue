<template>
    <div id="onLine">
        <div v-if="$store.state.onlineArray.length>1">
            <div v-for="v,k,index in $store.state.onlineList" @click="enterRoom(v.user_id)" v-if="v.user_id!=$store.state.user_id" class="list">
                <span>{{v.user_name}}</span>
            </div>
        </div>
        <div class="text" v-if="$store.state.onlineArray.length==1">
            没有其他人在线，看来只有你这么无聊来看我了~<br/>先去打一会飞机吧
        </div>
        <div class="btn" @click="goPlay()">打飞机走起</div>

    </div>
</template>

<script>
    import { Toast} from 'mint-ui';
    export default {
        name: "on-line",
        data() {
            return {
                user_name:'',
                user_id:'',
                list:[],
            }
        },
        methods: {
            goPlay(){
                let audio = document.getElementById('audio');
                audio.pause();
                this.$router.push('/plane')
            },
            enterRoom(to_id){
                console.log(to_id)
                if(to_id==this.$store.state.user_id){
                    Toast({
                        message: '这么无聊吗？和自己聊天',
                    })
                }else{
                    this.$router.push('/chat/'+this.$store.state.user_id+'/'+to_id)
                }
            },
        },
        created(){
            console.log(this.$store.state.onlineList)
            // this.list = Object.keys(this.$store.state.onlineList)
            //    console.log(res)
            //     if (res.data.status == 1) {
            //         // sessionStorage.setItem('username',res.data.username);
            //         // this.$router.replace('/main');
            //         this.user_name = res.data.username;
            //         this.user_id = res.data.user_id;
            //     }
            // }).catch( (err) =>{
            //
            // })
        },
        computed: {Toast},
        mounted(){
            this.$nextTick(()=>{
                let audio = document.getElementById('audio');
                audio.play();
            })

            // this.$store.commit('setSocket');
//             this.ws = io.connect("ws://192.168.0.241:3001");
//             this.ws.on("connecting",function(data){
//                 // console.log('连接中...');
//             });
//             this.ws.on("connected",(data)=>{
//                 console.log('连接成功');
//
//                 let res = {};
//                 res.user_id = this.user_id;
//                 res.user_name = this.user_name;
//                 this.ws.emit('setList', res);
//
//             });
//             this.ws.on("sendList",(data)=>{
// //                console.log('接受List');
//                console.log(data);
//                this.onlineList = data;
//             });
//             this.ws.on("receive_message",(data)=>{
//                 console.log(data);
//             });
//             this.ws.on("leave",(data)=>{
//                 console.log(data);
//                 this.onlineList = data;
//             });
//
//
//
//
//             this.ws.on('disconnect', function() {
//                 console.log("与服务其断开");
//             });
//             this.ws.on("connect_failed",function(data){
//                 console.log('连接失败');
//             });


        }
    }
</script>

<style lang="less">
    #onLine{
        width: 100vw;
        /*height: 100vh;*/
        background: #fff;
        .list{
            width: 100vw;
            padding: .24rem;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
        }
        .text{
            font-size: .26rem;
            padding:  .8rem .3rem;
            text-align: center;
        }
        .btn{
            width: 2rem;
            height: 1rem;
            background: #26a2ff;
            display: block;
            margin: 1rem auto;
            color: #fff;
            font-size: .3rem;
            font-weight: bold;
            text-align: center;
            line-height: 1rem;
        }
    }
</style>