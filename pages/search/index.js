// pages/search/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {
    searchList:[],
    isHidden:true,
    inputValue:''
  },
  Timer:-1,
  handleInput(e){
    const {value} = e.detail
    let isHidden = false
    if(!value.trim()){
        isHidden = true
        this.setData({
            isHidden,
            searchList:[]
        })
        return;
    }
    clearTimeout(this.Timer)
    this.Timer = setTimeout(() => {
        this.getSearchList({query:value,isHidden})
    }, 1000);
  },
  async getSearchList(query){
      let searchList = await request({ url:'/goods/qsearch',data:query})
      this.setData({
          searchList,
          isHidden:false
      })
  },
  handleCancel(){
      this.setData({
          searchList:[],
          isHidden:true,
          inputValue:''
      })
  }
})