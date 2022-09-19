<template>
  <div class="login-account">
    <el-form :rules="accountRules" :model="account" ref="formRef">
      <!-- prop是验证规则rules里的name，account传给el-form做验证 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/account-config'
import localCache from '../../../utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // validate是验证，valid是返回验证成功或失败
        if (valid) {
          //判断是否记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          //开始登录验证
          store.dispatch('login/accountLoginAction', account)
        }
      })
    }

    return {
      account,
      formRef,
      accountRules,
      loginAction
    }
  }
})
</script>

<style scoped></style>
