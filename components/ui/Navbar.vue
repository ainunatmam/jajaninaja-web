<template>
    <UiBlurBox class="top-0" />
    <div class="sticky z-30 top-0 py-3 mb-3">
        <UContainer>
            <div class="grid gap-3 lg:flex">
                <div class="grow">
                    <h1 class="font-bold text-[var(--ui-primary)] text-xl">Daftar Harga JajaninAja</h1>
                    <p>#BantuMenujuLebihLemu</p>
                </div>
                <div class="flex items-center gap-3">
                    <ClientOnly v-if="!colorMode?.forced">
                        <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" size="xl" variant="outline"
                            @click="isDark = !isDark" />
                    </ClientOnly>
                    <UInput v-model="search" icon="material-symbols:search" class="grow" size="xl" type="search"
                        placeholder="Cari Produk..." />
                </div>
            </div>
        </UContainer>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    modelValue?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value?: string): void
}>()

const search = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue)
})


const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>