function fetchData() {
  fetch('http://192.168.49.2:30001/insertData')
    .then(response => response.json())
    .then(data => console.log('Data received:', data))
    .catch(error => console.error('Error fetching data:', error));
}

setInterval(fetchData, 300);