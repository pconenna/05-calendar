$(function () {


  var saveBtn = $('.saveBtn');
  saveBtn.on('click', function () {
    //need id of the div that says hour-x
    //need the content of the text area with class description
    var time = $(this).parent();
    var description = $(this).siblings('.description');
    localStorage.setItem(time.attr('id'), description.val())

  })



  function checkHour() {
    var today = dayjs();
    var currentHour = today.hour();
    $('#currentDay').text(today.format('dddd MMMM DD')); 
    var timeBlocks = $('.container-lg').children();
    timeBlocks.each(function () {
      var hourIndex = $(this).attr('id').split('-')[1]; // jquery split returns an array
      // i tried using === here and it didn't work
      if (currentHour == hourIndex) {
        $(this).addClass('present');
        $(this).removeClass('past')
        $(this).removeClass('future')
        //covering all possible changes
      } else if (currentHour > hourIndex) {
        $(this).addClass('past');
        $(this).removeClass('present')
        $(this).removeClass('future')
      } else if (currentHour < hourIndex) {
        $(this).addClass('future');
        $(this).removeClass('past')
        $(this).removeClass('present')
      }

    })


  }
  setInterval(checkHour,30000); //runs check hour every 30 seconds, used to check the time while th epage has been open
  checkHour(); //runs check hour when the page is opened 




  function getInputs() {
    // this iterates over the ids of the time blocks and checks local storage for a key that matches the id 
    var timeBlocks = $('.container-lg').children();
    timeBlocks.each(function () {
      var blockID = $(this).attr('id');
      var description = $(this).children('.description');
      var scheduleItem = localStorage.getItem(blockID)
      if (scheduleItem != null) {
        description.text(scheduleItem);

      }



    })
  }
  getInputs();
});