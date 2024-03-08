import styled from "styled-components";

type Props = {
  type: string,
  placeholder: string,
  name?: any,
  borderTopRightRadius?: string,
  borderTopLeftRadius?: string,
  borderBottomRightRadius?: string,
  borderBottomLeftRadius?: string,
  padding?: string,
  width?: string,
  marginBottom?: string,
  useFormRegister: any,
  inputError?: object,
  errorMessage?: string,
};


const index = ({
  type,
  placeholder,
  borderTopRightRadius,
  borderTopLeftRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  padding,
  width,
  marginBottom,
  useFormRegister,
  inputError,
  errorMessage,
}: Props) => {

  return (
    <Input
      type={ type }
      placeholder={ inputError ? errorMessage : placeholder }
      borderTopRightRadius={ borderTopRightRadius }
      borderTopLeftRadius={ borderTopLeftRadius }
      borderBottomRightRadius={ borderBottomRightRadius }
      borderBottomLeftRadius={ borderBottomLeftRadius }
      padding={ padding }
      width={ width }
      marginBottom={ marginBottom }
      inputError={ inputError }
      { ...useFormRegister }
    />
  );
};

const Input = styled.input<Props>`
  background-color: var(--main-button);
  border: none;
  border-top-right-radius: ${({ borderTopRightRadius }) => borderTopRightRadius ? borderTopRightRadius : '5px'};
  border-top-left-radius: ${({ borderTopLeftRadius }) => borderTopLeftRadius ? borderTopLeftRadius : '5px'};
  border-bottom-right-radius: ${({ borderBottomRightRadius }) => borderBottomRightRadius ? borderBottomRightRadius : '5px'};
  border-bottom-left-radius: ${({ borderBottomLeftRadius }) => borderBottomLeftRadius ? borderBottomLeftRadius : '5px'};
  padding: ${({ padding }) => padding ? padding : '1rem'};
  width: ${({ width }) => width ? width : '35rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : '.5rem'};
  color: var(--main-font-color);
  outline: none;
  
  ::placeholder {
    color: ${({ inputError }) => inputError ? 'var(--delete-color)' : 'var(--main-font-color)'};
  }

  @media (max-width: 1024px) {
    width: 100%;
  };
`;

export default index;