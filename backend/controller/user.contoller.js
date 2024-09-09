const db = require('../db')

class UserController{
    async createUser(req,res){
        const {name, password} = req.body
        const newPerson = await db.query("INSERT INTO person (name, password) VALUES ($1, $2) RETURNING *",[name,password])

        res.json(newPerson.rows[0])
    }
    async getUsers(req,res){
        const users = await db.query("SELECT * FROM person")
        res.json(users.rows)
        
    }
    async getUser(req,res){
        const id = req.params.id
        const user = await db.query("SELECT * FROM person WHERE id = $1",[id])
        res.json(user.rows)
    }
    async updateUser(req,res){
        const {id,name,password} = req.body
        const user = await db.query("UPDATE person SET name = $1, password = $2 where id = $3 RETURNING *", [name,password,id])
        res.json(user.rows[0])
    }
    async deleteUser(req,res){
        const id = req.params.id
        const user = await db.query("DELETE FROM person WHERE id = $1",[id])
        res.json(user.rows)
    }
}

module.exports = new UserController()