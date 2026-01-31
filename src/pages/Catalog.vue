<template>
  <div class="catalog-page">
    <Header />

    <main class="catalog-main">
      <div class="container">
        <h1 class="page-title">Каталог продукции</h1>

        <button
          v-if="activeFilter !== 'all' || appliedSearch || currentPage !== 1"
          @click="resetAllFilters"
          class="reset-filters-btn"
        >
          Сбросить все фильтры
        </button>

        <!-- Поле поиска -->
        <div class="search-container">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>

            <!-- ✅ ВАЖНО: v-model теперь на searchInput -->
            <input
              v-model="searchInput"
              type="text"
              class="search-input"
              placeholder="Поиск товаров..."
              @keydown.enter.prevent="applySearch"
            />

            <!-- очистка поля ввода -->
            <button
              v-if="searchInput"
              @click="clearSearchInput"
              class="clear-search-btn"
              type="button"
              aria-label="Очистить"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          </div>

          <!-- ✅ Кнопка "Найти" + инфо -->
          <div class="search-info" v-if="searchInput || appliedSearch">
            <span v-if="appliedSearch">Найдено товаров: {{ filteredProducts.length }}</span>
            <span v-else>Введите запрос и нажмите Enter</span>

            <div style="display:flex; gap:0.5rem; align-items:center;">
              <button
                class="clear-all-btn"
                type="button"
                @click="applySearch"
                :disabled="!searchInput.trim()"
                title="Применить поиск"
              >
                Найти
              </button>

              <button
                v-if="appliedSearch"
                class="clear-all-btn"
                type="button"
                @click="clearAppliedSearch"
                title="Очистить примененный поиск"
              >
                Очистить поиск
              </button>
            </div>
          </div>
        </div>

        <!-- Загрузка данных -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Загрузка каталога...</p>
        </div>

        <!-- Ошибка загрузки -->
        <div v-else-if="error" class="error">
          <p>Ошибка загрузки каталога: {{ error }}</p>
          <button @click="reloadProducts" class="retry-btn">Попробовать снова</button>
        </div>

        <!-- Основной контент -->
        <div v-else>
          <!-- Фильтры по категориям -->
          <div class="category-filters">
            <button
              v-for="category in categories"
              :key="category.id"
              :class="['filter-btn', { active: activeFilter === category.id }]"
              @click="setActiveFilter(category.id)"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Сообщение при отсутствии результатов -->
          <div v-if="appliedSearch && filteredProducts.length === 0" class="no-results">
            <svg class="no-results-icon" viewBox="0 0 24 24" width="48" height="48">
              <path
                fill="#6b7280"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            <p class="no-results-title">Товары не найдены</p>
            <p class="no-results-text">
              По запросу "{{ appliedSearch }}" ничего не найдено.
              <br />Попробуйте изменить запрос или сбросить фильтры.
            </p>
            <button @click="clearAppliedSearch" class="back-to-catalog-btn">
              Вернуться к каталогу
            </button>
          </div>

          <!-- Если есть товары -->
          <template v-else-if="filteredProducts.length > 0">
            <div class="pagination-info">
              <div class="pagination-stats">
                Показано {{ startItem }}-{{ endItem }} из {{ filteredProducts.length }} товаров
              </div>
            </div>

            <div class="products-grid">
              <CardCatalog
                v-for="(product, i) in paginatedProducts"
                :key="product.id"
                :product="product"
                :index="pageStartIndex + i"
                :eager-count="8"
                :high-priority-count="2"
                @details-click="openModal"
                @card-click="openModal"
              />
            </div>

            <div v-if="totalPages > 1" class="pagination">
              <button
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
                class="pagination-btn pagination-prev"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
                Назад
              </button>

              <div class="pagination-numbers">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  :class="['pagination-number', { active: currentPage === page }]"
                >
                  {{ page }}
                </button>
                <span v-if="showEllipsis" class="pagination-ellipsis">...</span>
              </div>

              <button
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
                class="pagination-btn pagination-next"
              >
                Вперед
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </template>

          <!-- Если нет товаров -->
          <div v-else class="no-products">
            <p>Товары в этой категории скоро появятся</p>
          </div>
        </div>
      </div>
    </main>

    <ModalPriceSizes
      v-if="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CardCatalog from '@/components/CardCatalog.vue'
import ModalPriceSizes from '@/components/ModalPriceSizes.vue'
import { useProducts } from '@/composables/useProducts'

const ITEMS_PER_PAGE = 21

const route = useRoute()
const router = useRouter()

const {
  loading,
  error,
  getFilteredProducts: getFilteredProductsFromComposable,
  getAllCategories,
  reloadProducts
} = useProducts()

const categories = getAllCategories()

// --- URL params -> state
const parseUrlParams = () => {
  const params = route.query
  return {
    filter: params.filter && categories.some(c => c.id === params.filter) ? params.filter : 'all',
    page: params.page && parseInt(params.page) > 0 ? parseInt(params.page) : 1,
    search: params.search ? String(params.search) : ''
  }
}

const urlParams = parseUrlParams()

const activeFilter = ref(urlParams.filter)
const currentPage = ref(urlParams.page)

/**
 * ✅ Разделяем:
 * searchInput — что печатают
 * appliedSearch — что реально фильтрует
 */
const searchInput = ref(urlParams.search)
const appliedSearch = ref(urlParams.search)

const showModal = ref(false)
const selectedProduct = ref(null)
const isChangingPage = ref(false)

const pageStartIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE)

// --- URL builder (search берём из appliedSearch)
function buildQuery() {
  const query = {}
  if (activeFilter.value !== 'all') query.filter = activeFilter.value
  if (currentPage.value !== 1) query.page = String(currentPage.value)
  if (appliedSearch.value) query.search = appliedSearch.value
  return query
}

function updateUrl() {
  router.replace({ query: buildQuery(), hash: route.hash })
}

// filter/page — обновляем сразу
watch(activeFilter, () => updateUrl())
watch(currentPage, () => updateUrl())

// если меняем фильтр — сбрасываем страницу
watch(activeFilter, () => {
  currentPage.value = 1
})

// --- search actions
const applySearch = () => {
  const next = searchInput.value.trim()
  appliedSearch.value = next
  currentPage.value = 1
  updateUrl()
}

const clearSearchInput = () => {
  searchInput.value = ''
}

const clearAppliedSearch = () => {
  searchInput.value = ''
  appliedSearch.value = ''
  currentPage.value = 1
  updateUrl()
}

// --- filtering
const safeSearch = (products, query) => {
  if (!query || query.trim() === '') return products
  const normalizedQuery = query.toLowerCase().trim()

  return products.filter(product => {
    if (!product || typeof product !== 'object') return false
    const name = String(product.name || '').toLowerCase()
    const description = String(product.description || '').toLowerCase()
    const category = String(product.category || '').toLowerCase()

    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      category.includes(normalizedQuery)
    )
  })
}

const filteredProducts = computed(() => {
  let products = getFilteredProductsFromComposable(activeFilter.value)
  if (appliedSearch.value) products = safeSearch(products, appliedSearch.value)
  return products
})

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  return filteredProducts.value.slice(startIndex, startIndex + ITEMS_PER_PAGE)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE))

const startItem = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE + 1)
const endItem = computed(() => {
  const end = currentPage.value * ITEMS_PER_PAGE
  return end > filteredProducts.value.length ? filteredProducts.value.length : end
})

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal && newTotal > 0) currentPage.value = newTotal
})

const visiblePages = computed(() => {
  const maxVisible = 5
  const pages = []
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
    return pages
  }

  let start = Math.max(1, currentPage.value - 2)
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)

  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const showEllipsis = computed(() => totalPages.value > visiblePages.value.length)

// --- UI handlers
const setActiveFilter = (categoryId) => {
  activeFilter.value = categoryId
  // примененный поиск сбрасываем, иначе пользователь не поймёт, почему “ничего нет”
  searchInput.value = ''
  appliedSearch.value = ''
  currentPage.value = 1
  updateUrl()
}

const changePage = (page) => {
  if (isChangingPage.value) return
  if (page < 1 || page > totalPages.value) return

  isChangingPage.value = true
  currentPage.value = page

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => (isChangingPage.value = false), 400)
  })
}

// modal
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

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && showModal.value) closeModal()
}

const resetAllFilters = () => {
  activeFilter.value = 'all'
  currentPage.value = 1
  searchInput.value = ''
  appliedSearch.value = ''
  router.replace({ name: route.name })
}

// назад/вперед: подтягиваем URL -> состояние (и input, и applied)
watch(() => route.query, () => {
  const newParams = parseUrlParams()

  activeFilter.value = newParams.filter
  currentPage.value = newParams.page

  searchInput.value = newParams.search
  appliedSearch.value = newParams.search
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
ы
<!-- style оставь как у тебя -->

<style scoped>
/* ТВОЙ CSS ОСТАВЛЯЮ 1в1 — без изменений */
  
/* ТВОЙ CSS (как был) + sticky + улучшенный адаптив */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.reset-filters-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.reset-filters-btn:hover {
  background: #e5e7eb;
  color: #4b5563;
}

.catalog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.catalog-main {
  flex: 1;
  padding: 2rem 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.search-container {
  margin-bottom: 2.5rem;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto 1rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 2.8rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: #2b6cb0;
  box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-search-btn:hover {
  background: #f3f4f6;
  color: #6b7280;
}

.search-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.clear-all-btn {
  padding: 0.4rem 0.8rem;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.clear-all-btn:hover {
  background: #e5e7eb;
  color: #4b5563;
}

.loading {
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2b6cb0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 3rem;
  color: #e53e3e;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #2b6cb0;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.retry-btn:hover {
  background: #2c5282;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #2b6cb0;
  background: white;
  color: #2b6cb0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  background: #2b6cb0;
  color: white;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #2b6cb0;
  color: white;
}

.pagination-info {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.pagination-stats {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #4b5563;
  font-size: 0.9rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.no-results-icon {
  margin-bottom: 1.5rem;
}

.no-results-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

.no-results-text {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.back-to-catalog-btn {
  padding: 0.75rem 1.5rem;
  background: #2b6cb0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.back-to-catalog-btn:hover {
  background: #2c5282;
  transform: translateY(-2px);
}

.no-products {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  min-width: 80px;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #2b6cb0;
  color: #2b6cb0;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-number {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.pagination-number:hover {
  border-color: #2b6cb0;
  color: #2b6cb0;
}

.pagination-number.active {
  background: #2b6cb0;
  border-color: #2b6cb0;
  color: white;
}

.pagination-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: #6b7280;
}

/* sticky-поведение для поиска */
.search-container {
  position: sticky;
  top: 0;
  z-index: 30;
  background: #f8f9fa;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
}

/* sticky-поведение для категорий */
.category-filters {
  position: sticky;
  top: 96px;
  z-index: 25;
  background: #f8f9fa;
  padding: 0.5rem 0.25rem 0.75rem;
  margin-bottom: 2rem;
}

/* === FIX: инпут/поиск не вылезает за экран === */
.catalog-page,
.catalog-page * {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1200px;
  overflow-x: hidden;
}

.search-container {
  width: 100%;
}

.search-box {
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.search-icon,
.clear-search-btn {
  flex: 0 0 auto;
}
</style>
