<template>
  <div class="nav-header">
    <el-icon
      class="isFoldIcon"
      @click="handleFoldClick"
      style="font-size: 30px"
    >
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    userInfo,
    HyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //面包屑的数据：[{name,path}]

    const breadcrumbs = computed(() => {
      const store = useStore()
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
}

.content {
  display: flex;
  justify-content: space-between; //两个div分别放在左边和右边
  flex: 1;
  padding: 0 20px;
  align-items: center;
}
.isFoldIcon {
  cursor: pointer;
}
</style>
