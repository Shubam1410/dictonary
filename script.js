const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        searchDictionary(searchTerm);
    }
});

function searchDictionary(word) {
    resultContainer.innerHTML = 'Loading...';

    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayDefinition(data);
        })
        .catch(error => {
            resultContainer.innerHTML = 'An error occurred. Please try again later.';
        });
}

function displayDefinition(data) {
    resultContainer.innerHTML = '';

    data.forEach(entry => {
        const definition = entry.meanings[0].definitions[0].definition;
        const example = entry.meanings[0].definitions[0].example || '';

        const definitionElement = document.createElement('div');
        definitionElement.classList.add('definition');
        definitionElement.innerHTML = `
      <h2>${entry.word}</h2>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
    `;

        resultContainer.appendChild(definitionElement);
    });
}

