import { useContext, useState } from "react";
import { TarefaContext, QuadrosContext } from "../../contexts";
import { Container, Content } from "./styles";

interface HeaderProps {
    abrirModalTarefa: () => void;
    abrirModalQuadros: () => void;
}

export const Header = (props: HeaderProps) => {
    const tarefaCtx = useContext(TarefaContext);
    const quadorCtx = useContext(QuadrosContext);

    return (
        <Container>
            <Content>
                <h1>Quadro de Tarefas </h1>
                <div>
                    <button
                        onClick={() => props.abrirModalTarefa()}
                        hidden={!quadorCtx.quadros.length}
                    >
                        Nova Tarefa
                    </button>
                    <button onClick={() => props.abrirModalQuadros()}>
                        Novo Quadro
                    </button>

                    <h3>Total: {tarefaCtx.tarefas.length}</h3>
                </div>
            </Content>
        </Container>
    );
};
