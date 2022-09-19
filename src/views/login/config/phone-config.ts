// 编写规则
export const phoneRules = {
  num: [
    {
      message: '手机号必须填写',
      tigger: 'blur' //失去焦点时验证，change是改了就验证
    },
    {
      pattern: /^[a-z0-9]{11,12}$/,
      message: '手机号是12个字符',
      tigger: 'blur'
    }
  ],
  code: [
    {
      message: '验证码必须填写',
      tigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,6}$/,
      message: '验证码是6位字符',
      tigger: 'blur'
    }
  ]
}
