/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbumblebee"] = self["webpackChunkbumblebee"] || []).push([["src_js_react_Recommender_models_index_js"],{

/***/ "./src/js/react/Recommender/models/index.js":
/*!**************************************************!*\
  !*** ./src/js/react/Recommender/models/index.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! js/react/Recommender/models/searchExamples */ \"./src/js/react/Recommender/models/searchExamples.js\")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (searchExamples) {\n  return {\n    searchExamples: searchExamples\n  };\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/react/Recommender/models/index.js?");

/***/ }),

/***/ "./src/js/react/Recommender/models/searchExamples.js":
/*!***********************************************************!*\
  !*** ./src/js/react/Recommender/models/searchExamples.js ***!
  \***********************************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n  var authors = ['Penrose, Roger', 'Genzel, Reinhard', 'Ghez, Andrea M.', 'Murray, Norman', 'Filippenko, Alex', 'Mushotzky, Richard', 'Greaves, Jane', 'York, Donald', 'Kara, Erin', 'Lee, Eve', 'Lesser, Michael', 'Wizinowich, Peter', 'Eisenhauer, Frank', 'Aerts, Conny', 'Christensen-Dalsgaard, Jørgen', 'Ulrich, Roger', 'Starck, Jean-Luc', 'Czerny, Bożena', 'Koppelman, Helmer', 'Miret-Roig, Núria', 'Obrzud, Ewelina', 'van Dishoeck, Ewine', 'Pović, Mirjana', 'Encrenaz, Therese', 'Quick, Lynnae', 'Turtle, Elizabeth', 'Showalter, Mark', 'Solanki, Sami', 'Kowalski, Adam'];\n  var searchExamples = [{\n    label: 'author',\n    syntax: 'author:\"%\"',\n    examples: authors\n  }, {\n    label: 'first author',\n    syntax: 'first_author:\"%\"',\n    examples: authors\n  }, {\n    label: 'abstract + title',\n    syntax: 'abs:\"%\"',\n    examples: ['dark energy']\n  }, {\n    label: 'year',\n    syntax: 'year:%',\n    examples: ['2000']\n  }, {\n    label: 'year range',\n    syntax: 'year:%',\n    examples: ['2000-2005']\n  }, {\n    label: 'full text',\n    syntax: 'full:\"%\"',\n    examples: ['super Earth']\n  }, {\n    label: 'publication',\n    syntax: 'bibstem:%',\n    examples: ['ApJ'],\n    tooltip: \"this field requires the bibstem, or journal abbreviation--try going to the 'Paper' tab above for an easy-to-use form version\"\n  }, {\n    label: 'citations',\n    syntax: 'citations(%)',\n    examples: ['abstract:JWST'],\n    tooltip: 'finds all papers that cite a given set of papers'\n  }, {\n    label: 'refereed',\n    syntax: 'property:%',\n    examples: ['refereed'],\n    tooltip: 'limit to refereed papers'\n  }, {\n    label: 'astronomy',\n    syntax: 'collection:%',\n    examples: ['astronomy'],\n    tooltip: 'limit search to collection'\n  }, {\n    label: 'exact search',\n    syntax: '=%',\n    examples: ['body:\"intracluster medium\"']\n  }, {\n    label: 'institution',\n    syntax: 'inst:%',\n    examples: ['CfA']\n  }, {\n    label: 'author count',\n    syntax: 'author_count:%',\n    examples: ['[1 TO 10]']\n  }, {\n    label: 'record type',\n    syntax: 'doctype:%',\n    examples: ['software']\n  }, {\n    label: 'newly ingested',\n    syntax: 'entdate:[NOW-7DAYS TO NOW]',\n    examples: [],\n    tooltip: 'papers entered in the last week'\n  }, {\n    label: 'eprint',\n    syntax: 'property:\"eprint_openaccess”',\n    examples: [],\n    tooltip: 'papers which are or have an eprint'\n  }];\n  return searchExamples;\n}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//# sourceURL=webpack://bumblebee/./src/js/react/Recommender/models/searchExamples.js?");

/***/ })

}]);