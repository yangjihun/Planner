fetch('test.txt')
  .then(response => response.text())
  .then(data => {
    let rows = data.split('\n');
    for(let i = 0; i < rows.length; i++) {
      let columns = rows[i].split('\t');
      let loc;
      loc = columns[6];
      
    }
  })