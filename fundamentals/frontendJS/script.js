const cssBtn = document.querySelector(".btn-css-delete");
const jsBtn = document.querySelector(".btn-js-delete");
const cssJsBtn = document.querySelector(
  ".btn-css-js-delete"
);
const square = document.getElementById("black-square");
const squares = document.querySelectorAll(".square");
const deleteBtn = document.querySelector(".btn-delete");
const input = document.getElementById("selector-form");
const yellowSquare = document.querySelector(
  ".yellow-square"
);
const buttons = document.querySelectorAll("button");
const redSquare = document.querySelector(".red-square");
const inputs = document.querySelectorAll("input");
const greenRect = document.querySelector(".green-rect");
const imageForm = document.getElementById("image-form");
const xCoord = document.querySelector(".x-coord");
const yCoord = document.querySelector(".y-coord");
const blockOne = document.querySelector(".block-one");
const blockTwo = document.querySelector(".block-two");
const blockThree = document.querySelector(".block-three");
const scrollBtn = document.querySelector(".scroll-btn");
const blueBlock = document.querySelector(".some-block");
const greenBlock = document.querySelector(".another-block");
const grayBlockCreatorBtn = document.querySelector(
  ".gray-block-btn"
);
const submitForm = document.getElementById("submit-form");
const fileInput = document.querySelector(".file-input");

cssBtn.addEventListener("click", () => {
  square.style.display = "none";
});

jsBtn.addEventListener("click", () => {
  square.remove();
});

cssJsBtn.addEventListener("click", () => {
  if (square.classList.contains("hidden")) {
    square.classList.remove("hidden");
    return;
  }
  square.classList.add("hidden");
});

deleteBtn.addEventListener("click", () => {
  squares.forEach((square) => {
    if (square.classList.contains("hidden")) {
      square.classList.remove("hidden");
      deleteBtn.innerHTML = "Delete all";
      return;
    }
    square.classList.add("hidden");
    deleteBtn.innerHTML = "Restore all";
  });
});

input.addEventListener("submit", (event) => {
  event.preventDefault();
  const elements = document.querySelectorAll(
    event.target.querySelector("input").value
  );
  elements.forEach((element) => {
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
      return;
    }
    element.classList.add("hidden");
  });
});

const alertHello = () => {
  alert("Hello");
  yellowSquare.removeEventListener("click", alertHello);
  yellowSquare.addEventListener("click", () => {
    yellowSquare.classList.add("hidden");
  });
};

yellowSquare.addEventListener("click", alertHello);

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    redSquare.classList.remove("hidden");
  });
  button.addEventListener("mouseout", () => {
    redSquare.classList.add("hidden");
  });
});

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    greenRect.classList.remove("hidden");
  });
  input.addEventListener("keypress", () => {
    greenRect.classList.add("hidden");
  });
});

imageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imageURLs = event.target
    .querySelector("textarea")
    .value.split("\n");
  for (const imageURL of imageURLs) {
    const image = document.createElement("img");
    image.setAttribute("src", imageURL);
    event.target.appendChild(image);
  }
});

const printMouseCoord = (event) => {
  xCoord.innerHTML = `x: ${event.clientX}`;
  yCoord.innerHTML = `y: ${event.clientY}`;
};

document.addEventListener("mousemove", (event) => {
  printMouseCoord(event);
});

const addLanguageLabel = () => {
  const text = document.querySelector(".language");
  text.innerHTML = navigator.language;
};

const addGeopositionLabels = () => {
  const latitude = document.querySelector(".latitude");
  const longitude = document.querySelector(".longitude");
  navigator.geolocation.getCurrentPosition((position) => {
    latitude.innerHTML = `Latitude: ${position.coords.latitude}`;
    longitude.innerHTML = `Longitude: ${position.coords.longitude}`;
  });
};

window.addEventListener("load", () => {
  addLanguageLabel();
  addGeopositionLabels();
  blockOne.textContent =
    localStorage.getItem("blockOneText");
  blockTwo.textContent =
    sessionStorage.getItem("blockTwoText");
  blockThree.textContent = document.cookie.split("=")[1];
});

blockOne.addEventListener("input", (event) => {
  localStorage.setItem(
    "blockOneText",
    event.target.textContent
  );
});

blockTwo.addEventListener("input", (event) => {
  sessionStorage.setItem(
    "blockTwoText",
    event.target.textContent
  );
});

blockThree.addEventListener("input", (event) => {
  document.cookie = `blockThreeText=${event.target.textContent}`;
});

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 30) {
    scrollBtn.style.display = "block";
    return;
  }
  scrollBtn.style.display = "none";
});

scrollBtn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

blueBlock.addEventListener("click", () => {
  alert("Click on blue");
});

greenBlock.addEventListener("click", (event) => {
  alert("Click on green");
  event.stopPropagation();
});

grayBlockCreatorBtn.addEventListener("click", () => {
  const grayBlock = document.createElement("div");
  grayBlock.classList.add("gray-block");
  document.body.appendChild(grayBlock);
  grayBlock.addEventListener("click", () => {
    grayBlock.remove();
    document.body.style.overflow = "auto";
  });
  document.body.style.overflow = "hidden";
});

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

fileInput.addEventListener("input", () => {
  if (fileInput.files.length === 0) {
    fileInput.setAttribute("data-before", "Select file");
    return;
  }
  fileInput.setAttribute(
    "data-before",
    fileInput.files[0].name
  );
});

const fileContainer = document.querySelector(
  ".input-file-container"
);
fileInput.addEventListener("dragover", () => {
  fileContainer.style.background = "green";
});

fileInput.addEventListener("dragleave", () => {
  fileContainer.style.background = "none";
});

fileInput.addEventListener("drop", () => {
  fileContainer.style.background = "yellow";
});
