<template>
  <div class="service-card" @click="$emit('cardClick', service)">
    <div class="service-icon">
      <slot name="icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </slot>
    </div>
    <div class="service-info">
      <h3 class="service-name">{{ service.name }}</h3>
      <p class="service-description">{{ service.description }}</p>
      <div class="service-footer">
        <p class="service-price" v-if="service.price">{{ service.price }}</p>
        <RouterLink to="/contact">
          <button class="details-btn" @click.stop="$emit('detailsClick', service)">
            Связаться с нами
          </button>
        </RouterLink>

      </div>
    </div>
  </div>
</template>

<script setup>
// Определяем props
const props = defineProps({
  service: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: '',
      description: '',
      price: '',
      icon: ''
    })
  }
})

// Определяем emits
const emit = defineEmits(['cardClick', 'detailsClick'])
</script>

<style scoped>
.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.service-icon {
  flex-shrink: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: #2b6cb0;
}

.service-icon svg {
  width: 48px;
  height: 48px;
}

.service-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.service-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.service-description {
  color: #666;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex-grow: 1;
}

.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.service-price {
  color: #007bff;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0;
}

.details-btn {
  background: #2b6cb0;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.details-btn:hover {
  background: #2c5282;
}

/* Адаптивность */
@media (max-width: 768px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .service-name {
    font-size: 1.2rem;
  }
  
  .service-price {
    font-size: 1.2rem;
  }
  
  .service-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  
  .details-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 1.2rem;
  }
  
  .service-icon {
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .service-icon svg {
    width: 40px;
    height: 40px;
  }
}
</style>