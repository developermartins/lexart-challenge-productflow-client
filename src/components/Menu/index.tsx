import styled from "styled-components";
import ButtonLarge from '../../components/ButtonLarge';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';

import { motion } from "framer-motion";

type Props = {}

const index = (props: Props) => {
  return (
    <MenuBox
      as={ motion.div }
      transition={{ duration: 0.5 }}
      initial={{
        opacity: 0,
        x: -100
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{ x: -100, opacity: 0 }}
    >
      <ButtonLarge
        content={ 'Change account password' }
        Icon={ KeyRoundedIcon }
        path={ '/settings/account/password/update' }
        customBorder={ '30px 30px 5px 5px' }
      />
      <ButtonLarge
        content={ 'Change account info' }
        Icon={ Person4RoundedIcon }
        path={ '/settings/account/info/update' }
        customBorder={ '5px 5px 30px 30px' }
      />
    </MenuBox>
  );
};

export default index;

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 200px;
  padding: .5rem;
  background-color: var(--transparent-main-color);
  backdrop-filter: blur(10px);
  border-radius: 35px;
  z-index: 9999;
  position: absolute;
  top: 665px;
  left: 100px;
`;