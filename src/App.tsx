import { useState } from "react";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { TarefasProvider, QuadrosProvider, LoadingProvider } from "./contexts";
import {
    Header,
    ModalQuadros,
    ModalTarefas,
    ListagemTarefas,
    Loading,
} from "./components";

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
        <LoadingProvider>
            <QuadrosProvider>
                <TarefasProvider>
                    <div>
                        <Loading />
                        <GlobalStyle />
                        <Header
                            abrirModalTarefa={abrirModalTarefa}
                            abrirModalQuadros={abrirModalQuadros}
                        />
                        <ListagemTarefas
                            abrirModal={abrirModalTarefa}
                            abrirModalQuadro={abrirModalQuadros}
                        />
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
        </LoadingProvider>
    );
}

export default App;
