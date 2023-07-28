import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

    const prisma = new PrismaClient();
    const { nombre, pedido, total, fecha } = req.body

   // Obtener ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    res.status(200).json(ordenes)



    //Crear Ordenes

    if (req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre,
                pedido,
                total,
                fecha
            }
        })
        return res.status(200).json(orden)
    }
}