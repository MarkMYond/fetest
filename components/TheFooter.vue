<template>
  <!-- Reduced top padding -->
  <footer
    class="flex justify-center items-center pt-20 max-md:pt-12 max-sm:pt-8"
  >
    <div class="flex-1 mx-10 max-w-[1160px] max-sm:mx-5">
      <!-- Further reduced vertical gap between main content and copyright -->
      <div
        class="flex flex-col gap-32 gap-y-8 max-md:gap-24 max-md:gap-y-6 max-sm:gap-16 max-sm:gap-y-4">
        <!-- Main footer content container -->
        <div
          class="flex gap-10 gap-y-10 justify-between items-start max-md:flex-col"
        >
          <!-- Logo and Social Icons (Centered) -->
          <div
            class="flex flex-col justify-center items-center text-sm leading-5 max-w-[174px]"
          >
            <a
              aria-current="page"
              href="/"
              class="max-w-full"
            >
              <div class="flex flex-col items-center">
                <span class="text-lg font-medium text-brand-primary">Taash</span>
                <svg width="242" height="72" viewBox="0 0 303 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-auto transform scale-75 -mt-1">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.482267 20.68C18.0131 41.1066 37.5109 44.8134 59.5396 27C68.1172 19.4134 110.44 -23.2 151.077 18.1466C178.489 -9.08003 208.593 -3.98659 240.505 22.7867C252.597 32.4801 272.283 53.5734 302.092 21.5201C299.703 65.1067 261.879 95.6133 205.072 87.7466C182.205 84.0133 164.944 71.2266 151.499 55.68C123.911 84.5733 104.704 95.84 53.2125 85.2133C18.3369 74.0933 3.0188 54 0.482267 20.68Z" fill="currentColor" class="text-brand-primary"/>
                </svg>
              </div>
            </a>
            <!-- Social Icons Moved Here -->
            <div class="flex gap-4 gap-y-4 justify-center items-center mt-4">
              <a
                v-for="(social, index) in socialLinks"
                :key="social.id || index"
                target="_blank"
                :href="social.url"
                class="max-w-full transition-opacity hover:opacity-80 text-brand-primary"
              >
                <!-- Assuming social.iconName holds the Phosphor icon name like 'TwitterLogo' -->
                <Icon 
                  v-if="social.iconName" 
                  :name="`ph:${social.iconName}`" 
                  class="w-8 h-8 stroke-[2]"
                />
              </a>
            </div>
          </div>

          <!-- Link Columns - Centered group with ~100px gap -->
          <!-- Use justify-center and gap-x-24 (96px) -->
          <div class="flex flex-1 justify-center items-start max-w-[488px] gap-x-24">
            <div
              v-for="(column, index) in footerColumns"
              :key="column.id || index"
              class="flex flex-col gap-3 gap-y-3 justify-start items-start text-base leading-relaxed [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']"
            >
              <div class="mb-2"> 
                <div class="text-brand-900 dark:text-brand-100 text-2xl leading-8 max-sm:text-lg max-sm:leading-7">
                  {{ column.title }}
                </div>
              </div>
              <a
                v-for="(link, linkIndex) in column.links"
                :key="link.id || linkIndex"
                :href="link.url"
                class="text-base leading-relaxed cursor-pointer text-brand-900 hover:opacity-80 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']"
              >
                {{ link.text }}
              </a>
            </div>
          </div>

          <!-- Strapline (Previously Strapline and Social Links) -->
          <div class="flex flex-col flex-1 gap-8 gap-y-8 max-w-[338px]">
            <div>
              <!-- Line height reduced one notch: leading-relaxed -> leading-normal, max-sm:leading-normal -> max-sm:leading-snug -->
              <p v-if="tagline" class="pt-1 text-4xl font-medium leading-normal max-sm:text-2xl max-sm:leading-snug text-brand-primary">{{ tagline }}</p>
            </div>
            <!-- Social icons div removed from here -->
          </div>
        </div>

        <!-- Copyright Section - Reduced bottom margin -->
        <div class="pt-8 mb-5">
          <div class="h-[2px] bg-brand-50 w-full mb-5"></div> <!-- Divider, using h-[2px] for ~3px feel with border-box, or use h-[3px] if exact -->
          <div
            v-if="copyrightContent"
            class="flex justify-center items-start text-sm leading-5 text-brand-900 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']"
          >
            <!-- Render copyright using the rich text renderer -->
            <div
              v-if="renderedCopyrightHtml"
              class="text-sm leading-5 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']"
              v-html="renderedCopyrightHtml"
            ></div>
            <!-- Fallback if rendering fails or content is empty -->
            <div v-else class="text-sm leading-5 [font-variant-ligatures:stylistic] [font-feature-settings:'ss01']">
              &copy; {{ new Date().getFullYear() }} Taash. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'; 
import { useRuntimeConfig } from 'nuxt/app';
import { PhPaperPlaneTilt } from '@phosphor-icons/vue';
import { useRichTextRenderer, type RichTextRoot } from '../composables/useRichTextRenderer';

// Define our own FooterType since it's not in payload-types.ts
interface FooterType {
  logo?: { url?: string; alt?: string } | null;
  tagline?: string | null;
  linkColumns?: Array<{
    id?: string;
    title?: string;
    links?: Array<{
      id?: string;
      text: string;
      url: string;
    }>;
  }>;
  socialLinks?: Array<{
    id?: string;
    iconName?: string;
    url: string;
  }>;
  copyright?: { 
    root?: RichTextRoot
  } | null;
  subscribePlaceholder?: string | null;
}

// --- Fetch Footer Data ---
const config = useRuntimeConfig();
const apiUrl = config.public?.apiUrl || ''; // Using the correct config key in fetest

// The endpoint path should NOT include /api because apiUrl already includes it
const footerEndpointPath = '/globals/footer?depth=1';

// Use useAsyncData for better SSR compatibility with computed properties
const { data: footerData, pending, error } = await useAsyncData<FooterType | null>('footer-global-data', async () => {
  if (!apiUrl || typeof apiUrl !== 'string') {
    console.error('Footer: API URL is not configured or is not a string.');
    return null;
  }
  try {
    return await $fetch(footerEndpointPath, {
      baseURL: apiUrl,
    });
  } catch (e) {
    console.error('Failed to fetch footer data from API:', e);
    // Check if the error is due to trying to fetch from localhost:3333
    if (typeof apiUrl === 'string' && apiUrl.includes('localhost:3333')) {
      console.warn('Footer fetch attempt was made to localhost:3333. Check your API URL configuration.');
    }
    return null;
  }
});

// --- Computed properties for template ---
const logo = computed(() => footerData.value?.logo ?? null);
const tagline = computed(() => footerData.value?.tagline ?? null);
const footerColumns = computed(() => footerData.value?.linkColumns || []);
const subscribePlaceholder = computed(() => footerData.value?.subscribePlaceholder ?? null);
const socialLinks = computed(() => footerData.value?.socialLinks || []);
const copyrightContent = computed(() => (footerData.value?.copyright as { root: RichTextRoot } | undefined) ?? null);

// --- Use Rich Text Renderer for Copyright ---
const copyrightRoot = computed(() => copyrightContent.value?.root ?? undefined);
const { renderedHtml: renderedCopyrightHtml } = useRichTextRenderer(copyrightRoot);
</script>
