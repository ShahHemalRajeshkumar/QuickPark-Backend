const User = require("../models/UserModel");
const Reservation = require("../models/ReservationModel");
const Parking = require("../models/ParkingModel");


const getDashboardStats = async (req, res) => {
    try {
        
        const totalUsers = await User.countDocuments();

    
        const totalParking = await Parking.countDocuments();

        
        const totalBookings = await Reservation.countDocuments();

        res.status(200).json({
            message: "Dashboard stats fetched successfully",
            data: { totalUsers, totalParking, totalBookings }
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard stats",
            error: error.message
        });
    }
};


const getLatestBookings = async (req, res) => {
    try {
        const latestBookings = await Reservation.find()
            .sort({ createdAt: -1 }) 
            .limit(5); 

        res.status(200).json({
            message: "Latest bookings fetched successfully",
            data: latestBookings
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch latest bookings",
            error: error.message
        });
    }
};

const getMonthlyBookings = async (req, res) => {
    try {
      const bookings = await Reservation.aggregate([
        {
          $group: {
            _id: { $month: "$date" },  
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      const responseMonths = [];
      const responseCounts = [];
  
      bookings.forEach((entry) => {
        responseMonths.push(months[entry._id - 1]);
        responseCounts.push(entry.count);
      });
  
      res.status(200).json({
        months: responseMonths,
        counts: responseCounts,
      });
    } catch (error) {
      console.error("Error fetching monthly bookings", error);
      res.status(500).json({ message: "Failed to fetch monthly bookings" });
    }
  };
  
  

module.exports = { getDashboardStats, getLatestBookings,getMonthlyBookings };
