$(function() {

	/** Tamano de la tabla se adjusta al espacio libre a lo alto **/
	var body = document.body,
	html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
					   
	$( '#tableMerma' ).css('max-height', (( height / 2 ) - 10 ) + 'px').css( 'overflow-y', 'auto' );
	/** Fin de tabla **/

	/** Realiza un escaneo de los datos del producto **/ /** Futuro consulta al API **/
    $( '#scan' ).on( 'click touch', function(event) {

		event.preventDefault();

		// Crea un nuevo row en la tabla de datosMerma
		$( '#datosMerma' ).append(
			'<tr>' +
			'<td></td>' + 
			'<td><button type="button" class="btn btn-danger btn-xs remove" style="padding: 2px 6px;">x</button></td>' +
			'<td><select name="cveCategoria" id="catCategoria"><option value="1">Pieza</option><option value="2">Caja</option></select></td>' +
			'<td class="cantMerma" contenteditable="true">24</td>' + 
			'<td class="cajaMerma" contenteditable="true">1</td>' + 
			//'<td class="codMerma">' + Math.floor((Math.random() * 9999) + 100) + '</td>' + 
			'<td class="codMerma">' + $( '#scanCode' ).val() + '</td>' + 
			'<td class="skuMerma">0583</td>' + 
			'<td class="desMerma">' + makeid() + '</td>' + 
			'</tr>'
		);
		
	});
    /** Fin del escaneo de los datos **/

    /** Generar un texto random **/
	function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 21; i++ ) {

	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    	if( i % 6 === 0 ) { text += " "; }
		}

	    return text;
	}
    /** Fin del texto random **/

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
