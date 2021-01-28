// jQuery show() and hide() methods
// The hide() method simply sets the inline style display: none for the selected elements.
// Conversely, the show() method restores the display properties of the matched set of elements to 
// whatever they initially were—typically block, inline, or inline-block —before the inline style display: none was applied to them

$(document).ready(function(){
    // Hide displayed paragraphs
    $(".hide-btn").click(function(){
        $("p").hide();
    });
    
    // Show hidden paragraphs
    $(".show-btn").click(function(){
        $("p").show();
    });
});

// You can optionally specify the duration(speed) parameter for making the jQuery show hide effect animated 
// over a specified period of time.
// Durations can be specified:  using 'slow' or 'fast', or in a number of milliseconds(higher values = slower animations)
$(document).ready(function(){
    // Hide displayed paragraphs with different speeds
    $(".hide-btn").click(function(){
        $("p.normal").hide();
        $("p.fast").hide("fast");
        $("p.slow").hide("slow");
        $("p.very-fast").hide(50);
        $("p.very-slow").hide(2000);
    });
    
    // Show hidden paragraphs with different speeds
    $(".show-btn").click(function(){
        $("p.normal").show();
        $("p.fast").show("fast");
        $("p.slow").show("slow");
        $("p.very-fast").show(50);
        $("p.very-slow").show(2000);
    });
});

$(document).ready(function(){
    // Display alert message after hiding paragraphs
    $(".hide-btn").click(function(){
        $("p").hide("slow", function(){
            // Code to be executed
            alert("The hide effect is completed.");
        });
    });
    
    // Display alert message after showing paragraphs
    $(".show-btn").click(function(){
        $("p").show("slow", function(){
            // Code to be executed
            alert("The show effect is completed.");
        });
    });
});