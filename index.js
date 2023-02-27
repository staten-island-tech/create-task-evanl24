let objectArrayKey = 'https://rps101.pythonanywhere.com/api/v1/objects/all'

const choiceList = document.getElementById('choiceList');



async function fetchData (x) {
  const response = await fetch(x)
  console.log(response)
  const data = await response.data
  console.log(data)

}

fetchData(objectArrayKey);