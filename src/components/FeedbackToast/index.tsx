import { motion } from "framer-motion";

import styled from "styled-components";

type Props = {
  setShow: Function,
}

const index = ({ setShow }: Props) => {

  setTimeout(() => {
    setShow(false);
  }, 3000);

  return (
      <FeedbackContainer
        as={ motion.div }
        initial={{ x: 5000}}
        animate={{ x: 0 }}
        transition={{ 
          type: "spring",
          duration: 1.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        exit={{ x: 5000 }}
      >
        <FeedbackParagraph as={ motion.p }>
          Account updated 👌
        </FeedbackParagraph>
      </FeedbackContainer>
  );
};

export default index;

const FeedbackContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: 2rem;
  background-color: var(--main-button);
  border-radius: 15px;
  margin-left: 1.5rem;
  top: 45rem;
  left: 60rem;
`;

const FeedbackParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 300;
`;
