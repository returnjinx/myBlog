<template>
    <div id="upload">
        <!--<input type="file" accept="image/*" multiple>-->
        <input ref="file" @change="change()" type="file" name="logo" accept="image/*">
        <button @click="upLoad()">上传</button>

        {{rate}}%
        <span>{{location.cname}}</span>
        <div v-if="loadPic" class="box">
            <img ref="pic" class="pic" :class="picStatus ?'h':'s'" :src="dataURl" alt="">
        </div>
    </div>
</template>
<style lang="less">
    #upload{
        .box{
            width: 2rem;
            height: 2rem;
            border: 1px solid #333;
            margin:.5rem auto 0;
            position: relative;
            overflow: hidden;
            .pic{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate(-50%,-50%);
                &.h{
                    width: auto;
                    height: 100%;
                }
                &.s{
                    width: 100%;
                    height: auto;
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
                formData:new FormData(),
                file:{},
                rate:0,
                dataURl:'',
                picStatus:true,
                loadPic:false,
                type:'',
                fileName:'',
                location:'',
            }
        },
        //引用的组件
        components: {},
        //方法
        methods: {
            convertBase64UrlToBlob(urlData){
                var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:this.type});
            },
            canvasDataURL(path, obj, callback){
                var img = new Image();
                img.src = path;
                var self = this;
                img.onload = function(){
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);
                    var quality = 0.2;  // 默认图片质量为0.2
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
//                    if(w>400){
//                        var bl = (400/w);
//                        w=400;
//                        h=h*bl;
//                    }
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;

                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);

                    // 图像质量
                    if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg',quality);


                    EXIF.getData(img,function () {
                            var orientation = EXIF.getTag(this,'Orientation');
                            // orientation = 6;//测试数据
                            console.log('orientation:'+orientation);
                        switch (orientation){
                            //正常状态
                            case 1:
                                console.log('旋转0°');

                                break;
                            //旋转90度
                            case 6:
                                console.log('旋转90°');
                                canvas.height = w;
                                canvas.width =h;
                                ctx.rotate(Math.PI/2);
                                ctx.translate(0,-h);

                                ctx.drawImage(img,0,0)
//                                base64 = canvas.toDataURL('image/jpeg',quality);
                                break;
                            //旋转180°
                            case 3:
                                console.log('旋转180°');
                                canvas.height = h;
                                canvas.width = w;
                                ctx.rotate(Math.PI);
                                ctx.translate(-w,-h);

//                                ctx.drawImage(img,0,0)
//                                var base64 = canvas.toDataURL('image/jpeg',quality);
                                break;
                            //旋转270°
                            case 8:
                                console.log('旋转270°');
                                canvas.height = w;
                                canvas.width = h;
                                ctx.rotate(-Math.PI/2);
                                ctx.translate(-h,0);

//                                ctx.drawImage(image,0,0)
//                                base64 = canvas.toDataURL('image/jpeg',quality);
                                break;
                            //undefined时不旋转
                            case undefined:
                                console.log('undefined  不旋转');
                                break;
                        }
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(0, 0, w, h);
                        ctx.drawImage(that, 0, 0, w, h);
                        base64 = canvas.toDataURL('image/jpeg',quality);
                    })
                    // 回调函数返回base64的值
                    callback(base64);
                }
            },
            photoCompress(file,w,objDiv){
                var ready=new FileReader();
                /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
                ready.readAsDataURL(file);
                this.type = file.type;
                ready.onload=(e)=>{
                    var re=e.target.result;
                    this.canvasDataURL(re,w,objDiv)
                }
            },

            rotateImage(image) {
                console.log('rotateImage');

                var width = image.width;
                var height = image.height;

                var canvas = document.createElement("canvas")
                var ctx = canvas.getContext('2d');

                var newImage = new Image();

                //旋转图片操作
                EXIF.getData(image,function () {
                        var orientation = EXIF.getTag(this,'Orientation');
                        // orientation = 6;//测试数据
                        console.log('orientation:'+orientation);
                        switch (orientation){
                            //正常状态
                            case 1:
                                console.log('旋转0°');
                                // canvas.height = height;
                                // canvas.width = width;
                                newImage = image;
                                break;
                            //旋转90度
                            case 6:
                                console.log('旋转90°');
                                canvas.height = width;
                                canvas.width = height;
                                ctx.rotate(Math.PI/2);
                                ctx.translate(0,-height);

                                ctx.drawImage(image,0,0)
                                imageDate = canvas.toDataURL('Image/jpeg',1)
                                newImage.src = imageDate;
                                break;
                            //旋转180°
                            case 3:
                                console.log('旋转180°');
                                canvas.height = height;
                                canvas.width = width;
                                ctx.rotate(Math.PI);
                                ctx.translate(-width,-height);

                                ctx.drawImage(image,0,0)
                                imageDate = canvas.toDataURL('Image/jpeg',1)
                                newImage.src = imageDate;
                                break;
                            //旋转270°
                            case 8:
                                console.log('旋转270°');
                                canvas.height = width;
                                canvas.width = height;
                                ctx.rotate(-Math.PI/2);
                                ctx.translate(-height,0);

                                ctx.drawImage(image,0,0)
                                imageDate = canvas.toDataURL('Image/jpeg',1)
                                newImage.src = imageDate;
                                break;
                            //undefined时不旋转
                            case undefined:
                                console.log('undefined  不旋转');
                                newImage = image;
                                break;
                        }
                    }
                );
                return newImage;
            },


            change(){
                this.file  = this.$refs.file.files[0];
                console.log(this.file)
                const windowURL = window.URL || window.webkitURL;
                this.dataURl = windowURL.createObjectURL(this.file);
                let img = new Image();
                img.src= this.dataURl;
                img.onload = ()=>{
                    this.loadPic = true;
                    if(img.width>=img.height){
                        this.picStatus=true;
                    }else{
                        this.picStatus=false;
                    }
                }
                this.photoCompress(this.file, {
                    quality: 0.2
                }, (base64Codes)=>{
                    //console.log("压缩后：" + base.length / 1024 + " " + base);
                    var bl = this.convertBase64UrlToBlob(base64Codes);
                    this.fileName = this.file.name;
                    bl.name  =  name;
                    this.file = bl;
                    this.upLoad()
                });
            },
            upLoad(){
                var fd=new FormData();      //创建form对象
                fd.append("file",this.file,this.fileName);
                this.axios.post('/upload',fd,{
                    onUploadProgress: (progressEvent) => {      //这里要用箭头函数
                        //不然这个this的指向会有问题
                        this.rate = parseInt((  progressEvent.loaded / progressEvent.total  ) * 100);
                        console.log(this.rate)
                    }
                }).then((res)=>{
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
            }
        },
        //生命周期
        created(){
            var cityCode=returnCitySN.cid;
            this.location = returnCitySN;
        },
        computed: {},
        mounted(){


        }
    }
</script>
