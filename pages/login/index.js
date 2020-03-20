// pages/auth/index.js
import { login, showModal, navigateTo, showToast } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    data: {

    },

    onLoad: function (options) {

    },
    async handleAuthorization(e) {
        try {
            const { userInfo } = e.detail
            wx.setStorageSync('userInfo', userInfo);
            wx.navigateBack({
                delta: 1
            });
        } catch (err) {
            console.log(err)
        }
    }
})