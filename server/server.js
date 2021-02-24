const express = require('express');
const app = express();
const cors = require('cors');
const port =8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

require('./config/mongoose.config');

require('./routes/skiffs.route')(app);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});