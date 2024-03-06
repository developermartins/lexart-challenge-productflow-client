import styled from "styled-components";
import RecoverAccountBox from "../../components/RecoverAccountBox";


type Props = {}

const login = (props: Props) => {
  return (
    <MainSection>
      <RecoverAccountBox />
    </MainSection>
  );
};

const MainSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default login;