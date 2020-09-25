import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dapingData: {}
  },
  mutations: {
    setDapingData(state,dapingData){
      localStorage.setItem('DAPING',JSON.stringify(dapingData))
      state.dapingData = dapingData;
    },
    getDapingData(state){
      state.dapingData = JSON.parse(localStorage.getItem('DAPING'));
    }
  },
  actions: {

  },
  getters:{
    dapingData() {
      return state.dapingData
    }
  }
})
