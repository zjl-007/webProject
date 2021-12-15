<template>
  <div class="hello">
    <button @click="start">开始</button>
    <button @click="stop">停止</button>
    <button @click="get">get</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    console.log(this);
    this.$ajax({
      url: '/',
    }).then(res => {
      console.log("success");
      
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    start() {
      this.$ajax({
      url: '/start',
      }).then(res => {
        console.log("stop");
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    stop() {
      this.$ajax({
      url: '/stop',
      }).then(res => {
        console.log("stop");
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    get() {
      this.$ajax({
      url: '/get',
      }).then(res => {
        console.log("stop");
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
