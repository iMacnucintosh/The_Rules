/**
 * Created by mlopez on 29/01/2019.
 */

$(document).ready(function(){
    M.AutoInit();

    $('.left-top.corner').click(function(){
        $('.rules').fadeIn(200);
    });

    $('.right-top.corner').click(function(){
        $('.game').removeClass("active");
    });

    $('.close-rules').click(function(){
        $('.rules').fadeOut(200);
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
});