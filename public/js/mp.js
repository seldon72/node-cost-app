
$(document).ready(function(){
    var planta = 'Piezas Especiales'
    var url = 'api/materiaprima/planta/' + planta;
    
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

function myFunction() {
    var url = "/api/otros"
    var data = {
        "planta" : "Postes de Concreto",
        "desc" : "AGUA CURADO",
        "uom" : "LT",
        "unitCost" : 0.0300,
        "billId" : "4"
        }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(data)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

}
