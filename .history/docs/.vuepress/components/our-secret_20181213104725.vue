<template>
    <div class="our-secret-wrapper" v-show="showMask">
        <div class="input-secret-box">
            <h2>love</h2>
            <label>请输入暗号：<input type="password" v-model="ourSecret" placeholder="暗号" @onChange="submitSecret"></label>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ourSecret: '',
            showMask: true,
        }
    },
    methods: {
        submitSecret() {
            this.showMask = this.ourSecret != 'gtlm';
        }
    }
}
</script>
<style>

</style>
