var image_rule;
function nextRule(){

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
        var random_rule = active_rules[Math.floor((Math.random() * active_rules.length))];
        image_rule = $('#' + random_rule).find(".rule-image").attr("style");
        name_rule = $('#' + random_rule).find(".rule-info h1").text();

        $('.active_rule').addClass("fade-rule");

        $('.active_rule').attr("style", image_rule);

        $('.active_rule').removeClass("fade-rule");

        $('.current-rule-name h1').text(name_rule);

        checkSpecialRule(parseInt(random_rule.split("_")[1]));

    }
}

function checkSpecialRule(id){
    switch(id){
        case 14:
            $('.bg-next-rule').removeAttr("onclick");
            $('.active_rule').append('<div class="shoot"></div>');

            var players = parseInt($('.player-count').text());
            var shoots = 1;

            $('.shoot').click(function(){
                var shoot = Math.round(Math.random())
                if(shoot == 0){
                    M.toast({html: 'Jugador ' + shoots + ' Libras'}, 500)
                }else{
                    M.toast({html: 'Jugador ' + shoots + ' ¡BEBES!', classes: 'red'}, 500)
                }

                if(shoots == players){
                    $('.shoot').remove();
                    $('.bg-next-rule').attr("onclick", "nextRule()");
                }
                shoots++;
            });

            break;
    }
}
