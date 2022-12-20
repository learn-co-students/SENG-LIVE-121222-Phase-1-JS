const resultsDiv = document.querySelector('#results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.querySelector('#api-Search');
  
  apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);
    // fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    //   .then(response => response.json())
    //   .then(results => {
    //     resultsDiv.innerHTML = "";
    //     results.forEach(result => {
    //       const div = document.createElement('div');
    //       const h3 = document.createElement('h3');
    //       h3.textContent = result.show.name;

    //       const img = document.createElement('img');
    //       img.src = result.show.image.medium;

    //       const summary = document.createElement('div');
    //       summary.innerHTML = result.show.summary;

    //       div.append(h3, img, summary);

    //       resultsDiv.append(div);
      
    //     })
    //     // result = results[0];
    //     // result.show.name;
    //     // result.show.summary
    //     // result.show.image.medium
    //   })

    // using singlesearch endpoint
    // fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`)
    //   .then(response => response.json())
    //   .then(show => {
    //     resultsDiv.innerHTML = "";
        
    //     const div = document.createElement('div');
    //     const h3 = document.createElement('h3');
    //     h3.textContent = show.name;

    //     const img = document.createElement('img');
    //     img.src = show.image.medium;

    //     const summary = document.createElement('div');
    //     summary.innerHTML = show.summary;

    //     div.append(h3, img, summary);

    //     resultsDiv.append(div);
      
    //     // episode = show._embedded.episodes[0]

    //     show._embedded.episodes.forEach(episode => {
    //       const div = document.createElement('div');

    //       const h3 = document.createElement('h3');
    //       h3.textContent = `S${episode.season} E${episode.number}. ${episode.name}`;

    //       const img = document.createElement('img');
    //       img.src = episode.image.medium;

    //       const summary = document.createElement('div');
    //       summary.innerHTML = episode.summary;

    //       div.append(h3, img, summary)

    //       resultsDiv.append(div);
    //     })
    //     // debugger
    //   })

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        // debugger
        resultsDiv.innerHTML = "";
    
        data.items.forEach(item => {
          const div = document.createElement('div');
          const h3 = document.createElement('h3');
          h3.textContent = item.volumeInfo.title; // book's title
          div.append(h3);

          if (item.volumeInfo.imageLinks) {
            const img = document.createElement('img');
            img.src = item.volumeInfo.imageLinks.thumbnail; // book's cover image
            div.append(img);
          } else {
            const noImageDiv = document.createElement('div');
            noImageDiv.textContent = "No image available";
            div.append(noImageDiv);
          }
  
  
          if (item.volumeInfo.authors) {
            const authorDiv = document.createElement('div');
            authorDiv.textContent = `by ${item.volumeInfo.authors.join(", ")}`; // book's author
            div.append(authorDiv);
          }
  
          if (item.volumeInfo.description) {
            const summary = document.createElement('div');
            summary.textContent = item.volumeInfo.description; // book's summary
            div.append(summary);
          } else {
            const noDescription = document.createElement('div');
            noDescription.textContent = "No description available";
            div.append(noDescription);
          }
  
  
          resultsDiv.append(div);
        })
      
        
        // iterate over data.items and for each item I want:

        // title of the book
        
        // image of the book cover

        // author of the book

        // description of the book
      })
  })
})

