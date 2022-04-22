import { Fragment, useContext, useState } from "react";
import { Container } from "./styles";
import { TarefaContext, QuadrosContext } from "../../contexts";
import { FaPen } from "react-icons/fa";

interface InterfaceTarefas {
    descricao: string;
    id: string;
    titulo: string;
}

interface InterfaceQuadros {
    id: string;
    nome: string;
    tarefas: Array<InterfaceTarefas>;
}

interface PropsListarTarefas {
    abrirModal: () => void;
    abrirModalQuadro: () => void;
}
export function ListagemTarefas({
    abrirModal,
    abrirModalQuadro,
}: PropsListarTarefas) {
    const { tarefas, funEditarTarefa } = useContext(TarefaContext);
    const { quadros, funEditarQuadro } = useContext(QuadrosContext);

    //let quadrosMap: Array<InterfaceQuadros> = [];
    // quadros.forEach((el) => {
    //     tarefas.map((element) => {
    //         if (el.id == element.idQuadro) {
    //             let arrayTarefas: Array<InterfaceTarefas> = []
    //             let obj = {} as InterfaceQuadros;
    //             arrayTarefas = [...arrayTarefas, element]
    //             obj.id = el.id;
    //             obj.nome = el.nome;
    //             obj.tarefas = arrayTarefas;

    //             quadrosMap.push(...quadrosMap, obj);
    //         }
    //     });
    // });

    return (
        <>
            <Container>
                {quadros.map((quadroEl, index) => (
                <div>
                    <ul>
                        <h3
                            onClick={() => {
                                funEditarQuadro({
                                    editar: true,
                                    quadro: quadroEl,
                                });
                                abrirModalQuadro();
                            }}
                        >
                            {quadroEl.nome}
                        </h3>

                        {tarefas.map((element, index) => {
                            if (quadroEl.id == element.idQuadro) {
                                return (
                                    <li key={element.id}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <h4>{element.titulo}</h4>
                                            <p>{element.descricao}</p>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    funEditarTarefa({
                                                        editar: true,
                                                        tarefa: element,
                                                    });
                                                    abrirModal();
                                                }}
                                            >
                                                <FaPen />
                                            </button>
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                ))}
            </Container>
        </>
    );
}
