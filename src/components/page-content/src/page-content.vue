<template>
  <div class="page-content">
    <hy-table
      :ListData="dataList"
      :listCount="listCount"
      @handleSeletionChange="handleSeletionChange"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1、header的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" @click="handelAddClick">新建用户</el-button>
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
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            type="primary"
            link
            v-if="isDelete"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="primary"
            link
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content界面动态添加插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import HyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

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
  emits: ['addBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    //发送网络请求
    // store.dispatch('system/getPageListAction', {
    //   //name动态获取
    //   pageName: props.pageName, // 查询地址
    //   queryInfo: {
    //     //查询条件，每页10条 ， 条件查询等
    //     offset: 0,
    //     size: 10
    //   }
    // })

    //0、获取按钮权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    //1、双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    //2、发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        //name动态获取
        pageName: props.pageName, // 查询地址
        queryInfo: {
          //查询条件，每页10条 ， 条件查询等
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo //直接加在后面
        }
      })
    }
    getPageData()

    //3、 从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userList = computed(() => store.state.system.userList)
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](
        props.pageName === 'users' ? 'user' : props.pageName
      )
    )

    // console.log(props.pageName + dataList.value + '草草草草')
    // console.log(props.pageName + listCount.value + '永远永远')
    //4、获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'headerHandler') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    //获取选中列的值集合
    const handleSeletionChange = (value: any) => {
      // console.log(value)
    }

    //删除、新增
    const handleDeleteClick = (item: any) => {
      // console.log(item)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const handelAddClick = () => {
      emit('addBtnClick')
    }

    return {
      dataList,
      handleSeletionChange,
      getPageData,
      listCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleEditClick,
      handelAddClick
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
