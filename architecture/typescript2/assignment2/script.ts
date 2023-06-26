enum Button {
  PLUS,
  MINUS,
}

const buttonPlus = document.querySelector(".plus-btn");
const buttonMinus = document.querySelector(".minus-btn");
const plusP = document.querySelector(".plus-num");
const minusP = document.querySelector(".minus-num");

buttonPlus?.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ button: Button.PLUS }),
  });
  const data = await response.json();
  renderChanges(data);
});

buttonMinus?.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ button: Button.MINUS }),
  });
  const data = await response.json();
  renderChanges(data);
});

const renderChanges = (data: {
  plus: number;
  minus: number;
}) => {
  if (plusP) {
    plusP.innerHTML = `Clicked  plus: ${data.plus}`;
  }
  if (minusP) {
    minusP.innerHTML = `Clicked minus: ${data.minus}`;
  }
};
