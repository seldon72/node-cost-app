//import { url } from "inspector";

$(document).ready(function(){
    var url = 'api/materiaprima'
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        //console.log(response);
        var template = $('#data-template').html();
        moment().locale('es');
        $.each(response.mp, function(i, val) {
            var html = Mustache.render(template, {
                data0: val.billId,
                data1: val.desc,
                data2: val.uom,
                data3: val.unitCost,
                data4: moment(val.lastUpdated).fromNow()
            });

            $("tbody").append(html);
        })
    })
    myFunction();
})

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

};
