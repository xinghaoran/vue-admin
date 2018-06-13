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
    <el-row>
      <el-card class="box-card" shadow="always" style="height:420px">
        <div slot="header" class="clearfix">
          <span>舰艇维修列表</span>
        </div>
        <div class="card-component-sm">
          <el-table height="300" border :data="list" @sort-change="handleSortChange" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
            <el-table-column width="100px" align="center" label="舷号" sortable="custom" prop="xh">
              <template slot-scope="scope">
                <span>{{scope.row.xh}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px" align="center" label="修理单位" sortable="custom" prop="xldw">
              <template slot-scope="scope">
                <span>{{scope.row.xldw}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120px" align="center" label="修理级别" sortable="custom" prop="xljb">
              <template slot-scope="scope">
                <span>{{scope.row.xljb}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" align="center" label="修理开始时间" sortable="custom" prop="sjxlkssj">
              <template slot-scope="scope">
                <span>{{scope.row.sjxlkssj}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120px" align="center" label="修理结束时间" sortable="custom" prop="sjxljssj">
              <template slot-scope="scope">
                <span>{{scope.row.sjxljssj}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100px" align="center" label="总经费" sortable="custom" prop="zjf">
              <template slot-scope="scope">
                <span>{{scope.row.zjf}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100px" align="center" label="备注" sortable="custom" prop="bz">
              <template slot-scope="scope">
                <span>{{scope.row.bz}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div align="center" style="margin-top:10px">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
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
  GetWxYearCountDnwg_Api,
  GetJtWxList_Api
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
    this.getJtWxList()
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
    selectBarWxYearXb(params) { // 点击柱状图
      this.listQuery.nf = params.name
      this.listQuery.xljb = params.seriesName
      this.listQuery.page = 1
      this.getJtWxList()
    },
    handleSortChange(params) { // { column, prop, order }
      this.listQuery.sort_type = params.order
      this.listQuery.sort_field = params.props
      this.listQuery.page = 1
      this.getJtWxList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getJtWxList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getJtWxList()
    },
    getJtWxList() {
      GetJtWxList_Api(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
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
      radioBarType: '1',
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        sort_field: 'xh',
        sort_type: 'ascending',
        nf: null,
        xljb: null
      }
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
      this.listQuery.nf = null
      this.listQuery.xljb = null
      this.getJtWxList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-component-sm {
  height: 264px;
}
</style>
