<script setup lang="ts">
import HelloWorld from "./components/MainSelection.vue";

let file = null;
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld v-model:value="file" />
      <p v-if="file">{{ file.name }}</p>
    </div>
  </header>
</template>

<style scoped></style>
