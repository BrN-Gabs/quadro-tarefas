import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { FormContainer } from "./styles";
import { QuadrosContext } from "../../contexts";

interface NovoModalProps {
    visibleNovoModal: boolean;
    fecharModal: () => void;
}

export function ModalQuadros(props: NovoModalProps) {
    const {
        atualizarQuadro,
        criarQuadros,
        deletarQuadro,
        editarQuadro,
        valoresPadraoEditarQuadros,
    } = useContext(QuadrosContext);

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        if (editarQuadro.editar) {
            setId(editarQuadro.quadro?.id ? editarQuadro.quadro.id : "");

            setNome(editarQuadro.quadro?.nome ? editarQuadro.quadro.nome : "");
        }
    }, [editarQuadro.editar]);

    function limparCamposAoFecharModal() {
        setNome("");
        valoresPadraoEditarQuadros();
        props.fecharModal();
    }

    function onSubmitModal(event: FormEvent) {
        //não deixa com que o formulario de reload na pagina
        event.preventDefault();

        if (editarQuadro.editar) {
            let obj: any = {
                ...editarQuadro.quadro,
                nome,
            };
            atualizarQuadro(obj);
        } else {
            criarQuadros({
                nome,
            });
        }

        limparCamposAoFecharModal();
    }

    function mostrarBotaoExcluirModal() {
        return editarQuadro.editar ? true : false;
    }

    function excluirQuadro() {
        let obj: any = {
            ...editarQuadro.quadro,
            nome,
        };
        deletarQuadro(obj);
        limparCamposAoFecharModal();
    }

    return (
        <Modal
            isOpen={props.visibleNovoModal}
            onRequestClose={() => limparCamposAoFecharModal()}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={() => limparCamposAoFecharModal()}
                className="react-modal-close"
            >
                <FaWindowClose />
            </button>

            <FormContainer onSubmit={onSubmitModal}>
                <h2>Cadastrar quadro</h2>

                <input
                    placeholder="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    required
                />

                <button type="submit">
                    {editarQuadro.editar ? "Editar" : "Cadastrar"}
                </button>

                <button
                    type="button"
                    hidden={!mostrarBotaoExcluirModal()}
                    onClick={excluirQuadro}
                >
                    Excluir
                </button>
            </FormContainer>
        </Modal>
    );
}
