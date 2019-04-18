<template>
    <div id="friend">
        <div class="friend-box">
            <div class="user-bg"><img src="" class="userlogo" alt=""></div>
            <ul>
                <li v-for="item in list">
                    <div class="left-part pull-left">
                        <img :src='imgUrl+item.imgUrl' alt="" class=" friend-logo">
                    </div>
                    <div class="pull-right right-part">
                        <p class="user-name">{{item.username}}</p>
                        <p class="mood-content">{{item.msg}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: "friend",
        //模拟列表数据
        data(){
            return {
                list:[],
            }

        },
        //引用的组件
        components: {},
        //方法
        methods: {},
        //生命周期
        created(){
            this.axios.get('/getMoodList?page=1&pagesize=10').then((res)=>{
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

<style lang="less">
    #friend{
        .pull-left{
            float: left;
        }
        .pull-right{
            float: left;
        }
        .user-bg{
            position:relative;
            height:2rem;
            width: 100%;
            background-color: pink;
            .userlogo{
                position: absolute;
                bottom:-.2rem;
                right: .3rem;
                width: 1.2rem;
                height: 1.2rem;
                background-color: blue;
                border-radius: 4px;
            }
        }
        ul{

            background-color: #fff;
            li{
                overflow: hidden;
                padding:6% 2%;
                border-bottom:1px solid #ccc;
                .left-part{
                    width: 15%;
                    .friend-logo{
                        width: .8rem;
                        height: .8rem;
                        background-color:gold;
                    }
                }
                .right-part{
                    padding-left:.25rem;
                    width: 85%;
                    .user-name{
                        font-size: 14px;
                        color:blue;
                    }
                    .mood-content{
                        font-size: 12px;
                        color:#000;
                    }
                }
            }
        }
    }

</style>