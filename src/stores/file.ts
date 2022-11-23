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
      console.log("Making a call to the backend")
      return new Promise((resolve, reject) => {
        API.getsomething
          .get({ id: "someid" })
            .then((value) => {
                if (value.ok) {
                    value.text().then((id) => {
                        console.log("Got ID:", id);
                        resolve(id);
                    });
                } else {
                    reject(value);
                }
            })
            .catch((reason) => {
                reject(reason);
            });
      });
    },
  },
});
