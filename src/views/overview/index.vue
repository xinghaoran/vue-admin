<template>
  <div class="overview-components-container">
    <el-row :gutter="20" style="margin-top:50px;">

      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Material Design 的input</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <md-input icon="search" name="title" placeholder="输入标题" v-model="demo.title">标题</md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图片hover效果</span>
          </div>
          <div class="component-item">
            <pan-thumb width="100px" height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
              vue-element-admin
            </pan-thumb>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>水波纹 waves v-directive</span>
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">水波纹效果</el-button>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>
  .overview-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }
</style>
