/**
 * 数字前面自动补齐0
 */
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间格式化函数
 * @date 传入日期对象
 * @dateTime 日期类型(日期/日期+时间)
 * @divide 日期分隔符（日期divide日期）
 */
export function formatTime(date, dateTime, divide) {
  date = new Date(date)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  // 分隔符
  if (!divide) {
    divide = '-'
  }

  // 日期 + 时间
  if (dateTime === 5) {
    return [year, month, day].map(formatNumber).join(divide) + ' ' + [hour, minute].map(formatNumber).join(':');
  } else if (dateTime === 4) {
    return [minute, second].map(formatNumber).join(':');
  } else if (dateTime === 3) {
    return [month, day].map(formatNumber).join(divide);
  } else {
    return [year, month, day].map(formatNumber).join(divide);
  }
}

/**
 * 发送请求Promise封装
 * @url 请求地址
 * @data 请求参数
 * @method 请求类型
 */
export function ajaxPromise(url, data, method,) {
  // 请求判断类型
  if (!method) {
    method = 'GET'
  }

  return new Promise((resolve, rejected) => {
    wx.request({
      url,
      data,
      header: {
        "content-type": "application/json",
      },
      timeout: '6000',
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        rejected(res)
      }
    })
  })
}

/**
 * 弹框封装
 * @title 提示的文字
 */
export function showToast(title, icon) {
  if (!icon) {
    icon = 'none'
  }

  wx.showToast({
    title,
    icon,
    duration: 1500
  })
}

/**
 * 获取位置坐标并转换成实际位置
 */
export function getLocation() {
  return new Promise((resolve, rejected) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] === undefined || res.authSetting['scope.userLocation']) {
          wx.getLocation({
            success: (res) => {
              let {latitude, longitude} = res;
              let data = `${longitude},${latitude}`
              let url = `https://restapi.amap.com/v3/geocode/regeo?key=d61051bea2d37ef470dca5ef10ed8f44&location=${data}`
              wx.request({
                url,
                header: {
                  "content-type": "application/json",
                },
                success: (res) => {
                  let {province, city, district} = res.data.regeocode.addressComponent;
                  let location = `${province} ${city} ${district}`
                  if (city.length === 0) {
                    location = `${province} ${district}`
                  }
                  let data = {province, city, district, location}
                  resolve(data)
                },
                fail: (res) => {
                  rejected(res)
                }
              })

            }
          })
        } else {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation']) {
                wx.getLocation({
                  success: (res) => {
                    let {latitude, longitude} = res;
                    let data = `${longitude},${latitude}`
                    let url = `https://restapi.amap.com/v3/geocode/regeo?key=d61051bea2d37ef470dca5ef10ed8f44&location=${data}`
                    wx.request({
                      url,
                      header: {
                        "content-type": "application/json",
                      },
                      success: (res) => {
                        let {province, city, district} = res.data.regeocode.addressComponent;
                        let location = `${province} ${city} ${district}`
                        if (city.length === 0) {
                          location = `${province} ${district}`
                        }
                        let data = {province, city, district, location}
                        resolve(data)
                      },
                      fail: (res) => {
                        rejected(res)
                      }
                    })

                  }
                })
              }
            }
          })
        }
      }
    })
    return false
  })
}

/**
 * 查询当前设备网络状态
 */

export function network() {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success(res) {
        let networkType = res.networkType;
        if (networkType == 'unknown') {
          networkType = 'none'
        }

        if (networkType == 'none') {
          wx.showToast({
            title: '请检查网络',
            icon: 'fail',
            duration: 1500
          })
          resolve(networkType)
        } else {
          resolve(networkType)
        }
      },
    })
  })
}

/**
 * 设置头部导航
 * */
export function setNav(title, color) {
  wx.setNavigationBarTitle({
    title
  })
  let fc = '#000000'
  let bc = '#ffffff'
  if (color) {
    fc = '#ffffff'
    bc = '#3d74f3'
  }
  wx.setNavigationBarColor({
    frontColor: fc,
    backgroundColor: bc,
  })

}

