<template>
  <div>
    <AppHeader />
    <div class="page-content">
      <NuxtPage />
    </div>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Nuxt 3 auto-imports components from the components/ directory,
// so AppHeader and TheFooter are available without explicit imports here.
</script>

<style>
/* Global styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #fdfdfd;
}

.page-content {
  padding: 20px;
}

h1, h2, h3, h4, h5, h6 {
  color: #111;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

ul {
  padding-left: 20px;
}
li {
  margin-bottom: 8px;
}

pre {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid #eee;
  font-size: 0.9em;
}

/* Basic styling for a table, if data includes tables */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
