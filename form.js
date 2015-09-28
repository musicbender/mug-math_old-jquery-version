var main = function () {
    
    //Loss Calculator
    
    $('#lossCalForm').submit(function(){
        var preWeightValue = $('#preWeight').val();
        var postWeightValue = $('#postWeight').val();
        
        function findLossPercent(pre, post) {
            return Math.round((100 - ((post / pre) * 100)) * 10) / 10;
        }

        var lossPercent = findLossPercent(preWeightValue, postWeightValue);
        $('.answer').replaceWith('<p class="answer">' + lossPercent + '%</p>');
        
        
        return false;
    });
    
    
    
}



$(document).ready(main);
