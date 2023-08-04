
// Forma antigua 
// const express = require('express');

// Nueva forma
import express from 'express'
import router from './router/index.js'
import db from './config/db.js'

// Deploy dotenv
import dotenv from 'dotenv';

dotenv.config()

console.log(process.env.DB_HOST);

const app =  express();

// Conectar la base de datos
db.authenticate()
  .then(()=> console.log("Base conectada"))
  .catch(err => console.log("Error: " + err));

// Defnnir puerto
const port = process.env.PORT || 4000;  

// Habilitar pug 
app.set('view engine', 'pug');

// Obtener el year actual
app.use((req, res, next)=>{
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';

  next();

})
// Agregar Body parser para leer los datos del formulario
app.use(express.urlencoded({ extended:true}));

// Definir la carpeta publica 
app.use(express.static('public'))

// usar el router
app.use('/',router)


app.listen(port,()=>{
  console.log(`Esta corriendo en el puerto`,port);
})

