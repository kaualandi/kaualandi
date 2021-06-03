// MASK
    var cellMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
        cellOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(cellMaskBehavior.apply({}, arguments), options);
            }
        };
 
    //$('.mask-cell').mask(cellMaskBehavior, cellOptions);
    $('.mask-phone').mask('(99) 99999-9999');
    //$(".mask-date").mask('00/00/0000');
    //$(".mask-datetime").mask('00/00/0000 00:00');
    //$(".mask-month").mask('00/0000', { reverse: true });
    //$(".mask-doc").mask('000.000.000-00', { reverse: true });
    //$(".mask-cnpj").mask('00.000.000/0000-00', { reverse: true });
    //$(".mask-zipcode").mask('00000-000', { reverse: true });
    //$(".mask-money").mask('R$ 000.000.000.000.000,00', { reverse: true, placeholder: "R$ 0,00" });
 
    // SEARCH ZIPCODE
    $('.zip_code_search').blur(function () {
 
        function emptyForm() {
            $(".street").val("");
            $(".neighborhood").val("");
            $(".city").val("");
            $(".state").val("");
        }
 
        var zip_code = $(this).val().replace(/\D/g, '');
        var validate_zip_code = /^[0-9]{8}$/;
 
        if (zip_code != "" && validate_zip_code.test(zip_code)) {
 
            $(".street").val("");
            $(".neighborhood").val("");
            $(".city").val("");
            $(".state").val("");
 
            $.getJSON("https://viacep.com.br/ws/" + zip_code + "/json/?callback=?", function (data) {
 
                if (!("erro" in data)) {
                    $(".street").val(data.logradouro);
                    $(".neighborhood").val(data.bairro);
                    $(".city").val(data.localidade);
                    $(".state").val(data.uf);
                } else {
                    emptyForm();
                    alert("CEP não encontrado.");
                }
            });
        } else {
            emptyForm();
            alert("Formato de CEP inválido.");
        }
    });