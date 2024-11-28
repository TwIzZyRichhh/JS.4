document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const query = document.getElementById('query').value;
  const apiUrl = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';

      data.forEach(item => {
        const show = item.show;
        const showElement = document.createElement('div');
        showElement.innerHTML = `
          <h2>${show.name}</h2>
          <p>${show.summary || 'No summary available.'}</p>
          <a href="${show.url}" target="_blank">More Info</a>
          <hr>
        `;
        resultsDiv.appendChild(showElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
