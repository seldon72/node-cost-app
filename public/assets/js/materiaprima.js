

$(document).ready(function(){
    
    var url = '../api/materiaprima/planta/' + planta;
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache"
        }
    };

    $.ajax(settings).done(function (response) {
        var template = $('#data-template').html();
        
        $.each(response.mp, function(i, val) {
            var dateFormat = moment(val.lastUpdated);
            dateFormat.locale('es');
            
            var html = Mustache.render(template, {
                data0: val.billId,
                data1: val.desc,
                data2: val.uom,
                data3: val.unitCost,
                data4: dateFormat.fromNow()
            });

            $("tbody").append(html);
        });
        
    }).done(function(){
        
        $("table").filterTable({
            inputSelector: "#busca",
            minRows: 1
        });

        $(".table").tablesorter(); 
    });
});


