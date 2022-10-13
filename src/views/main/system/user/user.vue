<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    />
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @addBtnClick="handleAddBtnClick"
        @editBtnClick="handleEditBtnClick"
      ></page-content>
      <page-modal
        :defaultInfo="defaultInfo"
        :modalConfig="modalConfigRef"
        pageName="users"
        ref="pageModalRef"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
// import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
// import HyTable from '@/base-ui/table'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    // HyForm,
    PageSearch,
    PageModal,
    // HyTable
    PageContent
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

    //抽在hooks/usePageSearch
    // const pageContentRef = ref<InstanceType<typeof PageContent>>()
    // const handleResetClick = () => {
    //   pageContentRef.value?.getPageData()
    // }
    // const handleSearchClick = (queryInfo: any) => {
    //   pageContentRef.value?.getPageData(queryInfo)
    // }

    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    //pageModal相关的hook逻辑
    //1、处理密码逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }
    //2、动态添加角色和部门列表??不懂这个操作
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    }) //解决角色和部门不能立马显示的问题

    //3、调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleAddBtnClick, handleEditBtnClick] =
      usePageModal(newCallback, editCallback)

    return {
      // formItems,
      // labelWidth,
      // itemStyle,
      // colLayout
      // formConfig
      searchFormConfig,
      // propList,
      // showIndexColumn,
      // showSelectColumn,
      contentTableConfig,
      handleResetClick,
      handleSearchClick,
      pageContentRef,
      modalConfigRef,
      pageModalRef,
      handleAddBtnClick,
      handleEditBtnClick,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
