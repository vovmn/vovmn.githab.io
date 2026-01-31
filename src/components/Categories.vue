<template>
  <section class="featured">
    <div class="container">
      <h2 class="featured-title">Популярные товары</h2>

      <div v-if="featuredProducts.length" class="featured-grid">
        <CardCatalog
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
          :showCategory="false"
          @card-click="openModal"
          @details-click="openModal"
        />
      </div>

      <p v-else class="featured-empty">
        Товары скоро появятся
      </p>
    </div>

    <ModalPriceSizes
      v-if="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import CardCatalog from '@/components/CardCatalog.vue'
import ModalPriceSizes from '@/components/ModalPriceSizes.vue'
import { useProducts } from '@/composables/useProducts'

/* 🔹 ТУТ ВПИСЫВАЕШЬ ID НУЖНЫХ ТОВАРОВ */
const FEATURED_IDS = [
  72, 162,      // Вотан
  94, 171,      // Марквина
  143, 187,     // Мрамор итальянский
  85, 86, 165, 166, // Королевский опал
  198,          // Черный королевский жемчуг
  160,          // Луна
  20,           // Венге магия ЛДСП
  49,           // Мокко ЛДСП
  50            // Сосна Северная (серебряная)
] 

const { productsData } = useProducts()

/* сохраняем порядок как в FEATURED_IDS */
const featuredProducts = computed(() => {
  if (!Array.isArray(productsData.value)) return []

  const map = new Map(
    productsData.value.map(product => [product.id, product])
  )

  return FEATURED_IDS
    .map(id => map.get(id))
    .filter(Boolean)
})

/* modal */
const showModal = ref(false)
const selectedProduct = ref(null)

const openModal = (product) => {
  selectedProduct.value = product
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.featured {
  padding: 3rem 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.featured-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.featured-empty {
  text-align: center;
  color: #777;
  font-size: 1rem;
}

/* адаптив */
@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-title {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }
}
</style>
