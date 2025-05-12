<template>
  <nav class="top-menu">
    <ul>
      <li><NuxtLink to="/web-pages">Web Pages</NuxtLink></li>
      <li><NuxtLink to="/wiki-pages">Wiki Pages</NuxtLink></li>
      <li><NuxtLink to="/registry-pages">Registry Pages</NuxtLink></li>
      <li><NuxtLink to="/categories">Categories</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.top-menu {
  background-color: #f0f0f0;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.top-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.top-menu a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.top-menu a:hover,
.top-menu a.router-link-active {
  color: #007bff;
  text-decoration: underline;
}
</style>
