import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const preguntasTabla = process.env.DB_TABLA_PREGUNTAS;

export class PreguntasService {

   getPreguntas = async (palabraClave, peso) => {
       
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        let response = await pool.request()
        .input('Peso',sql.Int, peso)
        .input('PalabraClave',sql.VarChar, palabraClave)
        .query(`SELECT * FROM ${preguntasTabla}`);

        if(palabraClave != null){
            response = await pool.request()
            .input('PalabraClave',sql.VarChar, palabraClave)
            .query(`SELECT * FROM ${preguntasTabla} WHERE PalabraClave = @PalabraClave`);
        }
        
        if(peso != null){
            if(palabraClave != null){
                response = await pool.request()
                .input('PalabraClave',sql.VarChar, palabraClave)
                .input('Peso',sql.Int, peso)
                .query(`SELECT * FROM ${preguntasTabla} WHERE PalabraClave = @PalabraClave and Peso = @Peso`);
            } else {
                response = await pool.request()
                .input('Peso',sql.Int, peso)
                .query(`SELECT * FROM ${preguntasTabla} WHERE Peso = @Peso`);
            }
        }
        console.log(response)
        return response.recordset;
    }

    getRandomPreguntas = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * FROM ${preguntasTabla} ORDER BY NewId()`);
        console.log(response)

        return response.recordset[0];
    }

    createPreguntas = async (preguntas) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, preguntas?.id ?? 0)    
            .input('Pregunta',sql.VarChar, preguntas?.pregunta ?? '')
            .input('Respuesta01',sql.VarChar, preguntas?.respuesta01 ?? '')
            .input('Respuesta02',sql.VarChar, preguntas?.respuesta02 ?? '')
            .input('Respuesta03',sql.VarChar, preguntas?.respuesta03 ?? '')
            .input('Respuesta04',sql.VarChar, preguntas?.respuesta04 ?? '')
            .input('RespuestaCorrecta',sql.Int, preguntas?.respuestaCorrecta ?? 0)
            .input('Peso',sql.Int, preguntas?.peso ?? 0)
            .input('PalabraClave',sql.VarChar, preguntas?.palabraClave ?? '')
            .input('FechaCreacion',sql.DateTime, preguntas?.fechaCreacion ?? new Date())
            .query(`INSERT INTO ${preguntasTabla} (Pregunta, Respuesta01, Respuesta02, Respuesta03, Respuesta04, RespuestaCorrecta, Peso, PalabraClave, FechaCreacion) VALUES (@Pregunta, @Respuesta01, @Respuesta02, @Respuesta03, @Respuesta04, @RespuestaCorrecta, @Peso, @PalabraClave, @FechaCreacion)`);
        console.log(response)

        return response.recordset;
    }

    updatePreguntasById = async (id, preguntas) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id',sql.Int, id ?? 0)    
            .input('Pregunta',sql.VarChar, preguntas?.pregunta ?? '')
            .input('Respuesta01',sql.VarChar, preguntas?.respuesta01 ?? '')
            .input('Respuesta02',sql.VarChar, preguntas?.respuesta01 ?? '')
            .input('Respuesta03',sql.VarChar, preguntas?.respuesta01 ?? '')
            .input('Respuesta04',sql.VarChar, preguntas?.respuesta01 ?? '')
            .input('RespuestaCorrecta',sql.Int, preguntas?.respuestaCorrecta ?? 0)
            .input('Peso',sql.Int, preguntas?.peso ?? 0)
            .input('PalabraClave',sql.VarChar, preguntas?.palabraClave ?? '')
            .input('FechaCreacion',sql.DateTime, preguntas?.fechaCreacion ?? new Date())
            .query(`UPDATE ${preguntasTabla} SET Pregunta = @Pregunta, Respuesta01 = @Respuesta01, Respuesta02 = @Respuesta02, Respuesta03 = @Respuesta03, Respuesta04 = @Respuesta04, Peso = @Peso, PalabraClave = @PalabraClave, FechaCreacion = @FechaCreacion WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePreguntasById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${preguntasTabla} WHERE Id = @Id`);
        console.log(response)

        return response.recordset;
    }    
}