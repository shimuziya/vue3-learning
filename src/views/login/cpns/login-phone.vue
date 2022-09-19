<template>
  <div class="login-phone">
    <el-form label="60px" :rules="phoneRules" :model="phone">
      <!-- prop是验证规则rules里的name，account传给el-form做验证 -->
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="密码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { phoneRules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })
    return {
      phone,
      phoneRules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.code-btn {
  margin-left: 8px;
}
</style>
