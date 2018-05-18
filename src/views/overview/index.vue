<template>
  <div class="overview-components-container">
    <el-row :gutter="20" >

      <el-col :sm="24" :md="12" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>舰艇信息概况</span>
          </div>
          <div class="component-item">
            <Info-table :tableData="tableData"></Info-table>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>战斗舰艇总数：324艘</span>
          </div>
          <div class="component-item">
            <chart height='100%' width='100%'></chart>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :md="12" :lg="8" class="box-card-style">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>舰艇信息概况</span>
          </div>
          <div class="component-item">
            <button @click="hehe()"></button>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import InfoTable from '@/components/InfoTable'
  import Chart from '@/components/Charts/pieChart'

  export default {
    name: 'index',
    data() {
      return {
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
        ]
      }
    },
    components: {
      InfoTable,
      Chart
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .overview-components-container {
    background-color: #f0f2f5;
    padding: 20px;
    min-height: calc(100vh - 84px);
  }
  .component-item{
    min-height: 100px;
    height:264px;
  }
  .box-card-style{
    margin-top: 10px;
  }
  .chart-container{
    position: relative;
    padding: 20px;
    width: 100%;
    height:264px;
  }
</style>
