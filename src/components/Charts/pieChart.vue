<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import local from './lang/local'

const viewName = 'pieChart'

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
      type: Array
    },
    chartName: {
      type: String,
      default: ''
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
        // return this.$store.state.app.language
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
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'center',
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: this.chartName,
            type: 'pie',
            radius: ['30%', '70%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'outer',
                  formatter: '{b} : {c}艘'
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: 'inner',
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              }
            },
            data: chartData
          }
        ]
      })
    },
    toParentComp(params) {
      this.$emit('selectPieJx', params)
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
