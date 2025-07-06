const express = require("express");
const cors = require("cors");
const { getRequests, sendRequest, acceptRequest } = require("./services/serviceRequest");
const { driverLogin, driverRegister } = require("./services/driverServices");
const { riderLogin, riderRegister } = require("./services/riderServices");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("Home");

});

app.get("/requests", getRequests);
app.post("/travel/request", sendRequest);
app.put("/requests/:id/accept", acceptRequest);

app.post("/rider/login", riderLogin);
app.post("/rider/register", riderRegister);

app.post("/driver/login", driverLogin);
app.post("/driver/register", driverRegister);

app.listen(5000, () => {
    console.log("Server Connected");
});

