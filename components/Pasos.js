import { useRouter } from "next/router"
import useQuiosco from "../hooks/useQuiosco";



const pasos = [
    {paso: 1, nombre: 'Menu', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'}
]

const Pasos = () => {

    const router = useRouter();
    const { handleChangePaso } = useQuiosco()
    //Hcemos la barra para el progreso de la barra

    const calcularProgreso = () => {
        let valor
        if (router.pathname === '/') {
            valor = 2
        } else if (router.pathname === '/resumen') {
            valor = 50
        } else {
            valor = 100
        }

        return valor
        // const porcentaje = (paso / 3) * 100

        // return porcentaje;
    }

  return (
    <>
        <div className="flex justify-between mb-5" >
            { pasos.map(paso => (
                <>
                    <button 
                        className="text-2xl font-bold"
                        onClick={() => {
                            router.push(paso.url)
                            // handleChangePaso(paso.paso)
                        }}
                        key={paso.paso}>
                        {paso.nombre}
                    </button>
                </>
            ))}
        </div>

        <div className="bg-gray-100 mb-10" >
            <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10" style={{width: `${calcularProgreso()}%`}} > </div>
        </div>
    </>
  )
}

export default Pasos