import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [paso, setpaso] = useState(1);
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        //Esto lo hacemos para que al cargar la pagina, se resalte el primer elemento de las categorias. En este caso es el "Cafe"
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])
    

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
        
    }

    const handleSetProducto = (producto) => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    };

    const handleAgregarPedido = ({categoriaId, ...productoYCantidad}) => {

        //Chequeamos si el pedido existe. Si existe se agrega la cantidad y no se duplica
        if (pedido.some(productoState => productoState.id === productoYCantidad.id)) {
            //Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === productoYCantidad.id ? productoYCantidad : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, productoYCantidad])
            toast.success('Agregado al Pedido')
            
        }

        setModal(false)

        
    }

    const handleChangePaso = (paso) => {
        setpaso(paso)
    };

    const handleEditarCantidades = (id) => {
       const productoActualizar = pedido.filter( producto => producto.id === id)
       setProducto(productoActualizar[0])
        setModal(!modal)
    };

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
         
    };

    const colocarOrden = async (e) => {
        e.preventDefault()
        try {
           await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })

           //Resetear la App
           setCategoriaActual(categorias[0])
           setPedido([])
           setNombre('')
           setTotal(0)

           toast.success('Pedido realizado correctamente')

           setTimeout(() => {
                router.push('/')
            
           }, 3000);

        } catch (error) {
            console.log(error)
            
        }
    }
    

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleChangePaso,
                paso,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            { children }
        </QuioscoContext.Provider>

    )

}

export {
    QuioscoProvider
}

export default QuioscoContext