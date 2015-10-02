
//var unitArray = [0, "grams"];

var main = function () {
   
    //var oldUnit;
    
    //Storing old unit value. //Will always happen before clicking on a dropdown item.
    $('.dropdown-toggle').click(function(){
        $(this).data("prev", $(this).text());
    });
    
    //Dropdown Button Addon and Functions
    $(".dropdown-menu li a").click(function() {
        //changes button text to whatever unit you clicked on
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").html($(this).text()+' <span class="caret"></span>');
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").val($(this).text());
        
        //some variables
        
        var currentUnit = $(this).text(); //value(unit) of button
            //$(this).parent().parent().siblings(".dropdown-toggle:first-child").text(); 
        
        var currentValue = $(this).parent().parent().parent().siblings().val(); //value in box
        
        var oldUnit = $(this).parent().parent().siblings().data("prev"); //previous button value
        
        //unit converter
        function unitConvert(value, unit, prev) {
            unit = unit.trim();
            prev = prev.trim();
            
            if (prev === "grams") {
                if (unit === "grams"){
                    return value;
                }
                else if (unit === "ounces"){
                    //alert("ham sandwich");
                    return Math.round((parseFloat(value) * 0.035274) * 100) / 100;
                }
                /*else if (unit == "tbsp."){
                    return Math.round((parseFloat(value) * 0.18867925) * 10) / 10;
                }*/
                else {
                    return value;
                }     
            }
            else if (prev === "ounces") {
                if (unit === "grams") {
                    //alert("banana");
                    return Math.round((parseFloat(value) / 0.035274) * 1) / 1;
                }
                else if (unit === "ounces") {
                    return value;
                }
                /*else if (unit == "tbsp."){
                    return Math.round((parseFloat(value) * 0.19000570) * 10) / 10;
                }*/
                else {
                    return value;
                }  
            }
            else {
                //alert("goat attack-" + prev + "-" + unit + "-");
                return value;
            }
        }
        
        //converts the value of the textbox
        var convert = unitConvert(currentValue, currentUnit, oldUnit); 
        $(this).parent().parent().parent().siblings().val(convert);               
    });

    
    //Brew Calculator
    
    $('#brewCalForm').submit(function() {
        var coffeeValue = $('#coffeeDose').val();
        var waterValue = $('#waterDose').val();
        
        function findRatio (coffee, water) {
            return Math.round((parseFloat(water) / parseFloat(coffee)) * 10) / 10;
        }
        
        $('.answerBrew').replaceWith('<p class="answerBrew">1 : ' + findRatio(coffeeValue, waterValue) + ' Ratio</p>');
        
        return false;
    });
    
    
    //Loss Calculator
    
    $('#lossCalForm').submit(function(){
        var preWeightValue = $('#preWeight').val();
        var postWeightValue = $('#postWeight').val();
        
        function findLossPercent(pre, post) {
            return Math.round((100 - ((post / pre) * 100)) * 10) / 10;
        }

        var lossPercent = findLossPercent(preWeightValue, postWeightValue);
        $('.answerLoss').replaceWith('<p class="answerLoss">' + lossPercent + '%</p>');
        
        return false;
    });
    
    
    //Dev Calculator
    $('#devCalForm').submit(function(){
    
        var totalMinValue = $('#totalMin').val();
        var totalSecValue = $('#totalSec').val();
        var devMinValue = $('#devMin').val();
        var devSecValue = $('#devSec').val();

        function findSeconds (min, sec) {
            return (parseFloat(min) * 60) + parseFloat(sec);
        }

        var totalTime = findSeconds(totalMinValue, totalSecValue);
        var totalDev = findSeconds(devMinValue, devSecValue);
        
        function findPercent (total, dev){
            return Math.round((100 - ((dev / total) * 100)) * 10) / 10;   
        }
        
        var devPercent = findPercent(totalTime, totalDev);
        $('.answerDev').replaceWith('<p class="answerDev">' + devPercent + '%</p>');
        
        return false;
    });
}



$(document).ready(main);
