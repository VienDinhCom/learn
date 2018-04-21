$.fn.extend({
  exists: function( callback ) {
    if ( 0 < this.length ) { callback(); }
  }
});
