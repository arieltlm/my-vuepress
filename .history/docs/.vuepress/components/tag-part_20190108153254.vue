<template>
    <div class="tag-part">
        <span :class="bgcolor">{{tagName}}</span>
    </div>
</template>
<script>
    export default {
        props:{
            tagName:{
                type:String,
                default:'javascript'
            }
        },
        computed:{
            bgcolor(){
                return {
					'html-bgcolor':this.tagName ==='html',
					'js-bgcolor':this.tagName ==='javascript',
					'css-bgcolor':this.tagName ==='css',
					'es6-bgcolor':this.tagName ==='es6',
					'vue-bgcolor':this.tagName ==='vue',
					'ie8-bgcolor':this.tagName ==='IE8',
					'vuepress-bgcolor':this.tagName ==='vuepress',
					'git-bgcolor':this.tagName ==='git',
					'react-bgcolor':this.tagName ==='react',
					'immutable-bgcolor':this.tagName ==='immutable',
					'npm-bgcolor':this.tagName ==='npm',
				}
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tag-part{
        float:right;
        margin-right:20px;
        span{
            position: relative;
            display: inline-block;
            min-width: 60px;
            padding:0 5px;
            height:25px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            line-height: 1.5;
            text-align: center;
            background-color:rgb(9, 129, 45);
            text-shadow: 0 1px hsl(0,0%,85%), 0 2px #aaa, 0 3px #000;
            color:#fff;
            font-weight: 600;
            font-size:14px;
            box-shadow: 0 1px 5px gray;
            &:after{
                position: absolute;
                top:0;
                left:-24px;
                display:inline-block;
                content:'';
                width:0;
                height:0;
                border:12px solid;
                border-color:transparent rgb(9, 129, 45) transparent transparent;
            }
        }
        span.html-bgcolor{background:red;&:after{border-right-color:red;}}
        span.js-bgcolor{background:orange;&:after{border-right-color:orange;}}
        span.css-bgcolor{background:#2174fd;&:after{border-right-color:#2174fd;}}
        span.es6-bgcolor{background:#a1119a;&:after{border-right-color:#a1119a;}}
        span.vue-bgcolor{background:#984cff;&:after{border-right-color:#984cff;}}
        span.ie8-bgcolor{background:#1bdbfd;&:after{border-right-color:#1bdbfd;}}
        span.vuepress-bgcolor{background:#ee6a94;&:after{border-right-color:#ee6a94;}}
        span.git-bgcolor{background:#6a82ee;&:after{border-right-color:#6a82ee;}}
        span.react-bgcolor{background:#ee3b71;&:after{border-right-color:#ee3b71;}}
        span.immutable-bgcolor{background:#d1e424;&:after{border-right-color:#d1e424;}}
        span.npm-bgcolor{background:#23aaad;&:after{border-right-color:#23aaad;}}
    }
</style>


