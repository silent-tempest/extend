/* globals console, describe, it */

'use strict';

var extend = require( '..' );

describe( "require('extend')", function () {
  it( 'works', function () {
    extend.should.be.a( 'function' );
  } );
} );

describe( 'example', function () {
  it( 'works', function () {
    function Animal ( name ) {
      this.name = name;
    }

    Animal.prototype.eat = function eat ( food ) {
      console.log( this.name, 'eats', food );
    };

    var Cat = extend( Animal, {
      constructor: function Cat ( name ) {
        this.__super__.call( this, name );
      },

      eat: function eat ( food ) {
        if ( food !== 'fish' ) {
          console.error( this.name, 'cannot eat', food );
        } else {
          this.__super__.prototype.eat.call( this, food );
        }
      }
    } );

    var cat = new Cat( 'kitty' );
    cat.eat( 'fish' ); // console.log:   'kitty eats fish'
    cat.eat( 'dog' );  // console.error: 'kitty cannot eat dog'
  } );
} );

describe( 'bad use', function () {
  it( 'throws', function ( done ) {
    try {
      extend();
    } catch ( error ) {
      done();
    }
  } );
} );

describe( 'test case #1', function () {
  it( 'works', function () {
    function A ( name ) {
      this._name = name;
    }

    var B = extend( A, {
      constructor: function B ( name ) {
        this.__super__.call( this, '"' + name + '"' );
      },

      name: function name () {
        return this._name;
      }
    } );

    var b = new B( 'John' );

    b.should
      .instanceOf( A )
      .instanceOf( B );

    b.name().should.equal( '"John"' );
  } );
} );

describe( 'test case #2', function () {
  it( 'works', function () {
    function A () {}

    var B = extend( A, {
      constructor: function B () {
        this.__super__.should.equal( A );
      }
    } );

    var C = extend( B, {
      constructor: function C () {
        this.__super__.should.equal( B );
        this.__super__.prototype.__super__.should.equal( A );
      }
    } );

    // jshint -W031
      new C();
      new B();
      new C();
      new B();
    // jshint +W031
  } );
} );
