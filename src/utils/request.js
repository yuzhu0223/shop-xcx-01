
// 封装Promise
function request(obj) {
  let url = obj.url || ''
  url = 'https://www.zhengzhicheng.cn' + url
  let method = obj.method || 'get'
  let data = obj.data || ''
  return new Promise(function (resolve, reject) {
    mpvue.request({
      url,
      method,
      data,
      success: function(msg) {
        resolve(msg.data)
      }
    })
  })
}

export default request
