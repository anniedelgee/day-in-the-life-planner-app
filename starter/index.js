
// Create a variable to store the current date and time using the Moment.js library
// Display the current date and time at the top of the calendar
// Create timeblocks for standard business hours (e.g. 9am-5pm) using a for loop
// Within the for loop, create a color-coding system to distinguish between past, present, and future timeblocks
// Allow a user to enter an event by clicking on a timeblock and display the input field within that timeblock
// Create a save button within each timeblock and use an event listener to save the entered event to local storage when clicked
// Use another event listener to retrieve the saved events from local storage and display them on the calendar upon page refresh
// Ensure that the events are persisted between refreshes of a page
// Follow best practices for file structure, naming conventions, indentation, and commenting within the jQuery JavaScript file.

// Define business hours
const businessHours = ['09', '10', '11', '12', '13', '14', '15', '16', '17'];

// Define the current date and time using Moment.js
const currentDate = moment();
const currentHour = currentDate.format('HH');

// Display the current date and time at the top of the calendar
$('#currentDay').text(currentDate.format('dddd, MMMM Do'));

// Create timeblocks for standard business hours
for (let i = 0; i < businessHours.length; i++) {
  const hour = businessHours[i];

  // Create a timeblock element with a data-hour attribute
  const timeblock = $('<div>').addClass('time-block').attr('data-hour', hour);

  // Create an hour element and append it to the timeblock
  const hourElement = $('<div>').addClass('hour').text(`${hour}:00`);
  timeblock.append(hourElement);

  // Create a text area element and append it to the timeblock
  const textAreaElement = $('<textarea>').addClass('description');
  timeblock.append(textAreaElement);

  // Create a save button element and append it to the timeblock
  const saveButtonElement = $('<button>').addClass('saveBtn').text('Save');
  timeblock.append(saveButtonElement);

  // Append the timeblock to the container element
  $('.container').append(timeblock);

  // Color-code the timeblock based on past, present, or future
  if (hour < currentHour) {
    timeblock.addClass('past');
  } else if (hour === currentHour) {
    timeblock.addClass('present');
  } else {
    timeblock.addClass('future');
  }
}

// Add an event listener to save button
$('.saveBtn').on('click', function () {
  const hour = $(this).parent().attr('data-hour');
  const event = $(this).siblings('.description').val();
  localStorage.setItem(hour, event);
});

// Retrieve the saved events from local storage and display them on the calendar
for (let i = 0; i < businessHours.length; i++) {
  const hour = businessHours[i];
  const event = localStorage.getItem(hour);
  if (event) {
    $(`[data-hour=${hour}] .description`).val(event);
  }
}
