$(function() {

	if(localStorage.getItem('user') != null) {
		
		$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
		window.location.href = "mermas.html";
	}
	
	// Petición AJAX para insertar la información capturada en Inventario
	$( '#submitSesion' ).on( 'touchstart click', function(event) {

		event.preventDefault(); // Previene se haga una petición

		var datosForm = $( '#formLogin' ).serialize(); // Trae todos los valores dentro del form

		document.activeElement.blur(); // Oculta el teclado

		$.ajax({
			method: 'POST',
			url: "http://10.1.0.13/Mermas/api/Sesiones/Login",
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
		        		
		        		localStorage.setItem('token', data.Data[0].Token); // Se agrega el token al localStorage
		        		localStorage.setItem('user', data.Data[0].User); // Se agrega el user al localStorage
		        		localStorage.setItem('imei', $( '#Imei' ).val()); // Se agrega el imei al localStorage
		        		
		        		var plantas = obtenerPlantas(data.Data[0].Plantas.Plantas);
		        		localStorage.setItem('planta', plantas);  // Se agregan las plantas al localStorage

		        		var cedis = obtenerCedis(data.Data[0].Cedis.Bodegas);
		        		localStorage.setItem('cedis', cedis);  // Se agregan los cedis al localStorage

		        		$( 'body' ).load( 'mermas.html' ).hide().fadeIn(1500).delay(6000);
		        		window.location.href = "mermas.html";
			        }
			        else if(data.Data[0].Output === "Favor de cambiar Contraseña inicial") {
		        		$( 'body' ).load( 'password.html' ).hide().fadeIn(1500).delay(6000);
		        		window.location.href = "password.html";
			        }
			        else {
						$.snackbar({
							content: data.Data[0].Output, 
							timeout: 5000
						}); 
			        }
		        } else {
					$.snackbar({
						content: "Ocurrió un error, al intentar iniciar sesión", 
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

	/** Función para obtener las plantas **/
	function obtenerPlantas(plantas) {

		var catPlantas = "";
		    
		for (var i = 0; i < plantas.length; i++) {

			catPlantas += plantas[i].cvePlanta + "-";
		}

		return catPlantas;
	}

	/** Función para obtener los cedis **/
	function obtenerCedis(cedis) {

		var catCedis = "";
		    
		for (var i = 0; i < cedis.length; i++) {

			catCedis += cedis[i].cveCedis + "-";
		}

		return catCedis;
	}

	return false; 
});	