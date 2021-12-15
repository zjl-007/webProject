<template>
    <div class="login">
        <div class="contentbox">
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
            </div>
            <h3 class="title">流量实时监测系统</h3>
        </div>
    </div>
</template>



<script>
export default {
    name: 'Login',
    created() {
        console.log("login")
    }
}
</script>

<style scoped lang="less">
    .login {
        position: relative;
        height: 100%;
        background-color: #eee;
    }
    
    .contentbox {
        position: absolute;
        height: 300px;
        width: 500px;
        border-radius: 3px;
        background-color: #fff; 
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        h3 {
            color: red;
        }
    }
    .title {
        font-size: 22px;
        text-align: center;
        margin-top: 20px;
    }
    .logo, .logo img{
        height: 100px;
        width: 100px;
        border-radius: 50%;
    }
    .logo {
        position: absolute;
        padding: 10px;
        left: 50%;
        top: -25%;
        transform: translate(-50%);
        border: 1px solid #eee;
        border-radius: 50%;
        overflow: hidden;
        background-color: #fff;
    }
</style>