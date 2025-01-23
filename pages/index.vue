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

useSeoMeta({
  title: 'Daftar Harga JajaninAja'
})
</script>

<template>
  <UiNavbar v-model="search"/>
  <section class="py-5">
    <UContainer>
      <div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          <UCard v-for="(product, index) in filteredData" class="relative cursor-pointer hover:ring-2 hover:ring-[var(--ui-primary)] overflow-hidden group">
            <SanityImage :asset-id="product.image?.asset._ref" auto="format"
              class="absolute top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-30 blur-2xl inset-0" />
            <div class="items-center relative gap-3">
              <div class="w-full aspect-square rounded-lg shrink-0 mb-3 group-hover:shadow relative overflow-hidden">
                <SanityImage :asset-id="product.image?.asset._ref" auto="format"
                  class="w-full absolute top-1/2 -translate-y-1/2" />
              </div>
              <div class="grow">
                <h3 class="font-bold line-clamp-1 text-[var(--ui-primary)] mb-1" v-text="product.name"></h3>
                <div class="flex gap-3">
                  <div class="flex text-sm bg-green-200 px-1.5 py-0.5 text-green-800 gap-2 items-center border border-green-800 rounded">
                    <UIcon name="eva:pricetags-fill" size="20px"/>
                    <p v-text="`Rp` + product.price.toLocaleString('id-ID')"></p>
                  </div>
                  <p v-text="product.volume.toLocaleString('id-ID') + product.volumeType"></p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
  <UiFooter/>
</template>
