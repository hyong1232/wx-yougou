// components/tabs/tabs.js
Component({
  properties: {
    tabs:{
        type:'array',
        value:[]
    }
  },

  data: {

  },
  methods: {
      handletabchange(e){
        let {index} = e.currentTarget.dataset
        this.triggerEvent('handletabchange',{index})
    }
  }
})
