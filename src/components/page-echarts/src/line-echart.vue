<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, withDefaults } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'

const props = withDefaults(
  defineProps<{
    title: string
    xLabels: string[]
    lineData: IDataType[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    title: {
      text: props.title
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类别销量',
        data: props.lineData,
        stack: '总量',
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>
