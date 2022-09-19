import { App } from 'vue'
import registerElement from './register-element'
import iconElement from './icon-element'

export function registerApp(app: App): void {
  registerElement(app)
}

export function iconApp(app: App): void {
  iconElement(app)
}
