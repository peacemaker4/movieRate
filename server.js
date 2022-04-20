const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));

app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.use("/contact", require("./routes/contact"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);