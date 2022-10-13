import 'element-plus/theme-chalk/index.css'
import { App } from 'vue'

import {
  ElButton,
  ElTable,
  ElTableColumn,
  // ElAlert,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElBreadcrumb,
  ElTree
} from 'element-plus/lib'

const components = [
  ElButton,
  ElTable,
  ElTableColumn,
  // ElAlert,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElForm,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElAvatar,
  ElBreadcrumb,
  ElTree
]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
