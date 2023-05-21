<script setup lang="ts"></script>

<template>
  <div>
    above left
    <LeftNavigation />
    below
    <main>
      main..
      <!-- Your main content goes here -->
      <router-view />
    </main>
  </div>
</template>

<script>
import LeftNavigation from './left-navigation.vue'

export default {
  name: 'AppLayout',
  components: {
    LeftNavigation
  }
}
</script>

<style>
/* Add any custom styles for the app layout here */
</style>
