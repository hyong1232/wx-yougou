import { chooseAddress, openSetting, getSetting, showModal, navigateTo, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

    data: {
        address: wx.getStorageSync('address'),
        goodsList: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },
    onShow: function (options) {
        const address = wx.getStorageSync('address');
        this.setData({
            address
        })
        const goodsList = wx.getStorageSync('cart') || [];
        // const allChecked = goodsList.length?goodsList.every(v=>v.isChecked):false
        this.setBotBtn(goodsList)
    },
    async handleAddress() {
        try {
            const res = await getSetting()
            const scope = res.authSetting["scope.address"]
            if (scope === false) {
                await openSetting()
            }
            let address = await chooseAddress()
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
            wx.setStorageSync('address', address);
        } catch (err) {
            console.log(err)
        }
    },
    handleChange(e) {
        const { id } = e.currentTarget.dataset
        const goodsList = wx.getStorageSync('cart') || {};
        const index = goodsList.findIndex(v => v.goods_id === id)
        goodsList[index].isChecked = !goodsList[index].isChecked
        this.setBotBtn(goodsList)
    },
    setBotBtn(goodsList) {
        let totalPrice = 0
        let totalNum = 0
        let allChecked = true
        goodsList.forEach(v => {
            if (v.isChecked) {
                totalPrice += v.goods_price * v.num
                totalNum += v.num
            } else {
                allChecked = false
            }
        })
        allChecked = goodsList.length ? allChecked : false
        this.setData({
            goodsList,
            allChecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync('cart', goodsList);
    },
    handleAllChecked() {
        let { goodsList, allChecked } = this.data
        allChecked = !allChecked
        goodsList.forEach(v => v.isChecked = allChecked)
        this.setData({
            allChecked,
            goodsList
        })
        this.setBotBtn(goodsList)
    },
    async handleIncrement(e) {
        const { id, opration } = e.currentTarget.dataset
        let { goodsList } = this.data
        const index = goodsList.findIndex(v => v.goods_id === id)
        if (goodsList[index].num === 1 && opration === -1) {
            const res = await showModal('确认删除本条记录么?')
            if (res.confirm) {
                goodsList.splice(index, 1)
                this.setBotBtn(goodsList)
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        } else {
            goodsList[index].num += opration
            this.setBotBtn(goodsList)
        }
    },
    async handleSettlement() {
        const { address, totalNum } = this.data
        console.log(address)
        if (!address.userName) {
            await showToast({ title: '宁还没有选择收货地址' })
            return;
        }
        if (totalNum === 0) {
            await showToast({ title: '宁还没有选择商品' })
            return;
        }
        navigateTo({ url: '/pages/pay/index' })
    }
})