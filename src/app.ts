import express from "express";
import cors from "cors";
import dotenv from "dotenv";



const app = express();

app.use(express.json());
app.use(cors());

const {PORT = 3003} = process.env

app.listen(PORT , () => {
 
  console.log(`serve na port ${PORT}`)

});

export default app