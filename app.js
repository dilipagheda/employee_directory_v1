
//
// <div class="card">
//     <img src="https://randomuser.me/api/portraits/thumb/women/61.jpg" alt="">
//     <div class="details">
//       <span>1Haleigh Macchiarella</span>
//       <span>dtucker@yakirtri.edu</span>
//       <span>Chicago</span>
//     </div>
// </div>
//

/*
<div class="popup">
  <img class="portrait" src="https://randomuser.me/api/portraits/men/23.jpg" alt="">
  <span class="name">Dilip Agheda</span>
  <span class="email">ruben.owens@example.com</span>
  <span class="city">melbourne</span>
  <div class="line"></div>
  <span class="phone">07-6826-7481</span>
  <span class="address">9710 w belt line rd</span>
  <span class="birthday">Birthday:1970-05-20</span>
    <i class="far fa-times-circle close"></i>


</div>
*/
let people;
$('.overlay-container').hide();

// data.results is an array of 12 objects reprsenting each person
fetch("https://randomuser.me/api/?results=12&nat=au")
  .then(result =>  result.json())
  .then(data => {
    people = data.results;
    display();
  });

function display(){
  console.log(people);
  people.forEach((person,index) => {
    let cardDiv = $('<div>', {class: 'card'});
    let imageElement = $('<img />', {src: person.picture.medium});
    let detailsDiv = $('<div>', {class: 'details'});
    let span1 = $(`<span class='name'>${person.name.first} ${person.name.last}</span>`);
    let span2 = $(`<span class='email'>${person.email}</span>`);
    let span3 = $(`<span class='city'>${person.location.city}</span>`);

    detailsDiv.append(span1,span2,span3);
    cardDiv.append(imageElement,detailsDiv);
    cardDiv.data("current",index);
    $('.container').append(cardDiv);
  });
  $('.card').click(function() {
    let current = $(this).data("current");
    displayDetails(current);
  });
}

function displayDetails(current){
  if(current < 0 || current >= people.length) {
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

  popupDiv.append(imageElement,name,email,city,line,phone,address,state,birthday,closeButton);
  if(current+1 < people.length){
    popupDiv.append(nextButton);
  }
  if(current-1 >= 0 ){
    popupDiv.append(previousButton);
  }
  $('.popup-container').append(popupDiv);
  $('.overlay-container').show();
  $('.close').click(function(){
    $('.popup-container').empty();
    $('.overlay-container').hide();
  });
  $('.next').click(function(){
    $('.popup-container').empty();

    displayDetails(current+1);
  });
  $('.previous').click(function(){
    $('.popup-container').empty();
    displayDetails(current-1);

  });

}
