<template>
	<div class="fileinput-box">
		<v-btn
			class="text-none"
			:class="[
				circle ? 'fileinput-circle' : '',
				gradient ? 'fileinput-gradient' : 'fileinput-theme',
				borderStyle && !previewComputed ? 'fileinput-border' : '',
			]"
			depressed
			:loading="isSelecting"
			@click="onButtonClick"
			:style="{
				width: gradient ? 'auto' : width + 'px',
				height: gradient ? '36px' : height + 'px',
				border: value === 'dummy' ? '2px dashed rgba(0,0,0,0.05)' : '',
			}"
			:disabled="disabled"
			:title="`${$t('common.add')} ${$t('common.aImage')}`"
		>
			<v-img
				v-if="previewComputed && !gradient && value !== 'dummy'"
				:src="previewComputed"
				:width="width"
				:height="height"
				contain
			></v-img>
			<template v-else>
				<v-icon :size="iconSize">
					{{ icon }}
				</v-icon>
				<span v-if="showText" class="ml-2">{{ buttonText }}</span>
			</template>
		</v-btn>
		<div v-if="previewComputed && value !== 'dummy'" class="fileinput-clear">
			<v-btn small icon @click="clear" :style="{ top: gradient ? '5px' : 0 }">
				<v-icon color="red" :size="gradient ? 12 : 18">fas fa-close</v-icon>
			</v-btn>
		</div>
		<input
			ref="uploader"
			class="d-none"
			type="file"
			:accept="accept"
			@change="onChange"
			@click="resetInput"
		/>
		<ImageCrop
			v-if="cropper"
			title="Image Croper"
			ref="imgCropper"
			:circle="circle"
			:aspectRatio="aspectRatio"
			:file="preview"
			:minWidth="minWidth"
			:minHeight="minHeight"
			:filledColor="filledColor"
			@cropped="onCropped"
		/>
		<canvas ref="canvas" style="position: fixed; left: 9999px" />
	</div>
</template>

<script>
import ImageCrop from '@/components/FileUpload/ImageCrop.vue';
import { urltoFile } from '@/utils';

export default {
	components: { ImageCrop },
	props: {
		width: {
			type: Number,
			default: 300,
		},
		height: {
			type: Number,
			default: 200,
		},
		widthCompress: {
			type: Number,
			default: 0,
		},
		heightCompress: {
			type: Number,
			default: 0,
		},
		minWidth: {
			type: Number,
			default: 0,
		},
		minHeight: {
			type: Number,
			default: 0,
		},
		aspectRatio: {
			type: Number,
			default: 1,
		},
		value: {
			default: null,
		},
		icon: {
			type: String,
			default: 'fal fa-cloud-upload',
		},
		iconSize: {
			type: Number,
			default: 18,
		},
		aspectRatio: {
			type: Number,
			default: 1,
		},
		text: {
			type: String,
			default: 'Télécharger la plaquette',
		},
		showText: {
			type: Boolean,
			default: false,
		},
		isUrl: {
			type: Boolean,
			default: false,
		},
		gradient: {
			type: Boolean,
			default: false,
		},
		circle: {
			type: Boolean,
			default: false,
		},
		accept: {
			type: String,
			default: 'image/*',
		},
		imagePreview: {
			default: null,
		},
		cropper: {
			type: Boolean,
			default: false,
		},
		filePath: {
			type: String,
			default: null,
		},
		borderStyle: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		limitSize: {
      type: Number,
      default: null
    },
		filledColor: {
      type: String,
      default: '',
    },
		imageTypeAfterCropped: {
			type: String,
			default: 'jpeg',
		},
	},
	data: () => ({
		selectedFile: null,
		isSelecting: false,
		preview: null,
	}),
	computed: {
		buttonText() {
			if (this.value === 'dummy') return 'Ajouter une image';
			if (!this.selectedFile && !this.value) return this.text;
			if (this.selectedFile) return this.selectedFile.name;

			if (this.isUrl) {
				return this.value.split('/').pop();
			} else {
				return this.value;
			}
		},
		previewComputed() {
			if (this.value instanceof File) {
				return URL.createObjectURL(this.value);
			}
			if (this.value && this.value.url) {
				return this.value.url;
			} else if (this.value && this.value.path) {
				return this.value.path;
			}
			if (this.preview !== null) {
				return this.preview;
			} else if (this.value !== null && this.filePath) {
				return this.filePath + '/' + this.value;
			} else {
				return this.value;
			}
		},
	},
	methods: {
		compressFile(file) {
			const image = new Image();
			const fileName = file.name;
			const canvas = this.$refs.canvas;
			const canvasContext = canvas.getContext('2d');
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			image.src = URL.createObjectURL(file);

			if (this.widthCompress !== 0) image.width = this.widthCompress;
			if (this.heightCompress !== 0) image.height = this.heightCompress;

			const $that = this;

			return new Promise(function (resolve, reject) {
				image.onload = function () {
					const ratio = image.width / image.height;
					const width = Math.min(image.width, 1920);
					const height = width / ratio;
					canvasContext.canvas.width = width;
					canvasContext.canvas.height = height;
					canvasContext.drawImage(image, 0, 0, width, height);
					canvas.toBlob(
						function (blob) {
							const compressedFile = new File([blob], fileName, {
								type: `image/${$that.imageTypeAfterCropped}`,
								lastModified: Date.now(),
							});
							canvasContext.clearRect(0, 0, canvas.width, canvas.height);
							resolve(compressedFile);
						},
						`image/${$that.imageTypeAfterCropped}`,
						0.95
					);
				};
			});
		},
		onButtonClick() {
			this.isSelecting = true;
			window.addEventListener(
				'focus',
				() => {
					this.isSelecting = false;
				},
				{ once: true }
			);

			this.$refs.uploader.click();
		},
		onChange(e) {
			let vm = this;
			let files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;

			const sizeMb = this.convertMbToByte(this.limitSize);
			if (
        this.limitSize &&
        (files[0]?.size > sizeMb)
      ) {
        alert(this.$i18n.t('common.limitSize', { number: this.limitSize }));
				return false;
			}

			vm.selectedFile = files[0];
			vm.$emit('onChange', vm.selectedFile);
			let reader = new FileReader();
			reader.readAsDataURL(vm.selectedFile);
			reader.onload = (e) => {
				vm.preview = e.target.result;
				const imgCropper = vm.$refs.imgCropper;
				if (imgCropper) imgCropper.open(true); // show popup
			};
		},
		async onCropped(file) {
			this.preview = file;
			const fileCropped = await urltoFile(
				file,
				this.selectedFile?.name || `image.${this.imageTypeAfterCropped}`,
				`image/${this.imageTypeAfterCropped}`
			);
			const fileCompressed = await this.compressFile(fileCropped);
			this.$emit('onCropped', fileCompressed);
		},
		resetInput() {
			//FIXME: HTML input file selection event not firing upon selecting the same file
			let uploader = this.$refs.uploader;
			if (uploader) uploader.value = null;
		},
		clear() {
			this.resetInput();
			this.preview = null;
			this.selectedFile = null;
			this.$emit('onDeleted', null);
		},
	},
};
</script>
