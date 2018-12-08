
let people;
$('.overlay-container').hide();

// data.results is an array of 12 objects reprsenting each person
fetch("https://randomuser.me/api/?results=12&nat=au").then(result => result.json()).then(data => {
  people = data.results;
  display();
});

function display() {
  console.log(people);
  people.forEach((person, index) => {
    let cardDiv = $('<div>', {class: 'card'});
    let imageElement = $('<img />', {src: person.picture.medium});
    let detailsDiv = $('<div>', {class: 'details'});
    let span1 = $(`<span class='name'>${person.name.first} ${person.name.last}</span>`);
    let span2 = $(`<span class='email'>${person.email}</span>`);
    let span3 = $(`<span class='city'>${person.location.city}</span>`);

    detailsDiv.append(span1, span2, span3);
    cardDiv.append(imageElement, detailsDiv);
    cardDiv.data("current", index);
    $('.container').append(cardDiv);
  });
  $('.card').click(function() {
    let current = $(this).data("current");
    displayDetails(current);
  });
}

function displayDetails(current) {
  if (current < 0 || current >= people.length) {
    return;
  }
  let person = people[current];
  console.log(person);
  let popupDiv = $('<div>', {class: 'popup'});
  let imageElement = $('<img />', {src: person.picture.large});
  let name = $(`<span class='name'>${person.name.first} ${person.name.last}</span>`);
  let email = $(`<span class='email'>${person.email}</span>`);
  let city = $(`<span class='city'>${person.location.city}</span>`);
  let line = $(`<div class="line"></div>`);
  let phone = $(`<span class="phone">${person.phone}</span>`);
  let address = $(`<span class="address">${person.location.street}</span>`);
  let state = $(`<span class="state">${person.location.state} ${person.location.postcode}</span>`);
  let birthday = $(`<span class="birthday">Birthday:${person.dob.date}</span>`);
  let closeButton = $(`<i class="far fa-times-circle close"></i>`);
  let nextButton = $(`<i class="far fa-arrow-alt-circle-right next"></i>`);
  let previousButton = $(`<i class="far fa-arrow-alt-circle-left previous"></i>`);

  popupDiv.append(imageElement, name, email, city, line, phone, address, state, birthday, closeButton);
  if (current + 1 < people.length) {
    popupDiv.append(nextButton);
  }
  if (current - 1 >= 0) {
    popupDiv.append(previousButton);
  }
  $('.popup-container').append(popupDiv);
  $('.overlay-container').show();
  $('.close').click(function() {
    $('.popup-container').empty();
    $('.overlay-container').hide();
  });
  $('.next').click(function() {
    $('.popup-container').empty();

    displayDetails(current + 1);
  });
  $('.previous').click(function() {
    $('.popup-container').empty();
    displayDetails(current - 1);

  });

}
