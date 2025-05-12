<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <div v-if="pending">Loading items...</div>
    <div v-else-if="error">
      <p>Error fetching items: {{ error.message }}</p>
      <div class="mt-4">
        <p>Available collections include:</p>
        <ul class="available-collections">
          <li><code>categories</code></li>
          <li><code>media</code></li>
          <li><code>templates</code></li>
          <li><code>web-pages</code></li>
          <li><code>wiki-pages</code></li>
          <li><code>registry-pages</code></li>
          <li><code>users</code></li>
          <li><code>payload-locked-documents</code></li>
          <li><code>payload-preferences</code></li>
          <li><code>payload-migrations</code></li>
        </ul>
      </div>
    </div>
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

// const PAYLOAD_API_URL = 'http://localhost:3333/api'; // Removed hardcoded URL
const config = useRuntimeConfig(); // Use Nuxt's runtime config

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
  
  // List of valid collections based on payload-types.ts
  const validCollections = [
    'users', 
    'media', 
    'categories', 
    'web-pages', 
    'wiki-pages', 
    'registry-pages', 
    'templates',
    'payload-locked-documents',
    'payload-preferences',
    'payload-migrations'
  ];
  
  try {
    pending.value = true;
    error.value = null;
    
    // Validate the collection name before making the request
    if (!validCollections.includes(slug)) {
      throw new Error(`Invalid collection: "${slug}". This collection does not exist in the API.`);
    }
    
    const response = await fetch(`${config.public.apiUrl}/${slug}?limit=20&depth=0`); // depth=0 for list view
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
.available-collections {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.available-collections li {
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 5px;
}
a {
  font-weight: bold;
}
</style>
