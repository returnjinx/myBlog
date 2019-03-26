<template>
    <div id="foot">
        <div @click="chooseItem(index)" class="item" v-for="i,index in list" :class="key==index ? 'active':''">{{i}}</div>
    </div>
</template>
<style lang="less">
    #foot{
        width:100%;
        height: .8rem;
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        .item{
            flex-grow: 4;
            text-align: center;
            background: #fff;
            line-height:.8rem;
            border-right: 1px solid #eee;
            &:last-of-type{
                border-right: none;
            }
            &.active{
                background: blue;
                color: #fff;
            }
        }
    }
</style>
<script>
    document.title='title';
    export default{
        //数据处理
        data(){
            return {
                list:[
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                ],
                key:0,
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            chooseItem(index){
                this.key = index;
//                var num = this.list[index];
//                this.list.splice(index, 1);
                if(this.audio){
                    console.log(this.audio)
                }
            }
        },
        //生命周期
        created(){

                fetch('http://api.map.baidu.com/api?v=2.0&ak=ZPP6po24XVmVacKHnwvyXjscqpFAm9Hq').then(response => {
                    response.json().then((data) => {
                        console.log(data)

                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch(error => console.log("刚开始就出错了,,,,", error)

                )
        },
        computed: {},
        mounted(){


        }
    }
</script>
