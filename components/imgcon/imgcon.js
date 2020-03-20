// components/imgcon/imgcon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
        type:'string',
        value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleclose(e){
        const {index} = e.currentTarget.dataset
        this.triggerEvent("handleclose", { index })
    }
  }
})
