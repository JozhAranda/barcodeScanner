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
					   
	$( '#tableMerma' ).css('max-height', ( height / 1.5 ) + 'px').css( 'overflow-y', 'auto' ).css('-webkit-overflow-scrolling', 'touch');
	/** Fin de tabla **/

	$( '.input-group-addon' ).css('display', 'none'); // Remueve al addon en el calendario
	$(	'.previous' ).text('<'); // Asigna un < al calendario
	$(	'.next' ).text('>'); // Asigna un > al calendario
	var dateWidth = $( '#fechaMerma' ).width(); // Toma el ancho del input del calendario
	$( 'table.calendar' ).css('width' , dateWidth + 27); // Asigna el ancho al calendario

	/** Revisar sesión **/
	if(localStorage.getItem('user') == null) {
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";
	}	
	/** Fin de revisión **/	
	
	/** Cerrar sesión **/
	$( '#logout' ).on('touchstart click', function(e) {
		
		localStorage.clear();
		
		$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "index.html";			
	});
	/** Fin sesión **/	
	
	/** Mostrar menú lateral izquierdo **/
	$( '#menuLeft' ).css('height', ( height + 10 ) + 'px').css( 'overflow-y', 'auto' ).css('-webkit-overflow-scrolling', 'touch');
	$( '#usuarioText' ).text(localStorage.getItem('user'));
	
	$( '#slideLeft' ).on('touchcancel click', function(e) {
		
		$( '#menuLeft' ).animate({width: 'toggle'});		
	});	
	/** Fin del menú lateral izquierdo **/
	
	/** Selecciona el tipo de escanear **/
	$('#radioBtn a').on('click', function(){
	    var sel = $(this).data('title');
	    var tog = $(this).data('toggle');
	    $('#'+tog).prop('value', sel);
	    
	    if(sel === "Camara") {

    		$( '#scanCode' ).attr('type', 'hidden');
			$( '#btnScan' ).css('display', 'block');
	    
	    } else {

			$( '#btnScan' ).css('display', 'none');
			$( '#scanCode' ).attr('type', 'number');
	    }

	    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
	    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
	});
	/** Fin del tipo de escaneo **/

	/** Ocultar el form **/
	var aux = 0;
	$( '#slideUp' ).on('touchcancel click', function() {

		$( '#formMerma' ).slideToggle( "slow" );
		if(aux == 0) {
			$(this).css("transform", "rotate(180deg)") 
			aux = 1;
		
		} else {
			$(this).css("transform", "rotate(0deg)");
			aux = 0; 
		}
	});
	/** Fin ocultar **/

	/** Deshabilitar el input de escaneo **/
	$( '#catUnidad' ).on('change', function(e) {
		
		$( '#scanCode' ).attr('disabled', false);
		$( '#btnScan' ).attr('disabled', false);		
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

	var r = confirm("¿Desea eliminar el registro?");
	if (r == true) {
	
		$$(this).closest('div').remove();
	}

	return false;      	
});
/** Fin de remover **/

/** Seleccionar un producto de varios **/
$$( '.select' ).swipeRight(function(e) {

	e.preventDefault();

	var htmlMerma = $$(this).closest('div');

	$( '#datosMerma' ).append(
		'<div class="notice delete">'+
        '<strong class="codMerma">' + htmlMerma.find('.codMerma').text().substring(0, 13) + '</strong>' +
        //'<span class="cajaMerma inC pull-right" contenteditable="true">1</span></strong>'+
		'<input type="number" class="cajaMerma inC pull-right" value="1">' +
        '<br>'+
        '<span class="skuMerma" style="font-weight: 500;">' + htmlMerma.find('.skuMerma').text()  + '</span> - ' +
        '<span class="desMerma">' + htmlMerma.find('.desMerma').text() + '</span>' +
		'</div>'
	);

	$( '#hiddenMerma' ).append( '<input type="hidden" name="Caja" value="'+ htmlMerma.find('.uniMerma').text() +'">' ); // Se agrega una etiqueta input con el valor asignado	
/*
	$.snackbar({
		content: "Producto agregado", 
		timeout: 5000
	}); 	
*/	
	$( '.cajaMerma' ).keydown(function(e) {
		
		if( (e.which == 8 || e.which == 46) && $(this).val().length <= 1) {
			$(this).val("");
		}
		if($(this).val() <= 0 && $(this).val() != "") {
			$(this).val("1");
		}
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {				    
			return false;
		}
	});
	
	$('.modal').modal('toggle'); // Cierra el modal
});
/** Fin de seleccionar **/

/** Refresca la vista**/
$$( '.title' ).swipeDown(function(e) {

	e.preventDefault();

	var my_delay = 500;

	$( 'body' ).css({'margin-top': '15px', 'transition': 'all 1s ease'});

	function redirectFunction() { window.location = 'mermas.html'; }

    setTimeout(redirectFunction, my_delay);
});
/** Fin del refresh **/

/** Cambia del escaner a camara **/
$$( '#formMerma' ).swipeLeft(function(e) {

	e.preventDefault();

	$( '#scanCode' ).attr('type', 'hidden');

	$( '#btnScan' ).css('display', 'block');
});
$$( '#formMerma' ).swipeRight(function(e) {

	e.preventDefault();

	$( '#btnScan' ).css('display', 'none');

	$( '#scanCode' ).attr('type', 'number');
});
/** Fin del escaner - camara **/