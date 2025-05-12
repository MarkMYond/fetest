<template>
  <div>
    <h2>Welcome to the Frontend Test App!</h2>
    <p>
      This is the homepage for the Nuxt 3 frontend (`fetest`). 
      Use the menu above to navigate to different collections fetched from the Payload CMS.
    </p>
    <p>
      The Payload CMS backend (`payl` project) should be running on 
      <code>http://localhost:3333</code> for data fetching to work.
    </p>
  </div>
</template>

<script setup lang="ts">
// No specific script needed for a simple static homepage
useHead({
  title: 'Frontend Test Home',
})
</script>

<style scoped>
p {
  line-height: 1.6;
  margin-bottom: 1em;
}
code {
  background-color: #e9e9e9;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
