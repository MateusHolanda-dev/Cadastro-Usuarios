import express from "express"
import cors from "cors"
import pkg from "@prisma/client"

const { PrismaClient } = pkg


const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API está rodando 🚀")
})

// Criar usuário
app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: req.body
  })
  res.json(user)
})

// Listar usuários
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.listen(3000, () => {
  console.log("🚀 API rodando em http://localhost:3000")
})

// Deletar usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  await prisma.user.delete({
    where: {
      id: Number(id)
    }
  })

  res.status(204).send()
})

