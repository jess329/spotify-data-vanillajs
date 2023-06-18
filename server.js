const express = require('express');
const app = express();
const port = 3500; // Change the port number if needed

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});