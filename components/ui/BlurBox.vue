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
    background-color: #ffffff30;
    flex: none;
    inset: 0;
    overflow: hidden;
    position: absolute;
}

.dark .item-blur-1,
.dark .item-blur-2,
.dark .item-blur-3,
.dark .item-blur-4 {
    background-color: #00000030;
}


.item-blur-4 {
    -webkit-backdrop-filter: blur(20px);
    -webkit-mask: linear-gradient(0deg, transparent 76%, var(--ui-primary));
    backdrop-filter: blur(20px);
    mask: linear-gradient(0deg, transparent 76%, var(--ui-primary));
}

.item-blur-3 {
    -webkit-backdrop-filter: blur(10px);
    -webkit-mask: linear-gradient(0deg, transparent 50%, var(--ui-primary) 75%);
    backdrop-filter: blur(10px);
    mask: linear-gradient(0deg, transparent 50%, var(--ui-primary) 75%);
}

.item-blur-2 {
    -webkit-backdrop-filter: blur(5px);
    -webkit-mask: linear-gradient(0deg, transparent 25%, var(--ui-primary) 50%);
    backdrop-filter: blur(5px);
    mask: linear-gradient(0deg, transparent 25%, var(--ui-primary) 50%);
}

.item-blur-1 {
    -webkit-backdrop-filter: blur(2px);
    -webkit-mask: linear-gradient(0deg, transparent, var(--ui-primary) 25%);
    backdrop-filter: blur(2px);
    mask: linear-gradient(0deg, transparent, var(--ui-primary) 25%);
}
</style>
