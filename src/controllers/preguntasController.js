import { Router } from 'express';
import { PreguntasService } from '../services/preguntasService.js';

const router = Router();
const preguntasService = new PreguntasService();

router.get('', async (req, res) => {
  console.log(`This is a get operation`);
  
  const {palabraClave, peso} = req.query;
  const preguntas = await preguntasService.getPreguntas(palabraClave, peso);

  return res.status(200).json(preguntas);
}); 

router.get('/azar', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const preguntas = await preguntasService.getRandomPreguntas(req.params.id);

  return res.status(200).json(preguntas);
});

router.post('', async (req, res) => {
  console.log(`This is a post operation`);
  console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
  
  let respuestaCorrecta = req.body.respuestaCorrecta;
  if((respuestaCorrecta>4 || respuestaCorrecta<1)){
    return res.status(400).json("Solo hay 4 preguntas, por lo tanto la respuesta correcta tiene que ser de 1 a 4");
  }else{
    const preguntas = await preguntasService.createPreguntas(req.body);
    return res.status(200).json(preguntas);
  }
});

router.put('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  let respuestaCorrecta = req.body.respuestaCorrecta;
  if((respuestaCorrecta>4 || respuestaCorrecta<1)){
    return res.status(400).json("Solo hay 4 preguntas, por lo tanto la respuesta correcta tiene que ser de 1 a 4");
  }else{
    const preguntas = await preguntasService.updatePreguntasById(req.params.id, req.body);
    return res.status(200).json(preguntas);
  }
});

router.delete('/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const preguntas = await preguntasService.deletePreguntasById(req.params.id);

  return res.status(200).json(preguntas);
});

export default router;