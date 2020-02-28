$(document).ready(function(){

    console.log("ok");
    
    $(document).on("click","[data-code-show]", function(e){

        var content = e.target.innerHTML;
        var t = $(this);
        var tc = t.children("[data-code]");
        console.log(t);

        if (tc.length > 0){
            tc.slideUp(500, function(){tc.remove()})
        } else{
            var c = $('<div data-code><textarea>'+ content +'</textarea></div>').hide().fadeIn(500);
            t.prepend(c);
            content = "";
        };

    });

})