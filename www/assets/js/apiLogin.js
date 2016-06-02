$(function() {
	
	// Peticion AJAX para insertar la informacion capturada en Inventario
	$( '#submitSesion' ).on( 'click touch', function(event) {

		event.preventDefault(); // Previene se haga una peticion

		var datosForm = $( '#formLogin' ).serialize(); // Trae todos los valores dentro del form

		document.activeElement.blur(); // Oculta el teclado

		$.ajax({
			method: 'POST',
			url: "http://cdfds1/Mermas/api/Sesiones/Login",
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
		        
				$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
				window.location.href = "mermas.html";

		        if(data) {	
		        	if(data.Data[0].Output === "Success") {
		        		
		        		localStorage.setItem('token', data.Data[0].Token); // Se agrega el token al localStorage
		        		localStorage.setItem('user', data.Data[0].User); // Se agrega el user al localStorage
		        		localStorage.setItem('cvePlanta', data.Data[0].cvePlanta); // Se agrega el cvePlanta al localStorage
		        		localStorage.setItem('cveCedis', data.Data[0].cveCedis); // Se agrega el cveCedis al localStorage
		        		localStorage.setItem('Imei', $( '#imei' ).val()); // Se agrega elimei al localSotrage

		        		$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
		        		window.location.href = "mermas.html";
			        }
			        else if(data.Data[0].Output === "Favor de cambiar Contraseña inicial") {
		        		$( 'body' ).load( 'password.html' ).hide().fadeIn(1500).delay(6000);
		        		window.location.href = "password.html";
			        }
			        else {
						$.snackbar({
							content: data.Data, 
							timeout: 5000
						}); 
			        }
		        } else {
					$.snackbar({
						content: "Ocurri&oacute; un error, al intentar iniciar sesi&oacute;n", 
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