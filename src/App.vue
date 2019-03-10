<template>
    <div id="app">
         <router-view class="app_view"></router-view>
    </div>
</template>
<style lang="less">
 #app{
    max-width: 500px;
     margin: 0 auto;
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
            this.axios.get('/checkLogin').then( (res) =>{
                console.log(res)
                if(res.data.status==1){
                    this.$router.replace('/main');
                    sessionStorage.setItem('username',res.data.username)
                }else{
                    this.$router.replace('/login');
                }
            }).catch(function (err) {

            })
        },
        mounted(){
        },
        methods: {
        },

    }

</script>

