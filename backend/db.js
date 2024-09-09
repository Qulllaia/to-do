const Pool = require('pg').Pool

const pool = new Pool({
    user:"postgres",
    password:"qulllaia",
    host:"localhost",
    port:"5432",
    database:"to_do_list"

})

module.exports = pool