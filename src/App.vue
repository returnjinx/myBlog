<template>
    <div id="app">
         <router-view class="app_view"></router-view>
        <audio id="audio" v-if="$store.state.play_url!=''" :src="$store.state.play_url" autoplay preload="auto"></audio>
    </div>
</template>
<style lang="less">
 #app{
    max-width: 500px;
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

        },
        methods: {
        },

    }

</script>

