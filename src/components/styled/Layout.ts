import styled from 'styled-components';

export const Main = styled.main`
  background-color: #282c34;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 4fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  color: white;
  padding: 0 4rem;
`;

interface GridItemProps {
  area: string
}

export const GridItem = styled.section`
  grid-area: ${({ area }: GridItemProps) => area};
  padding: 1rem 2rem;
`;

export const Header = styled(GridItem)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
`;
