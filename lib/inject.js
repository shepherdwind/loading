/**!
 * loading - lib/inject.js
 *
 * Copyright(c) 2014 fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

var is = require('is-type-of');

module.exports = function inject(obj, properties, exports, target, isCall, isOverride) {
  if (!properties || properties.length === 0) {
    return;
  }

  var property = properties.shift();

  if (properties.length === 0) {
    if (!isOverride && obj[property]) {
      throw new Error('can\'t overwrite property ' + property);
    }
    if (isCall && is.function(exports) && !is.generatorFunction(exports)) {
      var val = exports(target);
      if (val !== undefined && val !== null) {
        obj[property] = val;
      }
    } else {
      obj[property] = exports;
    }
    return;
  }

  obj[property] || (obj[property] = {});
  inject(obj[property], properties, exports, target, isCall);
};
