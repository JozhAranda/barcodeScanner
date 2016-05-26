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
					   
	$( '#tableMerma' ).css('max-height', (( height / 3 ) - 25 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

	/** Realiza un escaneo de los datos del producto **/
    $( '#scan' ).on( 'click touch', function(event) {

		event.preventDefault();

		// Crea un nuevo row en la tabla de datosMerma
		$( '#datosMerma' ).append(
			'<tr>' +
			'<td></td>' + 
			'<td class="codMerma">193</td>' + 
			'<td class="cantMerma" contenteditable="true">5</td>' + 
			'<td class="skuMerma">0583</td>' + 
			'<td class="desMerma">NaN</td>' + 
			'</tr>'
		);

		// Crea campos hidden dentro del form    			
		$( '#hiddenMerma' ).append(
			'<input type="hidden" name="Codigo" value="193">' +
			'<input type="hidden" name="SKU" value="0583">' +
			'<input type="hidden" name="Descripcion" value="NaN">'
		);
		
	});
    /** Fin del escaneo de los datos **/

});