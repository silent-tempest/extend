'use strict';

var ArgumentException = require( 'argument-exception' );
var LogicalError      = require( 'logical-error' );
var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend ( __super__, __proto__ ) {
  var keys, i, l;

  if ( typeof __super__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__super__', __super__ );
  }

  if ( ( typeof __proto__ !== 'object' || __proto__ === null ) && typeof __proto__ !== 'function' ) {
    throw ArgumentException( 'extend(__super__: function, __proto__: object): function', '__proto__', __proto__ );
  }

  if ( ! hasOwnProperty.call( __proto__, 'constructor' ) ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', 'cannot find `constructor` function in `__proto__`' );
  }

  if ( typeof __proto__.constructor !== 'function' ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__proto__.constructor` is not a function' );
  }

  if ( typeof __super__.prototype !== 'object' || __super__.prototype === null ) {
    throw LogicalError( 'extend(__super__: function, __proto__: object): function', '`__super__.prototype` must be an object' );
  }

  __proto__.constructor.prototype = Object.create( __super__.prototype );
  __proto__.constructor.prototype.__super__ = __super__;

  for ( keys = Object.keys( __proto__ ), i = 0, l = keys.length; i < l; ++i ) {
    __proto__.constructor.prototype[ keys[ i ] ] = __proto__[ keys[ i ] ];
  }

  return __proto__.constructor;
}

module.exports = extend;
