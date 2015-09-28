var main = function () {
    
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
    $('#devCalForm').submit(function() {
    
        var totalMin = $('#totalMin').val();
        var totalSec = $('#totalSec').val();
        var devMin = $('#devMin').val();
        var devSec = $('#devSec').val();

        function findSeconds (min, sec) {
            return (min * 60) + sec;
        }

        var totalTime = findSeconds(totalMin, totalSec);
        var totalDev = findSeconds(devMin, devSec);

        function findPercent (total, dev){
            return Math.round((100 - ((dev / total) * 100)) * 100) / 100;
        }
        var devPercent = findPercent(totalTime, totalDev);
        $('.answerDev').replaceWith('<p class="answerDev">' + devPercent + '%</p>');
        
        return false;
    });
                
    
    
}



$(document).ready(main);
