import {defineStore} from "pinia";
import {Api as uploadAPI} from "@/api/organizationNormalizationRESTService_swagger";

const API = new uploadAPI({
  baseUrl: "/normalize",
});

export const useFileStore = defineStore("normalFile", {
  state: () => ({
    uploadId: "",
    downloadId: "",
  }),
  getters: {
    getUpload: (uploadId) => uploadId,
    getDownload: (downloadId) => downloadId,
  },

  actions: {
    async doNormalization(uploadId: string) {
      return new Promise((resolve, reject) => {
        API.normalize
            .get({id: uploadId})
            .then((value) => {
              if (value.ok) {
                value.text().then((id) => {
                  this.downloadId = id;
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
    async uploadFile(file: File) {
      return new Promise((resolve, reject) => {
        API.normfile
          .upload({ temporary: true, appName: "normalize" }, { file: file })
          .then((res) => {
            if (res.data.response != null) {
              this.uploadId = res.data.response;
            }

            resolve(res);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    },
    async downloadFile(id: string) {
      console.log(id);
      return new Promise((resolve, reject) => {
        API.normfile
            .download(id, {
              id: id,
            })
            .then((res) => {
              console.log("response, value is ok");
              console.log(res);
              resolve(res);
            })
            .catch((reason) => {
              reject(reason);
            });
      });
    },
    stateTest(str: string) {
      this.uploadId = str;
    },
  },
});
