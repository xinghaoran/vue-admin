<template>
  <el-table
    :data="tableData"
    :stripe="true"
    :show-header="false"
    style="width: 100%">
    <el-table-column
      prop="infotext"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="infovalue"
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        // tableData: [{
        //   infotext: '现役舰船数：',
        //   infovalue: '449'
        // },
        // {
        //   infotext: '总吨位：',
        //   infovalue: '2496'
        // },
        // {
        //   infotext: '在修舰船数：',
        //   infovalue: '25'
        // },
        // {
        //   infotext: '在航舰船数：',
        //   infovalue: '424'
        // },
        // {
        //   infotext: '在航率：',
        //   infovalue: '94.43%'
        // },
        // {
        //   infotext: '当年修理经费：',
        //   infovalue: '200'
        // }
        // ]
      }
    },
    props: {
      tableData: {
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>
