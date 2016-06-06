$(function() {

	/** Tamano de la tabla se adjusta al espacio libre a lo alto **/
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
					   
	$( '#tableMerma' ).css('max-height', (( height / 2 ) - 10 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

	/** Revisar sesion **/
	if(localStorage.getItem('user') == null) {
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";
	}	
	/** Fin de revision **/	
	
	/** Cerrar sesion **/
	$( '#logout' ).on('click touch', function(e) {
		
		localStorage.clear();
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";		
		
	});
	/** Fin sesion **/	
	
	/** Mostrar menu lateral izquierdo **/
	$( '#menuLeft' ).css('height', ( height + 10 ) + 'px').css( 'overflow-y', 'auto' );
	$( '#usuarioText' ).text(localStorage.getItem('user'));
	
	$("#slideLeft").on('click touch', function(e) {

		$( '#menuLeft' ).animate({width: 'toggle'});
		
	});	
	/** Fin del menu lateral izquierdo **/
	
    /**  Revisar existencia de token para seguir en app **/
    var token = localStorage.getItem('token'); // Se obtiene el valor del localStorage
    var user = localStorage.getItem('user'); // Se obtiene el valor del localStorage
    var imei = localStorage.getItem('imei'); // Se obtiene el valor del localStorage
	
	if(token != null && user != null) {

		$( '#usuarioMerma' ).val(user);
		$( '#imeiMerma' ).val(imei);
		$( '#cvePlantaMerma' ).val(cvePlanta);
		$( '#cveCedisMerma' ).val(cveCedis);
	} 
	/** Fin el token **/

});

/** Remover un renglon de la tabla **/
$(document).on('click touch', '.remove', function(e) {

     e.preventDefault();

     $(this).closest('tr').remove();

     return false;
});
/** Fin de remover **/
