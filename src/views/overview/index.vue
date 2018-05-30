<template>
  <div class="overview-components-container">
    <el-row :gutter="10">

      <el-col :sm="24" :md="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.jtxxgk')}}</span>
          </div>
          <div class="card-component-sm">
            <Info-table :tableData="overViewInfoData.infoTable"></Info-table>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.zdjtzs')}}:{{overViewInfoData.zdjtzs}}{{$t('jtgk.card.ships')}}</span>
          </div>
          <div class="card-component-sm">
            <pieChart @selectPieJx="selectPieZdJx" :chart-data="ZdPieData" :chart-name="'战斗舰艇分布'"></pieChart>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.fzjtzs')}}:{{overViewInfoData.fzjtzs}}{{$t('jtgk.card.ships')}}</span>
          </div>
          <div class="card-component-sm">
            <pieChart @selectPieJx="selectPieFzJx" :chart-data="FzPieData" :chart-name="'辅助舰艇分布'"></pieChart>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row>
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="当前舰型在修在航统计柱状图" name="first">
            <div class='chart-container'>
              <mix-chart height='100%' width='100%'></mix-chart>
            </div>
          </el-tab-pane>
          <el-tab-pane label="当前舰型维修经费统计柱状图" name="second">
            <mix-chart height='100%' width='100%'></mix-chart>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <el-table :key='tableKey' border :data="list" @sort-change="handleSortChange" @filter-change="filterChangeHandler" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
          <el-table-column width="100px" align="center" :label="$t('jtgk.table.yjpt')">
            <template slot-scope="scope">
              <span>{{scope.row.yjpt}}</span>
            </template>
          </el-table-column>
          <el-table-column width="105px" align="center" :label="$t('jtgk.table.ejpt')">
            <template slot-scope="scope">
              <span>{{scope.row.ejpt}}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" align="center" :label="$t('jtgk.table.jx')" sortable="custom" prop="jx" :filters="filterList" :filter-method="filterHandler" column-key="jx">
            <template slot-scope="scope">
              <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.jx}}</span>
            </template>
          </el-table-column>
          <el-table-column width="105px" align="center" :label="$t('jtgk.table.sszj')" sortable="custom" prop="sszj">
            <template slot-scope="scope">
              <span>{{scope.row.sszj}}</span>
            </template>
          </el-table-column>
          <el-table-column width="90px" align="center" :label="$t('jtgk.table.zhl')" sortable="custom" prop="zhl">
            <template slot-scope="scope">
              <span style='color:red;'>{{scope.row.zhl | changePercentage}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" :label="$t('jtgk.table.zxs')" sortable="custom" prop="zxs">
            <template slot-scope="scope">
              <span>{{scope.row.zxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('jtgk.table.zxzxs')" sortable="custom" prop="zxzxs">
            <template slot-scope="scope">
              <span>{{scope.row.zxzxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('jtgk.table.xxzxs')" sortable="custom" prop="xxzxs">
            <template slot-scope="scope">
              <span>{{scope.row.xxzxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('jtgk.table.wxzxs')" sortable="custom" prop="wxzxs">
            <template slot-scope="scope">
              <span>{{scope.row.wxzxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('jtgk.table.hxzxs')" sortable="custom" prop="hxzxs">
            <template slot-scope="scope">
              <span>{{scope.row.hxzxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" :label="$t('jtgk.table.wjzxs')" sortable="custom" prop="wjzxs">
            <template slot-scope="scope">
              <span>{{scope.row.wjzxs}}</span>
            </template>
          </el-table-column>
          <el-table-column width="105px" align="center" :label="$t('jtgk.table.dnjf')" sortable="custom" prop="dnjf">
            <template slot-scope="scope">
              <span>{{scope.row.dnjf | keepDec(3)}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div align="center">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import InfoTable from '@/components/InfoTable'
import pieChart from '@/components/Charts/pieChart'
import mixChart from '@/components/Charts/mixChart'
import {
  fetchList,
  getOverViewInfoTable,
  getFzjtPieData,
  getZdjtPieData
} from '@/api/jtgk'
import { parseTime } from '@/utils'

export default {
  name: 'index',
  data() {
    return {
      activeName: 'first',
      overViewInfoData: {
        infoTable: [],
        zdjtzs: null,
        fzjtzs: null
      },
      ZdPieData: [],
      FzPieData: [],
      tableKey: 0,
      list: null,
      total: null,
      filterList: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        jx: null,
        sszj: null,
        zhl: null,
        zxs: null,
        zxzxs: null,
        xxzxs: null,
        wxzxs: null,
        hxzxs: null,
        wjzxs: null,
        dnjf: null,
        sort_field: 'jx',
        sort_type: 'ascending',
        paramEjpt: null,
        selValList: []
      }
    }
  },
  created() {
    this.getOverViewInfo()
    this.getZdPieData()// 列表依赖战斗舰艇请求来的第一条数据
    this.getFzPieData()
    // console.log('satartGetList')
    // setTimeout(this.getList(), 3000)
    // console.log('endGetList')
  },
  components: {
    mixChart,
    InfoTable,
    pieChart
  },
  mounted() {},
  filters: {
    keepDec(num, decCount) {
      return num.toFixed(decCount)
    },
    changePercentage(num) {
      return num.toFixed(2) + '%'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.filterList = response.data.filterList
        this.listLoading = false
      })
    },
    getOverViewInfo() {
      getOverViewInfoTable().then(response => {
        this.overViewInfoData.infoTable = response.data.infotable
        this.overViewInfoData.zdjtzs = response.data.zdjtzs
        this.overViewInfoData.fzjtzs = response.data.fzjtzs
      })
    },
    getZdPieData() {
      getZdjtPieData().then(response => {
        this.ZdPieData = response.data.ZdPieData
        if (response.data.ZdPieData.length !== 0) {
          this.listQuery.paramEjpt = response.data.ZdPieData[0].name
          this.getList()
        }
      })
    },
    getFzPieData() {
      getFzjtPieData().then(response => {
        this.FzPieData = response.data.FzPieData
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSortChange(column, prop, order) {
      this.listQuery.sort_type = column.order
      this.listQuery.sort_field = column.prop
      this.listQuery.page = 1
      this.getList()
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterChangeHandler(filters) {
      for (var key in filters) {
        this.listQuery.selValList = filters[key]
      }
      this.getList()
    },
    selectPieZdJx(params) {
      console.log(params)
      this.listQuery.paramEjpt = params
      this.getList()
    },
    selectPieFzJx(params) {
      console.log(params)
      this.listQuery.paramEjpt = params
      this.getList()
    }
  }
}
</script>

<style scoped>
.overview-components-container {
  background-color: #f0f2f5;
  padding: 20px;
  min-height: calc(100vh - 84px);
}

.card-component-sm {
  min-height: 100px;
  height: 264px;
}
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 400px;
}
</style>
