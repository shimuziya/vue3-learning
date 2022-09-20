import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemMoudle: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //pageList代表所有页面数据
      //拿到payload的数据（user.vue界面的dispath里的参数）发送页面请求
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      // console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemMoudle
