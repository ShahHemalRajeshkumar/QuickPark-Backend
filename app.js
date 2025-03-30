const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors())
app.use(express.json())


//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes) 

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const parkingRoutes = require("./src/routes/ParkingRoutes")
app.use("/parking",parkingRoutes)

const vehicleRoutes = require("./src/routes/VehicleRoutes")
app.use("/vehicle",vehicleRoutes)

const reservationRoutes = require("./src/routes/ReservationRoutes")
app.use("/reservation",reservationRoutes)

const contactRoutes = require("./src/routes/ContactRoutes")
app.use("/contact",contactRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})