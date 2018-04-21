( function( $ ) {
  $.fn.extend({
    exists: function( yes, no ) {
      if ( 0 < this.length ) {
        yes();
      } else if ( no ) {
        no();
      }
    }
  });
})( $ );
