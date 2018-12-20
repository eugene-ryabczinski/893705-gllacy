var isStorageSupprt = true;
var storage = "";

try {
	storage = localStorage.getItem("login");
} catch (err){
	isStorageSupprt = false;
}

var overlay = document.querySelector(".overlay");

// Блок search
if(typeof(search) != "undefined" && search !== null) {	
	var searchButton = document.querySelector(".button-search");
	var search = document.querySelector(".search");
	var searchForm = search.querySelector(".search-form");
	var searchValue = search.querySelector("[name=search]");
	
	searchButton.addEventListener("mouseover", function(evt) {
		if (search.classList.contains("popup-error")) {
			search.classList.remove("popup-error");
		}
		searchValue.focus();
	});
	
	searchForm.addEventListener("submit", function(evt) {
		if (!searchValue.value) {
			evt.preventDefault();
			search.classList.remove("popup-error");
			search.offsetWidth = search.offsetWidth;
			search.classList.add("popup-error");
		}
	});
}	

//	блок login
var loginButton = document.querySelector(".button-login");
var login = document.querySelector(".login");
var loginForm = document.querySelector(".login-form");
var loginEmail = loginForm.querySelector("[name=email]");
var loginPassword = loginForm.querySelector("[name=password]");

if(typeof(login) != "undefined" && login !== null) {
	loginButton.addEventListener("mouseover", function(evt) {
		if (login.classList.contains("popup-error")) {
			login.classList.remove("popup-error");
		}
		if (storage) {
			loginEmail.value = storage;
			loginPassword.focus();
		} else {
			loginEmail.focus();
		}
	});
	
	loginForm.addEventListener("submit", function(evt) {
		if (!loginEmail.value || !loginPassword.value) {
			evt.preventDefault();
			login.classList.remove("popup-error");
			login.offsetWidth = login.offsetWidth;
			login.classList.add("popup-error");
		}
		else {
			if (isStorageSupprt) {	
				localStorage.setItem("login", loginEmail.value);	
			}
		}
	});
}	

// Блок feedback
var feedback = document.querySelector(".button-feedback");
var popup = document.querySelector(".modal-feedback");
var close = document.querySelector(".modal-close");
var feedbackForm = popup.querySelector("form");
var feedbackName = popup.querySelector("[name=name]");
var feedbackEmail = popup.querySelector("[name=email]");

if(typeof(popup) != "undefined" && popup !== null) {
	feedback.addEventListener("click", function(evt) {
		evt.preventDefault();
		overlay.classList.add("overlay-show");
		popup.classList.add("modal-show");
		feedbackName.focus();
	});
	
	overlay.addEventListener("click", function(evt) {
		popup.classList.remove("modal-show");
		overlay.classList.remove("overlay-show");
		popup.classList.remove("popup-error");
	});
			
	close.addEventListener("click", function(evt) {
		evt.preventDefault();
		popup.classList.remove("modal-show");
		overlay.classList.remove("overlay-show");
		popup.classList.remove("popup-error");
	});
	
	feedbackForm.addEventListener("submit", function(evt) {
		if (!feedbackName.value || !feedbackEmail.value) {
			evt.preventDefault();
			popup.classList.remove("popup-error");
			popup.offsetWidth = popup.offsetWidth;
			popup.classList.add("popup-error");
		}
	});	
	
	window.addEventListener("keydown", function(evt) {
		if (evt.keyCode === 27) {
			evt.preventDefault();
			if (popup.classList.contains("modal-show")) {
				popup.classList.remove("modal-show");
				popup.classList.remove("popup-error");
	
			}
			if (overlay.classList.contains("overlay-show")) {
				overlay.classList.remove("overlay-show");
			}
			
		}		
	});
}

// блок mailing
var mailingForm = document.querySelector(".mailing-form");
var mailingEmail = mailingForm.querySelector("[name=email]");

if(typeof(mailingForm) != "undefined" && mailingForm !== null) {
	mailingForm.addEventListener("submit", function(evt) {
		if (!mailingEmail.value) {
			evt.preventDefault();
			mailingEmail.classList.remove("input-error");
			mailingEmail.offsetWidth = mailingEmail.offsetWidth;
			mailingEmail.classList.add("input-error");
		}	
	});
}

// Слайдер
var toggles = document.querySelectorAll(".slider-toggle");
var slides = document.querySelectorAll(".slide-item");
var currentIndex = 0;
var slideTimer = 3000;
var body = document.querySelector("body");

if(typeof(slides) != "undefined" && slides !== null) {
	var sliderInit = function() {
		slides[0].classList.add("slide-show");
		toggles[0].classList.toggle("slider-toogle-current");
		body.classList.add("slide-"+1+"-bg");
	}
	
	sliderInit();
	
	var changeSlide = function(index) {
		for (var j=0; j < slides.length; j++) {
			if (j == index) {
				slides[j].classList.add("slide-show");
				slides[j].classList.add("slide-animation");
				toggles[j].classList.add("slider-toogle-current");
				body.classList.add("slide-"+(j+1)+"-bg");
			} else {
				slides[j].classList.remove("slide-show");
				slides[j].classList.remove("slide-animation");
				toggles[j].classList.remove("slider-toogle-current");
				body.classList.remove("slide-"+(j+1)+"-bg");
			}	
		}
	}

	var moveIndex = function (index, toggle) {
		toggle.addEventListener("click", function(evt) {
			currentIndex = index;
			console.log(currentIndex);
			changeSlide(currentIndex);
		});
	}
	
	for (var i=0; i < toggles.length; i++) {
		moveIndex(i, toggles[i]);
	}
}