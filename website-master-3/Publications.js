function parsePaper(paper){
  var request = new XMLHttpRequest()
  request.open('GET', 'http://api.semanticscholar.org/v1/paper/' + paper.paperId, false)
  request.onload = function(){
    const paperDetails = JSON.parse(this.response);
    if (paperDetails.venue != '') {
      deets = document.createElement('li');
      list = document.getElementById('citations');
      deets.innerHTML = makeCitation(paperDetails);
      list.appendChild(deets);
    }
  }
  request.send();
}

function formaliseName(fullName){
  let names = fullName.split(' ');
  return names[names.length-1] + ' ' + names[0].charAt(0) + '.';
}

function makeCitation(paperDetails){
  let citation = [];
  for (var id in paperDetails.authors) {
    if (Object.prototype.hasOwnProperty.call(paperDetails.authors, id)) {
        var author = paperDetails.authors[id];
        citation.push(formaliseName(author.name));
    }
  }
  citation.push(paperDetails.year);
  citation.push(paperDetails.title);
  citation.push(paperDetails.venue);
  citation.push("<a href='http://dx.doi.org/" + paperDetails.doi + "'>" + paperDetails.doi + '</a>');
  var output = citation.join(', ');
  return output;
}

var request = new XMLHttpRequest()
request.open('GET', 'https://api.semanticscholar.org/v1/author/48971422', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    let papers = [];
    for (var paper of data.papers){
      papers.push(paper);
    }
    papers.sort((a, b) => (a.year > b.year) ? 1 : (a.year === b.year) ? ((a.title > b.title) ? 1 : -1) : -1 );
    papers.reverse();
    for (paper of papers){
      console.log(paper.year)
      if (paper.year > 2007){
        parsePaper(paper);
      }
    }
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
