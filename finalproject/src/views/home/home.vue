<template>
  <el-container>
    <el-header>
      <home-header />
    </el-header>
    <el-container>
      <home-aside></home-aside>
      <home-main></home-main>
    </el-container>
  </el-container>
</template>

<script>
import homeMain from "./component/homeMain.vue";
import homeAside from "./component/homeAside.vue";
import homeHeader from "./component/homeHeader.vue";
export default {
  components: { homeMain, homeAside, homeHeader },
  name: "Home",
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 0 !important;
  height: 45px!important;
  background-color: #ffffff;
}
</style>
