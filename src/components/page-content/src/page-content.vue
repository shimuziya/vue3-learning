<template>
  <div class="page-content">
    <hy-table
      :ListData="dataList"
      @handleSeletionChange="handleSeletionChange"
      v-bind="contentTableConfig"
    >
      <!-- 1、header的插槽 -->
      <template #headerHandler>
        <el-button>新建用户</el-button>
      </template>

      <template #status="scope">
        <el-button size="" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      //name动态获取
      pageName: props.pageName, // 查询地址
      queryInfo: {
        //查询条件，每页10条 ， 条件查询等
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    //获取选中列的值集合
    const handleSeletionChange = (value: any) => {
      // console.log(value)
    }
    return {
      dataList,
      userCount,
      handleSeletionChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
