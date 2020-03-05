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
      <textarea
        id="content"
        placeholder="此刻的心情..."
        v-model="msg"
        maxlength="400"
      ></textarea>
      <div class="bottom">
        <div class="btn cameraBtn">
          <input
            id="file"
            ref="file"
            @change="change()"
            type="file"
            name="logo"
            accept="image/*"
          />
        </div>

        <div @click="getLocation()" class="btn locationBtn"></div>
        <span class="city" v-if="city == ''">遥远的Ta</span>
        <span class="city" v-if="city != ''">{{ city }}</span>
      </div>
    </div>
    <div v-if="loadPic" class="imgbox">
      <img class="pic" :class="picStatus ? 'h' : 's'" :src="dataURl" alt="" />
    </div>
  </div>
</template>
<style lang="less">
#mood {
  width: 100vw;
  height: 100vh;
  background: #fff;
  .mint-header {
    height: 1rem;
    line-height: 1rem;
  }
  .iptBox {
    width: 100%;
    height: 30%;
    box-sizing: border-box;
    #content {
      width: 100%;
      height: 80%;
      background: #fff;
      border: none;
      resize: none;
      padding: 0.24rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
    }
    .bottom {
      width: 100%;
      height: 20%;
      position: relative;
      border-bottom: 1px solid #eee;
      .btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.locationBtn {
          width: 0.4rem;
          height: 0.4rem;
          background: url('../../img/dw.png') no-repeat;
          background-size: 100%;
          right: 0.24rem;
        }
        &.cameraBtn {
          width: 0.48rem;
          height: 0.48rem;
          background: url('../../img/xj.png') no-repeat;
          background-size: 100%;
          left: 0.24rem;
          #file {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
      .city {
        font-size: 0.24rem;
        color: #222;
        position: absolute;
        right: 0.7rem;
        top: 50%;
        text-align: right;
        transform: translateY(-50%);
      }
    }
  }
  .imgbox {
    width: 2rem;
    height: 2rem;
    border: 1px dashed #26a2ff;
    box-sizing: border-box;
    margin: 0.24rem;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &.h {
        width: auto;
        height: 100%;
      }
      &.s {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
<script>
import { Toast } from 'mint-ui'
export default {
  //数据处理
  data() {
    return {
      msg: '',
      city: '',

      file: {},
      rate: 0,
      dataURl: '',
      picStatus: true,
      loadPic: false,
      type: '',
      fileName: ''
    }
  },
  //引用的组件
  components: {},
  //方法
  methods: {
    getLocation() {
      //                var cityCode=returnCitySN.cid;
      this.city = returnCitySN.cname
    },
    convertBase64UrlToBlob(urlData) {
      var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    canvasDataURL(path, obj, callback) {
      var img = new Image()
      img.src = path
      var self = this
      img.onload = function() {
        var that = this
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h
        w = obj.width || w
        h = obj.height || w / scale
        var quality = 0.2 // 默认图片质量为0.2
        //生成canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 创建属性节点
        var anw = document.createAttribute('width')
        //                    if(w>400){
        //                        var bl = (400/w);
        //                        w=400;
        //                        h=h*bl;
        //                    }
        anw.nodeValue = w
        var anh = document.createAttribute('height')
        anh.nodeValue = h

        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)

        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality)

        EXIF.getData(img, function() {
          var orientation = EXIF.getTag(this, 'Orientation')
          // orientation = 6;//测试数据
          console.log('orientation:' + orientation)
          switch (orientation) {
            //正常状态
            case 1:
              console.log('旋转0°')

              break
            //旋转90度
            case 6:
              console.log('旋转90°')
              canvas.height = w
              canvas.width = h
              ctx.rotate(Math.PI / 2)
              ctx.translate(0, -h)

              ctx.drawImage(img, 0, 0)
              //                                base64 = canvas.toDataURL('image/jpeg',quality);
              break
            //旋转180°
            case 3:
              console.log('旋转180°')
              canvas.height = h
              canvas.width = w
              ctx.rotate(Math.PI)
              ctx.translate(-w, -h)

              //                                ctx.drawImage(img,0,0)
              //                                var base64 = canvas.toDataURL('image/jpeg',quality);
              break
            //旋转270°
            case 8:
              console.log('旋转270°')
              canvas.height = w
              canvas.width = h
              ctx.rotate(-Math.PI / 2)
              ctx.translate(-h, 0)

              //                                ctx.drawImage(image,0,0)
              //                                base64 = canvas.toDataURL('image/jpeg',quality);
              break
            //undefined时不旋转
            case undefined:
              console.log('undefined  不旋转')
              break
          }
          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, w, h)
          ctx.drawImage(that, 0, 0, w, h)
          base64 = canvas.toDataURL('image/jpeg', quality)
        })
        // 回调函数返回base64的值
        callback(base64)
      }
    },
    photoCompress(file, w, objDiv) {
      var ready = new FileReader()
      /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file)
      this.type = file.type
      ready.onload = e => {
        var re = e.target.result
        this.canvasDataURL(re, w, objDiv)
      }
    },
    change() {
      this.file = this.$refs.file.files[0]
      const windowURL = window.URL || window.webkitURL
      this.dataURl = windowURL.createObjectURL(this.file)
      let img = new Image()
      img.src = this.dataURl
      img.onload = () => {
        this.loadPic = true
        console.log(img.width)
        console.log(img.height)
        if (img.width >= img.height) {
          this.picStatus = true
        } else {
          this.picStatus = false
        }
      }
      this.photoCompress(
        this.file,
        {
          quality: 0.1
        },
        base64Codes => {
          //console.log("压缩后：" + base.length / 1024 + " " + base);
          var bl = this.convertBase64UrlToBlob(base64Codes)
          this.fileName = this.file.name
          bl.name = name
          this.file = bl
          //                    this.upLoad()
        }
      )
    },
    commit() {
      var fd = new FormData() //创建form对象

      fd.append('msg', this.msg)
      fd.append('city', this.city)
      if (this.dataURl != '') {
        fd.append('file', this.file, this.fileName)
      }
      fd.append('imgUrl', this.dataURl)

      if (this.msg != '') {
        this.axios
          .post('/commitmood', fd, {
            onUploadProgress: progressEvent => {
              this.rate = parseInt(
                (progressEvent.loaded / progressEvent.total) * 100
              )
              console.log(this.rate)
            }
          })
          .then(res => {
            console.log(res)
            if (res.data.status == 'ok') {
              Toast({
                message: res.data.message
              })
              let t = setTimeout(() => {
                this.$router.replace('/main')
                clearTimeout(t)
              }, 3000)
            } else {
              Toast({
                message: res.data.message
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Toast({
          message: '真的啥也不想说吗^_^！'
        })
      }
    }
  },
  //生命周期
  created() {},
  computed: {},
  mounted() {}
}
</script>
