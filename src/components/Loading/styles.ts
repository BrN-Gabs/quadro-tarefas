import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }

`

export const LoadingStyle = styled.div`
    
    position: fixed;
    z-index: 2;
    background-color: rgb(0,0,0,0.3);

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        width: 64px;
        height: 64px;
        content: " ";
        margin: 8px;
        border: 6px solid #fff;
        border-radius: 50%;
        border-color: #fff transparent #fff transparent;
        animation: ${rotate} 1.2s linear infinite;
    }

`;