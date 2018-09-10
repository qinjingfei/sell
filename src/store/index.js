import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        api
    }
})