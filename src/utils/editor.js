export const editorConfig = {
	allowedContent: true,
	height: 240,
	toolbar: [
		{
			name: 'styles',
			items: ['Format', 'Font', 'FontSize'],
		},
		{
			name: 'colors',
			items: ['TextColor', 'BGColor'],
		},
		{
			name: 'align',
			items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
		},
		{
			name: 'basicstyles',
			items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting'],
		},
		{
			name: 'links',
			items: ['Link', 'Unlink'],
		},
		{
			name: 'paragraph',
			items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'],
		},
		{
			name: 'insert',
			items: ['Image', 'Table'],
		},
		{
			name: 'tools',
			items: ['Maximize'],
		},
		'/',
		{
			name: 'clipboard',
			items: ['Undo', 'Redo'],
		},
		{
			name: 'editing',
			items: ['Scayt', 'Source'],
		},
	],
};
