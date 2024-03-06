import styled from "styled-components";
import logo from "../../assets/martscode-base-logo.png";
import Button from "../../components/Button";

import { motion } from "framer-motion";

type Props = {}

const index = (props: Props) => {
  return (
    <Box
      as={ motion.section }
      initial={{ x: 5000}}
      animate={{ x: 0 }}
      transition={{ 
        type: "spring",
        duration: 1.6,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <Top>
        <Logo src={ logo } />
      </Top>
      <Middle>
        <Title>Recover Account</Title>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Token" type="text" />
        <Input placeholder="New password" type="password" />
      </Middle>
      <Bottom>
        <Button
          content={"Recover account"}
          typeButton="button"
          buttonFunction={ () => '' }
          color=""
        />
      </Bottom>
    </Box>
  );
};

const Box = styled.section`
  width: 80rem;
  height: 40rem;
  background-color: var(--main-box);
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 5.4rem;
  height: 5.4rem;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 3px solid var(--active-color);
  padding: 0.5rem;
  width: 38rem;
  margin-bottom: 1.5rem;
  color: var(--main-font-color);
  outline: none;

  ::placeholder {
    color: var(--main-font-color);
  }
`;

const Title = styled.h1`
  margin-bottom: 3.5rem;
  font-weight: 400;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-right: 10rem;
`;

export default index;
