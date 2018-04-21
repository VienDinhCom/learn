( function( $ ) {
  $.fn.extend({
    exists: function( yes, no ) {
      if ( 0 < this.length ) {
        yes.call( this );
      } else if ( no ) {
        no.call( this );
      }
    }
  });
})( jQuery );
