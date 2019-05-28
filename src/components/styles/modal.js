import Styled, { keyframes } from 'styled-components/macro'
import Modal from 'react-modal'

const AddButton = Styled.button`
    border: none;
    background: none;
    box-shadow: none;
    width: 36px;
    height: 36px;
    position: relative;
    border-radius: 5px;
    &:hover {
        background: #45476E;
    }
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: ${props => props.theme.primaryAccentColor};
        margin: auto;
    }
    &::before {
        width: 45%;
        height: 4px;
    }
    &::after {
        height: 45%;
        width: 4px;
    }
`

const ModalContainer = Styled(Modal)`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    width: 600px;
    max-width: 100%;
    margin: auto;
    border: 1px solid rgb(204, 204, 204);
    background: ${props => props.theme.backgroundColor};;
    overflow: auto;
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    min-height: 600px;

`
const ModalTitle = Styled.div`
    padding: 20px;
    min-height: 50px;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.foregroundColor};
    font-size: 18px;
    font-weight: 600;
    border-radius: 10px 10px 0 0;
`
const ModalContent = Styled.div`
    padding: 20px;
`

const ButtonContainer = Styled.div`
    display: flex;
    margin-top: auto;
`

const ActionButton = Styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    border: none;
    border-top: 1px solid ${props => props.theme.primaryAccentColor};
    color: ${props => props.theme.textColor};
    box-shadow: none;
    padding: 8px 16px;
    width: 100%;
    min-height: 50px;
    font-weight: 800;
    text-transform: uppercase;
    &:hover {
        background-color: ${props => props.theme.primaryAccentColor};
        color: #FFF;
    }
    &:first-child {
        border-right: 1px solid ${props => props.theme.primaryAccentColor};
    }

`

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`
const pulse = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`

const Loader = Styled.div`
    display: flex;
    width: 1em;
    height: 1em;
    position: relative;
    opacity: 0;
    animation: ${fadeIn} 1.5s linear;
    animation-delay: 800ms;
    animation-fill-mode: forwards;


    &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border: 1px solid transparent;
        border-top-color: ${props => props.theme.primaryAccentColor};
        border-bottom-color: ${props => props.theme.primaryAccentColor};
        border-radius: 50%;
        animation: ${spin} 1.5s linear infinite;
        box-sizing: border-box;
    }

    &:before {
        content: '';
        display: block;
        margin: auto;
        width: 25%;
        height: 25%;
        border: 1px solid ${props => props.theme.primaryAccentColor};
        border-radius: 50%;
        animation: ${pulse} 1s alternate ease-in-out infinite;
    }
`

const Label = Styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    ${Loader} {
        margin-left: 12px;
    }
`
const FormGroup = Styled.div`
    margin-bottom: 16px;
`

const selectStyles = {
    input: (provided, state) => {
        return {
            ...provided,
            color: '#8a88c2'
        }
    },
    option: (provided, state) => {
        return {
            // ...provided,
            // borderBottom: '1px dotted pink',
            // color: state.isSelected ? 'red' : 'blue',
            // padding: 20,
            padding: '8px',
            backgroundColor: state.isSelected ? '#2b2b47' : 'transparent',
            color: state.isSelected ? '#627FD8' : 'inherit',
            '&:hover': {
                backgroundColor: '#2b2b47',
                color: '#627FD8'
            }
            // ...provided
        }
    },
    menuList: (provided, state) => ({
        // ...provided,
        // borderBottom: '1px dotted pink',
        // color: state.isSelected ? 'red' : 'blue',
        // padding: 20,
        backgroundColor: '#333355',
        borderColor: '#627FD8',

        '::-webkit-scrollbar': {
            width: '16px'
        },

        '::-webkit-scrollbar-track': {
            background: '#2b2b47'
        },

        /* Handle */
        '::-webkit-scrollbar-thumb': {
            background: '#8a88c2'
        },

        /* Handle on hover */
        '::-webkit-scrollbar-thumb:hover': {
            background: '#627FD8'
        },
        ...provided
    }),
    indicatorSeparator: (provided, state) => {
        return {
            ...provided,
            backgroundColor: '#8a88c2'
        }
    },
    control: (provided, state) => {
        return {
            ...provided,
            background: 'transparent',
            border: '1px solid #627FD8',
            color: '#8a88c2',
            boxShadow: 'none',
            borderRadius: '0',
            bordercolor: state.menuIsOpen && '#627FD8',
            '&:hover': {
                bordercolor: '#627FD8'
            }
        }
    },
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#8a88c2',
        '&:hover': {
            color: '#8a88c2'
        }
    }),
    singleValue: (provided, state) => {
        // const opacity = state.isDisabled ? 0.5 : 1;
        // const transition = 'opacity 300ms';

        return {
            ...provided,
            color: '#8a88c2'
        }
    },
    multiValueLabel: (provided, state) => {
        return {
            ...provided,
            background: '#45476E',
            borderRadius: 0,
            color: '#FFF',
        }
    },
    multiValueRemove: (provided, state) => {
        console.log(provided);
        return {
            ...provided,
            borderRadius: 0,
            background: '#45476E',
            borderLeft: '1px solid rgba(0,0,0,0.2)',
            '&:hover': {
                backgroundColor: '#627FD8',
                color: '#FFF'
            }
        }
    }
}

export {
    AddButton,
    ModalContainer,
    ModalTitle,
    ModalContent,
    ButtonContainer,
    ActionButton,
    selectStyles,
    Loader,
    Label,
    FormGroup,
}
