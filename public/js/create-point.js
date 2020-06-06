(function populateUf() {
	const ufSelect = document.querySelector("[name=uf]");

	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
		.then((res) => res.json())
		.then((states) => {
			for (let state of states) {
				ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`;
			}
		});
})();

function getCities(event) {
	const citiySelect = document.querySelector("[name=city]");
	const stateInput = document.querySelector("[name=state]");

	const indexOfSelectedState = event.target.selectedIndex;
	stateInput.value = event.target.options[indexOfSelectedState].text;

	citiySelect.innerHTML = "<option value>Selecione a Cidade</option>";
	citiySelect.disabled = true;

	fetch(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`,
	)
		.then((res) => res.json())
		.then((cities) => {
			for (let city of cities) {
				citiySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`;
			}
			citiySelect.disabled = false;
		});
}

document.querySelector("[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect) {
	item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];
const colectedItems = document.querySelector("[name=items]");

function handleSelectedItem(event) {
	const itemLi = event.target;
	const itemId = event.target.dataset.id;

	itemLi.classList.toggle("selected");

	const alreadySelected = selectedItems.findIndex((item) => item === itemId);

	if (alreadySelected >= 0) {
		const filteredItems = selectedItems.filter((item) => item != itemId);
		selectedItems = filteredItems;
	} else {
		selectedItems.push(itemId);
	}

	colectedItems.value = selectedItems;
}
