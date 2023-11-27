const { Sequelize } = require('sequelize')
const sequelize=require('../path/database')
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
       type:Sequelize.STRING,
       allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        isEmail:true,
        unique:true,
        allowNull:false

    },
    contact:{
        type:Sequelize.STRING,
        allowNull:false,
        isNumeric: true,  
    },
    date:{
        type:Sequelize.STRING,
    },
    time:{
        type:Sequelize.STRING,
    }

})

module.exports=User