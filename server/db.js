const Pool = require("pg").Pool;

const pool = new Pool({
    user: "idqprqdiimjuxi",
    password: "3f4a0adda50d8ef588931f0e49c7e2163242368fbf49e048c9e36f3df4d6f62d",
    host: "ec2-54-196-89-124.compute-1.amazonaws.com",
    port: 5432,
    database: "d51927giuf9dfq"
});

module.exports = pool;