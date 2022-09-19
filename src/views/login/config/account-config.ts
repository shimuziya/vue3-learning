// 编写规则
export const accountRules = {
  name: [
    {
      required: true,
      message: '用户名必须填写',
      tigger: 'blur' //失去焦点时验证，change是改了就验证
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '用户名是3-10个字符',
      tigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必须填写',
      tigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码是3位以上字符',
      tigger: 'blur'
    }
  ]
}
