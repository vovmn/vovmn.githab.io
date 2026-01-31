<template>
  <section class="reviews-section">
    <h2>Отзывы клиентов</h2>

    <div class="reviews-wrapper" ref="wrapper">
      <ul
        class="reviews"
        :style="trackStyle"
        ref="track"
      >
        <li
          v-for="r in list"
          :key="r.uid"
          class="review"
        >
          <div class="stars">{{ r.stars }}</div>
          <div class="name">{{ r.name }}</div>
          <div class="text">{{ r.text }}</div>
          <div class="date">{{ r.date }}</div>
        </li>
      </ul>
    </div>

    <div class="nav">
      <button @click="scroll(-1)">‹</button>
      <button @click="scroll(1)">›</button>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const raw = [
  { stars: '★★★★★', name: 'Елена Александровна', text: 'Конструкторы Лего развивают мелкую моторику, концентрацию, интеллект. Ребёнок доволен!', date: '21.07.23' },
  { stars: '★★★★★', name: 'Мария Иванова', text: 'Отличное качество деталей, ребёнок играет часами. Рекомендую!', date: '15.08.23' },
  { stars: '★★★★☆', name: 'Алексей Петров', text: 'Хороший набор, но инструкция могла быть подробнее.', date: '03.09.23' },
  { stars: '★★★★★', name: 'Ольга Сидорова', text: 'Сын в восторге! Спасибо за быструю доставку.', date: '28.09.23' },
  { stars: '★★★★★', name: 'Дмитрий Волков', text: 'Классический набор — всегда отличный подарок.', date: '12.10.23' },
  { stars: '★★★★☆', name: 'Татьяна Лазарева', text: 'Детали плотно соединяются, цвета яркие. Ребёнок счастлив.', date: '01.11.23' }
]

// даём uid, чтобы Vue не путался
const list = ref(
  raw.map((r, i) => ({ ...r, uid: i + '-' + Math.random() }))
)

const wrapper = ref(null)
const track = ref(null)

const step = ref(0)
const offset = ref(0)
const animating = ref(false)

const trackStyle = computed(() => ({
  transform: `translateX(${offset.value}px)`,
  transition: animating.value ? 'transform 300ms ease' : 'none'
}))

function measure() {
  const card = track.value?.querySelector('.review')
  if (!card) return

  const rect = card.getBoundingClientRect()
  const gap = parseFloat(getComputedStyle(track.value).gap || 0)
  step.value = rect.width + gap
}

function scroll(dir) {
  if (animating.value || !step.value) return
  animating.value = true

  if (dir > 0) {
    // 👉 вправо
    offset.value = -step.value

    setTimeout(() => {
      const first = list.value.shift()
      list.value.push(first)

      offset.value = 0
      animating.value = false
    }, 300)

  } else {
    // 👈 влево — ТЕПЕРЬ С АНИМАЦИЕЙ
    offset.value = step.value

    setTimeout(() => {
      const last = list.value.pop()
      list.value.unshift(last)

      offset.value = 0
      animating.value = false
    }, 300)
  }
}
onMounted(async () => {
  await nextTick()
  measure()
  window.addEventListener('resize', measure)
})

</script>

<style scoped>
.reviews-section {
  padding: 3rem 2rem;
  background: #fafafa;
  text-align: center;
  overflow: hidden;
}

.reviews-wrapper {
  overflow: hidden;
  margin: 1.5rem 0;
}

.reviews {
  display: flex;
  gap: 1rem;
  width: max-content;
}

.review {
  flex: 0 0 260px;
  background: #fff;
  border-radius: 8px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.stars {
  color: #f9a602;
}

.name {
  font-weight: 600;
  margin: .4rem 0;
}

.text {
  font-size: .9rem;
  line-height: 1.3;
}

.date {
  font-size: .75rem;
  opacity: .7;
  text-align: right;
  margin-top: .5rem;
}

.nav button {
  font-size: 1.8rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  margin: 0 .3rem;
}

@media (max-width: 768px) {
  .review {
    flex-basis: 230px;
  }
}

@media (max-width: 480px) {
  .review {
    flex-basis: 200px;
  }
}

</style>
