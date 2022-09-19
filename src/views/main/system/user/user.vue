<template>
  <div class="user">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="CircleClose">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </hy-form>
    <div class="content">content</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'

export default defineComponent({
  components: {
    HyForm
    // PageSearch
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
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

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
