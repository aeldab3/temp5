
// Handle Active State Function
function handleActive(ev) {
  // Remove Active Class From All Children's
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  // Add  Active Class For Target
  ev.target.classList.add("active");
}

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");
const allLinks = document.querySelectorAll(".links a");

// Scroll to Position Function
function scrollToPosition(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" })
    });
  });
}
scrollToPosition(allBullets);
scrollToPosition(allLinks);

//Hide&Show Bullets
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletLocalStorage = localStorage.getItem("bullets-option");
if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "block") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // for Rotation
  this.classList.toggle("fa-spin");
  //Toggle Class Open
  document.querySelector(".settings-box").classList.toggle("open");
};

//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  //Toggle Class Menu-active on Btn
  this.classList.toggle("menu-active");
  //Toggle Class open on links
  tLinks.classList.toggle("open");
};
//To Close Menu when click anywhere Outside Btn & Menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      //Toggle Class Menu-active on Btn
      toggleBtn.classList.toggle("menu-active");
      //Toggle Class open on links
      tLinks.classList.toggle("open");
    }
  }
});
// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

// Check if there Color in localStorage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Remove Active Class From All Colors List Item After Refresh
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    // Add Active Class to Target After Refresh (Save In localStorage)
    if (ele.dataset.color === mainColor) {
      //Add Active Class
      ele.classList.add("active");
    }
  });
}

// Random Background Option
let backGroundOption = true;
// Variable To Control The Background Interval
let backgroundInterval;
//Check If There Is Value In LocalStorage About Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");
// Check If Is not Empty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backGroundOption = true;
    // Add Active Class To Select Span
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backGroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color on Root to make it as a main color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color In localStorage
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEL = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEL.forEach((span) => {
  // Click on every Span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backGroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backGroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// Select Landing Page Elements
let landingPage = document.querySelector(".landing-page");
// Array of Images
let imgsArray = [
  "background1.jpg",
  "background2.jpg",
  "background3.jpg",
  "background4.jpg",
  "background5.jpg",
  "background6.jpg",
];
// Function To Randomize Imgs
function randomizeImgs() {
  if (backGroundOption === true) {
    // change Background Image URL
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image URl after 5 sec
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImgs();

//Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // Create Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // To Create Text Above The Image
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Src
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    //Create The Close Span
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);

    // Close Popup and Overlay When Clicking Outside Popup Box
    overlay.addEventListener("click", () => {
      popupBox.remove();
      overlay.remove();
    });
  });
});
// close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    //Remove Current Popup
    e.target.parentNode.remove();
    //Remove Current Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Reset Button
document.querySelector(".reset-options").onclick = () => {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};