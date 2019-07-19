<template>
    <div class="our-secret-wrapper" v-show="true">
        <div class="input-secret-box">
            <h2>love</h2>
            <label>请输入暗号：<input type="password" v-model="ourSecret" placeholder="暗号"></label>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ourSecret: ''
        }
    }
}
</script>
<style>

</style>
