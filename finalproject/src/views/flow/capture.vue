<template>
  <div>
    <el-button size="mini" @click="startCapture">开始</el-button>
    <el-button size="mini" @click="stopCapture">停止</el-button>
    <el-button size="mini" @click="getCapture">获取</el-button>
    <el-button size="mini" @click="saveData">保存</el-button>
  </div>
</template>

<script>
import { startCapture, stopCapture, getCapture, toSaveData } from "../../api/flow/capture";
export default {
  name: "Capture",
  data() {
    return {};
  },
  created() {},
  methods: {
    async startCapture() {
      try {
        const res = await startCapture();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async stopCapture() {
      try {
        const res = await stopCapture();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getCapture() {
      try {
        const res = await getCapture();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async saveData() {
      let id = window.sessionStorage.getItem('id');
      try {
        const res = await toSaveData({id});
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>