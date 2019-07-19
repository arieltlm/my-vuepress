<template>
    <div class="our-secret-wrapper" v-show="showMask">
        <div class="input-secret-box">
            <h1>fsfds</h1>
            <label>请输入暗号：<input type="text" autocomplete="off" v-model="ourSecret" @change="submitSecret"></label>
            <span class="hint">{{hintText}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ourSecret: '',
            showMask: true,
            hintText: '',
        }
    },
    methods: {
        submitSecret() {
            this.showMask = this.ourSecret !== 'gtlm';
            this.hintText = this.ourSecret !== 'gtlm' ? '暗号不对哦😣,快询问管理员！': '';
            sessionStorage.ourSecret = this.ourSecret;
            this.ourSecret = '';
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
        background: pink;
        .input-secret-box{
            width: 20rem;
            height: 12rem;
            background: #fff;
            border-radius: 5px;
            h1{
                text-align: center;
            }
            label{
                text-align: center;
                margin: 0 auto;
                display: inline-block;
                width: 100%;
                font-weight: 600;
            }
            input{
                width: 10rem;
                height:28px;
                border-radius: 3px;
                outline:none;
                border:1px solid #adb5c0
            }
            input:-webkit-autofill {
                background-color: #FAFFBD;
                background-image: none;
                color: #000;
            }
            .hint{
                font-size: 12px;
                color: red;
                padding-left: 2rem;
            }
        }
    }
</style>
