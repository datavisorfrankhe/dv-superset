/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"addSlice": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "." + "7f853b29" + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/assets/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([8,"vendors","mathjs","thumbnail",3,4]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/addSlice/AddSliceContainer.tsx":
/*!********************************************!*\
  !*** ./src/addSlice/AddSliceContainer.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AddSliceContainer; });\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/json/stringify */ \"./node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/bind */ \"./node_modules/@babel/runtime-corejs3/core-js-stable/instance/bind.js\");\n/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var src_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/Button */ \"./src/components/Button/index.tsx\");\n/* harmony import */ var src_components_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/Select */ \"./src/components/Select/index.ts\");\n/* harmony import */ var _superset_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @superset-ui/core */ \"./node_modules/@superset-ui/core/esm/style/index.js\");\n/* harmony import */ var _superset_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @superset-ui/core */ \"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js\");\n/* harmony import */ var _superset_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @superset-ui/core */ \"./node_modules/@superset-ui/core/esm/translation/TranslatorSingleton.js\");\n/* harmony import */ var src_explore_components_controls_VizTypeControl_VizTypeGallery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/explore/components/controls/VizTypeControl/VizTypeGallery */ \"./src/explore/components/controls/VizTypeControl/VizTypeGallery.tsx\");\n(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\nconst ESTIMATED_NAV_HEIGHT = '56px';\nconst styleSelectContainer = { width: 600, marginBottom: '10px' };\nconst StyledContainer = _superset_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"styled\"].div`\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 100%;\n  max-width: ${src_explore_components_controls_VizTypeControl_VizTypeGallery__WEBPACK_IMPORTED_MODULE_8__[\"MAX_ADVISABLE_VIZ_GALLERY_WIDTH\"]}px;\n  max-height: calc(100vh - ${ESTIMATED_NAV_HEIGHT});\n  border-radius: ${({ theme }) => theme.gridUnit}px;\n  background-color: ${({ theme }) => theme.colors.grayscale.light5};\n  padding-bottom: ${({ theme }) => theme.gridUnit * 3}px;\n  h3 {\n    padding-bottom: ${({ theme }) => theme.gridUnit * 3}px;\n  }\n`;\nconst cssStatic = _superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"css\"]`\n  flex: 0 0 auto;\n`;\nconst StyledVizTypeGallery = Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_5__[\"styled\"])(src_explore_components_controls_VizTypeControl_VizTypeGallery__WEBPACK_IMPORTED_MODULE_8__[\"default\"])`\n  border: 1px solid ${({ theme }) => theme.colors.grayscale.light2};\n  margin: ${({ theme }) => theme.gridUnit * 3}px 0px;\n  flex: 1 1 auto;\n`;\nclass AddSliceContainer extends react__WEBPACK_IMPORTED_MODULE_2___default.a.PureComponent {\n  constructor(props) {var _context, _context2, _context3;\n    super(props);\n    this.state = {\n      visType: null };\n\n    this.changeDatasource = _babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1___default()(_context = this.changeDatasource).call(_context, this);\n    this.changeVisType = _babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1___default()(_context2 = this.changeVisType).call(_context2, this);\n    this.gotoSlice = _babel_runtime_corejs3_core_js_stable_instance_bind__WEBPACK_IMPORTED_MODULE_1___default()(_context3 = this.gotoSlice).call(_context3, this);\n  }\n  exploreUrl() {\n    const formData = encodeURIComponent(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()({\n      viz_type: this.state.visType,\n      datasource: this.state.datasourceValue }));\n\n    return `/superset/explore/?form_data=${formData}`;\n  }\n  gotoSlice() {\n    window.location.href = this.exploreUrl();\n  }\n  changeDatasource(option) {\n    this.setState({\n      datasourceValue: option.value,\n      datasourceId: option.value.split('__')[0] });\n\n  }\n  changeVisType(visType) {\n    this.setState({ visType });\n  }\n  isBtnDisabled() {\n    return !(this.state.datasourceId && this.state.visType);\n  }\n  render() {\n    return Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(StyledContainer, { className: \"container\" },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"h3\", { css: cssStatic }, Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"t\"])('Create a new chart')),\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"div\", { css: cssStatic },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"p\", null, Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"t\"])('Choose a dataset')),\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"div\", { style: styleSelectContainer },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(src_components_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { clearable: false, ignoreAccents: false, name: \"select-datasource\", onChange: this.changeDatasource, options: this.props.datasources, placeholder: Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"t\"])('Choose a dataset'), value: this.state.datasourceValue ?\n      {\n        value: this.state.datasourceValue } :\n\n      undefined, width: 600 })),\n\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"span\", { className: \"text-muted\" },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"t\"])('If the dataset you are looking for is not available in the list, follow the instructions on how to add it in the Superset tutorial.'), ' ',\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"a\", { href: \"https://superset.apache.org/docs/creating-charts-dashboards/first-dashboard#adding-a-new-table\", rel: \"noopener noreferrer\", target: \"_blank\" },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(\"i\", { className: \"fa fa-external-link\" })))),\n\n\n\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(StyledVizTypeGallery, { onChange: this.changeVisType, selectedViz: this.state.visType }),\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"jsx\"])(src_components_Button__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { css: [\n      cssStatic,\n      _superset_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"css\"]`\n              align-self: flex-end;\n            `,  false ? undefined : \";label:AddSliceContainer;\",  false ? undefined : \"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9mcmFua2hlL3Byb2plY3RzL3N1cGVyc2V0L3N1cGVyc2V0LWZyb250ZW5kL3NyYy9hZGRTbGljZS9BZGRTbGljZUNvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0dnQiIsImZpbGUiOiIvVXNlcnMvZnJhbmtoZS9wcm9qZWN0cy9zdXBlcnNldC9zdXBlcnNldC1mcm9udGVuZC9zcmMvYWRkU2xpY2UvQWRkU2xpY2VDb250YWluZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCdXR0b24gZnJvbSAnc3JjL2NvbXBvbmVudHMvQnV0dG9uJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnc3JjL2NvbXBvbmVudHMvU2VsZWN0JztcbmltcG9ydCB7IGNzcywgc3R5bGVkLCB0IH0gZnJvbSAnQHN1cGVyc2V0LXVpL2NvcmUnO1xuaW1wb3J0IFZpelR5cGVHYWxsZXJ5LCB7IE1BWF9BRFZJU0FCTEVfVklaX0dBTExFUllfV0lEVEgsIH0gZnJvbSAnc3JjL2V4cGxvcmUvY29tcG9uZW50cy9jb250cm9scy9WaXpUeXBlQ29udHJvbC9WaXpUeXBlR2FsbGVyeSc7XG5jb25zdCBFU1RJTUFURURfTkFWX0hFSUdIVCA9ICc1NnB4JztcbmNvbnN0IHN0eWxlU2VsZWN0Q29udGFpbmVyID0geyB3aWR0aDogNjAwLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9O1xuY29uc3QgU3R5bGVkQ29udGFpbmVyID0gc3R5bGVkLmRpdiBgXG4gIGZsZXg6IDEgMSBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6ICR7TUFYX0FEVklTQUJMRV9WSVpfR0FMTEVSWV9XSURUSH1weDtcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtICR7RVNUSU1BVEVEX05BVl9IRUlHSFR9KTtcbiAgYm9yZGVyLXJhZGl1czogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5ncmlkVW5pdH1weDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5jb2xvcnMuZ3JheXNjYWxlLmxpZ2h0NX07XG4gIHBhZGRpbmctYm90dG9tOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmdyaWRVbml0ICogM31weDtcbiAgaDMge1xuICAgIHBhZGRpbmctYm90dG9tOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmdyaWRVbml0ICogM31weDtcbiAgfVxuYDtcbmNvbnN0IGNzc1N0YXRpYyA9IGNzcyBgXG4gIGZsZXg6IDAgMCBhdXRvO1xuYDtcbmNvbnN0IFN0eWxlZFZpelR5cGVHYWxsZXJ5ID0gc3R5bGVkKFZpelR5cGVHYWxsZXJ5KSBgXG4gIGJvcmRlcjogMXB4IHNvbGlkICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuY29sb3JzLmdyYXlzY2FsZS5saWdodDJ9O1xuICBtYXJnaW46ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuZ3JpZFVuaXQgKiAzfXB4IDBweDtcbiAgZmxleDogMSAxIGF1dG87XG5gO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkU2xpY2VDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2aXNUeXBlOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYW5nZURhdGFzb3VyY2UgPSB0aGlzLmNoYW5nZURhdGFzb3VyY2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VWaXNUeXBlID0gdGhpcy5jaGFuZ2VWaXNUeXBlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZ290b1NsaWNlID0gdGhpcy5nb3RvU2xpY2UuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgZXhwbG9yZVVybCgpIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgdml6X3R5cGU6IHRoaXMuc3RhdGUudmlzVHlwZSxcbiAgICAgICAgICAgIGRhdGFzb3VyY2U6IHRoaXMuc3RhdGUuZGF0YXNvdXJjZVZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBgL3N1cGVyc2V0L2V4cGxvcmUvP2Zvcm1fZGF0YT0ke2Zvcm1EYXRhfWA7XG4gICAgfVxuICAgIGdvdG9TbGljZSgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmV4cGxvcmVVcmwoKTtcbiAgICB9XG4gICAgY2hhbmdlRGF0YXNvdXJjZShvcHRpb24pIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRhc291cmNlVmFsdWU6IG9wdGlvbi52YWx1ZSxcbiAgICAgICAgICAgIGRhdGFzb3VyY2VJZDogb3B0aW9uLnZhbHVlLnNwbGl0KCdfXycpWzBdLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlVmlzVHlwZSh2aXNUeXBlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aXNUeXBlIH0pO1xuICAgIH1cbiAgICBpc0J0bkRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLnN0YXRlLmRhdGFzb3VyY2VJZCAmJiB0aGlzLnN0YXRlLnZpc1R5cGUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoPFN0eWxlZENvbnRhaW5lciBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgzIGNzcz17Y3NzU3RhdGljfT57dCgnQ3JlYXRlIGEgbmV3IGNoYXJ0Jyl9PC9oMz5cbiAgICAgICAgPGRpdiBjc3M9e2Nzc1N0YXRpY30+XG4gICAgICAgICAgPHA+e3QoJ0Nob29zZSBhIGRhdGFzZXQnKX08L3A+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVTZWxlY3RDb250YWluZXJ9PlxuICAgICAgICAgICAgPFNlbGVjdCBjbGVhcmFibGU9e2ZhbHNlfSBpZ25vcmVBY2NlbnRzPXtmYWxzZX0gbmFtZT1cInNlbGVjdC1kYXRhc291cmNlXCIgb25DaGFuZ2U9e3RoaXMuY2hhbmdlRGF0YXNvdXJjZX0gb3B0aW9ucz17dGhpcy5wcm9wcy5kYXRhc291cmNlc30gcGxhY2Vob2xkZXI9e3QoJ0Nob29zZSBhIGRhdGFzZXQnKX0gdmFsdWU9e3RoaXMuc3RhdGUuZGF0YXNvdXJjZVZhbHVlXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kYXRhc291cmNlVmFsdWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHVuZGVmaW5lZH0gd2lkdGg9ezYwMH0vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbXV0ZWRcIj5cbiAgICAgICAgICAgIHt0KCdJZiB0aGUgZGF0YXNldCB5b3UgYXJlIGxvb2tpbmcgZm9yIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGxpc3QsIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB0byBhZGQgaXQgaW4gdGhlIFN1cGVyc2V0IHR1dG9yaWFsLicpfXsnICd9XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9zdXBlcnNldC5hcGFjaGUub3JnL2RvY3MvY3JlYXRpbmctY2hhcnRzLWRhc2hib2FyZHMvZmlyc3QtZGFzaGJvYXJkI2FkZGluZy1hLW5ldy10YWJsZVwiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZXh0ZXJuYWwtbGlua1wiLz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U3R5bGVkVml6VHlwZUdhbGxlcnkgb25DaGFuZ2U9e3RoaXMuY2hhbmdlVmlzVHlwZX0gc2VsZWN0ZWRWaXo9e3RoaXMuc3RhdGUudmlzVHlwZX0vPlxuICAgICAgICA8QnV0dG9uIGNzcz17W1xuICAgICAgICAgICAgY3NzU3RhdGljLFxuICAgICAgICAgICAgY3NzIGBcbiAgICAgICAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgICAgICAgICBgLFxuICAgICAgICBdfSBidXR0b25TdHlsZT1cInByaW1hcnlcIiBkaXNhYmxlZD17dGhpcy5pc0J0bkRpc2FibGVkKCl9IG9uQ2xpY2s9e3RoaXMuZ290b1NsaWNlfT5cbiAgICAgICAgICB7dCgnQ3JlYXRlIG5ldyBjaGFydCcpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvU3R5bGVkQ29udGFpbmVyPik7XG4gICAgfVxufVxuIl19 */\"],\n      buttonStyle: \"primary\", disabled: this.isBtnDisabled(), onClick: this.gotoSlice },\n    Object(_superset_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"t\"])('Create new chart')));\n\n\n  } // @ts-ignore\n  __reactstandin__regenerateByEval(key, code) {// @ts-ignore\n    this[key] = eval(code);}};(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(ESTIMATED_NAV_HEIGHT, \"ESTIMATED_NAV_HEIGHT\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");reactHotLoader.register(styleSelectContainer, \"styleSelectContainer\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");reactHotLoader.register(StyledContainer, \"StyledContainer\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");reactHotLoader.register(cssStatic, \"cssStatic\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");reactHotLoader.register(StyledVizTypeGallery, \"StyledVizTypeGallery\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");reactHotLoader.register(AddSliceContainer, \"AddSliceContainer\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/AddSliceContainer.tsx\");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYWRkU2xpY2UvQWRkU2xpY2VDb250YWluZXIudHN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FkZFNsaWNlL0FkZFNsaWNlQ29udGFpbmVyLnRzeD80MDc2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJ3NyYy9jb21wb25lbnRzL0J1dHRvbic7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3NyYy9jb21wb25lbnRzL1NlbGVjdCc7XG5pbXBvcnQgeyBjc3MsIHN0eWxlZCwgdCB9IGZyb20gJ0BzdXBlcnNldC11aS9jb3JlJztcblxuaW1wb3J0IFZpelR5cGVHYWxsZXJ5LCB7XG4gIE1BWF9BRFZJU0FCTEVfVklaX0dBTExFUllfV0lEVEgsXG59IGZyb20gJ3NyYy9leHBsb3JlL2NvbXBvbmVudHMvY29udHJvbHMvVml6VHlwZUNvbnRyb2wvVml6VHlwZUdhbGxlcnknO1xuXG5pbnRlcmZhY2UgRGF0YXNvdXJjZSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEFkZFNsaWNlQ29udGFpbmVyUHJvcHMgPSB7XG4gIGRhdGFzb3VyY2VzOiBEYXRhc291cmNlW107XG59O1xuXG5leHBvcnQgdHlwZSBBZGRTbGljZUNvbnRhaW5lclN0YXRlID0ge1xuICBkYXRhc291cmNlSWQ/OiBzdHJpbmc7XG4gIGRhdGFzb3VyY2VUeXBlPzogc3RyaW5nO1xuICBkYXRhc291cmNlVmFsdWU/OiBzdHJpbmc7XG4gIHZpc1R5cGU6IHN0cmluZyB8IG51bGw7XG59O1xuXG5jb25zdCBFU1RJTUFURURfTkFWX0hFSUdIVCA9ICc1NnB4JztcbmNvbnN0IHN0eWxlU2VsZWN0Q29udGFpbmVyID0geyB3aWR0aDogNjAwLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9O1xuY29uc3QgU3R5bGVkQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgZmxleDogMSAxIGF1dG87XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogJHtNQVhfQURWSVNBQkxFX1ZJWl9HQUxMRVJZX1dJRFRIfXB4O1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gJHtFU1RJTUFURURfTkFWX0hFSUdIVH0pO1xuICBib3JkZXItcmFkaXVzOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmdyaWRVbml0fXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5ncmF5c2NhbGUubGlnaHQ1fTtcbiAgcGFkZGluZy1ib3R0b206ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuZ3JpZFVuaXQgKiAzfXB4O1xuICBoMyB7XG4gICAgcGFkZGluZy1ib3R0b206ICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUuZ3JpZFVuaXQgKiAzfXB4O1xuICB9XG5gO1xuXG5jb25zdCBjc3NTdGF0aWMgPSBjc3NgXG4gIGZsZXg6IDAgMCBhdXRvO1xuYDtcblxuY29uc3QgU3R5bGVkVml6VHlwZUdhbGxlcnkgPSBzdHlsZWQoVml6VHlwZUdhbGxlcnkpYFxuICBib3JkZXI6IDFweCBzb2xpZCAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmNvbG9ycy5ncmF5c2NhbGUubGlnaHQyfTtcbiAgbWFyZ2luOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLmdyaWRVbml0ICogM31weCAwcHg7XG4gIGZsZXg6IDEgMSBhdXRvO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkU2xpY2VDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFxuICBBZGRTbGljZUNvbnRhaW5lclByb3BzLFxuICBBZGRTbGljZUNvbnRhaW5lclN0YXRlXG4+IHtcbiAgY29uc3RydWN0b3IocHJvcHM6IEFkZFNsaWNlQ29udGFpbmVyUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZpc1R5cGU6IG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuY2hhbmdlRGF0YXNvdXJjZSA9IHRoaXMuY2hhbmdlRGF0YXNvdXJjZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2hhbmdlVmlzVHlwZSA9IHRoaXMuY2hhbmdlVmlzVHlwZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZ290b1NsaWNlID0gdGhpcy5nb3RvU2xpY2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGV4cGxvcmVVcmwoKSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZpel90eXBlOiB0aGlzLnN0YXRlLnZpc1R5cGUsXG4gICAgICAgIGRhdGFzb3VyY2U6IHRoaXMuc3RhdGUuZGF0YXNvdXJjZVZhbHVlLFxuICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4gYC9zdXBlcnNldC9leHBsb3JlLz9mb3JtX2RhdGE9JHtmb3JtRGF0YX1gO1xuICB9XG5cbiAgZ290b1NsaWNlKCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5leHBsb3JlVXJsKCk7XG4gIH1cblxuICBjaGFuZ2VEYXRhc291cmNlKG9wdGlvbjogeyB2YWx1ZTogc3RyaW5nIH0pIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRhdGFzb3VyY2VWYWx1ZTogb3B0aW9uLnZhbHVlLFxuICAgICAgZGF0YXNvdXJjZUlkOiBvcHRpb24udmFsdWUuc3BsaXQoJ19fJylbMF0sXG4gICAgfSk7XG4gIH1cblxuICBjaGFuZ2VWaXNUeXBlKHZpc1R5cGU6IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgdmlzVHlwZSB9KTtcbiAgfVxuXG4gIGlzQnRuRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuICEodGhpcy5zdGF0ZS5kYXRhc291cmNlSWQgJiYgdGhpcy5zdGF0ZS52aXNUeXBlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZENvbnRhaW5lciBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgzIGNzcz17Y3NzU3RhdGljfT57dCgnQ3JlYXRlIGEgbmV3IGNoYXJ0Jyl9PC9oMz5cbiAgICAgICAgPGRpdiBjc3M9e2Nzc1N0YXRpY30+XG4gICAgICAgICAgPHA+e3QoJ0Nob29zZSBhIGRhdGFzZXQnKX08L3A+XG4gICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVTZWxlY3RDb250YWluZXJ9PlxuICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgICAgICBpZ25vcmVBY2NlbnRzPXtmYWxzZX1cbiAgICAgICAgICAgICAgbmFtZT1cInNlbGVjdC1kYXRhc291cmNlXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlRGF0YXNvdXJjZX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5kYXRhc291cmNlc31cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3QoJ0Nob29zZSBhIGRhdGFzZXQnKX1cbiAgICAgICAgICAgICAgdmFsdWU9e1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YXNvdXJjZVZhbHVlXG4gICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5kYXRhc291cmNlVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2lkdGg9ezYwMH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1tdXRlZFwiPlxuICAgICAgICAgICAge3QoXG4gICAgICAgICAgICAgICdJZiB0aGUgZGF0YXNldCB5b3UgYXJlIGxvb2tpbmcgZm9yIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGxpc3QsIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB0byBhZGQgaXQgaW4gdGhlIFN1cGVyc2V0IHR1dG9yaWFsLicsXG4gICAgICAgICAgICApfXsnICd9XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdXBlcnNldC5hcGFjaGUub3JnL2RvY3MvY3JlYXRpbmctY2hhcnRzLWRhc2hib2FyZHMvZmlyc3QtZGFzaGJvYXJkI2FkZGluZy1hLW5ldy10YWJsZVwiXG4gICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1leHRlcm5hbC1saW5rXCIgLz5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8U3R5bGVkVml6VHlwZUdhbGxlcnlcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5jaGFuZ2VWaXNUeXBlfVxuICAgICAgICAgIHNlbGVjdGVkVml6PXt0aGlzLnN0YXRlLnZpc1R5cGV9XG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBjc3M9e1tcbiAgICAgICAgICAgIGNzc1N0YXRpYyxcbiAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgICAgICAgICBgLFxuICAgICAgICAgIF19XG4gICAgICAgICAgYnV0dG9uU3R5bGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5pc0J0bkRpc2FibGVkKCl9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5nb3RvU2xpY2V9XG4gICAgICAgID5cbiAgICAgICAgICB7dCgnQ3JlYXRlIG5ldyBjaGFydCcpfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvU3R5bGVkQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFvQkE7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBRUE7O0FBRUE7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUdBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTs7QUFFQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFqR0E7QUFBQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/addSlice/AddSliceContainer.tsx\n");

/***/ }),

/***/ "./src/addSlice/App.tsx":
/*!******************************!*\
  !*** ./src/addSlice/App.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader/root */ \"./node_modules/react-hot-loader/root.js\");\n/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _superset_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @superset-ui/core */ \"./node_modules/@emotion/react/dist/emotion-element-4fbd89c5.browser.esm.js\");\n/* harmony import */ var _setup_setupApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../setup/setupApp */ \"./src/setup/setupApp.ts\");\n/* harmony import */ var _setup_setupPlugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../setup/setupPlugins */ \"./src/setup/setupPlugins.ts\");\n/* harmony import */ var _components_DynamicPlugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/DynamicPlugins */ \"./src/components/DynamicPlugins/index.tsx\");\n/* harmony import */ var _AddSliceContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddSliceContainer */ \"./src/addSlice/AddSliceContainer.tsx\");\n/* harmony import */ var _featureFlags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../featureFlags */ \"./src/featureFlags.ts\");\n/* harmony import */ var _preamble__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../preamble */ \"./src/preamble.ts\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/react */ \"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js\");\n(function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\n\n\n\n\n\nObject(_setup_setupApp__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\nObject(_setup_setupPlugins__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\nconst addSliceContainer = document.getElementById('app');\nconst bootstrapData = JSON.parse((addSliceContainer == null ? void 0 : addSliceContainer.getAttribute('data-bootstrap')) || '{}');\nObject(_featureFlags__WEBPACK_IMPORTED_MODULE_7__[\"initFeatureFlags\"])(bootstrapData.common.feature_flags);\nconst App = () => Object(_emotion_react__WEBPACK_IMPORTED_MODULE_9__[\"jsx\"])(_superset_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"a\"], { theme: _preamble__WEBPACK_IMPORTED_MODULE_8__[\"theme\"] },\nObject(_emotion_react__WEBPACK_IMPORTED_MODULE_9__[\"jsx\"])(_components_DynamicPlugins__WEBPACK_IMPORTED_MODULE_5__[\"DynamicPluginProvider\"], null,\nObject(_emotion_react__WEBPACK_IMPORTED_MODULE_9__[\"jsx\"])(_AddSliceContainer__WEBPACK_IMPORTED_MODULE_6__[\"default\"], { datasources: bootstrapData.datasources })));const _default =\n\n\nObject(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__[\"hot\"])(App);/* harmony default export */ __webpack_exports__[\"default\"] = (_default);;(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(addSliceContainer, \"addSliceContainer\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/App.tsx\");reactHotLoader.register(bootstrapData, \"bootstrapData\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/App.tsx\");reactHotLoader.register(App, \"App\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/App.tsx\");reactHotLoader.register(_default, \"default\", \"/Users/frankhe/projects/superset/superset-frontend/src/addSlice/App.tsx\");})();;(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYWRkU2xpY2UvQXBwLnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hZGRTbGljZS9BcHAudHN4P2UwMTIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGhvdCB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXIvcm9vdCc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQHN1cGVyc2V0LXVpL2NvcmUnO1xuaW1wb3J0IHNldHVwQXBwIGZyb20gJy4uL3NldHVwL3NldHVwQXBwJztcbmltcG9ydCBzZXR1cFBsdWdpbnMgZnJvbSAnLi4vc2V0dXAvc2V0dXBQbHVnaW5zJztcbmltcG9ydCB7IER5bmFtaWNQbHVnaW5Qcm92aWRlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvRHluYW1pY1BsdWdpbnMnO1xuaW1wb3J0IEFkZFNsaWNlQ29udGFpbmVyIGZyb20gJy4vQWRkU2xpY2VDb250YWluZXInO1xuaW1wb3J0IHsgaW5pdEZlYXR1cmVGbGFncyB9IGZyb20gJy4uL2ZlYXR1cmVGbGFncyc7XG5pbXBvcnQgeyB0aGVtZSB9IGZyb20gJy4uL3ByZWFtYmxlJztcblxuc2V0dXBBcHAoKTtcbnNldHVwUGx1Z2lucygpO1xuXG5jb25zdCBhZGRTbGljZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmNvbnN0IGJvb3RzdHJhcERhdGEgPSBKU09OLnBhcnNlKFxuICBhZGRTbGljZUNvbnRhaW5lcj8uZ2V0QXR0cmlidXRlKCdkYXRhLWJvb3RzdHJhcCcpIHx8ICd7fScsXG4pO1xuXG5pbml0RmVhdHVyZUZsYWdzKGJvb3RzdHJhcERhdGEuY29tbW9uLmZlYXR1cmVfZmxhZ3MpO1xuXG5jb25zdCBBcHAgPSAoKSA9PiAoXG4gIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgPER5bmFtaWNQbHVnaW5Qcm92aWRlcj5cbiAgICAgIDxBZGRTbGljZUNvbnRhaW5lciBkYXRhc291cmNlcz17Ym9vdHN0cmFwRGF0YS5kYXRhc291cmNlc30gLz5cbiAgICA8L0R5bmFtaWNQbHVnaW5Qcm92aWRlcj5cbiAgPC9UaGVtZVByb3ZpZGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgaG90KEFwcCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/addSlice/App.tsx\n");

/***/ }),

/***/ "./src/addSlice/index.tsx":
/*!********************************!*\
  !*** ./src/addSlice/index.tsx ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/@hot-loader/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ \"./src/addSlice/App.tsx\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ \"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js\");\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;}; /**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(Object(_emotion_react__WEBPACK_IMPORTED_MODULE_3__[\"jsx\"])(_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('app'));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYWRkU2xpY2UvaW5kZXgudHN4LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FkZFNsaWNlL2luZGV4LnRzeD9kNWY5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/addSlice/index.tsx\n");

/***/ }),

/***/ 8:
/*!********************************************************************************************************!*\
  !*** multi webpack-dev-server/client?http://localhost:9000 ./src/preamble.ts ./src/addSlice/index.tsx ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-dev-server/client?http://localhost:9000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9000");
__webpack_require__(/*! /Users/frankhe/projects/superset/superset-frontend/src/preamble.ts */"./src/preamble.ts");
module.exports = __webpack_require__(/*! /Users/frankhe/projects/superset/superset-frontend/src/addSlice/index.tsx */"./src/addSlice/index.tsx");


/***/ })

/******/ });