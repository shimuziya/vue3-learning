import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 30px'
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '运动',
      rules: [],
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '足球',
          value: 'football'
        }
      ],
      placeholder: '请'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
