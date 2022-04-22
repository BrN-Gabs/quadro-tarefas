import { ReactNode } from "react";
import { InterfaceQuadros } from "./quadro.type";

export interface InterfaceEditarTarefa {
    editar: boolean;
    tarefa: InterfaceTarefas | null;
}

export interface interfaceTarefaContext {
    tarefas: Array<InterfaceTarefas>;
    criarTarefas: (data: PropsTarefasInput) => Promise<void>;
    funEditarTarefa: (data: InterfaceEditarTarefa) => void;
    editarTarefa: InterfaceEditarTarefa;
    valoresPadraoEditarTarefa: () => void;
    atualizarTarefa: (data: InterfaceTarefas) => Promise<void>;
    deletarTarefa: (data: InterfaceTarefas) => Promise<any>;
}

export type InterfaceTarefas = {
    id: string,
    titulo: string,
    descricao: string,
    idQuadro: string
}

export type PropsTarefasInput = Omit<InterfaceTarefas, 'id'>

export interface PropsTarefasProvider {
    children: ReactNode;
}
