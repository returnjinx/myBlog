<template>
    <div id="chat">
        <!--<mt-header title="发表心情"></mt-header>-->

        <mt-header title="敬请期待">
            <div slot="left">
                <mt-button @click.native="$router.replace('/main')">返回</mt-button>
            </div>

        </mt-header>

        <input class="input" v-model="message" type="text" maxlength="14" />
        <button id="bbb" @click="send()">点击发送消息</button>
    </div>
</template>
<style lang="less">
    #chat{

    }
</style>
<script>
    import { Toast} from 'mint-ui';
    export default{
        //数据处理
        data(){
            return {
                user_name:'',
                user_id:'',
                message:'',
                from_id:'',
                to_id:'',
                send_token:'',
                receive_token:'',
                ws:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            send(){

                if(this.message!=''){
                    let res = {};
                    res.from_id = this.from_id;
                    res.to_id = this.to_id;
                    res.message = this.message;
                    // res.socket_id = this.$store.state.ws.id


                    Object.keys(this.$store.state.onlineList).forEach((key)=>{
                        if(this.$store.state.onlineList[key].user_id ==this.to_id ){
                            res.socket_id = this.$store.state.onlineList[key].socket_id
                        }

                    });
                    this.$store.state.ws.emit('new_message',res)
                }else{
                    Toast({
                        message: '请输入信息',
                    })
                }
            }
        },
        //生命周期
        created(){
            this.from_id = this.$route.params.from_id;
            this.to_id = this.$route.params.to_id;
            this.axios.get('/checkLogin').then( (res) =>{
//                console.log(res)
                if(res.data.status==1){
                    this.is_online=1
                    // sessionStorage.setItem('username',res.data.username);
                    // this.$router.replace('/main');
                    this.username=res.data.username;
                    let Vuex_userInfo = {};
                    Vuex_userInfo.username = res.data.username;
                    Vuex_userInfo.user_id = res.data.user_id;
                    this.$store.commit('setUserInfo',Vuex_userInfo);


                    if(!this.$store.state.onlineList){
                        this.$store.commit('setSocket');
                    }

                }else{
                    this.$router.replace('/login');
                    sessionStorage.removeItem('username');
                }
            }).catch(function (err) {

            })
        },
        computed: {},
        mounted(){
            // Array.prototype.notempty = function() {
            //     var arr = [];
            //     this.map(function(val, index) {
            //         //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
            //         if (val !== "" && val != undefined) {
            //             arr.push(val);
            //         }
            //     });
            //     return arr;
            // }
            // this.from_id = this.$route.params.from_id;
            // this.to_id = this.$route.params.to_id;
            // this.ws = io.connect("ws://localhost:3001");
            // this.ws.on("connecting",function(data){
            //     console.log('连接中...');
            // });
            // this.ws.on("connected",(data)=>{
            //     console.log('连接成功');
            //     console.log(data);
            //     // let res = {};
            //     // res.from_id = this.from_id;
            //     // res.to_id = this.to_id;
            //     // this.ws.emit('setList', res);
            //     let res = {};
            //     res.user_id = this.user_id;
            //     res.user_name = this.user_name;
            //     this.ws.emit('setList', res);
            //
            // });
            // this.ws.on("sendList",(data)=>{
            //    console.log('接受List');
            //    console.log(data.notempty());
            // });
            // this.ws.on("receive_message",(data)=>{
            //     console.log(data);
            // });
            // this.ws.on("leave",(data)=>{
            //     console.log(data);
            // });
            //
            //
            //
            //
            // this.ws.on('disconnect', function() {
            //     console.log("与服务其断开");
            // });
            // this.ws.on("connect_failed",function(data){
            //     console.log('连接失败');
            // });


        }
    }
</script>
