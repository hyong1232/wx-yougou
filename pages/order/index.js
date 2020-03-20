// pages/order/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {
    tabs:[
        {
            id: 0,
            name: '综合',
            isActive: true
        },
        {
            id: 1,
            name: '待付款',
            isActive: false
        },
        {
            id: 2,
            name: '待发货',
            isActive: false
        },
        {
            id: 3,
            name: '退款/退货',
            isActive: false
        }
    ],
    orders:[]
  },
    handletabchange(e) {
        let { index } = e.detail
        this.checkeditembyindex(index)
        this.getOrders(index+1)
    },
    checkeditembyindex(index){
        const { tabs } = this.data
        tabs.forEach(v => v.isActive = v.id === index ? true : false)
        this.setData(
            { tabs }
        )
    },
    async getOrders(type){
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return;
        }
        let res = await request({ url:'/my/orders/all',data:{type}})
        this.setData({
            orders:res.orders
        })
    },
    onShow(){
        let pages =  getCurrentPages();
        let currentPage = pages[pages.length - 1]
        const {type} = currentPage.options
        this.checkeditembyindex(type-1)
        this.getOrders(type)
    }
})