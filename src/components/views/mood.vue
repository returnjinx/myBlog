<template>
    <div id="mood">
        <mt-header title="发表心情">
            <div slot="left">
                <mt-button @click.native="$router.replace('/main')">取消</mt-button>
            </div>
            <div slot="right">
                <mt-button @click.native="commit()">发表</mt-button>
            </div>
        </mt-header>
        <div class="iptBox">
            <textarea id="content" placeholder="此刻的心情..." v-model="msg" maxlength="400"></textarea>
        </div>
    </div>
</template>
<style lang="less">
    #mood{
        width:100vw;
        height:100vh;
        background: #fff;
        .mint-header{
            height: 1rem;
            line-height:1rem;
        }
        .iptBox{
            width: 100%;
            height: 50%;
            #content{
                width: 100%;
                height: 80%;
                background: #fff;
                border: none;
                resize: none;
                padding: .24rem;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
            }
        }
    }
</style>
<script>
    import { Toast} from 'mint-ui';
    export default{
        //数据处理
        data(){
            return {
                msg:'',
                city:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            commit(){
                if(this.msg!=''){
                    this.axios.post('/commitmood',{
                        'msg':this.msg,
                        'city':this.city,
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.status=='ok'){

                        }else{
                            Toast({
                                message: res.data.message,
                            })
                        }

                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    Toast({
                        message: '真的啥也不想说吗^_^！',
                    })
                }


            }
        },
        //生命周期
        created(){
            this.axios.get('/getMoodList?page=1&pagesize=10').then((res)=>{
                console.log(res)
                if(res.data.status=='ok'){

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
