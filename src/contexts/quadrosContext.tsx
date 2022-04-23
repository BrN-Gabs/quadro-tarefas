import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
    InterfaceEditarQuadros,
    InterfaceQuadros,
    interfaceQuadroContext,
    PropsQuadrosInput,
    PropsQuadrosProvider,
} from "./quadro.type";
import { LoadingContext } from "./loadingContext";

export const QuadrosContext = createContext({} as interfaceQuadroContext);
export function QuadrosProvider(props: PropsQuadrosProvider) {
    const {funLoading} = useContext(LoadingContext);
    const [quadros, setQuadros] = useState<Array<InterfaceQuadros>>([]);
    const [editarQuadro, setEditarQuadro] = useState<InterfaceEditarQuadros>({
        editar: false,
        quadro: null,
    });

    useEffect(() => {
        funLoading(true);
        axios.get("/api/quadros").then((res) => {
            setQuadros(res.data);
            funLoading(false);
        });
    }, []);

    async function atualizarQuadro(data: InterfaceQuadros) {
        funLoading(true);
        await axios
            .put("/api/quadros", data)
            .then((res) => {
                
                console.log(res);
            })
            .catch((err) => {
                
                console.log(err);
            });
      
        await axios.get("/api/quadros").then((res) => {
            funLoading(false);
            setQuadros(res.data);
        });
    }

    async function deletarQuadro(data: InterfaceQuadros) {
        
        const id = data.id ? data.id : null;
        funLoading(true);
        await axios
            .delete(`/api/quadros/${id}`)
            .then((res) => {
               
                console.log(res);
            })
            .catch((err) => {
               
                console.log(err);
            });
        
        await axios.get("/api/quadros").then((resposta) => {
            funLoading(false);
            setQuadros(resposta.data);
        });
    }

    function valoresPadraoEditarQuadros() {
        setEditarQuadro({ editar: false, quadro: null });
    }

    function funEditarQuadro(data: InterfaceEditarQuadros) {
        setEditarQuadro(data);
    }

    async function criarQuadros(data: PropsQuadrosInput) {
        funLoading(true);
        await axios.post("/api/quadros", data).then((res) => {});
        
        await axios.get("/api/quadros").then((resposta) => {
            funLoading(false);
            setQuadros(resposta.data);
        });
    }

    return (
        <QuadrosContext.Provider
            value={{
                quadros,
                criarQuadros,
                atualizarQuadro,
                funEditarQuadro,
                editarQuadro,
                valoresPadraoEditarQuadros,
                deletarQuadro,
            }}
        >
            {props.children}
        </QuadrosContext.Provider>
    );
}
