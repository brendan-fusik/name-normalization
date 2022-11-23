<script setup lang="ts">
import { reactive } from "vue";
import {useFileStore} from "@/stores/file";

defineProps<{}>();
const state = reactive({
  value: null,
  readyToDownload: false,
});
const fileModule = useFileStore()
const handleChange = () => {

  fileModule.fetchInformation()

  //CHANGE THIS TO HAPPEN AFTER FILE HAS BEEN PROCESSED
  state.readyToDownload = true
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">Name Normalization Tool</h1>
    <label class="file-select">
      <!-- We can't use a normal button element here, as it would become the target of the label. -->
      <div class="select-button">
        <!-- Display the filename if a file has been selected. -->
        <span v-if="state.value">Selected File: {{ state.value?.name }}</span>
        <span v-else>Select File</span>
      </div>
      <!-- Now, the file input that we hide. -->
      <input type="file" @change="handleChange" />
    </label>
    <br>
    <div v-if="state.readyToDownload">
      <p>Your file is ready</p>
      <button>Download</button>
    </div>
  </div>
  <button @click="handleChange">Click</button>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type="file"] {
  display: none;
}


</style>
