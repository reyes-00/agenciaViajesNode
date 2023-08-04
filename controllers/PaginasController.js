import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimonial.js';

const paginaInicio = async (req, res) => {
  const promiseDB = [];

  promiseDB.push(Viaje.findAll({limit: 3}));
  promiseDB.push(Testimonial.findAll({limit: 3}));

  try {
    const resultado = await Promise.all(promiseDB)
    res.render('inicio',{
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales : resultado[1]
    });

  }catch(err){
    console.log(err);
  }

}

const paginaViajes = async (req, res) => {

  // Consultar db
  const viajes = await Viaje.findAll();


  res.render('viajes',{
    pagina: 'Proximos Viajes',
    viajes,
  })
}
const paginaDetalleViaje = async (req, res) =>{
  const {slug} = req.params;

  try{
    const respuesta = await Viaje.findOne({ where : {slug}});
    
    res.render('viaje',{
      pagina: 'Informacion del viaje',
      respuesta
    })

  }catch(err){
    console.log(err);
  }

}

const paginaTestimoniales = async (req, res) => {
  try{
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales',{
      pagina: 'Testimoniales',
      testimoniales
    })
  }catch(err){
    console.log(err);
  }

}

const paginaNosotros = (req, res) => {
  res.render('nosotros',{
    pagina: 'Nosotros'
  })
}

export {
  paginaInicio,
  paginaViajes,
  paginaTestimoniales,
  paginaNosotros,
  paginaDetalleViaje
}