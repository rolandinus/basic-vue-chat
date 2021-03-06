<template>
  <div class="input__container">
    <img
      v-show="file"
      :src="imagePreview"
      class="image--uploaded">
    <slot name="input-field">
      <input-field
        v-model="message"
        @newOwnMessage="onNewOwnMessage" />
    </slot>
    <div class="features__container">
      <div
        :class="requestUpload ? 'highlight' : ''"
        class="input-images-upload">
        <input
          id="chat-input-image"
          ref="image"
          type="file"
          accept="image/*"
          @change="handleFileUpload()">
        <label for="chat-input-image">
          <img
            v-if="uploadIconSrc"
            :src="uploadIconSrc">
          <span v-else>&#128206;</span>
        </label>
      </div>
      <div class="input-images-upload input-emoji-picker__icon">
        <div
          id="emoji"
          @click="openEmojiPicker">
          <label for="emoji">
            <!-- <font-awesome-icon icon="smile" /> -->
          </label>
        </div>
      </div>
      <div
        :class="{ visible: !toggleEmojiPicker }"
        class="input-emoji-picker__container">
        <picker
          :show-preview="false"
          :show-skin-tones="false"
          :show-categories="false"
          :show-search="false"
          native
          @select="emojiPicked" />
      </div>
      <slot name="features" />
    </div>
    <slot name="input-button">
      <div
        class="input__button"
        @click="onNewOwnMessage">
        {{ sendButtonText }}
      </div>
    </slot>
  </div>
</template>

<script>
import InputField from './InputField.vue'
import { Picker } from 'emoji-mart-vue'

export default {
  name: 'InputContainer',
  components: {
    InputField,
    Picker
  },
  props: {
    requestUpload: {
      type: Boolean,
      default: false,
      required: false
    },
    sendButtonText: {
      type: String,
      default: 'Senden',
      required: false
    },
    toggleEmojiPicker: {
      type: Boolean,
      default: false,
      required: false
    },
    uploadIconSrc: {
      type: String,
      default: null,
      required: false
    }
  },
  data: function () {
    return {
      message: '',
      file: undefined,
      imagePreview: ''
    }
  },
  methods: {
    onNewOwnMessage () {
      if ((!this.message || this.message === '') && !this.file) {
        return
      }

      this.$emit('newOwnMessage', this.message, this.file, this.imagePreview)

      this.message = ''

      this.file = undefined

      this.imagePreview = ''
    },
    handleFileUpload () {
      this.file = this.$refs.image.files[0]
      let reader = new FileReader()

      reader.addEventListener(
        'load',
        function () {
          this.imagePreview = reader.result
        }.bind(this),
        false
      )

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file)
        }
        this.$emit('newFileUpload', this.file)
      }
    },
    openEmojiPicker () {
      this.$emit('openEmojiPicker', true)
    },
    emojiPicked (emoji) {
      this.message += emoji.native
    }
  }
}
</script>

<style lang="scss" scoped>
.visible {
  display: none;
}
.highlight {
  animation: blink 1s steps(1, end) infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
