module.exports = {
	"env": {
		"browser": true,
		"es2020": true,
		"node": true,
		"jquery": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],

		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
