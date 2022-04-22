import { FormEvent, useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { FormContainer } from "./styles";
import { QuadrosContext, TarefaContext } from "../../contexts";

interface NovoModalProps {
    visibleNovoModal: boolean;
    fecharModal: () => void;
}

export function ModalTarefas(props: NovoModalProps) {
    const {
        criarTarefas,
        editarTarefa,
        valoresPadraoEditarTarefa,
        atualizarTarefa,
        deletarTarefa,
    } = useContext(TarefaContext);

    const { quadros } = useContext(QuadrosContext);

    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idQuadro, setIdQuadro] = useState("");

    useEffect(() => {
        if (editarTarefa.editar) {
            setId(editarTarefa.tarefa?.id ? editarTarefa.tarefa.id : "");

            setTitulo(
                editarTarefa.tarefa?.titulo ? editarTarefa.tarefa.titulo : ""
            );

            setDescricao(
                editarTarefa.tarefa?.descricao
                    ? editarTarefa.tarefa.descricao
                    : ""
            );
            setIdQuadro(
                editarTarefa.tarefa?.idQuadro
                    ? editarTarefa.tarefa?.idQuadro
                    : "1"
            );
        }
    }, [editarTarefa.editar]);

    useEffect(() => {
        setIdQuadro(quadros[0] && quadros[0].id);
    }, [quadros]);

    function limparCamposAoFecharModal() {
        setTitulo("");
        setDescricao("");
        setIdQuadro("1");
        valoresPadraoEditarTarefa();
        props.fecharModal();
    }

    function onSubmitModal(event: FormEvent) {
        event.preventDefault();
        console.log("quadro", idQuadro);

        if (editarTarefa.editar) {
            let obj: any = {
                ...editarTarefa.tarefa,
                titulo,
                descricao,
                idQuadro,
            };
            atualizarTarefa(obj);
        } else {
            criarTarefas({
                titulo,
                descricao,
                idQuadro,
            });
        }

        limparCamposAoFecharModal();
    }

    function mostrarBotaoExcluirModal() {
        return editarTarefa.editar ? true : false;
    }

    function excluirTarefa() {
        let obj: any = {
            ...editarTarefa.tarefa,
            titulo,
            descricao,
        };
        deletarTarefa(obj);

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
                <h2>Cadastrar Tarefa</h2>

                <input
                    placeholder="Titulo"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                />

                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                />

                <select
                    value={idQuadro}
                    onChange={(event) => setIdQuadro(event.target.value)}
                >
                    {quadros.map((element, index) => {
                        return (
                            <option key={element.id} value={element.id}>
                                {element.nome}
                            </option>
                        );
                    })}
                </select>

                <button type="submit">
                    {editarTarefa.editar ? "Editar" : "Cadastrar"}
                </button>

                <button
                    type="button"
                    hidden={!mostrarBotaoExcluirModal()}
                    onClick={excluirTarefa}
                >
                    Excluir
                </button>
            </FormContainer>
        </Modal>
    );
}
