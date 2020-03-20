// pages/feedback/index.js
import { request } from "../../request/index.js";
import { chooseImage,showToast,uploadFile } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "体验问题",
        isActive: true
      },
      {
        id: 1,
        name: "商品/商家投诉",
        isActive: false
      }
    ],
    imgList: [],
    inputVal:''
  },
  picUrl:[],
  handletabchange(e) {
    let { index } = e.detail;
    const { tabs } = this.data;
    tabs.forEach(v => (v.isActive = v.id === index ? true : false));
    this.setData({ tabs });
  },
  async handleChooseimage() {
    const { tempFilePaths } = await chooseImage();
    this.setData({
      imgList: [...this.data.imgList, ...tempFilePaths]
    });
  },
  handlecloseimgcon(e) {
    let {index} = e.detail
    let {imgList} = this.data
    imgList.splice(index,1)
    this.setData({
        imgList
    })
  },
  async handlesubmit(){
    const {inputVal,imgList} = this.data
    if(!inputVal.tirm()){
        showToast({title:'必须要有文字描述',icon:'none'})
        return;
    }
    let params = {
        url: '',
        filePath: '',
        name: 'picture',
        formData: {},
    }
    if(imgList.length === 0){
        imgList.forEach(v=>{
            params.filePath = v
            let res = uploadFile(params)
            this.picUrl.push(res.data.url)
        })
    }
    let upparams = {
        urls:this.picUrl,
        text:inputVal
    }
    const res = request({url:'',data:upparams})
    this.setData({
        imgList:[],
        inputVal:'',
    })
    wx.navigateBack({
        delta: 1
    });
  }
});