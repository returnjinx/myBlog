<template>
    <div id="moodList">
        <div class="list" v-for="i,index in list">
            <span class="name">{{i.username}}</span>
            <span class="content">{{i.msg}}</span>
            <span class="time">{{i.time}}</span>
            <span class="city">{{i.city}}</span>
        </div>

    </div>
</template>
<style lang="less">
    #moodList{
        .list{
            width: 100%;
            height: 1.3rem;
            border-bottom: 1px  solid #eee;
        }
    }
</style>
<script>
    export default{
        //数据处理
        data(){
            return {
                list:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {},
        //生命周期
        created(){
            this.axios.get('/getMoodList?page=1&pagesize=1').then((res)=>{
                console.log(res)
                if(res.data.status=='ok'){
                    this.list = res.data.data;
                }else{
                    Toast({
                        message: res.data.message,
                    })
                }

            }).catch((err)=>{
                console.log(err)
            })
        },
        computed: {},
        mounted(){


        }
    }
</script>
