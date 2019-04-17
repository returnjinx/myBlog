<template>
    <div class="friend-box">
        <div class="user-bg"><img src="" class="userlogo" alt=""></div>
        <ul>
            <li v-for="item in list">
                <div class="left-part pull-left">
                    <img :src=item.imgUrl alt="" class=" friend-logo">
                </div>
                <div class="pull-right right-part">
                    <p class="user-name">{{item.userName}}</p>
                    <p class="mood-content">{{item.userMood}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "friend",
        //模拟列表数据
        data(){
            return {
                userImg:'',
                list:[
                    {imgUrl:'1.peng',userName:'习大大1号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'2.peng',userName:'习大大2号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'3.peng',userName:'习大大3号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'4.peng',userName:'习大大4号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'5.peng',userName:'习大大5号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'6.peng',userName:'习大大6号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'7.peng',userName:'习大大7号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'},
                    {imgUrl:'8.peng',userName:'习大大8号',userMood:'怎么会爱上了他，怎么会跟他回家家家家'}
                ],
                key:0,
            }
        },
    }
</script>

<style scoped lang="less">
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
</style>