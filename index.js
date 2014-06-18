'use strict';

var dom = require('dom');

var TRANSITION_TIME = 500;
var ABS_STYLE = { position: 'absolute', top: 0, left: 0, opacity: 0};


/**
 * Loads the element into the DOM
 *
 * @param {Element} element - html element to load
 */
module.exports = function(parentElem, selector, elem, options) {

  if (arguments.length <= 3) {
    options     = elem;
    elem        = selector;
    selector    = parentElem;
    parentElem  = dom('body')[0];
  }

  var $insertElem = dom(parentElem).find(selector);
  var $el         = dom(elem);

  // prevent re-injection of the same layout
  if ($insertElem.html() === $el.html) return;

  // remove previous element and any stray children
  if ($insertElem[0].hasChildNodes()) {
    var childNodes = [].slice.call($insertElem[0].childNodes, 0);

    childNodes.forEach(function(elem) {
      var $elem = dom(elem);
      $elem
        .removeClass('fade-in')
        .addClass('fade-out');

      setTimeout(function() {
        $elem.remove();
      }, TRANSITION_TIME);
    });
  }

  $el
    .css(ABS_STYLE)
    .css('z-index', 2)
    .removeClass('fade-out')
    .addClass('animated')
    .addClass('fade-in');

  $el.appendTo($insertElem);

  // once faded in, decrement the z-index
  setTimeout(function() {
    $el.css('z-index', 1);
  }, TRANSITION_TIME);

  return elem;
};

