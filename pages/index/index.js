import {request} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
    data: {
        swiperList:[],
        cateList:[],
        floorList:[]
    },
    //options(Object)
    onLoad: function(options) {
        this.getCateList(),
        this.getSwiperList(),
        this.getFloorList()
    },
    getSwiperList(){
        request({ url: '/home/swiperdata'})
        .then(data=>{
            this.setData({
                swiperList:data
            })
        })
    },
    getCateList(){
        request({ url: '/home/catitems'})
        .then(data=>{
            this.setData({
                cateList:data
            })
        })
    },
    async getFloorList(){
        let data = await request({ url: '/home/floordata'})
        data.forEach(v=>{
            v.product_list.forEach(e => {
                let start = e.navigator_url.indexOf('?')
                let str = e.navigator_url
                str = str.slice(0,start)+'/index'+str.slice(start)
                e.navigator_url = str
            });
        })
        this.setData({
            floorList:data
        })
}
});
  