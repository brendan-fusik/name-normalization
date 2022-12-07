<script setup lang="ts">
import {reactive} from "vue";
import {useFileStore} from "@/stores/file";

defineProps<{}>();
const state = reactive({
  value: null,
  readyToDownload: false,
  readyToNormalize: false,
});
const fileModule = useFileStore();

const curateFile = async () => {
  await fileModule.doNormalization(fileModule.getUpload.uploadId);
  state.readyToDownload = true;
};

const handleChange = async (e: Event) => {
  await fileModule.uploadFile(e.target.files[0]);
  let filename = e.target.files[0].name;

  if (
      filename.endsWith(".csv") ||
      filename.endsWith(".xls") ||
      filename.endsWith(".tsv") ||
      filename.endsWith(".xlsx")
  ) {
    state.value = e.target.files[0].name;
    state.readyToNormalize = true;
  } else {
    state.readyToNormalize = false
    alert("This is not a supported File type. Please use .csv, .tsv, .xls, or .xlsx")
  }

};

const handleDownload = () => {
  let id = fileModule.getUpload.downloadId;
  window.open(
      "http://localhost:8080/normalize/normfile/download/" + id + "?id=" + id
  );
};
</script>

<template>
  <div class="greetings">
    <h1 class="green">Name Normalization Tool</h1>
    <p>Upload a file to be normalized. Accepts .csv, .tsv, .xlsx, or .xls</p>
    <div class="buttons">
      <label class="file-select">
        <div class="download" v-if="state.value">
          Selected File: {{ state.value }}
        </div>
        <div class="download" v-else>Select File</div>

        <input type="file" @change="handleChange"/>
      </label>
      <div>
        <button
            class="download red"
            :disabled="!state.readyToNormalize"
            @click="curateFile"
        >
          Normalize File
        </button>
      </div>
      <div>
        <button
            class="download"
            :disabled="!state.readyToDownload"
            @click="handleDownload"
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
}

.file-select > .select-button {
  color: white;
  background-color: #2ea169;
  border-radius: 0.3rem;

  text-align: center;
}

.file-select > input[type="file"] {
  margin-bottom: 20px;
  display: none;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.download {
  padding: 15px;
  width: 250px;
  font-size: 1rem;
  color: white;
  background-color: #2ea169;
  border-radius: 0.3rem;
  text-align: center;
  border: none;
  margin-top: 20px;
  line-height: 1.5;
}

.download:disabled {
  background-color: #000000;
}

p {
  text-align: center
}

.red {
  background-color: #ff3e3e;
}

.download:hover:not([disabled]) {
  background-color: #2ed469;
  transition: 0.3s;
}
</style>
