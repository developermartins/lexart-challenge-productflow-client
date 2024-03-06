import styled from 'styled-components';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { motion } from 'framer-motion';

type Props = {
  deleteFunction: Function,
  updateFunction: Function,
  typeButton: any
};

const index = ({ deleteFunction, updateFunction, typeButton }: Props) => {
  return (
    <ButtonWrapper>

      <EditButton
        as={ motion.button }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
        type={ typeButton }
        onClick={ () => updateFunction() }
      >
        <EditNoteRoundedIcon
          style={{ fontSize: '1.2rem' }}
        />
      </EditButton>

      <Divider />

      <DeleteButton
        as={ motion.button }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
        type={ typeButton }
        onClick={() => deleteFunction()}
      >
        <DeleteRoundedIcon
          style={{ fontSize: '1.2rem' }}
        />
      </DeleteButton>

    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 8.875rem;
  height: 2.375rem;
  background-color: var(--main-button);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled.button`
  width: 8.875rem;
  height: 2.375rem;
  background-color: var(--main-button);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  color: var(--main-font-color);
  padding: 0rem;
  cursor: pointer;

  :hover {
    color: var(--active-color);
  }
`;

const DeleteButton = styled.button`
  width: 8.875rem;
  height: 2.375rem;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: var(--main-button);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: var(--main-font-color);
  cursor: pointer;

  :hover {
    color: var(--delete-color);
  }
`;

const Divider = styled.hr`
  height: 80%;
  width: 3px;
  border: none;
  background-color: var(--line-color);
`

export default index;
