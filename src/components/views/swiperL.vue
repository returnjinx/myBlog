<template>
    <div id="swiperL">
        <swiper id="banner_box" :options="swiperOption" >
            <swiper-slide v-for="i,index in bannerList">
                <img :src="i.imageUrl" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!--<mt-swipe :prevent="true" :auto="0" :show-indicators="false">-->
            <!--<mt-swipe-item v-for="i,index in bannerList">-->
                <!--<img :src="i.imageUrl" alt="">-->
            <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
    </div>
</template>

<script>
    import {swiper, swiperSlide, swiperPlugins} from 'vue-awesome-swiper';
    export default {
        data() {
            return {
                bannerList:[],
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop:true,
                    autoplay: 3000,

                },
            }
        },
        //引用的组件
        components: {swiper, swiperSlide, swiperPlugins},
        //方法
        methods: {

        },
        //生命周期
        created(){
            const url = 'http://hellojinx.cn:4000/banner';
            fetch(url).then(response => {
                response.json().then((data) => {
                    console.log(data)
                    this.bannerList = data.banners;
                }).catch((error) => {
                    console.log(error)
                })
            }).catch(error => console.log("刚开始就出错了,,,,", error)

            )


        },
        computed: {},
        mounted(){

            // let audio = document.getElementById('audio');
            // document.addEventListener("WeixinJSBridgeReady", ()=> {
            //     audio.play();
            // }, false);



        }
    }
</script>

<style lang="less">
    #swiperL{
        width: 100%;
        height: auto;
        margin-top: 1rem;
        .swiper-container{
            width: 100%;
            height: auto;
            .swiper-slide{
                position: relative;
                >img{
                    height:auto;
                    width: 100%;

                }
            }

        }
    }
</style>