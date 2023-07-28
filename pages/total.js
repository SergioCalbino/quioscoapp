

import { useCallback, useEffect } from 'react'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import { formatearDinero } from '../helpers';

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()
    
    const comprobarPedido = useCallback(() => {
        if (pedido.length === 0 || !nombre || nombre.length < 3) {
            return true
        } else {
            return false
        }
    }, [pedido, nombre]);
    
    
    useEffect(() => {
      
    }, [pedido, comprobarPedido]);

    

  return (
    <Layout pagina='Total y Confirmar Pedido'>
        <h1 className='text-4xl font-black'> Total y Confirmar Pedido </h1>
        <p className='text-2xl my-10' > Confirma tu pedido a continuacion </p>

        <form
            onSubmit={colocarOrden}
        >
            <div>
                <label className='block uppercase text-slate-800 font-bold text-xl' htmlFor='nombre' >Nombre</label>
                    <input
                        id='nombre'
                        type='text'
                        className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        
                        />
            </div>

            <div className='mt-10'>
                <p className='text-2xl' >Total a Pagar: {''} <span className='font-bold'>{ formatearDinero(total)}</span> </p>
            </div>

            <div className='mt-5' >
                <input
                    className={`${
                                    comprobarPedido() ? 'bg-indigo-100 cursor-not-allowed' : 'bg-indigo-600'
                                } ${
                                    comprobarPedido() ? 'text-gray-600' : 'text-white'
                                } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-center `}
                    value='Confirmar Pedido'
                    type='submit'
                    disabled={comprobarPedido()}
                />
            </div>
        </form>
    </Layout>
  )
}
