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
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUserList(state, list: any[]) {
      state.userList = list
    },
    changeUserCount(state, count: number) {
      state.userCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    // page-content界面获取list不使用state获取（因为名字不固定）
    // const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.userCount)
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
            break
          case 'role':
            return state.roleList
            break
          case 'goods':
            return state.goodsList
            break
          case 'menu':
            return state.menuList
            break
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      // const pageUrl = `/${pageName}/list`

      // 用switch方式挨个匹配
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }

      //做切割拼接或使用下面的switch
      // const changePageName = pageName.slice(0,1).toUpperCase() + pageName.slice(1)
      let name = ''
      switch (pageName) {
        case 'users':
          name = 'User'
          break
        case 'role':
          name = 'Role'
          break
        case 'goods':
          name = 'Goods'
          break
        case 'menu':
          name = 'Menu'
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
