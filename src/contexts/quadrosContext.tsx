import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { InterfaceEditarQuadros, InterfaceQuadros, interfaceQuadroContext, PropsQuadrosInput, PropsQuadrosProvider } from "./quadro.type";
import { Loading } from "../components/Loading";


export const QuadrosContext = createContext({} as interfaceQuadroContext);
export function QuadrosProvider(props: PropsQuadrosProvider) {

    const [removeLoading, setRemoveLoading] = useState(false);
    const [quadros, setQuadros] = useState<Array<InterfaceQuadros>>([]);
    const [editarQuadro, setEditarQuadro] = useState<InterfaceEditarQuadros>({
        editar: false, quadro: null
    });

    useEffect(() => {
        setTimeout(
            () => {
        axios.get('/api/quadros').then((res) => {
            setQuadros(res.data)
            setRemoveLoading(true)
        })

        }, 3000);
    }, [])

    async function atualizarQuadro(data: InterfaceQuadros) {
        await axios.put('/api/quadros', data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        await axios.get('/api/quadros').then((res) => {

            setQuadros(res.data)

        })

        {!removeLoading && <Loading />}
    }

    async function deletarQuadro(data: InterfaceQuadros) {
        const id = data.id ? data.id : null;

        await axios.delete(`/api/quadros/${id}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        await axios.get('/api/quadros').then((resposta) => {

            setQuadros(resposta.data)

        })

        {!removeLoading && <Loading />}
    }

    function valoresPadraoEditarQuadros() {
        setEditarQuadro({ editar: false, quadro: null })
    }

    function funEditarQuadro(data: InterfaceEditarQuadros) {
        setEditarQuadro(data)
    }

    async function criarQuadros(data: PropsQuadrosInput) {

        await axios.post('/api/quadros', data)
            .then((res) => {

            })
    
        await axios.get('/api/quadros').then((resposta) => {
            {!removeLoading && <Loading />}
            setQuadros(resposta.data)
            
        })

        
    }

    return (
        <QuadrosContext.Provider value={{
            quadros, criarQuadros,
            atualizarQuadro,
            funEditarQuadro, editarQuadro, 
            valoresPadraoEditarQuadros, deletarQuadro,
            
        }}>
            {props.children}
        </QuadrosContext.Provider>
    )
}
