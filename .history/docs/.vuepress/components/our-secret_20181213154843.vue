<template>
    <div class="our-secret-wrapper" v-show="showMask">
        <div class="input-secret-box">
            <h1>😘<span>Love Story</span>😊</h1>
            <label>请输入暗号：
                <input type="text" autocomplete="off" v-model="ourSecret" @change="submitSecret">
                <span class="goto-btn" @click="submitSecret">✈</span>
            </label>
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
    mounted() {
        if (sessionStorage.ourSecret === "\u0067\u0074\u006c\u006d") {
            this.showMask = false;
        }
    },
    methods: {
        submitSecret() {
            this.showMask = this.ourSecret !== "\u0067\u0074\u006c\u006d";
            // this.showMask = this.ourSecret !== window.atob('gtlm');
            this.hintText = this.ourSecret !== unescape("\u0067\u0074\u006c\u006d".replace(/\\/g, "%")) ? '暗号不对哦😣,快询问管理员！': '';
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
        &:before{
            background: url(../public/images/love.jpg) center/100% 100%  fixed no-repeat;
            content:'';
            position: absolute;
            top:-3.6rem;right:0;left:-20rem;bottom:0;
            filter:blur(9px);
            z-index: 1;
        }
        .input-secret-box{
            position: relative;;
            top: -3.6rem;
            left: -10rem;
            z-index:10;
            width: 20rem;
            height: 12rem;
            background: #fff;
            border-radius: 5px;
            background: url(../public/images/love.jpg) no-repeat;
            background-size: 100% 100%;
            box-shadow: 6px 3px 30px 0px #888;;
            h1{
                text-align: center;
                span{
                    font-size: 2rem;
                    color: #be7272;
                    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(165, 249, 255, 1)), to(#be7272));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
            label{
                color: #be7272;
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
                border:1px solid #adb5c0;
                background:#f6e5d6;
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
