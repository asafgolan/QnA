const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const questionRoutes = require("./routes/question");

// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator({
  customValidators: {
     isArray: function(value) {
        return Array.isArray(value);
     },
     minimum2options: function(array) {
        return array.length > 1;
     },
     triviaVerifyOneCorrectOption: function(array) {
       let onlyOne = true;
       let counter = 0;
       array.forEach((option, i) => {
          if(option.isCorrect == true){
            counter++;
          }
       });
      if(counter == 1){
        onlyOne = true;
      }else{
        onlyOne = false;
      }
      return onlyOne;
     },
     gte: function(param, num) {
        return param >= num;
     }
  }
}));

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", questionRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
