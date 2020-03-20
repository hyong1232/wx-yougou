let ajaxTime = 0
export const request = (params)=> {
    wx.showLoading({
        title: '加载中...',
        mask:true
    });
    let header = {...params.header}
    if (params.url.includes('/my/')) {
        header["Authorization"] = wx.getStorageSync('token')
    }
    return new Promise(function (resolve,reject) {
        ajaxTime ++
        const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1";
        wx.request({
            ...params,
            header:header,
            url:baseurl+params.url,
            success: (data, status) => {
                resolve(data.data.message, status);
            },
            fail: (err) => { reject(err)},
            complete:()=>{
                ajaxTime --
                if(ajaxTime === 0 ){
                    wx.hideLoading();
                }
            }
        });
    })
}