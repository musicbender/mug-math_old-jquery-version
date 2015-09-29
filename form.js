var main = function () {
    
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
