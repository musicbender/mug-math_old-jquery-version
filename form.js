var unitArray = [0, "grams"];

var main = function () {
        
        //Dropdown Button Addon and Functions
    
    $(".dropdown-menu li a").click(function() {
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").html($(this).text()+' <span class="caret"></span>');
        $(this).parent().parent().siblings(".dropdown-toggle:first-child").val($(this).text());
        
        
        unitArray.shift();
        unitArray.push($(this).text());
  
        
        //Unit Converter
        function unitConvert(value, unit, prev) {
            if (prev = "grams" || "ml") {
                switch (unit) {
                    case "grams":
                    case "ml":
                        return value;    
                    case "ounces": 
                        return Math.round((parseFloat(value) * 0.035274) * 100) / 100;   
                    //case "tbsp.": 
                        //return Math.round((parseFloat(value) * 0.18867925) * 10) / 10; 
                    default: 
                        return value;  
                }
            }
            else if (prev = "ounces") {
                switch (unit) {
                    case "grams":
                    case "ml":
                        return Math.round((parseFloat(value) / 0.035274) * 100) / 100;    
                    case "ounces": 
                        return value;   
                    //case "tbsp.": 
                        //return Math.round((parseFloat(value) * 0.19000570) * 10) / 10; 
                    default: 
                        return value;  
                }
            }

            /*else if (prev == "tbsp.") {
                switch (unit) {
                    case "grams":
                    case "ml":
                           return Math.round((parseFloat(value) / 0.18867925) * 10) / 10;
                    case "ounces": 
                        return Math.round((parseFloat(value) * 0.19000570) * 10) / 10;  
                    case "tbsp.": 
                        return value; 
                    default: 
                        return value;
                }
            }*/
            else {return value};
    }
        
        var currentValue = $(this).parent().parent().parent().siblings().val();
        var currentUnit = $(this).text();
        var prevUnit = unitArray[0];
        var convert = unitConvert(currentValue, currentUnit, prevUnit);           
        
        $(this).parent().parent().parent().siblings().val(convert);               
    });
    
    
    //TEST
    
    $('.test').click(function() {
        
        var testPoop = $('#TESTID').text();
        
        $(this).replaceWith('<p class="test">' + testPoop + ' ' + unitArray[0] + '!!!</p>');
        
        return false;
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
