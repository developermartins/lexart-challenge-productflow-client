import styled from "styled-components";

type Props = {
  message: string,
};

const index = ({ message }: Props) => {
  return (
    <ApiErrorMessage>
      { message }
    </ApiErrorMessage>
  );
};

const ApiErrorMessage = styled.span`
  color: var(--delete-color);
  width: 80%;
  font-size: .8rem;
`;

export default index;
