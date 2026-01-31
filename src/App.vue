<template>
  <!-- ключ заставляет Vue пересоздавать страницу при любом изменении URL (включая query) -->
  <RouterView :key="$route.fullPath" />
</template>

<script setup>
</script>
