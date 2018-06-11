<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="24" :md="6" :lg="6">
        <el-card class="box-card" style="height:100vh" shadow="always">
          <el-input placeholder="查询关键字" v-model="filterText" style="margin-bottom:30px;"></el-input>
          <el-tabs v-model="activeName">
            <el-tab-pane label="单位级别" name="dwjb">
              <el-tree class="filter-tree" :expand-on-click-node='false' :data="treeDwjb" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree1" @node-click="ClickTreeHandle"></el-tree>
            </el-tab-pane>
            <el-tab-pane label="战斗舰艇" name="zdjt">
              <el-tree class="filter-tree" :expand-on-click-node='false' :data="treeZdjt" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2" @node-click="ClickTreeHandle"></el-tree>
            </el-tab-pane>
            <el-tab-pane label="辅助舰艇" name="fzjt">
              <el-tree class="filter-tree" :expand-on-click-node='false' :data="treeFzjt" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree3" @node-click="ClickTreeHandle"></el-tree>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="18" :lg="18">
        <el-tabs v-model="activeName2" type="border-card" style="height:100vh" class="el-tabs-container">
          <el-tab-pane label="当前修理计划" name="dqxljh">
            <repair-plan></repair-plan>
          </el-tab-pane>
          <el-tab-pane label="历史维修次数" name="lswxcs">
            <history-count :tree-type="treeType" :tree-text="treeText"></history-count>
          </el-tab-pane>
          <el-tab-pane label="历史维修经费" name="lswxjf">
            <history-funds></history-funds>
          </el-tab-pane>
          <el-tab-pane label="维修概况列表" name="wxgkb">
            <overview-list></overview-list>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getZdTree, getFzTree, getDwTree } from '@/api/jtwx'
import {
  HistoryCount,
  HistoryFunds,
  OverviewList,
  RepairPlan
} from './components'

export default {
  watch: {
    filterText(val) {
      this.$refs.tree1.filter(val)
      this.$refs.tree2.filter(val)
      this.$refs.tree3.filter(val)
    }
  },

  components: {
    HistoryCount,
    HistoryFunds,
    OverviewList,
    RepairPlan
  },

  created() {
    this.GetTreeFun()
  },

  data() {
    return {
      filterText: '',
      activeName: 'zdjt',
      activeName2: 'lswxcs',
      treeType: 'all',
      treeText: '全海军',
      treeZdjt: [],
      treeFzjt: [],
      treeDwjb: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    ClickTreeHandle(obj, node, tree) {
      this.treeType = obj.type
      this.treeText = obj.label
    },
    GetTreeFun() {
      // 获取左侧树结构数据
      getDwTree().then(response => {
        this.treeDwjb = response.data
      })
      getZdTree().then(response => {
        this.treeZdjt = response.data
      })
      getFzTree().then(response => {
        this.treeFzjt = response.data
      })
    }
  }
}
</script>

<style scoped>
</style>