<template>
  <div>
    <section class="galery-contaioner">
      <div
        class="image"
        v-for="(image, index) in images"
        :key="index"
        :style="{ backgroundImage: 'url(' + image.url + ')' }"
      >
        <span class="close-button">
          <button @click="removeImage(image, index)" class="font-button">
            <i class="fas fa-times"></i>
          </button>
        </span>
      </div>
    </section>
    <div class="v-text-field__details" v-if="errors.length > 0">
      <div class="v-messages theme--light error--text">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">{{ errors[0] }}</div>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <slot name="upload-buttons"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OGallery",
  props: {
    images: {
      type: Array,
      required: false,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  methods: {
    removeImage(image, index) {
      if (image.file.id) {
        this.$emit("removeFromGallery", image.file.id);
      }
      this.$emit("removeImage", index);
    },
  },
});
</script>

<style scoped>
.galery-contaioner {
  width: 500px;
  height: 283px;
  border-radius: 3px;
  border: solid 1px rgba(0, 0, 0, 0.12);
  background-color: #f4f4f6;
  overflow: auto;
}

@media only screen and (max-width: 768px) {
  .galery-contaioner {
    width: 100%;
  }
}

.label {
  font-size: 11px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.5px;
  color: rgba(78, 78, 78, 0.54);
}

.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin-top: 18px;
  width: 96px;
  height: 96px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

.image:nth-of-type(1n) {
  margin-left: 16px;
}

.image:last-child {
  margin-bottom: 16px;
}

.mt-3 {
  margin-top: 3px;
}

.close-button {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 0 #375b70;
  background-color: #ffffff;
  padding: 2px;
  display: grid;
  justify-content: center;
  height: 24px;
  width: 24px;
  border-radius: 20px;
  float: right;
  margin: 5px;
}

.font-button {
  font-size: 18px;
  font-weight: bold;
  color: #365b71;
}
</style>
