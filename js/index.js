let menuVisible = false;

function menuClick() {
  menuVisible = !menuVisible;
  let button = document.getElementById('responsive-nav-button');
  let homeInfo = document.getElementById('home-info');
  if  (menuVisible) {
    let pos = 0;
    setInterval(function() {
      if (pos === 300) {
        return;
      } else {
        pos += 5; 
        homeInfo.style.top = pos + 'px'; 
      }
    }, 5)
  } else {
    button.classList.add('closedMenu');
    button.classList.remove('openMenu');
    let pos = 300;
    setInterval(function() {
      if (pos === 0) {
        return;
      } else {
        pos -= 5; 
        homeInfo.style.top = pos + 'px'; 
      }
    }, 5)
  }
}

function fadeIn(element, peakOpacity) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= peakOpacity){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

window.onload = function() {
  var background = document.getElementById('stars');
  var container = document.getElementById('container');
  fadeIn(background, 1);
  if (window.location.hash) {
    changeNavSelection(window.location.hash.substr(1));
  }
  setTimeout(fadeIn(container, 1), 10000);
}

function showSection(sectionId) {
  window.location.hash = sectionId;
  window.scrollTo(0,0);
  var navItems = document.getElementById('nav-bar').children;
  for (var i = 0; i < navItems.length; i++) {
    document.getElementById(navItems[i].id + '-info').style.display = 'none';
  }
  var display = 'table';
  if (sectionId === 'work' || sectionId === 'about' || sectionId === 'contact') {
    display = 'flex';
  }
  if (sectionId === 'projects' || sectionId === 'resume') {
    display = 'block';
  }
  document.getElementById(sectionId + '-info').style.display = display;
}

function changeNavSelection(selectedElementId) {
  var selectedElement = document.getElementById(selectedElementId);
  if (!selectedElement) {
    selectedElement = document.getElementById('home')
    selectedElementId = 'home'
  }
  var navItems = document.getElementById('nav-bar').children;
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove('selected-nav-item');
  }
  selectedElement.classList.add('selected-nav-item');
  showSection(selectedElementId);
}

function emailValid(email) {
  var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(email)) {
    return false;
  }
  return true;
}

function phoneNumberValid(number) {
  var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
  if (!filter.test(number)) {
    return false;
  }
  return true;
}

function sendContactForm() {
  document.getElementById('name-errors').style.visibility = 'hidden';
  document.getElementById('email-errors').style.visibility = 'hidden';
  document.getElementById('number-errors').style.visibility = 'hidden';
  document.getElementById('message-errors').style.visibility = 'hidden';
  document.getElementById('somethingWentWrong').style.display = 'none';

  var nameErrors = "";
  var emailErrors = "";
  var numberErrors = "";
  var messageErrors = "";

  var name = document.getElementById('name-field').value;
  var email = document.getElementById('email-field').value;
  var number = document.getElementById('number-field').value;
  var message = document.getElementById('message-field').value;

  if (name === undefined || name === '') {
    nameErrors = 'Please enter your name';
  }

  if (email === undefined || email === '') {
    emailErrors = 'Please enter your email';
  }
  // } else if (!emailValid()) {
  //     emailErrors = 'Please enter a valid email';
  // }

  // if (!(number === undefined || number === '')) {
  //   if (!phoneNumberValid()) {
  //     numberErrors.push('Please enter a valid phone number');
  //   }
  // }

  if (message === undefined || message === '') {
    messageErrors = 'Please enter a message';
  }

  if (nameErrors !== "") {
    document.getElementById('name-errors').innerHTML = nameErrors;
    document.getElementById('name-errors').style.visibility = 'visible';
  }
  if (emailErrors !== ""){
    document.getElementById('email-errors').innerHTML = emailErrors;
    document.getElementById('email-errors').style.visibility = 'visible';
  }
  if (numberErrors !== "") {
    document.getElementById('number-errors').innerHTML = numberErrors;
    document.getElementById('number-errors').style.visibility = 'visible';
  }
  if (messageErrors !== "") {
    document.getElementById('message-errors').innerHTML = messageErrors;
    document.getElementById('message-errors').style.visibility = 'visible';
  }
  if (nameErrors === "" && emailErrors === "" && numberErrors === "" && messageErrors === "") {
    var contactButton = document.getElementById('contact-button');
    var loader = document.getElementById('loader');
    var sent = document.getElementById('sent');
    var somethingWentWrong = document.getElementById('somethingWentWrong');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 ) {
           loader.style.display = 'none';
           if (this.status == 200) {
             sent.style.display = 'block';
           } else {
             contactButton.style.display = 'block';
             somethingWentWrong.style.display = 'block';
           }
        }
    };
    xhttp.open('GET', 'https://personal-website-email.herokuapp.com/send-email?name='+name+'&email='+email+'&number='+number+'&message='+message, true);
    xhttp.send();
    contactButton.style.display = 'none';
    loader.style.display = 'block';
  }
}
