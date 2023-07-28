
import React from 'react'
import AdminLayout from '../layout/adminLayout'
import useSWR from 'swr';
import axios from 'axios';
import Orden from '../components/Orden';

export default function Admin() {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    //useSWR es una libreria que permite hacer peticiones a la API
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 1000})
    // console.log(data)
    // console.log(error)

  return (
    <AdminLayout
        pagina={'Admin'}
    >
         <h3 className="text-4xl font-black">Panel de Administracion</h3>
         <p className="text-2xl my-10">Administra las ordenes</p>
        { data && data.length ? data.map(orden => (
            <Orden
                key={orden.id}
                orden={orden}
            />
        )) : <p>No hay Ordenes pendientes</p>}
    </AdminLayout>
  )
}
