<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { ProductItem, ProductPageInterface } from "~/types/products";

const sanity = useSanity();
const toast = useToast();

const query = groq`*[_type == "productPage"]`;
const { data, error } = await useAsyncData<ProductPageInterface[]>(
  "productPage",
  () => sanity.fetch(query)
);

if (error.value) {
  toast.add({
    title: "Terjadi Kesalahan",
    description: "Iya aku salah... Maaf ya",
    color: "error",
  });
}

const columns: TableColumn<ProductItem>[] = [
  {
    accessorKey: "name",
    header: "Nama Produk",
    enableResizing: true,
    cell: ({ row }) => `${row.getValue("name")}`,
  },
  {
    accessorKey: "volume",
    header: "Berat/Volume",
    cell: ({ cell, row }) =>
      `${row.original.volume + " " + row.original.volumeType}`,
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => "Rp. " + row.getValue("price"),
  },
];

const search = ref("");

const sorting = ref([
  {
    id: "name",
    desc: false,
  },
]);

const generateNGrams = (str: string, n: number): string[] => {
  const nGrams = [];
  for (let i = 0; i < str.length - n + 1; i++) {
    nGrams.push(str.slice(i, i + n));
  }
  return nGrams;
}

const generateSkipGrams = (str: string, n: number): string[] => {
  const skipGrams = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      skipGrams.push(str[i] + str[j]);
    }
  }
  return skipGrams;
}

const filteredData = computed(() => {
  const searchNGrams = generateNGrams(search.value.toLowerCase(), 3);
  const searchSkipGrams = generateSkipGrams(search.value.toLowerCase(), 2);
  return data.value[0].products.filter(item => {
    const nameNGrams = generateNGrams(item.name.toLowerCase(), 3);
    const nameSkipGrams = generateSkipGrams(item.name.toLowerCase(), 2);
    const priceNGrams = generateNGrams(item.price.toString().toLowerCase(), 3);
    return searchNGrams.every(ngram =>
      nameNGrams.includes(ngram) || priceNGrams.includes(ngram)
    ) || searchSkipGrams.every(skipgram =>
      nameSkipGrams.includes(skipgram)
    );
  });
});

const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <section class="py-5">
    <UContainer>
      <UCard>
        <div>
          <div class="sticky top-0 pb-3 bg-white dark:bg-zinc-900 mb-3">
            <div class="flex">
              <div class="grow">
                <h1 class="font-bold text-xl">JajaninAja Pricing</h1>
                <p>#BantuMenujuLebihLemu</p>
              </div>
              <div class="flex items-center gap-3">
                <ClientOnly v-if="!colorMode?.forced">
                  <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" size="xl" variant="outline"
                    @click="isDark = !isDark" />
                </ClientOnly>
                <UInput v-model="search" icon="material-symbols:search" size="xl" type="search"
                  placeholder="Cari Produk..." />
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <UCard v-for="(product, index) in filteredData">
              <h3 class="font-semibold text-[var(--ui-primary)]" v-text="product.name"></h3>
              <div class="flex gap-3">
                <p v-text="`Rp` + product.price.toLocaleString('id-ID')"></p>
                <span>—</span>
                <p v-text="product.volume.toLocaleString('id-ID') + product.volumeType"></p>
              </div>
            </UCard>
          </div>
        </div>
      </UCard>
    </UContainer>
  </section>
</template>
