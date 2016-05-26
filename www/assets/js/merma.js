$(function() {

	/** Fecha del dia de hoy a campo de fecha **/
	var d = new Date();

	var month = d.getMonth() + 1;
	var day = d.getDate();

	var date = d.getFullYear() + '-' + ( month < 10 ? '0' : '' ) + month + '-' +  ( day < 10 ? '0' : '' ) + day;

	$( '#fechaMerma' ).val( date );
	/** Fin de fecha **/

	/** Tamano de la tabla se adjusta al espacio libre a lo alto **/
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
					   
	$( '#tableMerma' ).css('max-height', (( height / 2 ) - 10 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

	/** Realiza un escaneo de los datos del producto **/
    $( '#scan' ).on( 'click touch', function(event) {

		event.preventDefault();

		// Crea un nuevo row en la tabla de datosMerma
		$( '#datosMerma' ).append(
			'<tr>' +
			'<td></td>' + 
			'<td><button type="button" class="btn btn-danger btn-xs remove" style="padding: 2px 6px;">x</button></td>' +
			'<td><select name="cveCategoria" id="catCategoria"><option value="1">Pieza</option><option value="2">Caja</option></select></td>' +
			'<td class="codMerma">' + Math.floor((Math.random() * 9999) + 100) + '</td>' + 
			'<td class="cantMerma" contenteditable="true">24</td>' + 
			'<td class="cajaMerma" contenteditable="true">1</td>' + 
			'<td class="skuMerma">0583</td>' + 
			'<td class="desMerma">NaN</td>' + 
			'</tr>'
		);
		
	});
    /** Fin del escaneo de los datos **/

    /**  Revisar existencia de token para seguir en app **/
    var token = localStorage.getItem('token'); // Se obtiene el valor del localStorage
    var user = localStorage.getItem('user'); // Se obtiene el valor del localStorage
    var cvePlanta = localStorage.getItem('cvePlanta'); // Se obtiene el valor del localStorage
    var cveCedis = localStorage.getItem('cveCedis'); // Se obtiene el valor del localStorage
	
	if(token != null && user != null && cvePlanta != null && cveCedis != null) {

		$( '#usuarioMerma' ).val(user);
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
