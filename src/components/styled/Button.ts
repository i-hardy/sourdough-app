import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  background: none;
  display: block;
  padding: 0.5rem 1.2rem;
  border: 1.6px solid #FFFFFF;
  border-radius: 1.8px;
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

export const BigButton = styled(Button)`
  font-size: 1.5rem;
  width: 15rem;
  height: 4rem;
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
