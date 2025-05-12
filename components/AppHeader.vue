<template>
  <!-- Added py-3 for 12px top/bottom padding, and sticky positioning -->
  <header class="bg-white shadow-sm border-b-2 border-brand-50 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 z-50">
    <div class="flex justify-between h-16 items-center">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <NuxtLink to="/" class="flex items-center">
            <!-- Logo structure matching footer: text above SVG -->
            <div class="flex flex-col items-center">
              <span class="text-lg font-medium text-brand-primary">Taash</span>
              <!-- Adjusted back to -mt-1 -->
              <svg width="242" height="72" viewBox="0 0 303 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-auto transform scale-75 -mt-1">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.482267 20.68C18.0131 41.1066 37.5109 44.8134 59.5396 27C68.1172 19.4134 110.44 -23.2 151.077 18.1466C178.489 -9.08003 208.593 -3.98659 240.505 22.7867C252.597 32.4801 272.283 53.5734 302.092 21.5201C299.703 65.1067 261.879 95.6133 205.072 87.7466C182.205 84.0133 164.944 71.2266 151.499 55.68C123.911 84.5733 104.704 95.84 53.2125 85.2133C18.3369 74.0933 3.0188 54 0.482267 20.68Z" fill="currentColor" class="text-brand-primary"/>
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Centered Navigation (Desktop) -->
        <nav class="hidden lg:flex justify-center flex-1"> <!-- flex-1 to take space, justify-center -->
          <div class="flex space-x-8"> <!-- Inner div for spacing -->
            <NuxtLink to="/" class="text-brand-900 dark:text-brand-100 hover:text-brand-700 dark:hover:text-brand-200 px-3 py-2 text-base font-medium [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Home</NuxtLink>
            <NuxtLink to="/product" class="text-brand-900 dark:text-brand-100 hover:text-brand-700 dark:hover:text-brand-200 px-3 py-2 text-base font-medium [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Product</NuxtLink>
            <NuxtLink to="/wiki" class="text-brand-900 dark:text-brand-100 hover:text-brand-700 dark:hover:text-brand-200 px-3 py-2 text-base font-medium [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Knowledge Base</NuxtLink>
            <NuxtLink to="/registry" class="text-brand-900 dark:text-brand-100 hover:text-brand-700 dark:hover:text-brand-200 px-3 py-2 text-base font-medium [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Registry</NuxtLink>
            <!-- Add other main navigation links here if needed -->
          </div>
        </nav>

        <!-- Right Actions Group -->
        <div class="flex items-center space-x-4">
          <!-- Join Waitlist Button -->
          <NuxtLink 
            to="/get-in-touch" 
            class="hidden lg:inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-brand-primary rounded-full shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            Join Waitlist
          </NuxtLink>

          <!-- Icon Buttons - Using Icon component instead of direct Phosphor imports -->
          <div class="hidden lg:flex items-center space-x-2">
             <button type="button" aria-label="Search" class="p-2 rounded-full bg-brand-primary text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white">
               <Icon name="ph:magnifying-glass-bold" class="w-5 h-5" />
             </button>
             <button type="button" aria-label="Ask" class="p-2 rounded-full bg-brand-primary text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white">
               <Icon name="ph:chat-circle-dots-bold" class="w-5 h-5" />
             </button>
             <button type="button" aria-label="Login" class="p-2 rounded-full bg-brand-primary text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white">
               <Icon name="ph:user-circle-bold" class="w-5 h-5" />
             </button>
          </div>

          <!-- Mobile menu button -->
          <div class="lg:hidden ml-4"> <!-- Keep margin for mobile -->
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              type="button"
              class="bg-white dark:bg-slate-900 p-2 rounded-md text-brand-900 dark:text-brand-100 hover:text-brand-700 dark:hover:text-brand-200 hover:bg-brand-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
              aria-controls="mobile-menu"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Heroicon name: menu -->
              <svg
                v-if="!isMobileMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <!-- Heroicon name: x -->
              <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div> <!-- End Right Actions Group -->
      </div> <!-- End flex justify-between -->

    <!-- Mobile menu, show/hide based on menu state. -->
    <div
      v-show="isMobileMenuOpen"
      class="lg:hidden border-t border-brand-50"
      id="mobile-menu"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink to="/" @click="isMobileMenuOpen = false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-900 dark:text-brand-100 hover:bg-brand-100 dark:hover:bg-gray-700 hover:border-brand-100 dark:hover:border-gray-600 hover:text-brand-700 dark:hover:text-brand-200 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Home</NuxtLink>
        <NuxtLink to="/product" @click="isMobileMenuOpen = false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-900 dark:text-brand-100 hover:bg-brand-100 dark:hover:bg-gray-700 hover:border-brand-100 dark:hover:border-gray-600 hover:text-brand-700 dark:hover:text-brand-200 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Product</NuxtLink>
        <NuxtLink to="/wiki" @click="isMobileMenuOpen = false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-900 dark:text-brand-100 hover:bg-brand-100 dark:hover:bg-gray-700 hover:border-brand-100 dark:hover:border-gray-600 hover:text-brand-700 dark:hover:text-brand-200 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Knowledge Base</NuxtLink>
        <NuxtLink to="/registry" @click="isMobileMenuOpen = false" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-brand-900 dark:text-brand-100 hover:bg-brand-100 dark:hover:bg-gray-700 hover:border-brand-100 dark:hover:border-gray-600 hover:text-brand-700 dark:hover:text-brand-200 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">Registry</NuxtLink>
        <!-- Add other mobile navigation links here -->
      </div>
      <!-- Optional: Add mobile "Get Started" button or other actions here -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Using Icon component from @nuxt/icon instead of importing from @phosphor-icons/vue

const isMobileMenuOpen = ref(false);
</script>
