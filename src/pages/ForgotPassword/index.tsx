import styled from "styled-components";
import ForgotPasswordBox from "../../components/ForgotPasswordBox";


type Props = {}

const login = (props: Props) => {
  return (
    <MainSection>
      <ForgotPasswordBox />
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