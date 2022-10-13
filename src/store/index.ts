import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDapartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRolement(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitalDataAction({ commit }) {
      //1、请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      //1、请求menu数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      //2、保存数据
      commit('changeEntireDapartment', departmentList)
      commit('changeEntireRolement', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitalDataAction') //防止异步请求时在请求到token之前就去请求数据
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
