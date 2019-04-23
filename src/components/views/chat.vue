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
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            send(){

                if(this.message!=''){
                    this.ws.emit('new message',this.message)
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


            this.ws = io.connect("ws://localhost:3001");
            //接收数据 1创建dom

            this.ws.on("msg",function(data){
                console.log(data);
            });
//            this.ws.on("connected",function(data){
//                console.log(data);
//            });
            this.ws.on("connecting",function(data){
                console.log('连接中...');
            });
            this.ws.on("connect",(data)=>{
                console.log('连接成功');

                this.ws.emit('msg', {data:"fine,thank you"});

            });
            this.ws.on("connect_failed",function(data){
                console.log('连接失败');
            });
        }
    }
</script>
