import styled from "styled-components";

import { motion } from 'framer-motion';

type styleTypes = {
  color?: string,
  borderTopRightRadius?: string,
  borderTopLeftRadius?: string,
  borderBottomRightRadius?: string,
  borderBottomLeftRadius?: string,
};

interface Props extends styleTypes {
  content: string,
  buttonFunction: Function,
  typeButton: any
};


const index = ({
    typeButton,
    buttonFunction,
    content,
    color,
    borderTopRightRadius,
    borderTopLeftRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius
  }: Props) => {
  return (
    <Button
      type={ typeButton }
      as={ motion.button }
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10
      }}
      onClick={() => buttonFunction() }
      color={ color }
      borderTopRightRadius={ borderTopRightRadius }
      borderTopLeftRadius={ borderTopLeftRadius }
      borderBottomRightRadius={ borderBottomRightRadius }
      borderBottomLeftRadius={ borderBottomLeftRadius }
    >
      { content }
    </Button>
  );
};

const Button = styled.button<styleTypes>`
  width: 8rem;
  height: 2rem;
  font-size: 0.8rem;
  background-color:  ${({ color })=> color === 'delete' ? 'transparent' : 'var(--main-button)'};
  border-top-right-radius: ${({ borderTopRightRadius }) => borderTopRightRadius ? borderTopRightRadius : '15px'};
  border-top-left-radius: ${({ borderTopLeftRadius }) => borderTopLeftRadius ? borderTopLeftRadius : '15px'};
  border-bottom-right-radius: ${({ borderBottomRightRadius }) => borderBottomRightRadius ? borderBottomRightRadius : '15px'};
  border-bottom-left-radius: ${({ borderBottomLeftRadius }) => borderBottomLeftRadius ? borderBottomLeftRadius : '15px'};
  color: ${({ color }) => color === 'delete' ? 'var(--delete-color)' : 'var(--main-font-color)'};
  border: ${({ color })=> color === 'delete' ? '2px solid var(--delete-color)' : 'none'};
  outline: none;
  cursor: pointer;
  margin-left: .3rem;

  :hover {
    color: ${({ color }) => color === 'delete' ? 'var(--delete-color)' : 'var(--active-color)'};
  }
`;

export default index;
