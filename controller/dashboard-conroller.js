const fs =require("fs");
const path= require("path");
const {Reservation} = require ("../models/models");

const Dashboard_manager =async function(req, res, next) {
    let month
    if (!req.query.months) {
        const date = new Date();
        let currentMonth = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        month = monthNames[currentMonth];

    }
    else{
        month = req.query.months
    }
    let monthsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/months.json'), 'utf8'));

    const monthData = monthsData[month];
    let analytics_per_day = [];
    let month_num;
    switch (month) {
        case "January":
            month_num = '01';
            break;
        case "February":
            month_num = '02';
            break;
        case "March":
            month_num = '03';
            break;
        case "April":
            month_num = '04';
            break;
        case "May":
            month_num = '05';
            break;
        case "June":
            month_num = '06';
            break;
        case "July":
            month_num = '07';
            break;
        case "August":
            month_num = '08';
            break;
        case "September":
            month_num = '09';
            break;
        case "October":
            month_num = '10';
            break;
        case "November":
            month_num = '11';
            break;
        case "December":
            month_num = '12';
            break;
    }
    try {
        const Analytics = await Reservation.getReservationAnalytics(month_num);
        analytics_per_day = Analytics.map(item => ({
            reservation_date: item.reservation_date,
            total_reservations: item.total_reservations,
            deleted_reservations: item.deleted_reservations,
            active_reservations: item.active_reservations,
            total_guests_active: item.total_guests_active
        }));
    } catch (error) {
        console.error("Error fetching analytics:", error);
        analytics_per_day = []; // Σε περίπτωση σφάλματος, κρατάμε τον κενό πίνακα
    }

    res.render('dashboard', {
        period: month,
        first_day: monthData.first_day,
        total_days: monthData.total_days,
        analytics_per_day: analytics_per_day // Περνάμε τον πίνακα στο template
    });
}
module.exports = {
    Dashboard_manager
};