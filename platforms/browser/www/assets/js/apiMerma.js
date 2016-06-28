$(function() {	

	$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

	// Se asigna los valor localStorage a una variable
	var user 	= localStorage.getItem('user');
	var plantas = localStorage.getItem('planta');
	var cedis 	= localStorage.getItem('cedis');

	// Se extrae toda la BD
	$.get('http://10.1.0.13/Mermas/api/Mermas/Catalogo', function(element) {
	      //initialize
      	if(localStorage.getItem("Mermas") == null) {

    	    var data = [];
	        data = JSON.stringify(element);
    	    localStorage.setItem("Mermas", data);
      	}

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' ); // Quita el loading
	});	

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

		var catCedis = $( '#catCedis' );
		var arrayCedis = cedis.split("-");

		catCedis.empty();
		catCedis.append('<option>Seleccione un cedis</option>');

		$.get('http://10.1.0.13/Mermas/api/Mermas/Cedis/' + $(this).val(), function(element) {
			
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

		var catUnidad = $( '#catUnidad' );
		catUnidad.empty();
		catUnidad.append('<option>Seleccione una unidad</option>');
		
		$.get('http://10.1.0.13/Mermas/api/Mermas/Unidades/' + lCedis, function(element) {
			    
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

		var catRuta = $( '#catRuta' );
		catRuta.empty();
		catRuta.append('<option>Seleccione una ruta</option>');

		$.get('http://10.1.0.13/Mermas/api/Mermas/Rutas/' + cedis, function(element) {
			    
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

		if(count >= 13) {

			$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

			var cvePlanta = localStorage.getItem('cvePlanta');
			var scanCode = $( '#scanCode' ).val();
			
			/*
			$.get('http://10.1.0.13/Mermas/api/Mermas/Catalogos/' + cvePlanta + '?codigo=' + scanCode, function(element) {
						
				// Crea un nuevo row en la tabla de datosMerma
				$( '#datosMerma' ).append(
					'<div class="notice delete">'+
			        '<strong class="codMerma">' + element[0].Codigo +
			        '<span class="cajaMerma inC pull-right" contenteditable="true">1</span></strong>'+
			        '<br>'+
			        '<span class="skuMerma" style="font-weight: 500;">' + ('000' + element[0].SKU).slice(-4)  + '</span> - ' +
			        '<span class="desMerma">' + element[0].Descripcion + '</span>' +
					'</div>'
				);

				$( '#hiddenMerma' ).append( '<input type="hidden" name="Caja" value="'+ element[0].Unidad +'">' ); // Se agrega una etiqueta input con el valor asignado
			
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
			*/

			var mermas 		= localStorage.getItem("Mermas");
			var parseMerma 	= JSON.parse(mermas);
			var tempToken 	= 0;

			for(var i = 0; i < parseMerma.length; i++) {

				if(parseMerma[i].cvePlanta == cvePlanta && parseMerma[i].Codigo == scanCode) {

					tempToken = 1;

					// Crea un nuevo row en la tabla de datosMerma
					$( '#datosMerma' ).append(
						'<div class="notice delete">'+
				        '<strong class="codMerma">' + parseMerma[i].Codigo +
				        '<span class="cajaMerma inC pull-right" contenteditable="true">1</span></strong>'+
				        '<br>'+
				        '<span class="skuMerma" style="font-weight: 500;">' + ('000' + parseMerma[i].SKU).slice(-4)  + '</span> - ' +
				        '<span class="desMerma">' + parseMerma[i].Descripcion + '</span>' +
						'</div>'
					);

					$( '#hiddenMerma' ).append( '<input type="hidden" name="Caja" value="'+ parseMerma[i].Unidad +'">' ); // Se agrega una etiqueta input con el valor asignado
				
					$( '#scanCode' ).val("");

					$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );  // Quita el loading

					$( '.cajaMerma' ).keydown(function(e) {
						if($(this).text() <= 0 && $(this).text() != "") {
							$(this).text("1");
						}
				     	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {				    
					    	return false;
					    }
					});
				}
			}

			$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );  // Quita el loading

			if(tempToken == 0) {
				$.snackbar({
					content: "No se encontró el código", 
					timeout: 5000
				}); 
			}
		}
	});
    /** Fin del escaneo de los datos **/

	// Petición AJAX para insertar la información capturada en Inventario
	$( '#guardarMerma' ).on('touchstart click', function(event) {

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
    				$( '#guardarMerma' ).text( 'Guardar' );	     
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
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Codigo" value="'+ codMerma.substring(0, 13) +'">' ); // Se agrega una etiqueta input con el valor asignado
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