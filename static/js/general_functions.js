var image_rule;
var last_rule = null;

var bebidas = ["Larios", "Brugal", "Barcelo", "Whisky", "Cerveza", "Calimocho", "Vodka"];
var colores = [{"name": "Blanco", "code": "white"},{"name": "Negro", "code": "black"}, {"name": "Rojo", "code": "red"}, {"name": "Azul", "code": "blue"}, {"name": "Rojo", "code": "red"}, {"name": "Marron", "code": "brown"}, {"name": "Rosa", "code": "pink"}, {"name": "Verde", "code": "green"}, {"name": "Morado", "code": "purple"}];

var regla_request = false;
var palabra_request = false;

function nextRule(){

    if(!regla_request && !palabra_request){

        // Reseteo de reglas anteriores
        $('.txt-rule').remove();

        var active_rules = [];

        $('.rules-list .rule').each(function(){
            if($(this).find('input').prop('checked')){
                active_rules.push($(this).attr("id"))
            }
        });

        if(active_rules.length < 2){
            dialog.alert({
                title: "Maricón",
                message: "No seas mierdas y selecciona mas reglas",
                button: "Aceptar",
                callback: function(response){
                    $('.rules').fadeIn(200);
                }
            });
        }else{
            var random_number = Math.floor((Math.random() * active_rules.length));

            while(random_number == last_rule){
                random_number = Math.floor((Math.random() * active_rules.length));
            }

            last_rule = random_number;

            counter[random_number] += 1;

            var random_rule = active_rules[random_number];
            image_rule = $('#' + random_rule).find(".rule-image").attr("src");

            name_rule = $('#' + random_rule).find(".rule-info h1").text();

            $('.active_rule').addClass("fade-rule");

            $('.active_rule').attr("style", "background-image: url(" + image_rule + ")");

            $('.active_rule').removeClass("fade-rule");

            $('.current-rule-name h1').text(name_rule);

            checkSpecialRule(parseInt(random_rule.split("_")[1]));

        }
    }else{

        if(regla_request){
            dialog.prompt({
                message: "¿Que regla se ha establecido?",
                callback: function(value){
                    if (value != null){
                        if(localStorage.getItem("reglas_establecidas") == undefined){
                            var reglas_establecidas = [value]
                        }else{
                            var reglas_establecidas = JSON.parse(localStorage.getItem("reglas_establecidas"));
                            reglas_establecidas.push(value)
                        }

                        localStorage.setItem("reglas_establecidas", JSON.stringify(reglas_establecidas));
                    }
                    regla_request = false;
                },button: "Aceptar"
            });
        }else if(palabra_request){
            dialog.prompt({
                message: "¿Que palabra se ha prohibido?",
                callback: function(value){
                    if (value != null){
                        if(localStorage.getItem("palabras_prohibidas") == undefined){
                            var palabras_prohibidas = [value]
                        }else{
                            var palabras_prohibidas = JSON.parse(localStorage.getItem("palabras_prohibidas"));
                            palabras_prohibidas.push(value)
                        }

                        localStorage.setItem("palabras_prohibidas", JSON.stringify(palabras_prohibidas));
                    }
                    palabra_request = false;
                },button: "Aceptar"
            });
        }

    }
}

function checkSpecialRule(id){
    switch(id){
        case 14: // Ruleta Rusa
            $('.bg-next-rule').removeAttr("onclick");
            $('.active_rule').append('<div class="shoot"></div>');

            var shootON = document.getElementById("shootON");
            var shootOFF = document.getElementById("shootOFF");

            var players = parseInt($('.player-count').text());
            var shoots = 1;

            $('.shoot').click(function(){

                if($('.toast').length >= 2){
                    $('.toast')[0].remove();
                }

                shootON.pause()
                shootON.currentTime=0

                shootOFF.pause()
                shootOFF.currentTime=0

                var shoot = Math.round(Math.random())
                if(shoot == 0){
                    M.toast({html: 'Jugador ' + shoots + ' Libras'}, 500);
                    shootOFF.play();
                }else{
                    M.toast({html: 'Jugador ' + shoots + ' ¡BEBES!', classes: 'red'}, 500);
                    shootON.play();
                }

                if(shoots == players){
                    $('.shoot').remove();
                    $('.bg-next-rule').attr("onclick", "nextRule()");
                }
                shoots++;
            });

            break;
        case 23: // Adictos a una Bebida

            var bebida = bebidas[Math.floor((Math.random() * bebidas.length))]

            $('.current-rule').append("<h1 class='txt-rule'>" + bebida + "</h1>")

            break;
         case 27: // Ropajes de Color

            var color = colores[Math.floor((Math.random() * colores.length))]

            $('.current-rule').append("<h1 class='txt-rule' style='color:" + color.code + "'>" + color.name + "</h1>")

            break;
         case 1:
            regla_request = true
            break;
         case 8:
            palabra_request = true
            break;
    }
}

function clearRule(elemento, i){
   var reglas_establecidas = JSON.parse(localStorage.getItem("reglas_establecidas"));
   reglas_establecidas.splice(i, 1);

   localStorage.setItem("reglas_establecidas", JSON.stringify(reglas_establecidas));

   $(elemento).parent().remove();

   if(reglas_establecidas.length == 0){
        $('#reglas_establecidas').append('<li class="collection-item">Ninguna regla establecida</li>');
        localStorage.removeItem("reglas_establecidas");
   }

}

function clearPalabra(elemento, i){
   var palabras_prohibidas = JSON.parse(localStorage.getItem("palabras_prohibidas"));
   palabras_prohibidas.splice(i, 1);

   localStorage.setItem("palabras_prohibidas", JSON.stringify(palabras_prohibidas));

   $(elemento).parent().remove();

   if(palabras_prohibidas.length == 0){
        $('#palabras_prohibidas').append('<li class="collection-item">Ninguna palabra prohibida</li>');
        localStorage.removeItem("palabras_prohibidas");
   }

}

function resetGame(){
    dialog.confirm({
        message: "¿Desea resetear reglas y palabras prohibidas?",
        cancel: "No",
        button: "Sí",
        callback: function(value){
            if(value){
                localStorage.removeItem("reglas_establecidas");
                localStorage.removeItem("palabras_prohibidas");
            }
        }
    });
}