import CKEditorComponent from './ckeditor.js';

const CKEditor = {
	/**
	 * Installs the plugin, registering the `<ckeditor>` component.
	 *
	 * @param {Vue} Vue The Vue object.
	 */
	install(Vue) {
		Vue.component('ckeditor', CKEditorComponent);
	},
	component: CKEditorComponent,
};

export default CKEditor;
