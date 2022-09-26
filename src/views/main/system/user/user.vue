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
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
// import HyTable from '@/base-ui/table'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  components: {
    // HyForm
    PageSearch,
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
      pageContentRef
    }
  }
})
</script>

<style scoped></style>
