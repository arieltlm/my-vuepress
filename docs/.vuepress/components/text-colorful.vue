<template>
<div class="text-colorful">
    <span :style="{color:color,background:bgColor}" class="text">
        <slot></slot>
    </span>
</div>
    
</template>
<script>
    export default {
        props:{
            color:{
                type:String,
            },
            bgColor:{
                type:String,
                default:'transparent'
            }
        },
    }
</script>
<style lang="scss" scoped>
    .text-colorful{
        margin:5px 0;
        .text{
            padding: 5px;
        }
    }
</style>
