<template>
  <div v-if="pending">Loading page content...</div>
  <div v-else-if="error">Error fetching page: {{ error.message }}</div>
  <div v-else-if="pageData">
    <h1>{{ pageData.title || pageData.name || pageData.filename }}</h1>
    
    <div v-if="pageData.layout && Array.isArray(pageData.layout)">
      <h2>Content Blocks (Layout):</h2>
      <div v-for="(block, index) in pageData.layout" :key="block.id || index">
        <div v-if="block.blockType === 'content'">
          <h3>Content Block {{ index + 1 }}</h3>
          <h4>Raw Rich Text JSON:</h4>
          <pre>{{ block.content }}</pre>
          <!-- TODO: Add a component to render Lexical rich text JSON as HTML -->
        </div>
        <div v-else>
          <pre>Unknown block type: {{ block.blockType }} - {{ block }}</pre>
        </div>
      </div>
    </div>
    <div v-else-if="pageData.pageBuilder && Array.isArray(pageData.pageBuilder)">
      <h2>Content Blocks (PageBuilder):</h2>
      <div v-for="(block, index) in pageData.pageBuilder" :key="block.id || index">
         <div v-if="block.blockType === 'content'">
          <h3>Content Block {{ index + 1 }}</h3>
          <h4>Raw Rich Text JSON:</h4>
          <pre>{{ block.content }}</pre>
          <!-- TODO: Add a component to render Lexical rich text JSON as HTML -->
        </div>
        <div v-else>
          <pre>Unknown block type: {{ block.blockType }} - {{ block }}</pre>
        </div>
      </div>
    </div>
    <div v-else-if="collectionSlug === 'categories' || collectionSlug === 'media'">
        <p>Displaying details for a non-page collection item.</p>
    </div>
    <div v-else>
      <p>No layout or pageBuilder blocks found for this item, or it's not a page-like collection.</p>
    </div>

    <hr style="margin: 20px 0;" />
    <h3>Raw Page Data:</h3>
    <pre>{{ pageData }}</pre>
  </div>
  <div v-else>Page not found.</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// const PAYLOAD_API_URL = 'http://localhost:3333/api'; // Removed hardcoded URL
const config = useRuntimeConfig(); // Use Nuxt's runtime config

// Define a more generic type for page data as structure varies
interface BlockData {
  id?: string;
  blockType: string;
  content?: any; // For ContentBlock's rich text
  // other block fields
}
interface Page {
  id: string;
  title?: string;
  name?: string;
  filename?: string;
  slug?: string;
  layout?: BlockData[]; // For WebPages
  pageBuilder?: BlockData[]; // For WikiPages, RegistryPages
  // other fields
}

const route = useRoute();
const collectionSlug = ref(route.params.collectionSlug as string);
const itemSlug = ref(route.params.itemSlug as string);

const pageData = ref<Page | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);

async function fetchPage(collection: string, slug: string) {
  if (!collection || !slug) return;
  try {
    pending.value = true;
    error.value = null;
    // Fetch by slug. Payload returns an array in `docs`.
    // Using depth=1 to fetch basic block data. Increase if needed for nested relations in blocks.
    const response = await fetch(`${config.public.apiUrl}/${collection}?where[slug][equals]=${slug}&limit=1&depth=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
      pageData.value = data.docs[0];
    } else {
      pageData.value = null; // Not found
    }
  } catch (e: any) {
    console.error(`Failed to fetch page ${collection}/${slug}:`, e);
    error.value = e;
    pageData.value = null;
  } finally {
    pending.value = false;
  }
}

watch(
  () => [route.params.collectionSlug, route.params.itemSlug],
  async ([newCollectionSlug, newItemSlug]) => {
    collectionSlug.value = newCollectionSlug as string;
    itemSlug.value = newItemSlug as string;
    await fetchPage(collectionSlug.value, itemSlug.value);
  },
  { immediate: true }
);
</script>

<style scoped>
/* Styles specific to this page can go here */
h1 {
  margin-bottom: 0.5em;
}
h2 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}
h3 {
  margin-top: 1em;
  color: #555;
}
h4 {
  font-style: italic;
  color: #777;
}
</style>
