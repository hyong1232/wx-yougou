// pages/user/index.js
Page({

  data: {
    userInfo:[],
    conllectsNum:0
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo')
    const conllect = wx.getStorageSync('conllect') || [];
    this.setData({
        userInfo,
        conllectsNum:conllect.length
    })
  }
})