const express = require('express');
const app = express();

app.get('/', (req, res) => {
      res.send('Application Base Route Returned')
})

app.listen(8080, () => {
      console.log('server listening on port 8080')
})
