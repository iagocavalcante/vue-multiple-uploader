<template>
  <div>
    <div v-if="disable" class="crop" :id="`crop-${id}`"></div>
    <div class="preview-buttons">
      <div class="start">
        <input
          type="file"
          :id="`input-file-${id}`"
          :name="`input-file-${id}`"
          multiple
          accept="image/*"
          @change="previewThumbnail($event);"
          hidden
        />
        <div class="v-text-field__details" v-if="errors.length > 0">
          <div class="v-messages theme--light error--text">
            <div class="v-messages__wrapper">
              <div class="v-messages__message">{{ errors[0] }}</div>
            </div>
          </div>
        </div>
        <label class="btn-upload" :for="`input-file-${id}`" role="button">
          Selecionar arquivo
        </label>
      </div>
      <div class="end" v-if="disable">
        <button type="button"
          class="btn-upload zoom zoom-out"
          @click.prevent="zoomOut()">
          <i class="fas fa-search-minus"></i>
          {{textMinus}}
        </button>
        <button type="button"
          class="btn-upload zoom"
          @click.prevent="zoomIn()">
          <i class="fas fa-search-plus"></i>
          {{textPlus}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'js-cropper'
import { type } from 'os'

export default {
  name: 'OImagePreview',
  props: {
    id: {
      type: Number,
      default: () => new Date().getTime(),
      required: false
    },
    width: {
      type: Number,
      default: 657,
      required: false
    },
    height: {
      type: Number,
      default: 432,
      required: false
    },
    textMinus: {
      type: String,
      default: '',
      required: false
    },
    textPlus: {
      type: String,
      default: '',
      required: false
    },
    disable: {
      type: Boolean,
      default: true,
      required: false
    },
    image: {
      type: String,
      default: '',
      required: false
    },
    errors: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data: () => ({
    cropper: {},
    initialThumbnail: '',
    zoomCount: 0,
    croppedImage: ''
  }),
  watch: {
    image: {
      handler: function (val) {
        console.log(val)
        this.cropper.loadImage(val)
      },
      deep: true
    }
  },
  mounted () {
    this.cropper = new Cropper({
      width: this.width,
      height: this.height
    })
    if (this.disable) {
      this.cropper.render(`#crop-${this.id}`)
      this.disableDefaultTools()
    }
  },
  methods: {
    setCropped (src) {
      this.croppedImage = src
    },
    zoomIn () {
      this.zoomCount = Math.min(1, this.zoomCount + 0.1)
      this.cropper.setZoom(this.zoomCount)
    },
    zoomOut () {
      this.zoomCount = Math.min(0, this.zoomCount - 0.1)
      this.cropper.setZoom(this.zoomCount)
    },
    disableDefaultTools () {
      const tools = document.querySelectorAll('.cropper-tools')
      tools.forEach(tool => {
        tool.style.display = 'none'
      })
    },
    previewThumbnail (e) {
      let reader = new FileReader()
      const file = e.target.files[0]

      if (!file.type.includes('image/')) return

      reader.onload = (event) => {
        this.cropper.loadImage(event.target.result).then(function (crop) {
          console.info('Image is ready to crop.')
        })
        this.isDefaultPreview = false
      }

      reader.readAsDataURL(file)

      this.handleImage(e)
    },
    handleImage (e) {
      // const cropped = this.croppedImage
      // console.log('NOVO CORTADO => ', cropped)
      // const data = cropped.split('base64,')[1];
      // console.log('CORTADA ORIGINAL=> ', cropped)
      // const blobBin = atob(data)
      // console.log('CORTADA => ', blobBin)
      // const byteNumbers = new Array(blobBin.length);
      // for (let i = 0; i < blobBin.length; i++) {
      //   byteNumbers[i] = blobBin.charCodeAt(i);
      // }
      // const byteArray = new Uint8Array(byteNumbers);
      // console.log(e.target.files[0])
      // const blob = new Blob([byteArray], { type: e.target.files[0].name })
      // let file = new File([blob], e.target.files[0].name, { type: e.target.files[0].type })
      // console.log('FILES CORTADOS LEGAIS => ', file)
      this.$emit('handleImage', e)
    }
  }
}
</script>

<style scoped>
.cropper {
  height: 245px;
  background: #DDD;
}

.preview-buttons {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 500px;
}

@media only screen and (max-width: 768px) {
  .preview-buttons {
    width: 315px;
  }

  .crop {
    width: 315px;
  }
}

.start {
  align-items: flex-start;
}

.end {
  align-items: flex-end;
}

.zoom-out {
  margin-right: 8px;
}

.btn-upload {
  cursor: pointer;
  height: 36px;
  min-width: 42px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: center;
  color: #009be1;
  border-radius: 3px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  letter-spacing: 0.0892857143em;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  max-width: 100%;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  -webkit-transition-duration: 0.28s;
  transition-duration: 0.28s;
  -webkit-transition-property: opacity, -webkit-box-shadow, -webkit-transform;
  transition-property: opacity, -webkit-box-shadow, -webkit-transform;
  transition-property: box-shadow, transform, opacity;
  transition-property: box-shadow, transform, opacity, -webkit-box-shadow, -webkit-transform;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  box-shadow: none !important;
  background-color: transparent;
  border: thin solid currentColor;
}

.btn-upload.zoom {
  padding: 0px;
}
</style>
