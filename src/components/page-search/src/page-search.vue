<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handelResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm
  },
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    //1、优化一：formData双向绑定的属性应该由配置文件的field来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    //此处改为动态绑定搜索框有哪些
    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // })

    //2、优化二：重置点击
    const handelResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    //3、优化三、点击搜索
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }

    return {
      formData,
      handelResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped>
.title {
  color: red;
}
.handle-btns {
  text-align: right;
  margin: 0 50px 20px 0;
}
</style>
