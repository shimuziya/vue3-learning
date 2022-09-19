<template>
  <div class="user">
    <div class="search">
      <hy-form v-bind="searchFormConfig" v-model="formData" />
    </div>

    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    HyForm
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  setup() {
    const formData = reactive({
      id: '',
      name: '',
      password: '',
      sport: ''
    })

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
      formData
    }
  }
})
</script>

<style scoped></style>
