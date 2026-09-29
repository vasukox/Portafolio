<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-paper text-ink">
    <TheNavbar />
    <main class="flex-1">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>
