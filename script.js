// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var saveBtn = $('.saveBtn');
  saveBtn.on('click',function(){
    //need id of the div that says hour-x
    //need the content of the text area with class description
    var time = $(this).parent();
    var description = $(this).siblings('.description');
    localStorage.setItem(time.attr('id'),description.val())

  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  function checkHour(){
    var today = dayjs();
    var currentHour = today.hour();
    $('#currentDay').text(today.format('dddd MMMM DD')); // i'll put an ordinal on this later
    var timeBlocks = $('.container-lg').children();
    timeBlocks.each(function(){
      var hourIndex = $(this).attr('id').split('-')[1]; // jquery split returns an array
      // i tried using === here and it didn't work
      if (currentHour == hourIndex){
        $(this).addClass('present');
        $(this).removeClass('past')
        $(this).removeClass('future')
        //covering all possible changes
      }
      else if(currentHour > hourIndex){
        $(this).addClass('past');
        $(this).removeClass('present')
        $(this).removeClass('future')
      }
      else if(currentHour < hourIndex){
        $(this).addClass('future');
        $(this).removeClass('past')
        $(this).removeClass('present')
      }
  
    })
  

  }
  checkHour();
 


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function getInputs(){
    var timeBlocks = $('.container-lg').children();
    timeBlocks.each(function(){
      var blockID = $(this).attr('id');
      var description = $(this).children('.description');
      var scheduleItem = localStorage.getItem(blockID)
      if(scheduleItem != null){
        description.text(scheduleItem);

      }
      
      
  
    })
  }
  getInputs();

  
  // TODO: Add code to display the current date in the header of the page.
  // i did some experimenting and realized that the assigment needs to be in a function so i'll just keep it in checkHour()
});
