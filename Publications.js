$("button").click(function (){
  $.get('http://api.semanticscholar.org/v1/author/1741101'), function(response,status){
  const publications = json.parse(response);
  console.log(publications);
  const body = document.body;
  let papers = publications.papers.values();
  let outList = document.create('ul');
  var listItem;
  papers.sort(function(a,v){return a.year-b.year});
  for (paper of papers){
    if (paper.year > 2013){
      listItem = document.create('li')
      listItem.innerHTML = parsePaper(paper);
      outList.appendChild(listItem);
    }
  }
  body.appendChild(outList);
}
})

function parsePaper(paper){
  $.get('http://api.semanticscholar.org/v1/paper/' + paper.paperId), function(response,status){
  const paperDetails = json.parse(response);
  console.log(paperDetails);
  const authorList = paperDetails.authors.values();
  return '';
}
}

function formaliseName(fullName){
  let names = fullName.split(' ');
  return names[names.length-1] + ' ' + names[0].charAt(0) + '.';
}
