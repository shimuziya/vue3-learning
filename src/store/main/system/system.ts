import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './types'

import { getPageListData } from '@/service/main/system/system'

const systemMoudle: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    // page-content界面获取list不使用state获取（因为名字不固定）
    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.userList
            break
          case 'role':
            return state.roleList
            break
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName

      // 用switch方式挨个匹配
      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }

      //做切割拼接
      // const changePageName = pageName.slice(0,1).toUpperCase() + pageName.slice(1)
      let name = ''
      switch (pageName) {
        case 'user':
          name = 'User'
          break
        case 'role':
          name = 'Role'
          break
      }
      //pageList代表所有页面数据
      //拿到payload的数据（user.vue[抽取到page-content界面了]界面的dispath里的参数）发送页面请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit(`change${name}List`, list)
      commit(`change${name}Count`, totalCount)
    }
  }
}

export default systemMoudle
