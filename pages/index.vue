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
    cell: ({ row }) => `${row.getValue("name")}`,
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => "Rp. " + row.getValue("price"),
  },
];

const search = ref("");
</script>

<template>
  <UCard>
    <template #header>
      <div class="justify-items-center">
        <h1 class="font-bold">Jajanin Aja Pricing</h1>
      </div>
    </template>
    <!-- <div class="justify-items-center mb-3">
      <NuxtImg src="gallery.webp" />
    </div> -->
    <!-- <UCard class="sm:p-0 p-0"> -->
    <div class="flex px-4 py-3.5 border-b border-[var(--ui-border-accented)]">
      <UInput v-model="search" class="max-w-sm" placeholder="Cari Produk..." />
    </div>
    <UTable
      :data="data?.[0]?.products"
      :columns="columns"
      :global-filter="search"
      class=""
    />
    <!-- </UCard>/ -->

    <!-- <template #footer> </template> -->
  </UCard>
</template>
