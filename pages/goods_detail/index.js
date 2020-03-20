// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import { showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    goodsObj:[],
    isCollect:false
  },
  goodsInfo:[],
  onShow: function () {
    let pages =  getCurrentPages();
    let cp = pages[pages.length - 1]
    let {options} = cp
    const {goods_id} = options
    this.goods_id = goods_id
      this.getGoodsDetail(goods_id)
  },
    async getGoodsDetail(goods_id){
      const res = await request({ url:'/goods/detail',data:{goods_id}})
      this.goodsInfo = res
        let isConllect
        let collect = wx.getStorageSync('conllect') || [];
        let index = collect.findIndex(v =>
            v.goods_id === this.goodsInfo.goods_id)
        if (index !== -1) {
            isConllect = true
        } else {
            isConllect = false
        }
      this.setData({
          goodsObj:{
              goods_name:res.goods_name,
              goods_price:res.goods_price,
              goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
              pics:res.pics
          },
          isConllect
      })
  },
  handleSwiperTap(e){
    const currentPicUrl = e.currentTarget.dataset.imageurl
    const urls =   this.data.goodsObj.pics.map(v => v.pics_mid_url)
    // console.log(urls)
    wx.previewImage({
        current: currentPicUrl,
        urls: urls,
    });
  },
  tapBuy(e){

  },
  tapCart(e){
    let cartList = wx.getStorageSync('cart') || []
    const index = cartList.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if (index === -1) {
        this.goodsInfo.num = 1
        this.goodsInfo.isChecked = true
        cartList.push(this.goodsInfo)
    }else{
        cartList[index].num++
    }
    wx.setStorageSync('cart', cartList);
    wx.showToast({
        title:'添加成功',
        icon: 'success',
        duration: 1500,
        mask: true
    });
      
  },
  async handleCollect(){
    let conllect = wx.getStorageSync('conllect') || [];
    let index = conllect.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    let isConllect
    if (index !== -1) {
        conllect.splice(index,1)
        isConllect = false
        await showToast({title:'取消收藏成功',icon:'success'})
    }else{
        conllect.push(this.goodsInfo)
        isConllect = true
        await showToast({title:'收藏成功',icon:'success'})
    }
    this.setData({
        isConllect
    })
    wx.setStorageSync('conllect', conllect);
  }
})