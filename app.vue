<template>
  <div>
    <h1>Frontend Test (Nuxt 3)</h1>
    
    <h2>Web Pages from Payload:</h2>
    <div v-if="pending">Loading web pages...</div>
    <div v-else-if="error">Error fetching web pages: {{ error.message }}</div>
    <ul v-else-if="webPages && webPages.docs && webPages.docs.length">
      <li v-for="page in webPages.docs" :key="page.id">
        {{ page.title }} (Slug: {{ page.slug }})
      </li>
    </ul>
    <div v-else>No web pages found.</div>

    <hr style="margin: 20px 0;" />

    <h2>Raw Web Pages Data:</h2>
    <pre v-if="!pending && !error">{{ webPages }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const PAYLOAD_API_URL = 'http://localhost:3333/api';

interface WebPage {
  id: string;
  title: string;
  slug: string;
  // Add other fields if you expect them
}

interface PayloadResponse {
  docs: WebPage[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

const webPages = ref<PayloadResponse | null>(null);
const pending = ref(true);
const error = ref<Error | null>(null);

onMounted(async () => {
  try {
    pending.value = true;
    error.value = null;
    const response = await fetch(`${PAYLOAD_API_URL}/web-pages?limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    webPages.value = await response.json();
  } catch (e: any) {
    console.error('Failed to fetch web pages:', e);
    error.value = e;
  } finally {
    pending.value = false;
  }
});
</script>

<style>
body {
  font-family: sans-serif;
  padding: 20px;
}
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}
</style>
