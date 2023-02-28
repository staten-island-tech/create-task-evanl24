let key1 = 'https://rps101.pythonanywhere.com/api/v1/objects/all'

const choiceList = document.getElementById('choiceList');



async function fetchData (key) {
  const response = await fetch(key)
  const data = await response.json();
  console.log(data)

  data.forEach(element => {
    let newElement = document.createElement('option');
    newElement.setAttribute('value', `${element}`)
    let newElementText = document.createTextNode(`${element}`)

    newElement.appendChild(newElementText)
    choiceList.appendChild(newElement)
  });
}

fetchData(key1);

const randomNum = function () {
  return Math.floor(Math.random() * 100);
}

