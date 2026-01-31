<template>
  <div class="services-page">
    <Header />
    
    <main class="services-main">
      <div class="container">
        <h1 class="page-title">Наши услуги</h1>
        <p class="page-subtitle">Профессиональные решения для вашего комфорта</p>
        
        <!-- Сетка услуг -->
        <div class="services-grid">
          <CardService 
            v-for="service in services" 
            :key="service.id"
            :service="service"
            @card-click="handleCardClick"
            @details-click="handleDetailsClick"
          />
        </div>

        <!-- Дополнительная информация -->
        
      
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CardService from '@/components/CardService.vue'

// Данные услуг
const services = ref([
  { 
    id: 1,
    name: 'Изготовление мебели на заказ', 
    description: 'Проектирование и производство мебели по индивидуальным размерам и дизайну', 
    price: 'от 15 000 руб'
  },
  { 
    id: 2,
    name: 'Кухонные гарнитуры', 
    description: 'Создание функциональных и стильных кухонных гарнитуров под ваш интерьер', 
    price: 'от 45 000 руб'
  },
  { 
    id: 3,
    name: 'Шкафы-купе', 
    description: 'Вместительные и удобные шкафы-купе для любой комнаты', 
    price: 'от 20 000 руб'
  },
  { 
    id: 4,
    name: 'Корпусная мебель', 
    description: 'Изготовление офисной и домашней корпусной мебели', 
    price: 'от 10 000 руб'
  },
  { 
    id: 5,
    name: 'Мебель для ванной', 
    description: 'Влагостойкая и практичная мебель для ванных комнат', 
    price: 'от 12 000 руб'
  },
  { 
    id: 6,
    name: 'Мебель для гостиной', 
    description: 'Стильная и комфортная мебель для гостиной комнаты', 
    price: 'от 25 000 руб'
  },
  { 
    id: 7,
    name: 'Детская мебель', 
    description: 'Безопасная и функциональная мебель для детских комнат', 
    price: 'от 18 000 руб'
  },
  { 
    id: 8,
    name: 'Ремонт и реставрация', 
    description: 'Восстановление и обновление вашей старой мебели', 
    price: 'от 5 000 руб'
  }
])

// Обработчики событий
const handleCardClick = (service) => {
  console.log('Карточка услуги кликнута:', service)
  // Логика для открытия детальной информации
}

const handleDetailsClick = (service) => {
  console.log('Узнать больше о услуге:', service)
  // Логика для перехода к заказу или консультации
}
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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
  margin-bottom: 1rem;
}

.page-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.services-info {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.services-info h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.advantages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.advantage {
  text-align: center;
  padding: 1.5rem;
}

.advantage h3 {
  font-size: 1.3rem;
  color: #2b6cb0;
  margin-bottom: 1rem;
}

.advantage p {
  color: #666;
  line-height: 1.5;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .services-info {
    padding: 2rem;
  }
  
  .advantages {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .services-info {
    padding: 1.5rem;
  }
}
</style>