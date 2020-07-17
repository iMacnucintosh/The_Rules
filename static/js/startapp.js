/**
 * Created by mlopez on 29/01/2019.
 */

$(document).ready(function(){
    M.AutoInit();

    $('.left-top.corner').click(function(){
        $('.rules').addClass('active')
    });

    $('.right-top.corner').click(function(){
        $('.game').removeClass("active");
    });

    $('.close-rules').click(function(){
        $('.rules').removeClass('active')
    });

    $('.remove-player').click(function(){
        var current_players = parseInt($('.player-count').text());

        if(current_players >= 3){
            $('.player-count').text(current_players - 1);
        }
    });

    $('.add-player').click(function(){
        var current_players = parseInt($('.player-count').text())
        $('.player-count').text(current_players + 1);
    });

    $('.start-game > article').click(function(){
        $('.game').addClass('active');
    });

    // $('.switch').find("input").change(function(){
    //     var value = $(this).prop("checked");
    //     var id = $(this).attr("id").split("_")[1];
    //
    //     if(localStorage.getItem("rules") == undefined){
    //         localStorage.setItem("rules", JSON.stringify([]))
    //     }
    //
    //     var active_rules = JSON.parse(localStorage.getItem("rules"));
    //
    //     var exists = false;
    //
    //     for(var i=0; i<active_rules.length; i++){
    //         if(parseInt($(this).attr("id").split("_")[1]) == parseInt(active_rules[i])){
    //             existe = true;
    //         }
    //     }
    //
    //
    //     console.log(exists)
    //
    //     if(!exists){
    //         active_rules.push(parseInt($(this).attr("id").split("_")[1]));
    //     }
    //
    //     localStorage.setItem("rules", JSON.stringify(active_rules));
    //
    //     //console.log(localStorage.getItem("rules"));
    //
    // })

});