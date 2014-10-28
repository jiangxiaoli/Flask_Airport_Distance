/**
 * Created by Corn on 10/26/14.
 */

(function($){
    var map;
    var lat1;
    var lat2;
    var lng1;
    var lng2;

    $(document).ready(function(){

        //init map canvas
        map = new GMaps({
            div: '#map',
            zoom: 4,
            lat: 33.942536,
            lng: -118.408075
        });


        $("#result").hide();

        //Clear Result button to hide the result panel
        $("#clearResult").click(function(e){
            $("#result").hide();
            map.cleanRoute();
            map.removeMarkers();
        });

        $(".airport").autocomplete({
            source: makeRequests,
            minLength: 1
        });


        //submit the request form to Flask server for SITA Airport API request
        $("#requestFrom").submit(function (e) {
            e.preventDefault();

            map.cleanRoute();
            map.removeMarkers();

            //get form data
            var formdata = $("#requestFrom").serializeArray();

            //parse form data
            var fromAP ="";
            var toAP ="";
            var unit ="";
            $.each(formdata, function (i, input) {
                switch(input.name){
                    case "departure": fromAP = input.value; break;
                    case "destination": toAP = input.value; break;
                    case "units": unit = input.value; break;
                    default : break;
                }
            });
            requestAPI(fromAP, toAP, unit);
        });
    });

    function makeRequests(request, response) {
        $.getJSON('/static/js/airports.json', function(data) {

            var term = request.term.toLowerCase();

            response($.map(data, function(item) {

                var code = item.code.toLowerCase(); var name= item.name.toLowerCase();
                if(code.indexOf(term) >=0 || name.indexOf(term) >=0){
                    return {
                        label: item.code + ", " + item.name,
                        value: item.code
                    };
                } else {
                    return null;
                }

            }));
        });
    }

    //SITA API user key
    function requestAPI(fromAP, toAP, unit) {
        console.log(fromAP + "," + toAP + "," + unit);

        //url to Flask server with parameters
        var requestUrl = "/airport_request/"+fromAP+"/"+toAP+"/"+unit;
        $.ajax({
            type: 'GET',
            url: requestUrl,
            error: function(request, errorType, errorMessage) {
                console.log("Error:" + errorType + " , with message: " + errorMessage);
            },
            success: function (data) {
                //transfer response text to json
                var x = data.substring(9, data.length-1);
                var obj = JSON.parse(x);

                if(obj.success == true){
                    //apply results to html
                    $("#distance").html("Distance: <span class='distance_text'>" + obj.distance + "</span> " + obj.units);

                } else {
                    $("#distance").html("Invalid Input...or the airport is not supported by API");
                }
                $("#result").show();

            }
        });

        //url to get airport info
        var singleFrom = "/airport_request/"+fromAP;
        var p1 = $.ajax({
            type: 'GET',
            url: singleFrom,
            error: function(request, errorType, errorMessage) {
                console.log("Error:" + errorType + " , with message: " + errorMessage);
            },
            success: function (data) {
                //transfer response text to json
                var x = data.substring(9, data.length-1);
                var obj = JSON.parse(x);
                console.log(obj);

                //find the lat, lng
                lat1 = obj.airports[0].lat;
                lng1 = obj.airports[0].lng;
            }
        });

         //url to get airport info
        var singleTo = "/airport_request/"+toAP;
        var p2 = $.ajax({
            type: 'GET',
            url: singleTo,
            error: function(request, errorType, errorMessage) {
                console.log("Error:" + errorType + " , with message: " + errorMessage);
            },
            success: function (data) {
                //transfer response text to json
                var x = data.substring(9, data.length-1);
                var obj = JSON.parse(x);

                console.log(obj);

                //find the lat, lng
                lat2 = obj.airports[0].lat;
                lng2 = obj.airports[0].lng;

            }
        });

        $.when(p1, p2).done(function () {
            console.log(lat1,lng1,lat2,lng2);
            plotMap();
        });

    }

    function plotMap() {

        console.log("in plot map:");

        console.log(lat1,lng1,lat2,lng2);

        map.setCenter((lat1+lat2)/2, (lng1+lng2)/2);


        map.addMarker({lat:lat1,lng: lng1});
        map.addMarker({lat:lat2,lng: lng2});

        path = [[lat1, lng1], [lat2, lng2]];

        map.drawPolyline({
          path: path,
          strokeColor: "#e60800",
          strokeOpacity: 0.6,
          strokeWeight: 4
        });

        map.fitZoom();

    }


})(jQuery);