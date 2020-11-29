const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Routes

//Create quote
app.post("/quotes", async(req, res) => {
    try {
        const { departureId, destinationId, departureDate, returnDate, noOfTravelers, transportationId, fname, lname, phone, email, price, status } = req.body;
        const newQuote = await pool.query("INSERT INTO quote (departureId, destinationId, departureDate, returnDate, noOfTravelers, transportationId, fname, lname, phone, email, price, status)" + 
        " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
         [departureId, destinationId, departureDate, returnDate, noOfTravelers, transportationId, fname, lname, phone, email, price, status]
         );

         res.json(newQuote.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

//Get all quotes
app.get("/quotes", async (req, res) => {
    try {
        const allQuotes = await pool.query(
            "SELECT q.id, departureId, destinationId, departureDate, returnDate, dept.city as departurecity, dest.city as destinationcity, " + 
            "price, status, noOfTravelers, transportationId, fname, lname, phone, email FROM quote as q " +
            "left join airport as dept on dept.id = q.departureId "+
            "left join airport as dest on dest.id = q.destinationId "+
            "left join transportation as t on t.id = q.transportationId ORDER BY q.id DESC");
        res.json(allQuotes.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//Get quote
app.get("/quotes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const quote = await pool.query("SELECT * FROM quote WHERE id = $1", [id]);
        res.json(quote.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Update quote
app.put("/quotes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const { departureId, destinationId, departureDate, returnDate, noOfTravelers, transportationId, fname, lname, phone, email, price, status } = req.body;
        const updatedQuote = await pool.query("UPDATE quote SET departureId = $1, destinationId = $2, departureDate = $3, returnDate = $4, noOfTravelers = $5, " +
        "transportationId = $6, fname = $7, lname = $8, phone = $9, email = $10, price = $11, status = $12 WHERE id = $13 RETURNING *", 
            [departureId, destinationId, departureDate, returnDate, noOfTravelers, transportationId, fname, lname, phone, email, price, status, id]
        );
        res.json(updatedQuote.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Update quote status
app.put("/quotes/status/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const { status } = req.body;
        const updatedQuote = await pool.query("UPDATE quote SET status = $1 WHERE id = $2 RETURNING *", 
            [status, id]
        );
        res.json(updatedQuote.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//Delete quote
app.delete("/quotes/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedQuote = await pool.query("DELETE FROM quote WHERE id = $1 RETURNING *", [id]);
        res.json(deletedQuote.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});


//Get all airports
app.get("/airports", async (req, res) => {
    try {
        const allAirports = await pool.query("SELECT * FROM airport ORDER BY code");
        res.json(allAirports.rows);
    } catch (error) {
        console.log(error.message);
    }
});


//Get all transportations
app.get("/transportations", async (req, res) => {
    try {
        const allTransportations = await pool.query("SELECT * FROM transportation ORDER BY name");
        res.json(allTransportations.rows);
    } catch (error) {
        console.log(error.message);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server started at port: " + port);
})