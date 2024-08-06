<template>
  <div id="app">
    <Gallery
      :images="attachments"
      @removeFromGallery="handleRemovedFromGallery"
      @removeImage="removeImage"
    >
      <template #upload-buttons>
        <ImageUpload @handleImage="handleImageGallery" :disable="false" />
      </template>
    </Gallery>
  </div>
</template>

<script>
import { ref } from "vue";
import Gallery from "./components/Gallery";
import ImageUpload from "./components/ImageUpload";

export default {
  name: "App",
  components: {
    Gallery,
    ImageUpload,
  },
  setup() {
    const attachments = ref([]);
    const removeFromGallery = ref([]);

    const handleImageGallery = (e) => {
      const uploadedFiles = e.target.files;
      for (let i = 0; i < uploadedFiles.length; i++) {
        fileToBase64(uploadedFiles[i]).then((image) => {
          attachments.value.push({ file: uploadedFiles[i], url: image });
        });
      }
    };

    const handleRemovedFromGallery = (id) => {
      removeFromGallery.value.push(id);
    };

    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const removeImage = (index) => {
      attachments.value.splice(index, 1);
    };

    return {
      attachments,
      removeFromGallery,
      handleImageGallery,
      handleRemovedFromGallery,
      fileToBase64,
      removeImage,
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
