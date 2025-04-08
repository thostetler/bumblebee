/*
Example module that simply prints 'hello x'
as a main page
*/

import $ from "jquery";
import _ from "underscore";

var showName = function(selector, n) {
  console.log(selector);
  console.log(n);
  var temp = _.template('Hello <%= name %>');
  $(selector).html(temp({ name: n }));
};
export default {
  showName: showName,
};
