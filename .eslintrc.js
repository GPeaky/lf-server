module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},

	global: {
		process: true,
		mp: true
	},

	plugins: ['@typescript-eslint'],
	rules: {
		'func-style': [
			'error',
			'declaration',
			{
				allowArrowFunctions: true
			}
		],

		'prefer-const': 'error',
		'prefer-template': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-destructuring': 'error',
		'prefer-numeric-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'no-undef': 'error',
		'no-multi-spaces': 'error'
	}
}
