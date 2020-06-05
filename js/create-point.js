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

	fetch(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`,
	)
		.then((res) => res.json())
		.then((cities) => {
			for (let city of cities) {
				citiySelect.innerHTML += `<option value=${city.id}>${city.nome}</option>`;
			}
			citiySelect.disabled = false;
		});
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
