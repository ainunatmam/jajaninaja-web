<template>
    <div :class="[
        'blur-box-container',
        props.class
    ]">
        <div class="item-blur-4"></div>
        <div class="item-blur-3"></div>
        <div class="item-blur-2"></div>
        <div class="item-blur-1"></div>
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
const props = withDefaults(defineProps < {
    class?: HTMLAttributes['class']
} > (), {
    class: 'bottom-0 rotate-180'
})
</script>
<style scoped>
.blur-box-container {
    bottom: 0;
    flex: none;
    height: 180px;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    right: 0;
    z-index: 6;
}

.item-blur-1,
.item-blur-2,
.item-blur-3,
.item-blur-4 {
    background-color: #ffffff03;
    flex: none;
    inset: 0;
    overflow: hidden;
    position: absolute;
}

.item-blur-4 {
    -webkit-backdrop-filter: blur(10px);
    -webkit-mask: linear-gradient(0deg, transparent 76%, #000);
    backdrop-filter: blur(10px);
    mask: linear-gradient(0deg, transparent 76%, #000);
}

.item-blur-3 {
    -webkit-backdrop-filter: blur(5px);
    -webkit-mask: linear-gradient(0deg, transparent 50%, #000 75%);
    backdrop-filter: blur(5px);
    mask: linear-gradient(0deg, transparent 50%, #000 75%);
}

.item-blur-2 {
    -webkit-backdrop-filter: blur(3px);
    -webkit-mask: linear-gradient(0deg, transparent 25%, #000 50%);
    backdrop-filter: blur(3px);
    mask: linear-gradient(0deg, transparent 25%, #000 50%);
}

.item-blur-1 {
    -webkit-backdrop-filter: blur(1px);
    -webkit-mask: linear-gradient(0deg, transparent, #000 25%);
    backdrop-filter: blur(1px);
    mask: linear-gradient(0deg, transparent, #000 25%);
}
</style>
