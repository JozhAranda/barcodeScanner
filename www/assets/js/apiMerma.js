$(function() {	

	$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

	// Se asigna los valor localStorage a una variable
	var user = localStorage.getItem('user');
	var plantas = localStorage.getItem('planta');
	var cedis = localStorage.getItem('cedis');

	// Realiza una consulta al API para traer las plantas
	$.get('http://10.1.0.13/Mermas/api/Mermas/Plantas', function(element) {

		var catPlantas = $( '#catPlantas' );
		var arrayPlanta = plantas.split("-");
		
		for (var i = 0; i < element.length; i++) {

			if (arrayPlanta.indexOf(element[i].cvePlanta.toString()) > -1) {

				catPlantas.append("<option value='" + element[i].cvePlanta + "'>" + element[i].Planta + "</option>");
			}
		}

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' ); // Quita el loading
	});	

	// Realiza una consulta al API para traer los cedis
	$( '#catPlantas' ).on( 'change', function(e) {

		localStorage.setItem('cvePlanta', $(this).val());

		$.get('http://10.1.0.13/Mermas/api/Mermas/Cedis/' + $(this).val(), function(element) {
			
			var catCedis = $( '#catCedis' );
			var arrayCedis = cedis.split("-");

			for (var i = 0; i < element.length; i++) {

				if(arrayCedis.indexOf(element[i].cveCedis.toString()) > -1) {

					catCedis.append("<option value='" + element[i].cveCedis + "' alt='" + element[i].LBodega + "'>" + element[i].Bodega + "</option>");
				}
			}
		});
	});

	// Realiza una consulta al API para traer las unidades por el cedis
	$( '#catCedis' ).on('change', function(e) {

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

		var cedis = $(this).val();
		var lCedis = $('#catCedis option:selected').attr('alt');
		
		$.get('http://10.1.0.13/Mermas/api/Mermas/Unidades/' + lCedis, function(element) {
			
			var catUnidad = $( '#catUnidad' );
			    
			for (var i = 0; i < element.length; i++) {

				catUnidad.append("<option value='" + element[i].Unidad + "' alt='" + element[i].Ruta + "'>" + element[i].Unidad + "</option>");
			}
		});	

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' ); // Quita el loading				
	});

	// Realiza una consulta al API para traer las rutas por el cedis y unidad
	$( '#catUnidad' ).on('change', function(e) {

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

		var cedis 	= $('#catCedis option:selected').val();
		var unidad 	= $('#catUnidad option:selected').attr('alt'); 

		$.get('http://10.1.0.13/Mermas/api/Mermas/Rutas/' + cedis, function(element) {

			var catRuta = $( '#catRuta' );
			    
			for (var i = 0; i < element.length; i++) {
				
				if(element[i].Ruta == unidad) {

					catRuta.append("<option value='" + element[i].Ruta + "'>" + element[i].Ruta + "</option>");
				}
			}
		});	

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' ); // Quita el loading		
	});

	/** Realiza un escaneo de los datos del producto **/
    $('#scanCode').keyup(function(event) {

		event.preventDefault();

     	if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57) && event.ctrlKey != true) {				    
	    	var slicer =  $(this);
	    	slicer.val(slicer.slice(0, -1));
		}

		var count = $(this).val().length;

		if(count >= 12) {

			$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

			var cvePlanta = localStorage.getItem('cvePlanta');
			var scanCode = $( '#scanCode' ).val();
			
			$.get('http://10.1.0.13/Mermas/api/Mermas/Catalogos/' + cvePlanta + '?codigo=' + scanCode, function(element) {
						
				// Crea un nuevo row en la tabla de datosMerma
				$( '#datosMerma' ).append(
					/*'<tr class="delete">' +
					'<td class="codMerma">' + element[0].Codigo + '</td>' + 
					'<td class="cajaMerma" contenteditable="true">1</td>' + 
					'<td class="skuMerma">' + element[0].SKU + '</td>' + 
					'<td class="desMerma">' + element[0].Descripcion + '</td>' + 
					'</tr>'*/
				    '<div class="notice delete">'+
			        '<strong class="codMerma">' + element[0].Codigo +
			        '<span class="cajaMerma inC pull-right" contenteditable="true">1</span></strong>'+
			        '<br>'+
			        '<span class="desMerma">' + element[0].Descripcion +
			        '<span class="skuMerma pull-right">' + element[0].SKU + '</span></span>' +
					'</div>'
				);
			
				$( '#scanCode' ).val("");

				$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );  // Quita el loading

				$( '.cajaMerma' ).keydown(function(e) {
					if($(this).text() <= 0) {
						$(this).text("1");
					}
			     	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {				    
				    	return false;
				    }
				});
			});
		}
	});
    /** Fin del escaneo de los datos **/

	// Petición AJAX para insertar la información capturada en Inventario
	$( '#guardarMerma' ).on( 'click touch', function(event) {

		event.preventDefault(); // Previene se haga una petición

		obtenerDatos(); // Función para obtener los datos dentro de la Tabla 
		
		var datosForm = $( '#formMerma' ).serialize(); // Trae todos los valores dentro del form

		var my_delay = 1500; // Se asigna un delay (espera de tiempo)

		document.activeElement.blur(); // Oculta el teclado

		$.ajax({
			method: 'POST',
			url: "http://10.1.0.13/Mermas/api/Mermas/Mermas",
			async: true,
			crossDomain: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: datosForm,
			cache: false,
        	beforeSend: function() { 
        		$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' ); 
        		$( '#guardarMerma' ).text( 'Guardando...' );
        	},
			success: function(data) {
        		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );         
		        
		        if(data) {
		        	if(data.Data == "success") {	
			        	function redirectFunction() { 	
			        		$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
			        		window.location.href = "mermas.html";
				        }
						$.snackbar({
							content: "La información se ha guardado satisfactoriamente.", 
							timeout: 5000
						}); 
				        setTimeout(redirectFunction, my_delay);
				    }
				    else {
						$.snackbar({
							content: data.Data, 
							timeout: 5000
						}); 
				    }
		        } else {
					$.snackbar({
						content: "Ocurrió un error, al intentar guardar la información", 
						timeout: 5000
					}); 
        			$( '#guardarMerma' ).text( 'Guardar' );	        	
		        }
			},
			error : function(xhr, textStatus, errorThrown ) {
				if (textStatus === 'timeout') {
					this.tryCount++;
					if (this.tryCount <= this.retryLimit) {
						$.ajax(this);
						return;
					}            
					return;
				}

        		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );  
    			$( '#guardarMerma' ).text( 'Guardar' );	     
    			$( '#hiddenMerma' ).empty();
				
				if (xhr.status === 500) {
					$.snackbar({
						content: "Ocurrió un error, al comunicarse con el servidor", 
						timeout: 5000
					}); 
				} 
				else {
					$.snackbar({
						content: "Ocurrió un error, en la petición", 
						timeout: 5000
					}); 
				}
			}
		});

	});

	return false; 
});

// Función para obtener los datos dentro de la Tabla
function obtenerDatos() {

	var cajaMerma = "";
	var codMerma = "";
	var skuMerma = "";
	var desMerma = "";

	$( '.cajaMerma' ).each(function() {
  		cajaMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Pieza" value="'+ cajaMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
	});
	$( '.codMerma' ).each(function() {
  		codMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Codigo" value="'+ codMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
	});
	$( '.skuMerma' ).each(function() {
  		skuMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="SKU" value="'+ skuMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
	});
	$( '.desMerma' ).each(function() {
  		desMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Descripcion" value="'+ desMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
	});	
}