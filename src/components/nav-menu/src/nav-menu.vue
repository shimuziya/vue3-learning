<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defalutValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <!-- <el-icon><User /></el-icon>
            <i v-if="item.icon" :class="item.icon"></i> -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 只有最低级菜单点击才有页面-->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <el-icon>
                  <component :is="subItem.icon"></component>
                </el-icon>
                <!-- 图标 -->
                <!-- <i v-if="subItem.icon" :class="subItem.icon"></i> -->
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <!-- 图标 -->
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      defalut: false
    }
  },
  setup() {
    const store = useStore()
    //const userMenus = store.state.login.userMenus
    // 这样的state是any类型，state可以点出来任意,所以自己封装一个IRootState类型的useStore
    const userMenus = computed(() => store.state.login.userMenus)

    //router
    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    //刷新界面时获取本界面的id值
    //通过当前url->userMenu->menu.url -> menu.id
    const route = useRoute()
    const currentPath = route.path //去匹配，匹配代码写在工具里
    const menuValue = pathMapToMenu(userMenus.value, currentPath)
    const defalutValue = ref(menuValue.id + '')

    return {
      userMenus,
      handleMenuItemClick,
      defalutValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
    // background-color: #001529; //我加的
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
