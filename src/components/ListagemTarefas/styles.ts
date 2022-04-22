import styled from "styled-components";

export const Container = styled.div`
    margin-top: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;


    @media(max-width: 451px) {
    flex-direction: column;
    position: relative;
  }

    ul {
        width: 25rem;
        max-width: 420px;
        border-radius: 0.25rem;
        margin: 5px;
        border: 2px solid #d7d7d7;

        background-color: #ebecf0;

        h3 {
            text-align: center;
            color: #172b4d;
            cursor: pointer;
        }

        li {
            padding: 1rem;
            color: var(--text-body);
            background: var(--white);
            border: 0;
            border-radius: 0.25rem;
            margin: 10px;
            list-style: none;

            display: flex;
            justify-content: space-between;

            div {
                display: flex;
                justify-content: center;
                button {
                    font-size: 1rem;

                    background: transparent;
                    border: 0;

                    color: #ccc;

                    transition: 0.2s;

                    &:hover {
                        filter: brightness(0);
                    }
                }
            }
        }
    }
`;
