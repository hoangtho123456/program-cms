<template>
	<div
		class="d-flex flex-wrap align-center w-full"
		:class="{ 'flex-column-reverse': rtl }"
		ref="wrapper"
	>
		<div class="mr-4 mb-4" v-for="(image, key) in imageList" :key="key">
			<UploadImage
				:disabled="disabled"
				:value="imageList[key]"
				:iconSize="32"
				@onCropped="onCropped($event, key)"
				@onDeleted="onRemove($event, key)"
				icon="fal fa-camera"
				:width="computedWidth"
				:height="computedHeight"
				:minWidth="minWidth"
				:minHeight="minHeight"
				:aspectRatio="ratio"
				:circle="circle"
				cropper
			/>
		</div>
	</div>
</template>
<script>
import UploadImage from '@/components/FileUpload/Image.vue';

export default {
	name: 'MultiUpload',
	components: {
		UploadImage,
	},
	props: {
		value: {},
		maxImage: {
			type: Number,
			default: 4,
		},
		width: {
			type: Number,
			default: 200,
		},
		height: {
			type: Number,
			default: 200,
		},
		minWidth: {
			type: Number,
			default: 0,
		},
		minHeight: {
			type: Number,
			default: 0,
		},
		single: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		rtl: {
			type: Boolean,
			default: false,
		},
		circle: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			dynamicHeight: null,
			dynamicWidth: null,
			maxWidth: 650,
		};
	},
	computed: {
		imageList() {
			if (this.single) {
				return this.value ? [this.value] : ['dummy'];
			}
			if (this.value && this.value.length === this.maxImage) {
				return this.value;
			}
			return (this.value || []).concat('dummy');
		},
		computedHeight() {
			return this.dynamicHeight || this.height;
		},
		computedWidth() {
			return this.dynamicWidth || this.width;
		},
		ratio() {
			return this.width / this.height;
		},
	},
	methods: {
		appendImage() {},
		onCropped(file, key) {
			if (this.single) {
				return this.$emit('input', file);
			}
			let value = null;
			if (!this.value) {
				value = [];
			} else {
				value = Object.assign([], this.value);
			}
			value[key] = file;
			this.$emit('input', value);
		},
		onRemove(file, key) {
			if (this.single) {
				return this.$emit('input', null);
			}
			const value = Object.assign([], this.value);
			value.splice(key, 1);
			this.$emit('input', value);
		},
		checkImgWidth() {
			if (!this.$refs.wrapper || !this.$refs.wrapper.offsetWidth) return;
			const offsetWidth = Math.min(this.$refs.wrapper.offsetWidth, this.maxWidth);
			const dynamicHeight = offsetWidth / this.ratio;
			const dynamicWidth = offsetWidth;
			if (dynamicWidth <= this.width) {
				this.dynamicHeight = dynamicHeight;
				this.dynamicWidth = dynamicWidth;
			}
		},
	},
	mounted() {
		const vm = this;
		vm.$nextTick(() => {
			vm.checkImgWidth();
		});
		window.addEventListener('resize', vm.checkImgWidth);
	},
	destroyed() {
		window.removeEventListener('resize', this.checkImgWidth);
	},
};
</script>
