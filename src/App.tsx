import { useState } from "react";
import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { ModalQuadros, ModalTarefas } from "./components/Modal";
import Modal from "react-modal";
import { ListagemTarefas } from "./components/ListagemTarefas";
import { TarefasProvider, QuadrosProvider } from "./contexts";


Modal.setAppElement("#root");
function App() {
    const [visibleModalTarefa, setVisibleModalTarefa] =
        useState<boolean>(false);
    const [visibleModalQuadro, setVisibleModalQuadro] =
        useState<boolean>(false);

    function abrirModalTarefa() {
        setVisibleModalTarefa(true);
    }

    function fecharModalTarefa() {
        setVisibleModalTarefa(false);
    }

    function abrirModalQuadros() {
        setVisibleModalQuadro(true);
    }

    function fecharModalQuadros() {
        setVisibleModalQuadro(false);
    }

    return (
        <QuadrosProvider>
            <TarefasProvider>
                <div>
                    <GlobalStyle />
                    <Header
                        abrirModalTarefa={abrirModalTarefa}
                        abrirModalQuadros={abrirModalQuadros}
                    />
                    <ListagemTarefas abrirModal={abrirModalTarefa} abrirModalQuadro={abrirModalQuadros}/>
                    <ModalTarefas
                        visibleNovoModal={visibleModalTarefa}
                        fecharModal={fecharModalTarefa}
                    />
                    <ModalQuadros
                        visibleNovoModal={visibleModalQuadro}
                        fecharModal={fecharModalQuadros}
                    />
                </div>
            </TarefasProvider>
        </QuadrosProvider>
    );
}

export default App;
