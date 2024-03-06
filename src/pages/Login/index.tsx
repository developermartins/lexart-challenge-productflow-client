import styled from "styled-components";
import LoginBox from "../../components/LoginBox";


type Props = {}

const login = (props: Props) => {
  return (
    <MainSection>
      <LoginBox />
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