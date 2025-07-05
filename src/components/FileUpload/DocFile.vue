<template>
	<div :class="{
    'hidden-input': hideInput,
    'mb-4': hasMarginBottom
  }">
    <v-file-input
      class="v-file-input-noborder"
      :class="{
        'd-inline-block pt-0 mt-0': hideInput,
        'ml-2 pt-0 mb-2': !hideInput
      }"
      :key="`fileInput${keyCount}`"
      :prepend-icon="prependIcon"
      :value="value"
      :loading="!defaultType ? !!value : loading"
      :disabled="disabled"
      :placeholder="placeholder"
      :hide-input="hideInput"
      accept=".pdf, .doc, .docx"
      truncate-length="40"
      hide-details="auto"
      @change="uploadFile"
    ></v-file-input>

		<div v-if="item && item.id">
			<div class="caption">
        <a
          :class="{'one-line': hideInput}"
          :href="!downloadedOutside ? (item.path || '') : 'javascript:void(0);'"
          :title="item.name"
          :target="!downloadedOutside ? '_blank' : ''"
          @click="() => {
          if (downloadedOutside && !disabled) $emit('onDownload', item);
        }"
        >
					{{ truncateText(item.name) }}
				</a>

        <v-btn
          :loading="downloading"
          :disabled="disabled"
          icon x-small color="error"
          @click="$emit('remove', item.id)"
        >
					<v-icon size="16">fas fa-xmark</v-icon>
				</v-btn>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		value: {
			default: null,
		},
		item: {},
		placeholder: {
			type: String,
			default: '',
		},
    hideInput: {
      type: Boolean,
      default: false
    },
    defaultType: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasMarginBottom: {
      type: Boolean,
      default: true
    },
    downloadedOutside: {
      type: Boolean,
      default: false
    },
    downloading: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: String,
      default: 'fa-regular fa-paperclip-vertical'
    },
    limitSize: {
      type: Number,
      default: null
    }
	},
  data() {
    return {
      keyCount: 0,
    }
  },
  methods: {
    uploadFile($event) {
      const sizeMb = this.convertMbToByte(this.limitSize);
      if (
        this.limitSize &&
        ($event?.size > sizeMb)
      ) {
        alert(this.$i18n.t('common.limitSize', { number: this.limitSize }));
        this.keyCount += 1;
      } else {
        this.$emit('change', $event);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.hidden-input {
  .v-file-input {
    vertical-align: top;
  }
}
.one-line {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  max-width: calc(100% - 30px);
  vertical-align: text-top;
}
.v-input.v-file-input { font-size: 0.85rem; }
</style>
