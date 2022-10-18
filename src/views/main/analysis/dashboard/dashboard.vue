<template>
  <div class="dashboard">
    <h2>dashboard</h2>
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount" />
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品数量">
          <map-echart :mapData="addressGoodsSale" />
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount" />
        </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的数量">
          <bar-echart v-bind="categoryGoodsFavor" />
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import HyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    //请求数据
    store.dispatch('dashboard/getDashboardDataAction')
    //获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const lineData: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        lineData.push(item.goodsCount)
      }
      return { xLabels, lineData }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const barData: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        barData.push(item.goodsCount)
      }
      return { xLabels, barData }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
:content-row {
  margin-top: 20px;
}
</style>
