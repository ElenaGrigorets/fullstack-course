//   Events are often triggered by the user's interaction with the web page, such as when a link 
// or button is clicked, text is entered into an input box or textarea, selection is made in a select box,
// key is pressed on the keyboard, the mouse pointer is moved etc.
//   In some cases, the Browser itself can trigger the events, such as the page load and unload events.

//   In general, the events can be categorized into four main groups:
//       mouse events, 
//       keyboard events, 
//       form events 
//       and document/window events. 
      
//  The this keyword inside the jQuery event handler function is a reference to the element
//  where the event is currently being delivered.
$(document).ready(function(){
  $("p").click(function(){
      $(this).slideUp();
  });
});

// The following example will hide the <p> elements when they are double-clicked:
$("p").dblclick(function(){
  $(this).slideUp();
});

// The following example will highlight <p> elements when you place the cursor on it,
// the highlighting will be removed when you remove the cursor.
// You can consider the hover() method is a combination of the jQuery mouseenter() and mouseleave() methods.
$("p").hover(function(){
  $(this).addClass("highlight");
}, function(){
  $(this).removeClass("highlight");
});



// The keyboard events can be attached to any element, but the event is only sent to the element that has the focus.
// That's why the keyboard events generally attached to the form controls such as text input box or textarea.
$(document).ready(function(){
  var i = 0;
  $('input[type="text"]').keyup(function(){
      $("span").text(i += 1);
      $("p").show().fadeOut();
  });
});

// A form event is fired when a form control receive or loses focus or when the user modify a form control value
// such as by typing text in a text input, select any option in a select box etc.
// Here're some commonly used jQuery methods to handle the form events:

// change() method attach an event handler function to the <input>, <textarea> and <select> elements
// that is executed when its value changes. 
// The following example will display an alert message when you select any option in dropdown select box.
$(document).ready(function(){
  $("select").change(function(){
      var selectedOption = $(this).find(":selected").val();
      alert("You have selected - " + selectedOption);
  });
});
// Note: For select boxes, checkboxes, and radio buttons, the event is fired immediately when 
// the user makes a selection with the mouse, but for the text input and textarea the event is fired 
// after the element loses focus.


// focus() method attach an event handler function to the selected elements (typically form controls and links) 
// that is executed when it gains focus.
$("input").focus(function(){
  $(this).next("span").show().fadeOut("slow");
});

// blur() method attach an event handler function to the form elements such as <input>, <textarea>, <select>
// that is executed when it loses focus.


// submit() method attach an event handler function to the <form> elements that is executed when 
// the user is attempting to submit a form:  ( A form can be submitted either by clicking a submit button, 
//                                             or by pressing Enter when certain form elements have focus.)
$(document).ready(function(){
  $("form").submit(function(event){
      var regex = /^[a-zA-Z]+$/;
      var currentValue = $("#firstName").val();
      if(regex.test(currentValue) == false){
          $("#result").html('<p class="error">Not valid!</p>').show().fadeOut(1000);
          // Preventing form submission
          event.preventDefault();
      }
  });
});

// resize() method attach an event handler function to the window element that is executed when the size of the browser window changes.
$(window).resize(function() {
  $(window).bind("resize", function(){ 
      $("p").text("Window width: " + $(window).width() + ", " + "Window height: " + $(window).height());
  });
});

// jQuery scroll() method attach an event handler function to the window or scrollable iframes and elements that is 
// executed whenever the element's scroll position changes.
$(window).scroll(function() {
  $("p").show().fadeOut("slow");
});