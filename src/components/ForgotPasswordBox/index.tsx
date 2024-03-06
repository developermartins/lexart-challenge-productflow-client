import logo from "../../assets/martscode-base-logo.png";
import Button from "../../components/Button";
import Input from '../../components/Input';
import styled from "styled-components";

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
        <Title>Recover Password</Title>
        <Logo src={ logo } />
      </Top>

      <Middle>

        <Input
          type={ 'email' }
          placeholder={ 'Email' }
          borderTopRightRadius={ '5px' }
          borderTopLeftRadius={ '5px' }
          borderBottomRightRadius={ '5px' }
          borderBottomLeftRadius={ '5px' }
          padding={ '1.5rem' }
          width={ '35rem' }
          marginBottom={ '.5rem' }
          useFormRegister={ '' }
          inputError={ {} }
          errorMessage={ '' }
        />

      </Middle>

      <Bottom>
        <Button
          content={"Send recover email"}
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
  background-color: var(--card-color);
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Top = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
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
