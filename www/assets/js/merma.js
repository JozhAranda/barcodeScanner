$(function() {

	/** Fecha del dia de hoy a campo de fecha **/
	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();

	var date = ( day < 10 ? '0' : '' ) + day + '/' + ( month < 10 ? '0' : '' ) + month + '/' + year.toString().substr(2,2);

	$( '#fechaMerma' ).val( date );
	/** Fin de fecha **/

	/** Tamaño de la tabla se ajusta al espacio libre a lo alto **/
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
					   
	$( '#tableMerma' ).css('max-height', ( height / 1.5 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

	$('#fechaMerma').datepicker({
	    endDate: "today",
	    format: "dd/mm/yy",
	    language: "es",
	    orientation: "top left"
	});

	/** Revisar sesión **/
	if(localStorage.getItem('user') == null) {
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";
	}	
	/** Fin de revisión **/	
	
	/** Cerrar sesión **/
	$( '#logout' ).on('click touch', function(e) {
		
		localStorage.clear();
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";			
	});
	/** Fin sesión **/	
	
	/** Mostrar menú lateral izquierdo **/
	$( '#menuLeft' ).css('height', ( height + 10 ) + 'px').css( 'overflow-y', 'auto' );
	$( '#usuarioText' ).text(localStorage.getItem('user'));
	
	$( '#slideLeft' ).on('click touch', function(e) {

		$( '#menuLeft' ).animate({width: 'toggle'});		
	});	
	/** Fin del menú lateral izquierdo **/
	
	/** Ocultar el form **/
	$( '#slideUp' ).on('click touch', function() {

		$( '#formMerma' ).slideToggle( "slow" );
	});
	/** Fin ocultar **/

	/** Deshabilitar el input de escaneo **/
	$( '#catUnidad' ).on('change', function(e) {
		
		$( '#scanCode' ).attr('disabled', false);		
	});
	/** Fin del deshabilitar **/

    /**  Revisar existencia de token para seguir en app **/
    var token = localStorage.getItem('token'); // Se obtiene el valor del localStorage
    var user = localStorage.getItem('user'); // Se obtiene el valor del localStorage
    var imei = localStorage.getItem('imei'); // Se obtiene el valor del localStorage
	
	if(token != null && user != null) {

		$( '#usuarioMerma' ).val(user);
		$( '#imeiMerma' ).val(imei);
	} 
	/** Fin el token **/

});

/** Remover un renglón de la tabla **/
$$( '.delete' ).swipeRight(function(e) {

	e.preventDefault();

	var r = confirm("¿Deseas eliminar el registro?");
	if (r == true) {
	
		$$(this).closest('div').remove();
	}

	return false;      	
});
/** Fin de remover **/
