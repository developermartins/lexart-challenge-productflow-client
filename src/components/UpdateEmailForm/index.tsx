import styled from "styled-components";
import Input from '../../components/Input';
import Button from '../../components/Button';

import { UserData } from "../../types";
import { useForm } from "react-hook-form";
import { updateEmail } from "../../api/adm";
import { ThreeCircles } from "react-loader-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateEmailFormSchema } from "../../schemas/validationSchemas";

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
    resolver: zodResolver(userUpdateEmailFormSchema)
  });

  const makeUserSchema = async (data: UserData) => {
  
    setIsUpdating(true);

    const userSchema = {
      currentEmail: data.currentEmail,
      newEmail: data.newEmail,
    };

    const updateUserResponse = await updateEmail(id, userSchema, token);

    if (updateUserResponse.status === 200) {
      setIsUpdating(false);
      setShow(true);
      reset();
    };
  };

  return (
    <InputsContainer>
      <Form onSubmit={ handleSubmit(makeUserSchema) }>
        <Label>Change email</Label>

        <Input
          type={ 'email' }
          placeholder={ 'Current email' }
          borderTopRightRadius={ '25px' }
          borderTopLeftRadius={ '25px' }
          borderBottomRightRadius={ '5px' }
          borderBottomLeftRadius={ '5px' }
          padding={ '1.5rem' }
          width={ '45rem' }
          marginBottom={ '.2rem' }
          useFormRegister={ register('currentEmail') }
          inputError={ errors.currentEmail }
          errorMessage={ errors?.currentEmail?.message }
        />

        <Input
          type={ 'email' }
          placeholder={ 'New email' }
          borderTopRightRadius={ '5px' }
          borderTopLeftRadius={ '5px' }
          borderBottomRightRadius={ '25px' }
          borderBottomLeftRadius={ '25px' }
          padding={ '1.5rem' }
          width={ '45rem' }
          marginBottom={ '.2rem' }
          useFormRegister={ register('newEmail') }
          inputError={ errors.newEmail }
          errorMessage={ errors?.newEmail?.message }
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
              content={"Update email"}
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
  width: 55%;
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
