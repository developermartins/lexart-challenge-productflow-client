import styled from "styled-components";
import CreateAccountBox from "../../components/ForgotPasswordBox";


type Props = {}

const login = (props: Props) => {
  return (
    <MainSection>
      <CreateAccountBox />
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