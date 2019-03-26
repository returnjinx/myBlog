<template>
    <div id="app">
         <router-view class="app_view"></router-view>
        <audio id="audio" :src="$store.state.play_url"  autoplay preload="auto"></audio>
    </div>
</template>
<style lang="less">
 #app{
     margin: 0 auto;
     position: relative;
    input{
        line-height: normal !important;
    }


 }



</style>
<script>
    export default {
        data () {
            return {
            }
        },
        created(){

        },
        mounted(){
            let audio = document.getElementById('audio');
            document.addEventListener("WeixinJSBridgeReady", ()=> {
                audio.play();
            }, false);
            document.addEventListener('touchstart',(res)=>{
                if(this.$store.state.play_url!=''){
                    audio.play();
                    this.$store.state.play_url = res.data.data.list;
                    if(this.playStatus){
                        let audio = document.getElementById('audio');
                        if(audio.src == res.data.data.list[index].url){
                            audio.pause();
                        }
                    }
                }
            })
        },
        methods: {
        },

    }

</script>

