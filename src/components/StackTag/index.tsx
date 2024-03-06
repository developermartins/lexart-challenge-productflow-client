import styled from 'styled-components';

type Props = {
  content: string,
};

const index = ({ content }: Props) => {
  return (
    <StackTag>
      { content }
    </StackTag>
  );
};

const StackTag = styled.div`
  width: auto;
  height: 1.6rem;
  border-radius: 15px;
  font-size: 0.5rem;
  background-color: var(--active-color-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default index;
