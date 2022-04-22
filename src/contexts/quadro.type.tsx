import { ReactNode } from "react";

export interface InterfaceEditarQuadros {
    editar: boolean;
    quadro: InterfaceQuadros | null;
}

export interface interfaceQuadroContext {
    quadros: Array<InterfaceQuadros>;
    criarQuadros: (data: PropsQuadrosInput) => Promise<void>;
    editarQuadro: InterfaceEditarQuadros;
    funEditarQuadro: (data: InterfaceEditarQuadros) => void;
    valoresPadraoEditarQuadros: () => void;
    atualizarQuadro: (data: InterfaceQuadros) => Promise<void>;
    deletarQuadro: (data: InterfaceQuadros) => Promise<any>;
}

export type PropsQuadrosInput = Omit<InterfaceQuadros, 'id'>

export interface PropsQuadrosProvider {
    children: ReactNode;
}

export type InterfaceQuadros = {
    id: string,
    nome:string
}
