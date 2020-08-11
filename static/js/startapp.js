/**
 * Created by mlopez on 29/01/2019.
 */

$(document).ready(function(){
    M.AutoInit();

    // Cargamos las reglas seleccionadas anteriormente
    if(localStorage.getItem("rules") != undefined){
        var active_rules = JSON.parse(localStorage.getItem("rules"));

        for(i=0; i<active_rules.length; i++){
            console.log(i);
            $('#rule_' + active_rules[i]).find('input').prop("checked", "checked");
        }

    }

    if(localStorage.getItem("players") != undefined){
         $('.player-count').text(localStorage.getItem("players"));
    }

    $('.left-top.corner').click(function(){
        $('.rules').addClass('active')
    });

    $('.right-top.corner').click(function(){
        $('.game').removeClass("active");
         $('.corner').removeClass("corner-black");
         $('.btn-info-partida').fadeOut();
    });

    $('.close-rules').click(function(){
        $('.rules').removeClass('active')
    });

    $('.remove-player').click(function(){
        var current_players = parseInt($('.player-count').text());

        if(current_players >= 3){
            $('.player-count').text(current_players - 1);
            localStorage.setItem("players", current_players - 1)
        }
    });

    $('.add-player').click(function(){
        var current_players = parseInt($('.player-count').text())
        $('.player-count').text(current_players + 1);
        localStorage.setItem("players", current_players + 1)
    });

    $('.start-game > article').click(function(){
        $('.game').addClass('active');
        $('.corner').addClass("corner-black");
        $('.btn-info-partida').css("display", "flex").hide().fadeIn();
    });

     $('.switch').find("input").change(function(){
         var value = $(this).prop("checked");
         var id = $(this).attr("id").split("_")[1];

         if(localStorage.getItem("rules") == undefined){
             localStorage.setItem("rules", JSON.stringify([]))
         }

         var active_rules = JSON.parse(localStorage.getItem("rules"));

         var exists = false;
         var index = -1;
         var rule_this = parseInt($(this).attr("id").split("_")[1]);

         for(var i=0; i<active_rules.length; i++){
             var rule_i = parseInt(active_rules[i]);

             if(rule_i == rule_this){
                 exists = true;
                 index = i;
                 break;
             }
         }

         if(exists == false){
             active_rules.push(parseInt($(this).attr("id").split("_")[1]));
         }else{
            active_rules.splice(index, 1);
         }

         localStorage.setItem("rules", JSON.stringify(active_rules));

     });

    $('#info_partida').click(function(){

        $('#reglas_establecidas .collection-item').remove();
        $('#palabras_prohibidas .collection-item').remove();

        if (localStorage.getItem("reglas_establecidas") != undefined){
            var reglas_establecidas = JSON.parse(localStorage.getItem("reglas_establecidas"));
            for(var i=0; i<reglas_establecidas.length; i++){
                $('#reglas_establecidas').append('<li class="collection-item">' + reglas_establecidas[i] + '<i class="material-icons" onclick="clearRule(this, ' + i + ')">delete</i></li>');
            }
        }else{
            $('#reglas_establecidas').append('<li class="collection-item">Ninguna regla establecida</li>');
        }

        if (localStorage.getItem("palabras_prohibidas") != undefined){
            var palabras_prohibidas = JSON.parse(localStorage.getItem("palabras_prohibidas"));
            for(var i=0; i<palabras_prohibidas.length; i++){
                $('#palabras_prohibidas').append('<li class="collection-item">' + palabras_prohibidas[i] + '<i class="material-icons" onclick="clearPalabra(this,' + i + ')">delete</i></li>');
            }
        }else{
            $('#palabras_prohibidas').append('<li class="collection-item">Ninguna palabra prohibida</li>');
        }

    });

});