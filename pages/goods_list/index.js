//Page Object
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
    data: {
        tabs:[
            {
                id:0,
                name:'综合',
                isActive:true
            },
            {
                id:1,
                name:'销量',
                isActive:false
            },
            {
                id:2,
                name:'价格',
                isActive:false
            }
        ],
        goodsList:[]
    },
    praramQuery:{
        query:'',
        cid:'',
        pagenum:1,
        pagesize:10
    },
    totalPage:1,
    handletabchange(e){
        let {index} = e.detail
        const {tabs} = this.data
        tabs.forEach(v=>v.isActive = v.id === index?true:false)
        this.setData(
            {tabs}
        )
    },
    async getGoodsList(param){
        this.praramQuery.cid =  param || this.praramQuery.cid
        const res = await request({ url:'/goods/search',data:this.praramQuery})
        this.totalPage = Math.ceil(res.total / this.praramQuery.pagesize)
        this.setData({
            goodsList:[...res.goods,...this.data.goodsList]
        })
        wx.stopPullDownRefresh();
    },
    onLoad: function(options) {
        const {cid} = options
        this.getGoodsList(cid)
    },
    onReachBottom(){
        if (this.praramQuery.pagenum < this.totalPage) {
            this.praramQuery.pagenum++
            this.getGoodsList()
        }else{
           wx.showToast({
                title: '没有商品了',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
              
        }
    },
    onPullDownRefresh(){
        this.setData({
            goodsList:[]
        })
        this.praramQuery.pagenum = 1
        this.getGoodsList()
    }
});
  