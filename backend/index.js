const express = require("express");
const route  = require("./routes/route");
const app = express();

app.use(express.json())

app.use('/api', route)

app.listen(3000, () => {
    console.log('server is running on port 3000')
});

