import 'element-plus/theme-chalk/index.css'
import { App } from 'vue'

import {
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Cellphone,
  User,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const components = [
  Delete,
  Edit,
  Search,
  Share,
  Upload,
  Cellphone,
  User,
  Fold,
  Expand
]

export default function (app: App): void {
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
}
