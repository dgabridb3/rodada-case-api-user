import app from "./app";
import connection from "./connection"
import {Request, Response} from "express"
import { idText } from "typescript";

app.get("/teste", (req: Request, res: Response)=>{

     res.status(200).send("ok")
})

app.get("/users", async (req: Request, res: Response)=>{

    let erroCode = 500
    
  try {
   
    const result = await connection("funcionarios")
    .select("*")
    
    if(!result){
      erroCode = 400
      throw new Error("nenhum nome encontrado")
    }

    res.status(200).send(result)

  } catch (Error) {
    res.status(erroCode).send(Error.message)
  }
})
app.post("/user", async (req: Request, res: Response)=>{

    const {nome, sobreNome, participacao} = req.body
    let erroCode = 500
    try {
      
     await connection("funcionarios")
      .insert({
          nome,
          sobreNome,
          participacao
      })

      if(!nome || !sobreNome || !participacao){
        erroCode = 400
        throw new Error("algum dado faltando")
      }
     
      res.status(201).send("usuario criado")
  
    } catch (error) {
      res.status(erroCode).send(error.message)
    }
  })
 
app.delete("/user/:id", async (req: Request, res: Response)=>{
    let erroCode = 500

    try {
        const id =  req.params.id
        await connection("funcionarios")
        .delete()
        .where({id})

         if(!id) throw new Error("o id não foi passado")

        res.status(201).send("Usuario apagado")
    } catch (error) {
        res.status(erroCode).send(error.message)
    }
})

  