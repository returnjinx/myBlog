<template>
    <div id="app">
         <router-view class="app_view"></router-view>
    </div>
</template>
<style lang="less">
 #app{

    input{
        line-height: normal !important;
    }

 }
 .loadingT{
     position: fixed;
     top: 50%;
     left: 50%;
     transform: translate3d(-50%, -50%, 0);
     width: 2rem;
     height: 2rem;
     background-size: 100%;
     z-index: 99999;
 }


</style>
<script>
    export default {
        data () {
            return {

            }
        },
        mounted(){
        },
        methods: {
        },

    }

</script>

