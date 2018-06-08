<template>
  <div>
    <el-row :gutter="10">
      <el-col :sm="24" :md="24" :lg="8">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.jtxxgk')}}</span>
            <!-- <div align="right">
                      <el-button circle size="small" type="primary" icon="el-icon-download"></el-button>
                    </div> -->
          </div>
          <div class="card-component-sm">
            <Info-table :tableData="overViewInfoData.infoTable"></Info-table>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card" shadow="always">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.zdjtzs')}}:{{overViewInfoData.zdjtzs}}{{$t('jtgk.card.ships')}}</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="ZdPieData" :chart-name="'战斗舰艇总数'"></pieChart>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="12" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('jtgk.card.fzjtzs')}}:{{overViewInfoData.fzjtzs}}{{$t('jtgk.card.ships')}}</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="FzPieData" :chart-name="'辅助舰艇总数'"></pieChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InfoTable from '@/components/InfoTable'
import pieChart from '@/components/Charts/pieChart'
import {
  getOverViewInfoTable,
  getFzjtPieData,
  getZdjtPieData
} from '@/api/jtgk'

export default {
  components: {
    InfoTable,
    pieChart
  },

  computed: {
    treeTextType: {
      get() { // 需要加get
        return this.treeType + this.treeText
      }
    }
  },

  created() {
    this.getOverViewInfo()
    this.getZdPieData()
    this.getFzPieData()
  },

  methods: {
    getOverViewInfo() {
      // 获取概况信息
      getOverViewInfoTable().then(response => {
        this.overViewInfoData.infoTable = response.data.infotable
        this.overViewInfoData.zdjtzs = response.data.zdjtzs
        this.overViewInfoData.fzjtzs = response.data.fzjtzs
      })
    },
    getZdPieData() {
      getZdjtPieData().then(response => {
        // 获取战斗舰船饼图数据
        this.ZdPieData = response.data.ZdPieData
      })
    },
    getFzPieData() {
      // 获取辅助舰船饼图数据
      getFzjtPieData().then(response => {
        this.FzPieData = response.data.FzPieData
      })
    }
  },

  data() {
    return {
      overViewInfoData: {
        infoTable: [],
        zdjtzs: null,
        fzjtzs: null
      },
      ZdPieData: [],
      FzPieData: []
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
      console.log(val)
      this.getOverViewInfo()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-component-sm {
  height: 264px;
}
</style>
