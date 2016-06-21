$(function() {
	// Peticion AJAX para insertar la informacion capturada en Inventario
	$( '#submitSesion' ).on( 'click touch', function(event) {

		event.preventDefault(); // Previene se haga una peticion

		var datosForm = $( '#formLogin' ).serialize(); // Trae todos los valores dentro del form

		var delay = 2000; // Se asigna un delay (espera de tiempo)

		document.activeElement.blur(); // Oculta el teclado

		$.ajax({
			method: 'POST',
			url: "http://10.1.0.13/Mermas/api/Sesiones/Password",
			async: true,
			crossDomain: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data: datosForm,
			cache: false,
        	beforeSend: function() { 
        		$( '.loader' ).fadeOut( '200' ).css( 'display', 'block' ); 
        		$( '#submitSesion' ).text( 'Iniciando...' );
        	},
			success: function(data) {
        		$( '.loader' ).fadeOut( '200' ).css( 'display', 'none' );         

		        if(data) {	
		        	if(data.Data[0].Output === "Success") { 	

		        		function redirect() {
		        			$( 'body' ).load( 'index.html' ).hide().fadeIn(1500).delay(6000);
		        			window.location.href = "index.html";
		        		}

		        		setTimeout(redirect, delay);

						$.snackbar({
							content: "Contraseña cambiada con éxito, ahora inicia sesión por favor.", 
							timeout: 5000
						}); 
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
        			$( '#submitSesion' ).text( 'Iniciar sesión' );	        	
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
    			$( '#submitSesion' ).text( 'Iniciar sesión' ); 
				
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