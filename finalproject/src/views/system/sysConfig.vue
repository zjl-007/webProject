<template>
  <el-card class="box-card">
    <h3>系统信息修改</h3>
    <div class="content">
      <div class="left">
        left
      </div>
      <div class="right">
        right
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'sysConfig',
  data() {
    return {
      
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
  }
}
</style>