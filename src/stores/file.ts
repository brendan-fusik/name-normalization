import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Api as uploadAPI } from "@/api/organizationNormalizationRESTService_swagger";

const API = new uploadAPI(
    {
  baseUrl: "/normalize",
});

export const useFileStore = defineStore("normalFile", {
  state: () => {
    return {
      id: {},
    };
  },

  actions: {
    async fetchInformation() {
      return new Promise((resolve, reject) => {
        API.getsomething
          .get({ id: "someid" })
          .then((response) => console.log(response.data))
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
