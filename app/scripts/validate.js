'use strict';
$(document).ready(function() {



    jQuery.validator.addMethod('nifES', function(value, element) {

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        // Test NIF
        if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
            return ('TRWAGMYFPDXBNJZSQVHLCKE'.charAt(value.substring(8, 0) % 23) === value.charAt(8));
        }
        // Test specials NIF (starts with K, L or M)
        if (/^[KLM]{1}/.test(value)) {
            return (value[8] === String.fromCharCode(64));
        }

        return false;

    }, 'Please specify a valid NIF number.');


    jQuery.validator.addMethod('nieES', function(value, element) {

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        // Test NIE
        //T
        if (/^[T]{1}/.test(value)) {
            return (value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value));
        }

        //XYZ
        if (/^[XYZ]{1}/.test(value)) {
            return (
                value[8] === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(
                    value.replace('X', '0')
                    .replace('Y', '1')
                    .replace('Z', '2')
                    .substring(0, 8) % 23
                )
            );
        }

        return false;

    }, 'Please specify a valid NIE number.');



    jQuery.validator.addMethod('cifES', function(value, element) {

        var sum,
            num = [],
            controlDigit;

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        for (var i = 0; i < 9; i++) {
            num[i] = parseInt(value.charAt(i), 10);
        }

        // Algorithm for checking CIF codes
        sum = num[2] + num[4] + num[6];
        for (var count = 1; count < 8; count += 2) {
            var tmp = (2 * num[count]).toString(),
                secondDigit = tmp.charAt(1);

            sum += parseInt(tmp.charAt(0), 10) + (secondDigit === '' ? 0 : parseInt(secondDigit, 10));
        }

        // CIF test
        if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
            sum += '';
            controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
            value += controlDigit;
            return (num[8].toString() === String.fromCharCode(64 + controlDigit) || num[8].toString() === value.charAt(value.length - 1));
        }

        return false;

    }, 'Please specify a valid CIF number.');



    $.extend($.validator.messages, {
            required: 'Este campo es obligatorio.',
            remote: 'Este usuario ya existe, elija otro.',
            email: 'Por favor, escribe una dirección de correo válida.',
            url: 'Por favor, escribe una URL válida.',
            date: 'Por favor, escribe una fecha válida.',
            dateISO: 'Por favor, escribe una fecha (ISO) válida.',
            number: 'Por favor, escribe un número válido.',
            digits: 'Por favor, escribe sólo dígitos.',
            creditcard: 'Por favor, escribe un número de tarjeta válido.',
            equalTo: 'Por favor, escribe el mismo valor de nuevo.',
            extension: 'Por favor, escribe un valor con una extensión aceptada.',
            maxlength: $.validator.format('Por favor, no escribas más de {0} caracteres.'),
            minlength: $.validator.format('Por favor, no escribas menos de {0} caracteres.'),
            rangelength: $.validator.format('Por favor, escribe un valor entre {0} y {1} caracteres.'),
            range: $.validator.format('Por favor, escribe un valor entre {0} y {1}.'),
            max: $.validator.format('Por favor, escribe un valor menor o igual a {0}.'),
            min: $.validator.format('Por favor, escribe un valor mayor o igual a {0}.'),
            nifES: 'Por favor, escribe un NIF válido.',
            nieES: 'Por favor, escribe un NIE válido.',
            cifES: 'Por favor, escribe un CIF válido.',
        }),

        $('#cp').focusout(function() {
            var caracteres = $('#cp').val();
            if (caracteres.length === 4)
                $('#cp').val('0' + caracteres);
        }),

        $('#cp').change(function(){
		      if ($('#pais option:selected').val() === 'ES/0/0'){
			  if($(this).val()!==''){
	                	var dato = $(this).val();
	                	if (dato.length >= 2){
				    dato = dato.substring(0, 2);    
				}
				$('#provincia').val(dato);
	                }
		      }		
	 }),


    $('#formulario').validate({
        rules: {
            nombre: {
                required: true,
            },
            apellidos: {
                required: true,
            },
            telefono: {
                required: true,
                digits: true,
                minlength: 9
            },
            email: {
                email: true,
                required: true,
                minlength: 6,
                remote: 'http://www.futbolistas.com/validar_email_db.php'
            },
            email2: {
                required: true,
                equalTo: '#email'
            },
            demandante: {
                required: true,
            },
            direccion: {
                required: true,
            },
            localidad: {
                required: true,
            },
            provincia: {
                required: true,
            },
            pais: {
                required: true,
            },
            cif: {
                nifES: true,
                required: true
            },
            iban: {
                iban: true,
                minlength : 20,
				maxlength : 20,
				required: function() {
						return $('#tipopagocuenta').is(':checked');
					},
				validacuentabanco: function() {
					return $('#tipopagocuenta').is(':checked');
				}
			},
            },
            usuario: {
                usuario: true,
                required: true,
                remote: 'http://www.futbolistas.com/validar_nif_db.php'
            },
            password: {
                password: true,
                required: true
            },
            cp: {
                cp: true,
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 5,
                remote: 'http://www.futbolistas.com/validar_zip_db.php'
            }

        },


    });
    submitHandler: function() {
        alert('¡Envíado!');
    }

});
