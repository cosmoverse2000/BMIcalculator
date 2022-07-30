const Express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const App = Express();
App.use(Express.static(__dirname + '/'));
App.use(bodyParser.urlencoded({ extend: true }));
App.set('view engine', 'ejs');



App.get("/", function (req, res) {
    res.render("bmiCalculator", { bmi: 23, pi: 0, hwhi: 0, hwhf: 0, bmit: "Normal", angle: 60 });
})

App.post("/", function (req, res) {

    // res.send("Your BMI is " + (Number(req.body.weight) / ((Number(req.body.height) / 100) * (Number(req.body.height) / 100))));


    const bmi = ((Number(req.body.weight) / ((Number(req.body.height) / 100) * (Number(req.body.height) / 100))));
    const pi = bmi / (Number(req.body.height) / 100);
    const hwhi = 18.5 * ((Number(req.body.height) / 100) * (Number(req.body.height) / 100));
    const hwhf = 25 * ((Number(req.body.height) / 100) * (Number(req.body.height) / 100));
    let bmit = "";
    if (bmi < 18.5) {
        bmit = "Underweight";
    }
    else if (18.5 < bmi && bmi < 25) {
        bmit = "Normal";
    }
    else if (25 < bmi && bmi < 30) {
        bmit = "Overweight";
    } else {
        bmit = "Obesity ";
    }

    const angle = (25 / 90) * 180;

    res.render("bmiCalculator", { bmi: bmi.toFixed(1), pi: pi.toFixed(1), hwhi: hwhi.toFixed(1), hwhf: hwhf.toFixed(1), bmit: bmit, angle: angle });
})
App.listen(process.env.PORT || 3000, () => {
    console.log("Server Started");
});