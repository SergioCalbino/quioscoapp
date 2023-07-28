import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
	const prisma = new PrismaClient()
	
	const categorias = await prisma.categoria.findMany({
		//Con el include traes todos los productos asociados a la categoria. Eso se define en el modelo de prisma
		include: {
			productos: true
		}
	})


  	return res.status(200).json(categorias)
}
