
var main = function () {
    //FORM VALIDATION----------------------------------------------------
    
   function validate(input1, input2, input3, input4, button, formClass) { 
       //validation function
       function valid() {
           if ((input3 == null) || (input4 == null)){
               if ((input1.val() == "") || (input2.val() == "")){
                    button.removeAttr("disabled");
                    button.attr("disabled", true);
               }
               else {
                   button.removeAttr("disabled");
               }
           }
           else {
               if ((input1.val() == "") || (input2.val() == "") || (input3.val() == "") || (input4.val() == "")){
                    button.removeAttr("disabled");
                    button.attr("disabled", true);
               }
               else {
                   button.removeAttr("disabled");
               }
           }
       }
       
       //runs valid() function when arrows are clicked
       formClass.change(function() {
           valid();
       });
       
       //runs valid() function when anything is typed into the form
       formClass.keyup(function() {
           valid();
       });
   }
    
    //running each validate() function for each form section when page opens
    validate($('#coffeeDose'), $('#waterDose'), null, null, $('#submitBrewCal'), $('.brew-form'));
    validate($('#preWeight'), $('#postWeight'), null, null, $('#submitLossCal'), $('.loss-form'));
    validate($('#devMin'), $('#devSec'), $('#totalMin'), $('#totalSec'), $('#submitDevCal'), $('.dev-form'));
    
    
    //DISABLE COPY/PASTE------------------------------------------------
    $('.form-control').bind('cut copy paste taphold contextmenu', function(e) {
    e.preventDefault();
    });
    
    
    //UNITS AND UNITCONVERSION-------------------------------------------
    
    //FIND UNIT OF NEARBY INPUT BOX
    function findUnitFromInput(id) {
        return $(id).siblings().children(".dropdown-toggle:first-child").text();
    }
    
    
    //UNIT CONVERSION
    function unitConvert(value, unit, prev) {
        unit = unit.trim();
        prev = prev.trim();

        if (prev === "grams") {
            if (unit === "grams"){
                return value;
            }
            else if (unit === "ounces"){
                return Math.round((parseFloat(value) * 0.035274) * 100) / 100;
            }
            else if (unit === "tbsp."){
                return Math.round((parseFloat(value) * 0.18867925) * 100) / 100;
            }
            else if (unit === "lbs."){
                return Math.round((parseFloat(value) / 453.592) * 100) / 100;
            }
            else {
                return 000;
            }     
        }
        else if (prev === "ounces") {
            if (unit === "grams") {
                return Math.round((parseFloat(value) / 0.035274) * 100) / 100;
            }
            else if (unit === "ounces") {
                return value;
            }
            else if (unit === "tbsp."){
                return Math.round((parseFloat(value) / 0.19000570) * 100) / 100;
            }
            else if (unit === "lbs."){
                return Math.round((parseFloat(value) / 16) * 100) / 100;
            }
            else {
                return 000;
            }  
        }
        else if (prev === "tbsp."){
            if (unit === "grams"){
                return Math.round((parseFloat(value) / 0.18867925) * 100) / 100;
            }
            else if (unit === "ounces"){
                return Math.round((parseFloat(value) * 0.19000570) * 100) / 100;
            }
            else if (unit === "tbsp."){
                return value;
            }
            else {
                return 000;
            }

        }
        else if (prev === "lbs."){
            if (unit === "grams"){
                return Math.round((parseFloat(value) * 453.592) * 100) / 100;
            }
            else if (unit === "ounces"){
                return Math.round((parseFloat(value) * 16) * 100) / 100;
            }
            else if (unit === "lbs."){
                return value;
            }
        }
        else {
            return 000;
        }
    }

    //RECONVERTS BACK TO GRAMS
    function reconvertGrams(unit, value){
        unit = unit.trim();
        
        if (unit === "grams"){
            return value;
        }
        else if (unit === "ounces"){
            return Math.round((parseFloat(value) / 0.035274) * 100) / 100;
        }
        else if (unit === "tbsp."){
            return Math.round((parseFloat(value) / 0.18867925) * 100) / 100;
        }
        else if (unit === "lbs."){
            return Math.round((parseFloat(value) * 453.592) * 100) / 100;
        }
        else {
            return 000;
        }     
    }

    
    //STORE PREVIOUS UNIT. 
            //will always happen before clicking on a dropdown item.
    
    $('.dropdown-toggle').click(function(){
        $(this).data("prev", $(this).text());
    });
    
    
    //DROPDOWN BUTTON ADDON--------------------------------
    
    $(".dropdown-menu li a").click(function() {
        //changes button text to whatever unit you clicked on
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").html($(this).text()+' <span class="caret"></span>');
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").val($(this).text());
        
        var currentUnit = $(this).text();
        var currentValue = $(this).parent().parent().parent().siblings().val(); //value in box
        var oldUnit = $(this).parent().parent().siblings().data("prev"); //previous button value
        
        //converts the value of the textbox
        var convert = unitConvert(currentValue, currentUnit, oldUnit); 
        $(this).parent().parent().parent().siblings().val(convert);
        //return false;
    });

    //CALCULATORS-------------------------------------------------
    
    //BREW CALCULATOR
    
    $('#brewCalForm').submit(function() {
        var coffeeValue = reconvertGrams(findUnitFromInput('#coffeeDose'), $('#coffeeDose').val());
        var waterValue = reconvertGrams(findUnitFromInput('#waterDose'), $('#waterDose').val());
        
        function findRatio (coffee, water) {
            return Math.round((parseFloat(water) / parseFloat(coffee)) * 10) / 10;
        }
            
        $('.answerBrew').text('1 : ' + findRatio(coffeeValue, waterValue) + ' Ratio');
        
        return false;
    });
    
    
    //LOSS CALCULATOR
    
    $('#lossCalForm').submit(function(){
        var preWeightValue = reconvertGrams(findUnitFromInput('#preWeight'), $('#preWeight').val());
        var postWeightValue = reconvertGrams(findUnitFromInput('#postWeight'), $('#postWeight').val());

        function findLossPercent(pre, post) {
            return Math.round((100 - ((post / pre) * 100)) * 10) / 10;
        }

        $('.answerLoss').text(findLossPercent(preWeightValue, postWeightValue) + '%');
        
        return false;
    });
    
    
    //DEV CALCULATOR
    
    $('#devCalForm').submit(function(){
    
        var totalMinValue = $('#totalMin').val(),
            totalSecValue = $('#totalSec').val(),
            devMinValue = $('#devMin').val(),
            devSecValue = $('#devSec').val();

        function findSeconds (min, sec) {
            return (parseFloat(min) * 60) + parseFloat(sec);
        }

        var totalTime = findSeconds(totalMinValue, totalSecValue),
            totalDev = findSeconds(devMinValue, devSecValue);
        
        function findPercent (total, dev){
            return Math.round((100 - ((dev / total) * 100)) * 10) / 10;   
        }
        
        var devPercent = findPercent(totalTime, totalDev);
        
        $('.answerDev').text(devPercent + '%');
        return false;
    });
}



$(document).ready(main);
