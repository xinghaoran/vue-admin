<template>
  <div class="overview-components-container">
    <el-row :gutter="10" style="margin-bottom: 10px">

      <el-col :sm="24" :md="24" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>舰艇信息概况</span>
          </div>
          <div class="card-component-sm">
            <Info-table :tableData="tableData"></Info-table>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>战斗舰艇总数：324艘</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="ZdPieData" :chart-name="'战斗舰艇分布'"></pieChart>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>辅助舰艇总数：152艘</span>
          </div>
          <div class="card-component-sm">
            <pieChart :chart-data="FzPieData" :chart-name="'辅助舰艇分布'"></pieChart>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row style="margin-bottom: 10px">
      <el-card class="box-card">
        <div class="">
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
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        
      </el-card>
    </el-row>

  </div>
</template>

<script>
import InfoTable from '@/components/InfoTable'
import pieChart from '@/components/Charts/pieChart'
import mixChart from '@/components/Charts/mixChart'

export default {
  name: 'index',
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          infotext: '现役舰船数：',
          infovalue: '449'
        },
        {
          infotext: '总吨位：',
          infovalue: '2496'
        },
        {
          infotext: '在修舰船数：',
          infovalue: '25'
        },
        {
          infotext: '在航舰船数：',
          infovalue: '424'
        },
        {
          infotext: '在航率：',
          infovalue: '94.43%'
        },
        {
          infotext: '当年修理经费：',
          infovalue: '200'
        }
      ],
      ZdPieData: [
        { value: 5, name: '航空母舰' },
        { value: 100, name: '护卫舰' },
        { value: 150, name: '驱逐舰' },
        { value: 41, name: '两栖舰' },
        { value: 32, name: '登录舰' }
      ],
      FzPieData: [
        { value: 35, name: '补给舰' },
        { value: 44, name: '运输舰' },
        { value: 23, name: '维修船' }
      ]
    }
  },
  components: {
    mixChart,
    InfoTable,
    pieChart
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
.box-card-style {
  margin-top: 0px;
}
</style>
