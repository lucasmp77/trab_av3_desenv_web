import express, { Request, Response } from 'express';
import { Pool } from "pg";
import path from 'path';
import dotenv from "dotenv";
import bodyParser  from "body-parser"

const api = express();
api.use(express.json());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.error(err);
    }
};
connectToDB();

api.get('/users',(req:Request, res:Response)=>{
    pool.query('select * from public.users ORDER BY nome ASC', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

api.post('/autenticacao',(req:Request, res:Response)=>{
    
    const {email, senha} = req.body;
    pool.query("select * from public.users WHERE email = $1 AND senha = $2", [email, senha], (error, results) => {    
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)  
    })

})

api.get('/users/:id',(req:Request, res:Response)=>{
    pool.query('select * from public.users WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

api.post('/users',(req:Request, res:Response)=>{
    pool.query('INSERT INTO public.users (nome, email, senha) VALUES ($1, $2, $3)', [req.body.nome,req.body.email,req.body.senha], (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send('sucesso')
    })
})

api.put('/users/:id',(req:Request, res:Response)=>{
    pool.query('UPDATE public.users SET nome = $1, email = $2, senha = $3 WHERE id = $4', [req.body.nome,req.body.email,req.body.senha,req.params.id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
})

api.delete('/users/:id',(req:Request, res:Response)=>{
    pool.query('DELETE FROM public.users WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send("sucesso")
    })
})

api.use(express.static('./public'))
    .get('/', (req:Request, res:Response) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

api.listen(3000, () => console.log('Start App'));
