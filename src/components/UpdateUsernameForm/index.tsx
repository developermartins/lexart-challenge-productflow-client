import styled from "styled-components";
import Input from '../../components/Input';
import Button from '../../components/Button';

import { UserData } from "../../types";
import { useForm } from "react-hook-form";
import { updateUsername } from "../../api/adm";
import { ThreeCircles } from "react-loader-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameUpdateFormSchema } from "../../schemas/validationSchemas";

type Props = {
  setIsUpdating: Function,
  setShow: Function,
  id: string,
  token: string,
  isUpdating: Boolean
}

const index = ({ setIsUpdating, setShow, id, token, isUpdating }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserData>({
    resolver: zodResolver(usernameUpdateFormSchema)
  });

  const makeUserSchema = async (data: UserData) => {

    setIsUpdating(true);

    const userSchema = {
      username: data.newUsername,
    };

    const updateUserResponse = await updateUsername(id, userSchema, token);

    if (updateUserResponse.status === 200) {
      setIsUpdating(false);
      setShow(true);
      reset();
    };
  };

  return (
    <InputsContainer>
      <Form onSubmit={ handleSubmit(makeUserSchema) }>
        <Label>Change username</Label>

        <Input
          type={ 'text' }
          placeholder={ 'New username' }
          borderTopRightRadius={ '15px' }
          borderTopLeftRadius={ '15px' }
          borderBottomRightRadius={ '15px' }
          borderBottomLeftRadius={ '15px' }
          padding={ '1.5rem' }
          width={ '45rem' }
          marginBottom={ '.5rem' }
          useFormRegister={ register('newUsername') }
          inputError={ errors.newUsername }
          errorMessage={ errors?.newUsername?.message }
        />

        <ButtonsContainer>
          {  isUpdating ?
            <LoaderContainer>
              <ThreeCircles
                height="20"
                width="20"
                color="#06b6d4"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="#06b6d4"
                innerCircleColor="#22d3ee"
                middleCircleColor="#67e8f9"
              />
            </LoaderContainer> :
            <Button
              content={"Update username"}
              typeButton="submit"
              buttonFunction={ () => '' }
              color=""
            />
          }
        </ButtonsContainer>
      </Form>
    </InputsContainer>
  );
};

export default index;

const InputsContainer = styled.section`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const ButtonsContainer = styled.div`
  width: 48rem;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 1.5rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 2rem;
  background-color: var(--main-button);
  border-radius: 15px;
  margin-left: 1.5rem;
  cursor: pointer;
`;
