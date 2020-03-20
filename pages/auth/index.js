// pages/auth/index.js
import {  login, showModal, navigateTo, showToast } from "../../utils/asyncWx.js";
import {  request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {

  },

  onLoad: function (options) {

  },
  async handleAuthorization(e){
    try {
        const {encryptedData,rawData,iv,signature} = e.detail
        const {code} = await login()
        const allParams = {encryptedData,rawData,iv,signature,code}
        const  res  =await request({ url:'/users/wxlogin',data:allParams})
        const {token} = res && res.message || {token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"}
        wx.setStorageSync('token', token);
        wx.navigateBack({
            delta: 1
        });
    } catch (err) {
        console.log(err)
    }
  }
})