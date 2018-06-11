<template>
  <div>
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="8">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>维修信息概况</span>
          </div>
          <div class="card-component-sm">
            <Info-table :tableData="wxOverViewInfoData.wxxxgk"></Info-table>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>历史维修艘次数:{{wxOverViewInfoData.jtwxcs}}(艘次)</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="wxCountPieData" :chart-name="'战斗舰艇总数'"></pieChart>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>历史维修经费:{{wxOverViewInfoData.jtwxjf}}(万元)</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="wxFundsPieData" :chart-name="'辅助舰艇总数'"></pieChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>舰艇维修统计柱状图</span>
        </div>
        <div style="text-align: center">
          <el-radio-group v-model="radioBarType" @change="radioSelectChange" size="mini">
            <el-radio label=1 border>当年在修</el-radio>
            <el-radio label=2 border>当年进厂</el-radio>
            <el-radio label=3 border>上年转接</el-radio>
            <el-radio label=4 border>当年完工</el-radio>
          </el-radio-group>
        </div>
        <div class='chart-bar-container' style="height:300px">
          <barChart @selectBar="selectBarWxYearXb" :chart-data="wxYearCountBarData" :chart-name="'舰艇维修统计柱状图'"></barChart>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import InfoTable from '@/components/InfoTable'
import pieChart from '@/components/Charts/pieChart'
import barChart from '@/components/Charts/barChart'
import {
  getWxOverView_Api,
  getWxCount_Api,
  getWxFunds_Api,
  GetWxYearCountDnzx_Api,
  GetWxYearCountDnjc_Api,
  GetWxYearCountSnzj_Api,
  GetWxYearCountDnwg_Api
} from '@/api/jtwx'

export default {
  components: {
    InfoTable,
    pieChart,
    barChart
  },

  computed: {
    // treeTextType: {
    //   get() { // 加get和set 可实现读取和设置
    //     return this.treeType + this.treeText
    //   }
    // }
    treeTextType: function() {
      // 单独函数只是读取
      return this.treeType + this.treeText
    }
  },

  created() {
    this.getOverViewInfo()
    this.getWxCountPie()
    this.getWxFundsPie()
    this.getWxYearCountBar()
  },

  methods: {
    getOverViewInfo() {
      // 获取维修概况
      getWxOverView_Api(this.treeText, this.treeType).then(response => {
        this.wxOverViewInfoData.wxxxgk = response.data.wxxxgk
        this.wxOverViewInfoData.jtwxcs = response.data.jtwxcs
        this.wxOverViewInfoData.jtwxjf = response.data.jtwxjf
      })
    },
    getWxCountPie() {
      // 获取历史维修艘次数
      getWxCount_Api(this.treeText, this.treeType).then(response => {
        this.wxCountPieData = response.data
      })
    },
    getWxFundsPie() {
      // 获取历史维修经费
      getWxFunds_Api(this.treeText, this.treeType).then(response => {
        this.wxFundsPieData = response.data
      })
    },
    getWxYearCountBar() {
      // 获取历史维修柱状图数据
      switch (this.radioBarType) {
        case '1': // 当年在修
          GetWxYearCountDnzx_Api(this.treeText, this.treeType).then(
            response => {
              this.wxYearCountBarData = response.data
            }
          )
          break
        case '2': // 当年进厂
          GetWxYearCountDnjc_Api(this.treeText, this.treeType).then(
            response => {
              this.wxYearCountBarData = response.data
            }
          )
          break
        case '3': // 上年转接
          GetWxYearCountSnzj_Api(this.treeText, this.treeType).then(
            response => {
              this.wxYearCountBarData = response.data
            }
          )
          break
        case '4': // 当年完工
          GetWxYearCountDnwg_Api(this.treeText, this.treeType).then(
            response => {
              this.wxYearCountBarData = response.data
            }
          )
          break
        default:
          break
      }
    },
    radioSelectChange(selecter) {
      this.getWxYearCountBar()
    },
    selectBarWxYearXb(params) {
      console.log(params)
    }
  },

  data() {
    return {
      wxOverViewInfoData: {
        wxxxgk: [],
        jtwxcs: null,
        jtwxjf: null
      },
      wxCountPieData: [],
      wxFundsPieData: [],
      wxYearCountBarData: {},
      radioBarType: '1'
    }
  },

  props: {
    treeType: {
      type: String,
      default: 'all'
    },
    treeText: {
      type: String,
      default: ''
    }
  },

  watch: {
    treeTextType(val, oldval) {
      this.getOverViewInfo()
      this.getWxCountPie()
      this.getWxFundsPie()
      this.getWxYearCountBar()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-component-sm {
  height: 264px;
}
</style>
