import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    leftMunuList: [],
    rightMunuList: [],
    currentIndex: 0,
    scrollTop: 0
  },
  cateList: [],
  async getCateList() {
    // request({
    //   url: "/categories"
    // }).then(data => {
    //   this.cateList = data.data.message;
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
    //   let leftMunuList = this.cateList.map(v => v.cat_name);
    //   let rightMunuList = this.cateList[0].children;
    //   this.setData({
    //     leftMunuList,
    //     rightMunuList
    //   });
    // });
    const data =await request({url:'/categories'})
      this.cateList = data
      wx.setStorageSync("cates", { time: Date.now(), data: this.cateList });
      let leftMunuList = this.cateList.map(v => v.cat_name);
      let rightMunuList = this.cateList[0].children;
      this.setData({
        leftMunuList,
        rightMunuList
      });
  },
  handletap(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentIndex: index,
      rightMunuList: this.cateList[index].children,
        scrollTop: 0
    });
  },
  onLoad: function(options) {
    const cates = wx.getStorageSync("cates");
    if (cates) {
      if (Date.now() - cates.time > 10 * 1000) {
        this.getCateList();
      } else {
        this.cateList = cates.data;
        let leftMunuList = this.cateList.map(v => v.cat_name);
        let rightMunuList = this.cateList[0].children;
        this.setData({
          leftMunuList,
          rightMunuList
        });
      }
    } else {
      this.getCateList();
    }
  }
});