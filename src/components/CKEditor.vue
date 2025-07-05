<template>
	<div style="width: 100%">
		<orgComponent
			:editor="editor"
			:class="{ 'ckedit-error': !isRequired() }"
			v-model="valueComputed"
			v-on="$listeners"
			:config="editorConfig"
			@blur="onEditorBlur"
		/>
		<div class="v-messages error--text px-4 my-2" v-if="!isRequired()">
			{{ $t('error.requiredField') }}
		</div>
	</div>
</template>
<script>
import { editorConfig } from '@/utils/editor';
import CKEditor from '@/plugins/ckeditor/index.js';
export default {
	name: 'CKEditor',
	props: {
		required: {
			type: Boolean,
			default: false,
		},
		height: {
			type: Number,
			default: 280,
		},
		value: {},
	},
	components: {
		orgComponent: CKEditor.component,
	},
	data() {
		return {
			valid: false,
			editor: CKEditor,
		};
	},
	computed: {
		valueComputed: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			},
		},
		editorConfig() {
			const extraPlugins = 'print,format,font,colorbutton,justify,image2,uploadimage';
			editorConfig.extraPlugins = extraPlugins;
			return {
				...(this.$attrs.config ?? {}),
				...editorConfig,
				height: this.height,
			};
		},
	},
	watch: {
		valueComputed(val) {
			if (this.required) this.isRequired();
		},
	},
	methods: {
		onEditorBlur(event, editor) {
			editor.setMode('wysiwyg');
		},
		isRequired() {
			if (this.required) {
				if (this.valueComputed) return true;
				return false;
			}
			return true;
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep {
	.cke_button__piechart {
		position: relative;
		padding: 5px 10px 5px 25px !important;
		background: var(--v-primary-base) !important;
		border: none !important;
		margin-left: 5px;
		border-radius: 5px;
		&_icon {
			display: none;
		}
		&_label {
			display: inline;
			color: #fff !important;
			font-size: 11px;
		}
		::before {
			font-family: 'Font Awesome 6 Pro';
			content: '\f055';
			left: 7px;
			position: absolute;
		}
		&:hover {
			background: var(--v-primary-lighten1) !important;
		}
	}
}
</style>
<style lang="scss">
.ckedit-error {
	.cke_chrome {
		border-color: #f05a27;
		border-width: 2px;
	}
}
</style>
