import styled from 'styled-components';

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.3px;
        color: ${(props) => props.theme.gray500};
    }

    button {
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        padding: 15px 19px;
        margin-top: 20px;
        outline: none;
        letter-spacing: 0.3px;
        color: ${(props) => props.theme.gray500};
        box-shadow: 0px 3px 0px 0px ${(props) => props.theme.gray350};
        background-color: ${(props) => props.theme.gray300};

        &:hover,
        &:focus {
            color: ${(props) => props.theme.gray800};
            box-shadow: 0px 3px 0px 0px ${(props) => props.theme.primary};
        }
    }
`;

export const AuthInput = styled.input`
    padding: 10px 13px;
    flex-grow: 1;
    font-weight: 500;
    font-size: 15px;
    outline: none;
    margin: 7px 0px 15px;
    border: 1.6px solid transparent;
    border-radius: 8px;
    color: ${(props) => props.theme.gray800};
    background-color: ${(props) => props.theme.gray300};

    &:focus {
        border: 1.6px solid ${(props) => props.theme.primary};
    }

    &::placeholder {
        color: ${(props) => props.theme.gray450};
    }
`;
