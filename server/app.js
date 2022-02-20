const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
