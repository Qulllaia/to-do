const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{
    async registrateUser(req,res){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const {name, _password, email} = req.body;
        try{
            const newPerson = await db.query("INSERT INTO person (name, password,email) VALUES ($1, $2,$3) RETURNING *",[name,hashedPassword,email])
            const {password, ...data} = await newPerson.rows[0]
            res.json(data)
        }
        catch{
            return res.status(400).send({
                message:"Invalid credentials"
            })
        }       
    }
    async loginUser(req,res){
        const email = req.body.email
        const user = await db.query("SELECT * FROM person WHERE email = $1",[email])
        if(!user.rows[0].password){
            return res.status(404).send({
                message:"User not found"
            })
        }

        if(!await bcrypt.compare(req.body.password, user.rows[0].password)){
            return res.status(400).send({
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({_id:user.rows[0].id},"secret")
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge: 60*60*100
        })

        res.json({message:'success'})
    }
    async getUser(req,res){
        try{

            const cookie = req.cookies.jwt
            const claims = jwt.verify(cookie,'secret')
            
            if(!claims){
                return res.status(401).send({
                    message:"Unauthenticated"
                })
            }
            
            const user = await db.query("SELECT * FROM person WHERE id = $1",[claims._id])
            const {password, ...data} = user.rows[0]
            
            res.json(data)
        }catch(e){
            return res.status(401).send({
                message:"Unauthenticated"
            })
        }
    }
    async logoutUser(req,res){
        res.cookie('jwt','',{maxAge:0})
        res.json({
            message:"success"
        })
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