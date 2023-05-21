<template>
  <div :class="{ 'ml-64': showNavigation }" class="min-h-screen bg-gray-100">
    <left-nav v-if="showNavigation"></left-nav>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import LeftNav from './components/layout/left-navigation.vue'
const store = useStore()
const isLoggedIn = computed(() => store.getters['isLoggedIn'])
const route = useRoute()

const showNavigation = computed(() => {
  const isUnauthenticatedPage = ['login', 'signup'].includes(route.name)
  return isLoggedIn.value && !isUnauthenticatedPage
})
</script>

<style scoped>
.main-content {
  @apply flex flex-1;
  padding: 24px;
}
</style>
