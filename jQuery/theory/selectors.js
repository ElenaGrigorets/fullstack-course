$(document).ready(function(){

//CSS selectors: 

    // Highlight only paragraph elements with class mark
    $("p.mark").css("background", "yellow");
  
    // Highlight only span elements inside the element with ID mark
    $("#mark span").css("background", "yellow");
  
    // Highlight li elements inside the ul elements
    $("ul li").css("background", "red");
  
    // Highlight li elements only inside the ul element with id mark
    $("ul#mark li").css("background", "yellow");
  
    // Highlight li elements inside all the ul element with class mark
    $("ul.mark li").css("background", "green");
  
    // Highlight all anchor elements with target blank
    $('a[target="_blank"]').css("background", "yellow");


//Custom jQury selectors:

    // Highlight table rows appearing at odd places
    $("tr:odd").css("background", "yellow");
  
    // Highlight table rows appearing at even places
    $("tr:even").css("background", "orange");
  
    // Highlight first paragraph element
    $("p:first").css("background", "red");
  
    // Highlight last paragraph element
    $("p:last").css("background", "green");
  
    // Highlight all input elements with type text inside a form
    $("form :text").css("background", "purple");
  
    // Highlight all input elements with type password inside a form
    $("form :password").css("background", "blue");
  
    // Highlight all input elements with type submit inside a form
    $("form :submit").css("background", "violet");
});
