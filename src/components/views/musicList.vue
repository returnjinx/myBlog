<template>
    <div id="musicList">
        <div @click.self="close()" class="layer">
            <div class="List">
                <div @click="changeMusic(index)" v-for="i,index in list" class="tag" :class="num==index ? 'active':''">
                    <span class="name">{{i.name}}</span> <div class="iconBox"><i @click.stop="chooseMusic(i,index)" class="icon" :class="$store.state.playIndex==index ?'pause':'play'"></i></div>
                </div>
                <!--<div class="tag">-->
                    <!--<span class="name">你就不要想起我</span> <i class="icon play"></i>-->
                <!--</div>-->
                <!--<div class="tag">-->
                    <!--<span class="name">你就不要想起我</span> <i class="icon play"></i>-->
                <!--</div>-->


            </div>
        </div>
    </div>
</template>
<style lang="less">
    #musicList{
        width: 100%;
        height: 100vh;


        .layer{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            position: relative;
            .List{
                width: 50%;
                height: 100%;
                background: #fff;
                position: absolute;
                right: 0;
                top:0;
                padding-top:1rem;
                box-sizing: border-box;
                overflow-y: scroll;
                .tag{
                    width: 100%;
                    height: .8rem;
                    padding: 0 .24rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid #eee;
                    position: relative;
                    &.active{
                        background: #f2f2f2;
                    }
                    .name{
                        /*float: left;*/
                        display: inline-block;
                        width: 80%;
                        height: 100%;
                        line-height: .8rem;
                        font-size: .26rem;
                        font-weight: bold;
                        color: #ff4c5e;
                        overflow: hidden;
                    }
                    .iconBox{
                        width:20%;
                        height: .8rem;
                        position: absolute;
                        right: 0;
                        top:0;
                        .icon{
                            width: .4rem;
                            height: .4rem;
                            position: absolute;
                            top:50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            &.play{
                                background: url("../../img/play.png")no-repeat;
                                background-size: 100%;
                            }
                            &.pause{
                                background: url("../../img/pause.png")no-repeat;
                                background-size: 100%;
                            }
                        }
                    }

                }
            }
        }
    }
</style>
<script>
    export default{
        //数据处理
        data(){
            return {
                list:[],
                num:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            changeMusic(index){
//                console.log(2);
//                this.$store.state.playIndex=index;
                this.num = index;
//                this.$store.commit('change', index);
            },
            close(){
                this.$emit('close')
            },
            chooseMusic(data,index){
                this.num = index;
                this.$store.commit('chooseMusic', index,data.url);

            }
        },
        //生命周期
        created(){

        },
        computed: {},
        mounted(){
            this.list = this.$store.state.musicList;

        }
    }
</script>
