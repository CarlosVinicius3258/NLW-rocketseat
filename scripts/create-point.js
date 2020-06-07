function populateUFs() {
  const ufSelect = document.querySelector("select[name = uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (let state of states) {
        ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`;
      }
    });
}

function getCities() {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name = state]");
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  citySelect.innerHTML = `<option value>Selecione a cidade</option>`;
  citySelect.disabled = true;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

populateUFs();

document
  .querySelector("select[name = uf]")
  .addEventListener("change", getCities);
