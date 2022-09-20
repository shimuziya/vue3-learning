<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <hy-table :ListData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.status ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
// import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import HyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    // HyForm
    PageSearch,
    HyTable
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  setup() {
    // const formItems: IFormItem[] = [
    //   {
    //     type: 'input',
    //     label: '用户名',
    //     rules: [],
    //     placeholder: '请输入用户名'
    //   }
    // ]
    // const labelWidth = '100px'
    // const itemStyle = 'padding: 8px 30px'
    // const colLayout = {
    //   span: 8
    // }

    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list', // 查询地址
      queryInfo: {
        //查询条件，每页10条 ， 条件查询等
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '100',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '100',
        slotName: 'updateAt'
      }
    ]

    return {
      // formItems,
      // labelWidth,
      // itemStyle,
      // colLayout
      // formConfig
      searchFormConfig,
      userList,
      userCount,
      propList
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
