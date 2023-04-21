const express = require("express");
const app = express();

const restServices = require("./rest-services");

app.use(express.json()) ; 
app.use(express.urlencoded({ extended: true }));

app.use("/", restServices);
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
