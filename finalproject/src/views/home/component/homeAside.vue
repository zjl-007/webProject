<template>
  <div style="margin-top: 10px; background-color: #fff">
    <el-radio-group>
      <el-button @click="changeMenu()">{{
        isCollapse ? "展开" : "折叠"
      }}</el-button>
      <!-- <el-radio-button :label="true">收起</el-radio-button> -->
    </el-radio-group>
    <el-menu
      :router="true"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
     active-text-color="#007acc"
      :collapse="isCollapse"
      unique-opened
      style="min-width: 70px; border: 0"
    >
      <el-submenu
        v-for="item in menuList"
        :index="item.index"
        :key="item.index"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.menuname }}</span>
        </template>
        <el-menu-item
          v-for="value in item.childrenMenuList"
          :index="value.path"
          :key="value.index"
          >{{ value.menuname }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import { queryMenus } from "../../../api/home/home";
export default {
  data() {
    return {
      menuList: [],
      isCollapse: true,
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    changeMenu() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
    },
    async getMenus() {
      let id = window.sessionStorage.getItem("id");
      try {
        const {
          data: { menuList, code, message },
        } = await queryMenus({ id });
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message,
          });
          return;
        }
        this.menuList = menuList;
      } catch (error) {
        this.$message({
          type: "warning",
          message: "系统错误",
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 201px;
  min-height: 400px;
}
.el-menu {
  min-width: 69px;
}
</style>
