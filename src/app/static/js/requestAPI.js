/**
 * Created by Corn on 10/26/14.
 */

(function($){
    $(document).ready(function(){
        $("#result").hide();

        //Clear Result button to hide the result panel
        $("#clearResult").click(function(e){
            $("#result").hide();
        });

        $(".airport").autocomplete({
            source: makeRequests,
            minLength: 1
        });

        //submit the request form to Flask server for SITA Airport API request
        $("#requestFrom").submit(function (e) {
            e.preventDefault();

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
    var userKey= "a63bc8e425bd5180f99da2e0268ae56f";
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

                //apply results to html
                $("#distance").html("Distance: " + obj.distance + " " + obj.units);
                $("#result").show();
            }
        });
    }



})(jQuery);