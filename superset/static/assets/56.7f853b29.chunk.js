(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[56],{

/***/ "./node_modules/@superset-ui/plugin-chart-echarts/esm/Timeseries/EchartsTimeseries.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@superset-ui/plugin-chart-echarts/esm/Timeseries/EchartsTimeseries.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return EchartsTimeseries; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Echart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Echart */ \"./node_modules/@superset-ui/plugin-chart-echarts/esm/components/Echart.js\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @emotion/react */ \"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js\");\n/**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n// @ts-ignore\nfunction EchartsTimeseries({\n  formData,\n  height,\n  width,\n  echartOptions,\n  groupby,\n  labelMap,\n  setDataMask\n}) {\n  const {\n    filterState\n  } = formData;\n  const handleChange = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(values => {\n    if (!formData.emitFilter) {\n      return;\n    }\n\n    const groupbyValues = values.map(value => labelMap[value]);\n    setDataMask({\n      extraFormData: {\n        filters: values.length === 0 ? [] : groupby.map((col, idx) => {\n          const val = groupbyValues.map(v => v[idx]);\n          if (val === null || val === undefined) return {\n            col,\n            op: 'IS NULL'\n          };\n          return {\n            col,\n            op: 'IN',\n            val: val\n          };\n        })\n      },\n      filterState: {\n        label: groupbyValues.length ? groupbyValues : undefined,\n        value: groupbyValues.length ? groupbyValues : null\n      }\n    });\n  }, [groupby, labelMap, setDataMask]);\n  const selectedValues = (filterState || []).reduce((acc, selectedValue) => {\n    const index = Object.keys(labelMap).indexOf(selectedValue);\n    return { ...acc,\n      [index]: selectedValue\n    };\n  }, {});\n  const eventHandlers = {\n    click: props => {\n      const {\n        seriesId\n      } = props;\n      const values = Object.values(selectedValues);\n\n      if (values.includes(seriesId)) {\n        handleChange(values.filter(v => v !== seriesId));\n      } else {\n        handleChange([...values, seriesId]);\n      }\n    }\n  };\n  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_2__[\"jsx\"])(_components_Echart__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    height: height,\n    width: width,\n    echartOptions: echartOptions,\n    eventHandlers: eventHandlers,\n    selectedValues: selectedValues\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQHN1cGVyc2V0LXVpL3BsdWdpbi1jaGFydC1lY2hhcnRzL2VzbS9UaW1lc2VyaWVzL0VjaGFydHNUaW1lc2VyaWVzLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzdXBlcnNldC11aS9wbHVnaW4tY2hhcnQtZWNoYXJ0cy9lc20vVGltZXNlcmllcy9FY2hhcnRzVGltZXNlcmllcy5qcz80NjJjIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuICogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4gKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuICogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuICogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4gKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4gKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuICogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiAqIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFY2hhcnQgZnJvbSAnLi4vY29tcG9uZW50cy9FY2hhcnQnO1xuaW1wb3J0IHsganN4IGFzIF9fX0Vtb3Rpb25KU1ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVjaGFydHNUaW1lc2VyaWVzKHtcbiAgZm9ybURhdGEsXG4gIGhlaWdodCxcbiAgd2lkdGgsXG4gIGVjaGFydE9wdGlvbnMsXG4gIGdyb3VwYnksXG4gIGxhYmVsTWFwLFxuICBzZXREYXRhTWFza1xufSkge1xuICBjb25zdCB7XG4gICAgZmlsdGVyU3RhdGVcbiAgfSA9IGZvcm1EYXRhO1xuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSB1c2VDYWxsYmFjayh2YWx1ZXMgPT4ge1xuICAgIGlmICghZm9ybURhdGEuZW1pdEZpbHRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwYnlWYWx1ZXMgPSB2YWx1ZXMubWFwKHZhbHVlID0+IGxhYmVsTWFwW3ZhbHVlXSk7XG4gICAgc2V0RGF0YU1hc2soe1xuICAgICAgZXh0cmFGb3JtRGF0YToge1xuICAgICAgICBmaWx0ZXJzOiB2YWx1ZXMubGVuZ3RoID09PSAwID8gW10gOiBncm91cGJ5Lm1hcCgoY29sLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWwgPSBncm91cGJ5VmFsdWVzLm1hcCh2ID0+IHZbaWR4XSk7XG4gICAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbCxcbiAgICAgICAgICAgIG9wOiAnSVMgTlVMTCdcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBvcDogJ0lOJyxcbiAgICAgICAgICAgIHZhbDogdmFsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBmaWx0ZXJTdGF0ZToge1xuICAgICAgICBsYWJlbDogZ3JvdXBieVZhbHVlcy5sZW5ndGggPyBncm91cGJ5VmFsdWVzIDogdW5kZWZpbmVkLFxuICAgICAgICB2YWx1ZTogZ3JvdXBieVZhbHVlcy5sZW5ndGggPyBncm91cGJ5VmFsdWVzIDogbnVsbFxuICAgICAgfVxuICAgIH0pO1xuICB9LCBbZ3JvdXBieSwgbGFiZWxNYXAsIHNldERhdGFNYXNrXSk7XG4gIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gKGZpbHRlclN0YXRlIHx8IFtdKS5yZWR1Y2UoKGFjYywgc2VsZWN0ZWRWYWx1ZSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gT2JqZWN0LmtleXMobGFiZWxNYXApLmluZGV4T2Yoc2VsZWN0ZWRWYWx1ZSk7XG4gICAgcmV0dXJuIHsgLi4uYWNjLFxuICAgICAgW2luZGV4XTogc2VsZWN0ZWRWYWx1ZVxuICAgIH07XG4gIH0sIHt9KTtcbiAgY29uc3QgZXZlbnRIYW5kbGVycyA9IHtcbiAgICBjbGljazogcHJvcHMgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzZXJpZXNJZFxuICAgICAgfSA9IHByb3BzO1xuICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LnZhbHVlcyhzZWxlY3RlZFZhbHVlcyk7XG5cbiAgICAgIGlmICh2YWx1ZXMuaW5jbHVkZXMoc2VyaWVzSWQpKSB7XG4gICAgICAgIGhhbmRsZUNoYW5nZSh2YWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gc2VyaWVzSWQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZUNoYW5nZShbLi4udmFsdWVzLCBzZXJpZXNJZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIF9fX0Vtb3Rpb25KU1goRWNoYXJ0LCB7XG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGVjaGFydE9wdGlvbnM6IGVjaGFydE9wdGlvbnMsXG4gICAgZXZlbnRIYW5kbGVyczogZXZlbnRIYW5kbGVycyxcbiAgICBzZWxlY3RlZFZhbHVlczogc2VsZWN0ZWRWYWx1ZXNcbiAgfSk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@superset-ui/plugin-chart-echarts/esm/Timeseries/EchartsTimeseries.js\n");

/***/ }),

/***/ "./node_modules/@superset-ui/plugin-chart-echarts/esm/components/Echart.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@superset-ui/plugin-chart-echarts/esm/components/Echart.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Echart; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _superset_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @superset-ui/core */ \"./node_modules/@superset-ui/core/esm/style/index.js\");\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! echarts */ \"./node_modules/echarts/index.js\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/react */ \"./node_modules/@emotion/react/dist/emotion-react.browser.esm.js\");\n/**\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * \"License\"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n\n\n\nconst Styles = _superset_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"styled\"].div`\n  height: ${({\n  height\n}) => height};\n  width: ${({\n  width\n}) => width};\n`;\nfunction Echart({\n  width,\n  height,\n  echartOptions,\n  eventHandlers,\n  selectedValues = {}\n}) {\n  const divRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const chartRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])();\n  const currentSelection = Object.keys(selectedValues) || [];\n  const previousSelection = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])([]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (!divRef.current) return;\n\n    if (!chartRef.current) {\n      chartRef.current = Object(echarts__WEBPACK_IMPORTED_MODULE_2__[\"init\"])(divRef.current);\n    }\n\n    Object.entries(eventHandlers || {}).forEach(([name, handler]) => {\n      var _chartRef$current, _chartRef$current2;\n\n      (_chartRef$current = chartRef.current) == null ? void 0 : _chartRef$current.off(name);\n      (_chartRef$current2 = chartRef.current) == null ? void 0 : _chartRef$current2.on(name, handler);\n    });\n    chartRef.current.setOption(echartOptions, true);\n    chartRef.current.dispatchAction({\n      type: 'downplay',\n      dataIndex: previousSelection.current.filter(value => !currentSelection.includes(value))\n    });\n\n    if (currentSelection.length) {\n      chartRef.current.dispatchAction({\n        type: 'highlight',\n        dataIndex: currentSelection\n      });\n    }\n\n    previousSelection.current = currentSelection;\n  }, [echartOptions, eventHandlers, selectedValues]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (chartRef.current) {\n      chartRef.current.resize({\n        width,\n        height\n      });\n    }\n  }, [width, height]);\n  return Object(_emotion_react__WEBPACK_IMPORTED_MODULE_3__[\"jsx\"])(Styles, {\n    ref: divRef,\n    height: height,\n    width: width\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQHN1cGVyc2V0LXVpL3BsdWdpbi1jaGFydC1lY2hhcnRzL2VzbS9jb21wb25lbnRzL0VjaGFydC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac3VwZXJzZXQtdWkvcGx1Z2luLWNoYXJ0LWVjaGFydHMvZXNtL2NvbXBvbmVudHMvRWNoYXJ0LmpzP2JjOWEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4gKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiAqIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4gKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4gKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2VcbiAqIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSAnQHN1cGVyc2V0LXVpL2NvcmUnO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gJ2VjaGFydHMnO1xuaW1wb3J0IHsganN4IGFzIF9fX0Vtb3Rpb25KU1ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmNvbnN0IFN0eWxlcyA9IHN0eWxlZC5kaXZgXG4gIGhlaWdodDogJHsoe1xuICBoZWlnaHRcbn0pID0+IGhlaWdodH07XG4gIHdpZHRoOiAkeyh7XG4gIHdpZHRoXG59KSA9PiB3aWR0aH07XG5gO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRWNoYXJ0KHtcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgZWNoYXJ0T3B0aW9ucyxcbiAgZXZlbnRIYW5kbGVycyxcbiAgc2VsZWN0ZWRWYWx1ZXMgPSB7fVxufSkge1xuICBjb25zdCBkaXZSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNoYXJ0UmVmID0gdXNlUmVmKCk7XG4gIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb24gPSBPYmplY3Qua2V5cyhzZWxlY3RlZFZhbHVlcykgfHwgW107XG4gIGNvbnN0IHByZXZpb3VzU2VsZWN0aW9uID0gdXNlUmVmKFtdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRpdlJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICBpZiAoIWNoYXJ0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNoYXJ0UmVmLmN1cnJlbnQgPSBpbml0KGRpdlJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBPYmplY3QuZW50cmllcyhldmVudEhhbmRsZXJzIHx8IHt9KS5mb3JFYWNoKChbbmFtZSwgaGFuZGxlcl0pID0+IHtcbiAgICAgIHZhciBfY2hhcnRSZWYkY3VycmVudCwgX2NoYXJ0UmVmJGN1cnJlbnQyO1xuXG4gICAgICAoX2NoYXJ0UmVmJGN1cnJlbnQgPSBjaGFydFJlZi5jdXJyZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2NoYXJ0UmVmJGN1cnJlbnQub2ZmKG5hbWUpO1xuICAgICAgKF9jaGFydFJlZiRjdXJyZW50MiA9IGNoYXJ0UmVmLmN1cnJlbnQpID09IG51bGwgPyB2b2lkIDAgOiBfY2hhcnRSZWYkY3VycmVudDIub24obmFtZSwgaGFuZGxlcik7XG4gICAgfSk7XG4gICAgY2hhcnRSZWYuY3VycmVudC5zZXRPcHRpb24oZWNoYXJ0T3B0aW9ucywgdHJ1ZSk7XG4gICAgY2hhcnRSZWYuY3VycmVudC5kaXNwYXRjaEFjdGlvbih7XG4gICAgICB0eXBlOiAnZG93bnBsYXknLFxuICAgICAgZGF0YUluZGV4OiBwcmV2aW91c1NlbGVjdGlvbi5jdXJyZW50LmZpbHRlcih2YWx1ZSA9PiAhY3VycmVudFNlbGVjdGlvbi5pbmNsdWRlcyh2YWx1ZSkpXG4gICAgfSk7XG5cbiAgICBpZiAoY3VycmVudFNlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgIGNoYXJ0UmVmLmN1cnJlbnQuZGlzcGF0Y2hBY3Rpb24oe1xuICAgICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgICAgZGF0YUluZGV4OiBjdXJyZW50U2VsZWN0aW9uXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1NlbGVjdGlvbi5jdXJyZW50ID0gY3VycmVudFNlbGVjdGlvbjtcbiAgfSwgW2VjaGFydE9wdGlvbnMsIGV2ZW50SGFuZGxlcnMsIHNlbGVjdGVkVmFsdWVzXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNoYXJ0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGNoYXJ0UmVmLmN1cnJlbnQucmVzaXplKHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuICB9LCBbd2lkdGgsIGhlaWdodF0pO1xuICByZXR1cm4gX19fRW1vdGlvbkpTWChTdHlsZXMsIHtcbiAgICByZWY6IGRpdlJlZixcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB3aWR0aDogd2lkdGhcbiAgfSk7XG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@superset-ui/plugin-chart-echarts/esm/components/Echart.js\n");

/***/ })

}]);