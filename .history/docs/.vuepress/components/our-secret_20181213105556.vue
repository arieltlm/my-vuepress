<template>
    <div class="our-secret-wrapper" v-show="showMask">
        <div class="input-secret-box">
            <h2>love</h2>
            <label>请输入暗号：<input type="password" v-model="ourSecret"  @onChange="submitSecret"></label>
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
            this.showMask = this.ourSecret !== 'gtlm';
        }
    }
}
</script>
<style lang="scss" scoped>
    .our-secret-wrapper{
        position:absolute;
        top: 3.6rem;
        left: 20rem;
        right:0;
        bottom:0;
        display:flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.9);
        .input-secret-box{
            width: 20rem;
            height: 12rem;
            border: 1px solid #ccc;
        }
    }
</style>
