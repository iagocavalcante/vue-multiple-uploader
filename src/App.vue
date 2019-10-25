<template>
  <div id="app">
    <Gallery
      :images="attachments"
      @removeFromGallery="handleRemovedFromGallery">
      <template slot="upload-buttons">
        <ImageUpload @handleImage="handleImageGallery" :disable="false"/>
      </template>
    </Gallery>
  </div>
</template>

<script>
import Gallery from "./components/Gallery";
import ImageUpload from "./components/ImageUpload";

export default {
  name: "App",
  components: {
    Gallery,
    ImageUpload
  },
  data: () => ({
    attachments: [],
    removeFromGallery: [],
  }),
  methods: {
    handleImageGallery (e) {
      // const uploadedFiles = e.target.files
      const uploadedFiles = e.target.files
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.fileToBase64(uploadedFiles[i]).then(image => {
          this.attachments.push({ file: uploadedFiles[i], url: image })
        })
      }
    },
    handleRemovedFromGallery (id) {
      this.removeFromGallery.push(id)
    },
    fileToBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    removeImage (index) {
      this.attachments = this.attachments.filter((image, i) => i !== index)
    }
  }
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
