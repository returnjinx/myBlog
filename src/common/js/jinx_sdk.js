exports.install = function (Vue, options) {
  Vue.prototype.setImgBucket = function (url) {
    if (url != '' && url) {
      if (url.indexOf('http') == -1) {
        if (url.indexOf('.png') == -1) {
          return url + '?imageView2/1/format/jpg'
        } else {
          return this.imgUrl + url
        }
      } else {
        if (url.indexOf('.png') == -1) {
          return url + '?imageView2/1/format/jpg'
        } else {
          return url
        }
      }
    }
  }
}
