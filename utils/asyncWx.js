export const getSetting = function () {
    return new Promise(function (resolve,reject) {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {reject(err)}
        });
    })
}
export const openSetting = function () {
    return new Promise(function (resolve,reject) {
        wx.openSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {reject(err)}
        });
    })
}
export const chooseAddress = function () {
    return new Promise(function (resolve,reject) {
        wx.chooseAddress({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {reject(err)}
        });
    })
}
export const showModal = function (contentText) {
    return new Promise(function (resolve,reject) {
        wx.showModal({
            title: '提示',
            content: contentText,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)}
        });
          
    })
}
export const navigateTo = function (params) {
    return new Promise(function (resolve,reject) {
        wx.navigateTo({
            ...params,
          success: result => {
            resolve(result);
          },
          fail: err => {
            reject(err);
          }
        });
          
    })
}
export const login = function (contentText) {
    return new Promise(function (resolve,reject) {
        wx.login({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)}
        });
          
    })
}
export const showToast = function (params) {
    return new Promise(function (resolve,reject) {
        wx.showToast({
            ...params,
            mask: true,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)}
        });
    })
}
export const requestPayment = function (pay) {
    return new Promise(function (resolve,reject) {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
        });
    })
}
export const chooseImage = function () {
    return new Promise(function (resolve,reject) {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)}
        });
          
    })
}
export const uploadFile = function (params) {
    return new Promise(function (resolve,reject) {
       wx.uploadFile({
           ...params,
           success: (result) => {
               resovle(result)
           },
           fail: (err) => {reject(err)}
       });
    })
}
