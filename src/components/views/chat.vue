<template>
    <div id="chat">
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
                message:'',
                from_id:'',
                to_id:'',
                send_token:'',
                receive_token:'',
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
                    this.ws.emit('new_message',res)
                }else{
                    Toast({
                        message: '请输入信息',
                    })
                }
            }
        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){

//            var ws = new WebSocket('ws://localhost:3001');
//            console.log(ws)
//            ws.onopen = function (e) {
//                console.log("1");
//                ws.send("1");
//            }

            this.from_id = this.$route.params.from_id;
            this.to_id = this.$route.params.to_id;
            this.ws = io.connect("ws://localhost:3001");
            //接收数据 1创建dom

//            this.ws.on("msg",function(data){
//                console.log(data);
//            });
//            this.ws.on("connected",function(data){
//                console.log(data);
//            });
            this.ws.on("connecting",function(data){
                console.log('连接中...');
            });
            this.ws.on("connected",(data)=>{
                console.log('连接成功');
                console.log(data);
                let res = {};
                res.from_id = this.from_id;
                res.to_id = this.to_id;
                this.ws.emit('msg', res);

            });
            this.ws.on("receive_message",(data)=>{
                console.log('接受成功');
                console.log(data);


            });
            this.ws.on("connect_failed",function(data){
                console.log('连接失败');
            });
        }
    }
</script>
