console.log("hello");

const options = { method: 'GET' };

fetch('http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));