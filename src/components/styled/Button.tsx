import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  display: block;
  padding: 0.5rem 1.2rem;
  border: 0.1em solid #FFFFFF;
  box-sizing: border-box;
  font-weight: 300;
  color: #FFFFFF;
  text-align: center;
  transition: all 0.2s;

  &:hover, &:focus {
    color:#000000;
    background-color:#FFFFFF;
  }

  &:disabled {
    color: grey;
    border-color: grey;
    background: none;
  }
`;

export const ButtonGroup = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & ${Button} {
    width: 75%;
    margin-bottom: 1rem;
  }
`;
