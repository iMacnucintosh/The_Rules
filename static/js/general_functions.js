function nextRule(){

    var active_rules = [];

    $('.rules-list .rule').each(function(){
        if($(this).find('input').prop('checked')){
            active_rules.push($(this).attr("id"))
        }
    });

    console.log(active_rules)

    if(active_rules.length < 2){
        dialog.alert({
            title: "Maricón",
            message: "No seas mierdas y selecciona mas reglas",
            button: "Aceptar",
            callback: function(response){
                $('.rules').fadeIn(200);
            }
        });
    }

    var ramdom_rule = Math.floor((Math.random() * 10) + 1);
}