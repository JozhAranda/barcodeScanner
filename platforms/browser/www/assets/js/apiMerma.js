$(function() {	
	// Consulta AJAX para traer las Plantas
	$.ajax({
		method: 'GET',
		url: 'http://localhost:53383/api/Mermas/Plantas',
		async: true,
		crossDomain: true,
		cache: false,
		success: function(data) {           
			var catPlantas = $( '#catPlantas' );
		    $.each(data, function(key, element) {
		      catPlantas.append("<option value='" + element.cvePlanta + "'>" + element.Planta + "</option>");
		    });
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
			if (xhr.status === 500) {
				$.snackbar({
					content: "Ocurri&oacute; un error, al comunicarse con el servidor", 
					timeout: 5000
				}); 
			} 
			else {
				$.snackbar({
					content: "Ocurri&oacute; un error, en el catalogo de plantas", 
					timeout: 5000
				}); 
			}
		}
	});

	// Consulta AJAX para traer los Cedis de una Planta
	$('#catPlantas').change(function(e) {

		e.preventDefault();

		var id = $( '#catPlantas' ).val();
		
		var cedis = $( '#catCedis' );
		cedis.prop('disabled', false);
		cedis.find('option').remove();

		$.ajax({
			method: 'GET',
			url: 'http://localhost:53383/api/Mermas/Cedis/' + id,
			async: true,
			crossDomain: true,
			cache: false,
			success: function(data) {           
				var catCedis = $( '#catCedis' );
			    $.each(data, function(key, element) {
			      catCedis.append("<option value='" + element.cveCedis + "'>" + element.Bodega + "</option>");
			    });
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
				if (xhr.status === 500) {
					$.snackbar({
						content: "Ocurri&oacute; un error, al comunicarse con el servidor", 
						timeout: 5000
					}); 
				} 
				else {
					$.snackbar({
						content: "Ocurri&oacute; un error, en el catalogo de cedis", 
						timeout: 5000
					}); 
				}
			}
		});
	});

	// Peticion AJAX para insertar la informacion capturada en Inventario
	$( '#guardarMerma' ).on( 'click touch', function(event) {

		event.preventDefault(); // Previene se haga una peticion

		var codMerma = "";
		$( '.cantMerma' ).each(function() {
	  	
	  		codMerma = $(this).text(); // Se trae el texto
		
			$( '#hiddenMerma' ).append( '<input type="hidden" name="Pieza" value="'+ codMerma +'">' ); // Se agrega una etiqueta input con el valor asignado
		});
		
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
		        	function redirectFunction() { 	
		        		$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
		        		window.location.href = "mermas.html";
			        }
			        setTimeout(redirectFunction, my_delay);

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