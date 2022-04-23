import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
    InterfaceEditarTarefa,
    interfaceTarefaContext,
    InterfaceTarefas,
    PropsTarefasInput,
    PropsTarefasProvider,
} from "./tarefa.type";
import { LoadingContext } from "./loadingContext";

export const TarefaContext = createContext({} as interfaceTarefaContext);

export function TarefasProvider(props: PropsTarefasProvider) {
    const { funLoading } = useContext(LoadingContext);
    const [tarefas, setTarefas] = useState<Array<InterfaceTarefas>>([]);
    const [editarTarefa, setEditarTarefa] = useState<InterfaceEditarTarefa>({
        editar: false,
        tarefa: null,
    });

    useEffect(() => {
        funLoading(true);
        axios.get("/api/tarefas").then((res) => {
            funLoading(false);
            setTarefas(res.data);
        });
    }, []);

    async function criarTarefas(data: PropsTarefasInput) {
        funLoading(true);
        await axios.post("/api/tarefas", data).then((res) => {});

        await axios.get("/api/tarefas").then((resposta) => {
            funLoading(false);
            setTarefas(resposta.data);
        });
    }

    async function atualizarTarefa(data: InterfaceTarefas) {
        funLoading(true);
        await axios
            .put("/api/tarefas", data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        await axios.get("/api/tarefas").then((resposta) => {
            funLoading(false);
            setTarefas(resposta.data);
        });
    }

    async function deletarTarefa(data: InterfaceTarefas) {
        funLoading(true);
        const id = data.id ? data.id : null;

        await axios
            .delete(`/api/tarefas/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        await axios.get("/api/tarefas").then((resposta) => {
            funLoading(false);
            setTarefas(resposta.data);
        });
    }

    function valoresPadraoEditarTarefa() {
        setEditarTarefa({ editar: false, tarefa: null });
    }

    function funEditarTarefa(data: InterfaceEditarTarefa) {
        // console.log('funEditarTarefa')
        // console.log(data)
        setEditarTarefa(data);
    }

    return (
        <TarefaContext.Provider
            value={{
                tarefas,
                criarTarefas,
                atualizarTarefa,
                funEditarTarefa,
                editarTarefa,
                valoresPadraoEditarTarefa,
                deletarTarefa,
            }}
        >
            {props.children}
        </TarefaContext.Provider>
    );
}
