import { chooseAddress, openSetting, getSetting, showModal, navigateTo, showToast,requestPayment } from "../../utils/asyncWx.js";
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    data: {
        address: wx.getStorageSync('address'),
        goodsList: [],
        totalPrice: 0,
        totalNum: 0
    },
    onShow: function (options) {
        const address = wx.getStorageSync('address');
        this.setData({
            address
        })
        let goodsList = wx.getStorageSync('cart') || [];
        // const allChecked = goodsList.length?goodsList.every(v=>v.isChecked):false
        let fileterGoodsList = goodsList.filter(v=>v.isChecked)
        let totalPrice = 0
        let totalNum = 0
        fileterGoodsList.forEach(v => {
            totalPrice += v.goods_price * v.num
            totalNum += v.num
        })
        this.setData({
            goodsList:fileterGoodsList,
            totalPrice,
            totalNum
        })
    },
    async handlePay() {
        try {
            let token = wx.getStorageSync('token');
            if (!token) {
                await navigateTo({url:'/pages/auth/index'})
            }
            const header = {Authorization:token}
            const order_price = this.data.totalPrice
            const consignee_addr = this.data.address.all
            let {goodsList} = this.data
            let goods = []
            goodsList.forEach(v=>{
                goods.push({
                    goods_id:v.goods_id,	
                    goods_number:v.num,	
                    goods_price:v.goods_price
                })
            })
            const allparams = {order_price,consignee_addr,goods}
            console.log(allparams)
            const {order_number} = await request({ url:'/my/orders/create',data:allparams,method:'POST'})
            console.log(order_number)
            const {pay} = await request({ url:'/my/orders/req_unifiedorder',data:{order_number},method:'POST'})
            await requestPayment(pay)
            const res = await request({ url:'/my/orders/chkOrder',data:{order_number},method:'POST'})
            await showToast({title:'支付成功'})
            newCart = wx.getStorageSync('cart');
            newCart = newCart.filter(v=>v.isChecked !== true)
            wx.setStorageSync('cart', newCart);
            await navigateTo({url:'/pages/order/index'})
        } catch (err) {
            await showToast({title:'支付失败'})
            await navigateTo({url:'/pages/order/index'})
            console.log(err)
        }
    }
})