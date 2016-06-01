$(function() {	

	$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

	// Realiza una consulta al API para traer la planta
	var cvePlanta = localStorage.getItem('cvePlanta');
	$.get('http://localhost:53383/api/Mermas/Plantas', function(element) {

		for (var i = 0; i < element.length; i++) {

			if(element[i].cvePlanta == cvePlanta) {
				$( '#plantaMerma' ).val(element[i].Planta);
				break;
			}
		}
	});

	// Realiza una consulta al API para traer el cedis	
	var cveCedis = localStorage.getItem('cveCedis');
	$.get('http://localhost:53383/api/Mermas/Cedis/' + cvePlanta, function(element) {
		
		for (var i = 0; i < element.length; i++) {

			if(element[i].cveCedis == cveCedis) {
				$( '#cedisMerma' ).val(element[i].Bodega);
				localStorage.setItem('lCedis', element[0].LBodega); // Se agrega el LBodega al localStorage	
				break;
			}
		}

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' ); // Quita el loading
	});

	// Realiza una consulta al API para traer las rutas por el cedis
	$.get('http://localhost:53383/api/Mermas/Rutas/' + cveCedis, function(element) {

		var catRuta = $( '#catRuta' );
		    
		for (var i = 0; i < element.length; i++) {

			catRuta.append("<option value='" + element[i].cveRuta + "'>" + element[i].Ruta + "</option>");
		}
	});

	// Realiza una consulta al API para traer las unidades por el cedis
	var lCedis = localStorage.getItem('lCedis');
	$.get('http://localhost:53383/api/Mermas/Unidades/' + lCedis, function(element) {
		
		var catUnidad = $( '#catUnidad' );
		    
		for (var i = 0; i < element.length; i++) {

			catUnidad.append("<option value='" + element[i].Unidad + "'>" + element[i].Unidad + "</option>");
		}
	});


	/** Realiza un escaneo de los datos del producto **/
    $( '#scan' ).on( 'click touch', function(event) {

		event.preventDefault();

		$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' );  // Agrega el loading

		var cvePlanta = localStorage.getItem('cvePlanta');
		var scanCode = $( '#scanCode' ).val();
		
		$.get( 'http://localhost:53383/api/Mermas/Catalogos/' + cvePlanta + '?codigo=' + scanCode, function(element) {
					
			if(element.length <= 0) {
				$.snackbar({
					content: "No se encontr&oacute; informaci&oacute;n relacionada.", 
					timeout: 5000
				}); 
			}
			else {
				// Crea un nuevo row en la tabla de datosMerma
				$( '#datosMerma' ).append(
					'<tr>' +
					'<td></td>' + 
					'<td><button type="button" class="btn btn-danger btn-xs remove" style="padding: 2px 6px;">x</button></td>' +
					'<td><select name="cveCategoria" id="catCategoria"><option value="1">Pieza</option><option value="2">Caja</option></select></td>' +
					'<td class="cantMerma" contenteditable="true">' + element[0].Unidad + '</td>' + 
					'<td class="cajaMerma" contenteditable="true">1</td>' + 
					'<td class="codMerma">' + element[0].Codigo + '</td>' + 
					'<td class="skuMerma">' + element[0].SKU + '</td>' + 
					'<td class="desMerma">' + element[0].Descripcion + '</td>' + 
					'</tr>'
				);
			}

			$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );  // Quita el loading
		});
	});
    /** Fin del escaneo de los datos **/

	// Peticion AJAX para insertar la informacion capturada en Inventario
	$( '#guardarMerma' ).on( 'click touch', function(event) {

		event.preventDefault(); // Previene se haga una peticion

		obtenerDatos(); // Funcion para obtener los datos dentro de la Tabla 
		
		var datosForm = $( '#formMerma' ).serialize(); // Trae todos los valores dentro del form

		var my_delay = 2000; // Se asigna un delay (espera de tiempo)

		document.activeElement.blur(); // Oculta el teclado

		$.ajax({
			method: 'POST',
			url: "http://localhost:53383/api/Mermas/Mermas",
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
							content: "La informaci&oacute;n se ha guardado satisfactoriamente.", 
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
						content: "Ocurri&oacute; un error, al intentar guardar la informaci&oacute;n", 
						timeout: 5000
					}); 
        			$( '#guardarMerma' ).text( 'Guardar' );	        	
		        }
		        console.log(data);
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
						content: "Ocurri&oacute; un error, al comunicarse con el servidor", 
						timeout: 5000
					}); 
				} 
				else {
					$.snackbar({
						content: "Ocurri&oacute; un error, en la petici&oacute;n", 
						timeout: 5000
					}); 
				}
			}
		});

	});

	return false; 
});

// Funcion para obtener los datos dentro de la Tabla
function obtenerDatos() {

	var cantMerma = "";
	var cajaMerma = "";
	var codMerma = "";
	var skuMerma = "";
	var desMerma = "";

	$( '.cantMerma' ).each(function() {
  		cantMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Pieza" value="'+ cantMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
	});
	$( '.cajaMerma' ).each(function() {
  		cajaMerma = $(this).text(); // Se trae el texto	
		$( '#hiddenMerma' ).append( '<input type="hidden" name="Caja" value="'+ cajaMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
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
	$('select[name="cveCategoria"]').each(function(key, element) {
    	$( '#hiddenMerma' ).append(element); // Se agrega los valores de Categoria
	});
}