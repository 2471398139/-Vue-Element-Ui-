/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-03 10:01:04
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 19:45:32
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import category from './modules/category';
import waiter from './modules/waiter';
import information from './modules/information'
import alluser from './modules/alluser'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    category,
    waiter,
    information,
    alluser
  },
  getters
})

export default store
