$(function() {

	/** Fecha del dia de hoy a campo de fecha **/
	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();

	var date = d.getFullYear() + '-' + ( month < 10 ? '0' : '' ) + month + '-' +  ( day < 10 ? '0' : '' ) + day;

	//$( '#fechaMerma' ).val( date );
	/** Fin de fecha **/

	/** Tamano de la tabla se adjusta al espacio libre a lo alto **/
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
					   
	$( '#tableMerma' ).css('max-height', (( height / 2 ) - 10 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

    /**  Revisar existencia de token para seguir en app **/
    var token = localStorage.getItem('token'); // Se obtiene el valor del localStorage
    var user = localStorage.getItem('user'); // Se obtiene el valor del localStorage
    var imei = localStorage.getItem('imei'); // Se obtiene el valor del localStorage
    var cvePlanta = localStorage.getItem('cvePlanta'); // Se obtiene el valor del localStorage
    var cveCedis = localStorage.getItem('cveCedis'); // Se obtiene el valor del localStorage
	
	if(token != null && user != null && cvePlanta != null && cveCedis != null) {

		$( '#usuarioMerma' ).val(user);
		$( '#imeiMerma' ).val(imei);
		$( '#cvePlantaMerma' ).val(cvePlanta);
		$( '#cveCedisMerma' ).val(cveCedis);
	}        		

});

/** Remover un renglon de la tabla **/
$(document).on('click touch', '.remove', function(e) {

     e.preventDefault();

     $(this).closest('tr').remove();

     return false;
});
/** Fin de remover **/
