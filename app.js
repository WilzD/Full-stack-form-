const express = require('express')
const app = express() //our app
const bodyParser = require('body-parser')

const sequelizeDB = require('./path/database')

const User = require('./models/User')

var cors = require('cors')

app.use(cors())

// API middleware
app.use(bodyParser.json({ extended: false }));
//to accept data in JSON formate
// app.use(express.urlencoded()) // to decode our html form data
// app.use(express.static('public'))// this is to serve our public folder as a static folder

//API routes
app.get('/form', async (req, res) => {
  try {
    const Users = await User.findAll()
    res.json(Users)
  }
  catch (err) {
    console.log(err)
  }
})

app.post('/formPost', async (req, res) => {
  //  console.log(req.body)
  const name = req.body.name
  const email = req.body.email
  const contact = req.body.contact
  const date = req.body.date
  const time = req.body.time
  const data = await User.create({ name: name, email: email, contact: contact, date: date, time: time })
  return res.status(201).json({ data: data })
})

app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id
  await User.destroy({ where: { id: userId } })
  res.sendStatus(200)
})

app.get('/formEdit/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  return res.json(user)
})

app.put('/formUpdate/:id', async (req, res) => {
  //taking id so that we can update the values at there
  const userId = req.params.id
  console.log(userId)
  //these are gonna be the updated values

  const updatedName = req.body.name
  const updatedEmail = req.body.email
  const updatedContact = req.body.contact
  const updatedDate = req.body.date
  const updatedTime = req.body.time

  // console.log(updatedName,updatedEmail,updatedContact,
  //   updatedDate,
  //   updatedTime)
  const user = await User.findByPk(userId)
  user.name = updatedName
  user.email = updatedEmail
  user.contact = updatedContact
  user.date = updatedDate
  user.time = updatedTime
  user.save()
  return res.sendStatus(200)
})

sequelizeDB.sync().then(() => {
  app.listen(3000)
}).catch(err => console.log(err))

