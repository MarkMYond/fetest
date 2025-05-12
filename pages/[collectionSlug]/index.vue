<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <div v-if="pending">Loading items...</div>
    <div v-else-if="error">Error fetching items: {{ error.message }}</div>
    <ul v-else-if="items && items.docs && items.docs.length">
      <li v-for="item in items.docs" :key="item.id">
        <NuxtLink :to="`/${collectionSlug}/${item.slug || item.id}`">
          {{ item.title || item.name || item.filename || `Item ID: ${item.id}` }}
        </NuxtLink>
        <span v-if="item.slug"> (Slug: {{ item.slug }})</span>
      </li>
    </ul>
    <div v-else>No items found in this collection.</div>

    <hr v-if="!pending && !error" style="margin: 20px 0;" />
    <h3>Raw Data for Collection:</h3>
    <pre v-if="!pending && !error">{{ items }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const PAYLOAD_API_URL = 'http://localhost:3333/api';

interface BaseItem {
  id: string;
  title?: string; // Common for pages
  name?: string;  // Common for categories, users
  filename?: string; // Common for media
  slug?: string;
}

interface PayloadCollectionResponse {
  docs: BaseItem[];
  // other pagination fields
}

const route = useRoute();
const collectionSlug = ref(route.params.collectionSlug as string);

const items = ref<PayloadCollectionResponse | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);

const pageTitle = computed(() => {
  if (!collectionSlug.value) return 'Collection';
  // Capitalize first letter and replace hyphens with spaces
  const formatted = collectionSlug.value.replace(/-/g, ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
});

async function fetchItems(slug: string) {
  if (!slug) return;
  try {
    pending.value = true;
    error.value = null;
    const response = await fetch(`${PAYLOAD_API_URL}/${slug}?limit=20&depth=0`); // depth=0 for list view
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for slug ${slug}`);
    }
    items.value = await response.json();
  } catch (e: any) {
    console.error(`Failed to fetch items for ${slug}:`, e);
    error.value = e;
    items.value = null; // Clear previous items on error
  } finally {
    pending.value = false;
  }
}

// Fetch items when the component is mounted and when the slug changes
watch(
  () => route.params.collectionSlug,
  async (newSlug) => {
    collectionSlug.value = newSlug as string;
    await fetchItems(collectionSlug.value);
  },
  { immediate: true } // Fetch on initial load
);
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}
a {
  font-weight: bold;
}
</style>
