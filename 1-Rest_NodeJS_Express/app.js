/* 
    * Web service Rest amb NodeJS i Express
    * Projecte amb Rest, NodeJS i Express per la recreació del joc "pedra, paper i tisora"
    * @authors 15585039.clot@fje.edu (Samuel Rebollo) | 15585072.clot@fje.edu (Xavier Aranda) 
    * @version 1.0 03.10.22
*/

const express = require('express'); // 'const': Quiere decir que no se puede cambiar el contenido de la variable.
const app=express();

app.use(express.urlencoded({extended: true})); // Quiere decir que queremos trabajar con URLs completas.
app.use(express.json()) // // Para analizar las peticiones HTTP que lleven JSON en el body o cuerpo (le indicamos que queremos trabajar con JSONs).
