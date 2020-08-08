var image_rule;
var last_rule = null;
var bebidas = ["Larios", "Brugal", "Barcelo", "Whisky", "Cerveza", "Calimocho", "Vodka"];
var colores = [{"name": "Blanco", "code": "white"},{"name": "Negro", "code": "black"}, {"name": "Rojo", "code": "red"}, {"name": "Azul", "code": "blue"}, {"name": "Rojo", "code": "red"}, {"name": "Marron", "code": "brown"}, {"name": "Rosa", "code": "pink"}, {"name": "Verde", "code": "green"}, {"name": "Morado", "code": "purple"}];

function nextRule(){

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

        var random_rule = active_rules[random_number];
        image_rule = $('#' + random_rule).find(".rule-image").attr("src");

        name_rule = $('#' + random_rule).find(".rule-info h1").text();

        $('.active_rule').addClass("fade-rule");

        $('.active_rule').attr("style", "background-image: url(" + image_rule + ")");

        $('.active_rule').removeClass("fade-rule");

        $('.current-rule-name h1').text(name_rule);

        checkSpecialRule(parseInt(random_rule.split("_")[1]));

        last_rule = random_number;

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
    }
}
