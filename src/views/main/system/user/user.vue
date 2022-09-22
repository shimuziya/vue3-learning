<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="user"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search'
// import HyTable from '@/base-ui/table'
import PageContent from '@/components/page-content'

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
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
