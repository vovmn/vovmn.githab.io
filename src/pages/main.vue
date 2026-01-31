<template>
  <div class="home-page">
    <Header />
    <Hero />
    <PopularProducts />
    <Reviews />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Hero from '@/components/Hero.vue'
import PopularProducts from '@/components/Categories.vue'
import Reviews from '@/components/Reviews.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
