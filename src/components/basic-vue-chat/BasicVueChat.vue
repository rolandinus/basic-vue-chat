<template>
  <div
    class="basic-vue-chat"
    @click="setEmojiPickerToggle(false)">
    <section class="window">
      <header class="window__header__container">
        <slot name="header">
          {{ title }}
        </slot>
      </header>
      <section
        id="window__messages__container"
        class="window__messages__container">
        <slot>
          <messages-list
            :feed="feed"
            :author-id="authorId"
            class="messages-list"/>
        </slot>
      </section>
      <div class="window__input__container">
        <slot name="input-container">
          <input-container
            :toggle-emoji-picker="toggleEmojiPicker"
            :send-button-text="sendButtonText"
            :upload-icon-src="uploadIconSrc"
            :request-upload="requestUpload"
            @newOwnMessage="onNewOwnMessage"
            @newFileUpload="onNewFileUpload"
            @openEmojiPicker="onOpenEmojiPicker"
          />
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { scrollToBottom } from '../../helpers/scroll.js'
import MessagesList from './messages/MessagesList.vue'
import InputContainer from './input/InputContainer.vue'

export default {
  name: 'BasicVueChat',
  components: {
    MessagesList,
    InputContainer
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
    title: {
      type: String,
      default: 'Team Maczan',
      required: false
    },
    initialAuthorId: {
      type: Number,
      default: 0,
      required: false
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false
    },
    initialFeed: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    newMessage: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    },
    uploadIconSrc: {
      type: String,
      required: false,
      default: null

    }
  },
  data () {
    return {
      feed: [],
      authorId: 0,
      toggleEmojiPicker: false
    }
  },
  watch: {
    newMessage: function (newValue, oldValue) {
      this.pushToFeed(newValue)
      scrollToBottom()
    }
  },
  mounted () {
    this.feed = this.initialFeed
    this.authorId = this.initialAuthorId
  },
  methods: {
    setEmojiPickerToggle (toggle) {
      this.toggleEmojiPicker = toggle
    },
    pushToFeed (element) {
      this.feed.push(element)
    },
    onNewOwnMessage (message, image, imageUrl) {
      const newOwnMessage = {
        id: this.authorId,
        contents: message,
        image: image,
        imageUrl: imageUrl,
        date: moment().format('HH:mm:ss')
      }

      this.pushToFeed(newOwnMessage)

      scrollToBottom()

      this.$emit('newOwnMessage', message, image)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    }
  }
}
</script>

<style lang="scss">
    @import "../../assets/scss/main.scss";
</style>
