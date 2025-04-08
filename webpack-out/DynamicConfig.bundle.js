/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/discovery.vars.js":
/*!**************************************!*\
  !*** ./src/config/discovery.vars.js ***!
  \**************************************/
/***/ (function(module) {

eval("!(module.exports = {\n  clientVersion: '',\n  apiRoot: 'https://qa.adsabs.harvard.edu/v1/',\n  orcidProxy: '/oauth/',\n  bootstrapUrls: ['/accounts/bootstrap'],\n  routerConf: {\n    pushState: true,\n    root: '/'\n  },\n  debugExportBBB: true,\n  debug: false,\n  useCache: false,\n  googleTrackingCode: 'UA-XXXXXXXX-X',\n  googleTrackingOptions: 'auto',\n  orcidClientId: 'APP-P5ANJTQRRTMA6GXZ',\n  orcidLoginEndpoint: 'https://sandbox.orcid.org/oauth/authorize',\n  orcidApiEndpoint: 'https://qa.adsabs.harvard.edu/v1/orcid/',\n  recaptchaKey: '6LcpTuUnAAAAAD6YCBdr_2-0b1AH8N6nXkYEG5G5',\n  hourly: false\n});\n\n//# sourceURL=webpack://bumblebee/./src/config/discovery.vars.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/config/discovery.vars.js");
/******/ 	
/******/ })()
;