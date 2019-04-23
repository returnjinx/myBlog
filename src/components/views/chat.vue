<template>
    <div id="chat">

    </div>
</template>
<style lang="less">
    #chat{

    }
</style>
<script>
    export default{
        //数据处理
        data(){
            return {}
        },
        //引用的组件
        components: {},
        //方法
        methods: {},
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


            var ws = io.connect("ws://localhost:3001");
            //接收数据 1创建dom

            ws.on("msg",function(data){
                console.log(data);
            });
//            ws.on("connected",function(data){
//                console.log(data);
//            });
            ws.on("connecting",function(data){
                console.log('连接中...');
            });
            ws.on("connect",function(data){
                console.log('连接成功');

                ws.emit('msg', {data:"fine,thank you"});

            });
            ws.on("connect_failed",function(data){
                console.log('连接失败');
            });
        }
    }
</script>
