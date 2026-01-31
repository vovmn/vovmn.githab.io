<template>
  <div class="services-page">
    <Header />

    <!-- ✅ класс совпадает со стилями -->
    <main class="services-main">
      <div class="container">
        <h1 class="page-title">Услуги</h1>

        <section
          v-for="section in serviceSections"
          :key="section.id"
          class="service-section"
        >
          <h2 class="section-title">{{ section.title }}</h2>

          <!-- ✅ отдельный класс именно для услуг (чтобы не конфликтовать с каталогом) -->
          <div class="services-grid">
            <ServiceCard
              v-for="service in section.items"
              :key="service.id"
              :service="service"
              @cardClick="onCardClick"
              @detailsClick="onDetailsClick"
            />
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { serviceSections } from '@/data/services'

const onCardClick = (service) => console.log('cardClick:', service)
const onDetailsClick = (service) => console.log('detailsClick:', service)
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ✅ теперь реально применяется */
.services-main {
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
  margin-bottom: 1.25rem;
}

/* ===== Секции ===== */
.service-section {
  margin: 28px 0 38px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 14px;

  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #2b6cb0;
  box-shadow: 0 0 0 6px rgba(43, 108, 176, 0.12);
}

/* ===== Сетка карточек (главный фикс) ===== */
.services-grid {
  display: grid;

  /* авто-колонки без шаманства с span */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  gap: 16px;

  /* чтобы карточки были одной высоты и не наезжали */
  align-items: stretch;
  grid-auto-rows: 1fr;
}

/* чтобы ничего не раздувало колонки */
.services-grid > * {
  min-width: 0;
}

/* Чуть шире на больших экранах */
@media (min-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* Адаптивность заголовка */
@media (max-width: 768px) {
  .services-main {
    padding: 1rem 0;
  }

  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
