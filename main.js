const customSelect = document.querySelector(".custom-select");
const customSelectList = document.querySelector(".custom-select-list");
const customSelectArrow = document.querySelector(".custom-select-arrow");
const customSelectText = document.querySelector(".custom-select-text");
const loading = document.getElementById("loading");
const inner = document.getElementById("inner");
const outer = document.getElementById("outer");

fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  .then((response) => response.json())
  .then((json) => {
    loading.remove();
    const valute = Object.entries(json.Valute).map((i) => i[1]);
    for (let i = 0; i < valute.length; i++) {
      customSelectList.innerHTML += `
        <li class="custom-select-item" data-valute="${valute[i].Value}">
        ${valute[i].Name}
        </li>
        `;
    }
    const customSelectItem = document.querySelectorAll(".custom-select-item");
    customSelectItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        customSelectText.textContent = e.target.textContent;
        customSelectList.classList.remove("is-active");
        customSelectArrow.classList.remove("is-rotate");
        localStorage.setItem("this", e.target.textContent);
        localStorage.setItem("valute", e.target.dataset.valute);
        customSelect.dataset.valute = e.target.dataset.valute;
        if (inner.value.length !== 0) {
          outer.value =
            Math.trunc(inner.value * customSelect.dataset.valute * 100) / 100;
        }
      });
    });
    customSelectText.textContent =
      localStorage.getItem("this") || customSelectItem[0].textContent;
    customSelect.dataset.valute =
      localStorage.getItem("valute") || customSelectItem[0].dataset.valute;
  })
  .catch((err) => {
    loading.style.color = "red";
    loading.textContent = err;
  });

customSelect.addEventListener("click", () => {
  customSelectList.classList.toggle("is-active");
  customSelectArrow.classList.toggle("is-rotate");
});

inner.addEventListener("input", (e) => {
  let answer = e.target.value * customSelect.dataset.valute;
  outer.value = Math.trunc(answer * 100) / 100;
});
