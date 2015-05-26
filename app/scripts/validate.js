'use strict';
$(document).ready(function() {


    // Metodo para comprobar el cif.
    jQuery.validator.addMethod('cif', function(value, element) {
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

    }, 'CIF incorrecto');

    // Metodo para comprobar el nif.
    jQuery.validator.addMethod('nif', function(value, element) {
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
    }, 'NIF incorrecto.');

    // Metodo para comprobar el IBAN.
    jQuery.validator.addMethod('iban', function(value, element) {
        // some quick simple tests to prevent needless work
        if (this.optional(element)) {
            return true;
        }
        if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(value))) {
            return false;
        }

        // check the country code and find the country specific format
        var iban = value.replace(/ /g, '').toUpperCase(); // remove spaces and to upper case
        var countrycode = iban.substring(0, 2);
        var bbancountrypatterns = {
            'AL': '\\d{8}[\\dA-Z]{16}',
            'AD': '\\d{8}[\\dA-Z]{12}',
            'AT': '\\d{16}',
            'AZ': '[\\dA-Z]{4}\\d{20}',
            'BE': '\\d{12}',
            'BH': '[A-Z]{4}[\\dA-Z]{14}',
            'BA': '\\d{16}',
            'BR': '\\d{23}[A-Z][\\dA-Z]',
            'BG': '[A-Z]{4}\\d{6}[\\dA-Z]{8}',
            'CR': '\\d{17}',
            'HR': '\\d{17}',
            'CY': '\\d{8}[\\dA-Z]{16}',
            'CZ': '\\d{20}',
            'DK': '\\d{14}',
            'DO': '[A-Z]{4}\\d{20}',
            'EE': '\\d{16}',
            'FO': '\\d{14}',
            'FI': '\\d{14}',
            'FR': '\\d{10}[\\dA-Z]{11}\\d{2}',
            'GE': '[\\dA-Z]{2}\\d{16}',
            'DE': '\\d{18}',
            'GI': '[A-Z]{4}[\\dA-Z]{15}',
            'GR': '\\d{7}[\\dA-Z]{16}',
            'GL': '\\d{14}',
            'GT': '[\\dA-Z]{4}[\\dA-Z]{20}',
            'HU': '\\d{24}',
            'IS': '\\d{22}',
            'IE': '[\\dA-Z]{4}\\d{14}',
            'IL': '\\d{19}',
            'IT': '[A-Z]\\d{10}[\\dA-Z]{12}',
            'KZ': '\\d{3}[\\dA-Z]{13}',
            'KW': '[A-Z]{4}[\\dA-Z]{22}',
            'LV': '[A-Z]{4}[\\dA-Z]{13}',
            'LB': '\\d{4}[\\dA-Z]{20}',
            'LI': '\\d{5}[\\dA-Z]{12}',
            'LT': '\\d{16}',
            'LU': '\\d{3}[\\dA-Z]{13}',
            'MK': '\\d{3}[\\dA-Z]{10}\\d{2}',
            'MT': '[A-Z]{4}\\d{5}[\\dA-Z]{18}',
            'MR': '\\d{23}',
            'MU': '[A-Z]{4}\\d{19}[A-Z]{3}',
            'MC': '\\d{10}[\\dA-Z]{11}\\d{2}',
            'MD': '[\\dA-Z]{2}\\d{18}',
            'ME': '\\d{18}',
            'NL': '[A-Z]{4}\\d{10}',
            'NO': '\\d{11}',
            'PK': '[\\dA-Z]{4}\\d{16}',
            'PS': '[\\dA-Z]{4}\\d{21}',
            'PL': '\\d{24}',
            'PT': '\\d{21}',
            'RO': '[A-Z]{4}[\\dA-Z]{16}',
            'SM': '[A-Z]\\d{10}[\\dA-Z]{12}',
            'SA': '\\d{2}[\\dA-Z]{18}',
            'RS': '\\d{18}',
            'SK': '\\d{20}',
            'SI': '\\d{15}',
            'ES': '\\d{20}',
            'SE': '\\d{20}',
            'CH': '\\d{5}[\\dA-Z]{12}',
            'TN': '\\d{20}',
            'TR': '\\d{5}[\\dA-Z]{17}',
            'AE': '\\d{3}\\d{16}',
            'GB': '[A-Z]{4}\\d{14}',
            'VG': '[\\dA-Z]{4}\\d{16}'
        };
        var bbanpattern = bbancountrypatterns[countrycode];
        // As new countries will start using IBAN in the
        // future, we only check if the countrycode is known.
        // This prevents false negatives, while almost all
        // false positives introduced by this, will be caught
        // by the checksum validation below anyway.
        // Strict checking should return FALSE for unknown
        // countries.
        if (typeof bbanpattern !== 'undefined') {
            var ibanregexp = new RegExp('^[A-Z]{2}\\d{2}' + bbanpattern + '$', '');
            if (!(ibanregexp.test(iban))) {
                return false; // invalid country specific format
            }
        }
        // now check the checksum, first convert to digits
        var ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
        var ibancheckdigits = '';
        var leadingZeroes = true;
        var charAt;
        for (var i = 0; i < ibancheck.length; i++) {
            charAt = ibancheck.charAt(i);
            if (charAt !== '0') {
                leadingZeroes = false;
            }
            if (!leadingZeroes) {
                ibancheckdigits += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charAt);
            }
        }
        // calculate the result of: ibancheckdigits % 97
        var cRest = '';
        var cOperator = '';
        for (var p = 0; p < ibancheckdigits.length; p++) {
            var cChar = ibancheckdigits.charAt(p);
            cOperator = '' + cRest + '' + cChar;
            cRest = cOperator % 97;
        }
        return cRest === 1;
    }, 'IBAN incorrecto.');




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

        // Metodo para comprobar Codigo Postal.
        $('#cp').focusout(function() {
            if ($('#pais option:selected').val() === 'ES/0/0') {
                if ($(this).val() !== '') {
                    var dato = $(this).val();
                    if (dato.length >= 2) {
                        dato = dato.substring(0, 2);
                    }
                    $('#provincia').val(dato);
                    $('#localidad').val($('#provincia option[value=' + dato + ']').text());
                }
            }
            var zip = $(this).val();
            var resultado = 5 - zip.length;
            for (var i = 0; i < resultado; i++) {
                zip = '0' + zip;
            }
            $(this).val(zip);
        });

    // Metodo para hacer la pass compleja.
    jQuery.validator.addMethod('complexPass', function(value, element) {
        var level = $('#complex').attr('value');
        if (level >= 35) {
            return true;
        } else {
            return false;
        }
    }, 'Debes usar una contraseña segura.');

    $('#pass').focusin(function() {
        $('#pass').complexify({}, function(valid, complexity) {
            $('#complex').attr('value', complexity);
        });
    });


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
                minlength: 9,
                maxlength: 9
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
            nif: {
                required: function() {
                    return $('#particular').is(':checked');
                },
                nif: 'nif',
                remote: 'http://www.futbolistas.com/validar_nif_db'
            },
            cif: {
                required: function() {
                    return $('#empresa').is(':checked');
                },
                cif: 'cif'
            },
            nombreempresa: {
                required: true
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
            iban: {
                required: true,
                iban: 'iban'
            },

            usuario: {
                usuario: true,
                required: true,
                remote: 'http://www.futbolistas.com/validar_nif_db.php',
                minlength: 4
            },
            password: {
                password: true,
                required: true,
                complexPass: true,
                minlength: 6
            },
            password2: {
                required: true,
                equalTo: '#password'
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
        submitHandler: function() {
            alert('¡Envíado!');
        }



    });

});