<template>
  <div class="page-search">
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
  component: {
    HyForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return {
      formData
    }
  }
})
</script>

<style scoped>
.page-search {
  height: 100px;
}
.title {
  color: red;
}
.handle-btns {
  text-align: right;
  margin: 0 50px 20px 0;
}
</style>
