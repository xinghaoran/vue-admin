<template>
  <div>
    {{serverValue}}
  </div>
</template>

<script>
import { Test_Api } from '@/api/jtwx'

export default {
  data() {
    return {
      serverValue: 'dd'
    }
  },
  created() {
    this.getServerValue()
  },
  methods: {
    getServerValue() {
      Test_Api('nihao').then(response => {
        this.serverValue = response.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
