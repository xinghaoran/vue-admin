<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import local from './lang/local'

const viewName = 'barChart'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    lang: {
      get() {
        return this.$store.getters.language
      }
    }
  },
  created() {
    if (!this.$i18n.getLocaleMessage('en')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en)
      this.$i18n.mergeLocaleMessage('zh', local.zh)
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)

    // 监听tabs切换变换
    const tabsElm = document.getElementById('el-tabs-container')
    tabsElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    const tabsElm = document.getElementById('el-tabs-container')
    tabsElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    lang(val, lodVal) {
      // console.log(val, lodVal)
      this.setOptions(this.chartData)
    }
  },
  methods: {
    setOptions(chartData) {
      if (chartData.Series === undefined) {
        return
      }
      const SeriesData = []
      const SeriesNameList = []
      chartData.Series.forEach(element => {
        SeriesNameList.push(element.seriesName)
        SeriesData.push({
          name: element.seriesName,
          type: 'bar',
          stack: 'Group', // 名字随意取两序列相同即可，达到堆叠效果使用
          data: element.data,
          label: {
            normal: {
              show: true
            }
          }
        })
      })
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: SeriesNameList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: chartData.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: SeriesData
      })
    },
    toParentComp(params) {
      this.$emit('selectBarJx', params)
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
      const vm = this
      this.chart.on('click', function(params) {
        vm.toParentComp(params.name)
      })
    }
  }
}
</script>
