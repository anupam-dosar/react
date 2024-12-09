import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  box-shadow: var(-shadow-sm);
  cursor: pointer;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div>
        <H1>The Wild Oasis</H1>
        <Button>Check In</Button>
      </div>
    </>
  );
}

export default App;
