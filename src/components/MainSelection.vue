<script setup lang="ts">
import { reactive } from "vue";
import { useFileStore } from "@/stores/file";

defineProps<{}>();
const state = reactive({
  value: null,
  readyToDownload: false,
});
const fileModule = useFileStore();
const handleChange = (e) => {
  console.log(e.target.files[0]);
  //const formData = new FormData()
  //formData.append("newfile", e.target.files[0], e.target.files[0].name)
  fileModule.uploadFile(e.target.files[0]);
  //CHANGE THIS TO HAPPEN AFTER FILE HAS BEEN PROCESSED
  state.readyToDownload = true;
};

const handleDownload = () => {
  let id = "f0b9ddab7c3f4fa1b3cec88e8dea8330";
  window.open(
    "http://localhost:8080/normalize/normfile/download/" + id + "?id=" + id
  );
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">Name Normalization Tool</h1>

    <div class="buttons">
      <label class="file-select">
        <div>
          <span class="download" v-if="state.value"
            >Selected File: {{ state.value?.name }}</span
          >
          <span class="download" v-else>Select File</span>
        </div>
        <input type="file" @change="handleChange" />
      </label>
      <div>
        <button class="download" :disabled="!state.readyToDownload">
          Normalize File
        </button>
      </div>
      <div>
        <button
          class="download"
          @click="handleDownload"
          :disabled="state.readyToDownload"
        >
          Download Ready
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.file-select > .select-button {
  padding: 20px;
  margin: 0;
  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
}

.file-select > input[type="file"] {
  display: none;
  padding: 0;
  margin: 0;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.download {
  padding: 20px;
  font-size: 1rem;
  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;

  border: none;
}

.download:disabled {
  background-color: #282828;
}

.download:hover:not([disabled]) {
  background-color: #2ed469;
  transition: 0.3s;
}
</style>
