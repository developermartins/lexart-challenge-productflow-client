import styled from "styled-components";
import Nav from '../../components/Nav';
import Button from '../../components/Button';
import Password from '../../assets/password.png';
import Input from '../../components/Input';

import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "../../types";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../api/adm";
import { makeLogout } from "../../state/state";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { userUpdatePasswordFormSchema } from "../../schemas/validationSchemas";

type Props = {}

const index = (props: Props) => {

  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  const id = useSelector((state: any) => state.user._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserData>({
    resolver: zodResolver(userUpdatePasswordFormSchema)
  });

  const makeUserSchema = async (data: UserData) => {
  
    setIsUpdating(true);

    const userSchema = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const updateUserResponse = await updatePassword(id, userSchema, token);

    if (updateUserResponse.status === 200) {
      setIsUpdating(false);
      dispatch(makeLogout());
      navigate('/');
      reset();
    };
  };

  return (
    <MainSection>
      <Box>
        <Nav />
        <ContentBox
          as={ motion.section }
          initial={{ x: 3000 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            duration: 1.0,
            ease: [0, 0.71, 0.2, 0.5]
          }}
        >
          <HeaderContainer>
            <Header>Update password</Header>
            <HeaderIcon src={ Password } />
          </HeaderContainer>
          
          <InputsContainer>
            <Form onSubmit={ handleSubmit(makeUserSchema) }>

              <Input
                type={ 'password' }
                placeholder={ 'Current password' }
                borderTopRightRadius={ '25px' }
                borderTopLeftRadius={ '25px' }
                borderBottomRightRadius={ '5px' }
                borderBottomLeftRadius={ '5px' }
                padding={ '1.5rem' }
                width={ '45rem' }
                marginBottom={ '.2rem' }
                useFormRegister={ register('currentPassword') }
                inputError={ errors.currentPassword }
                errorMessage={ errors?.currentPassword?.message }
              />
              <Input
                type={ 'password' }
                placeholder={ 'New password' }
                borderTopRightRadius={ '5px' }
                borderTopLeftRadius={ '5px' }
                borderBottomRightRadius={ '5px' }
                borderBottomLeftRadius={ '5px' }
                padding={ '1.5rem' }
                width={ '45rem' }
                marginBottom={ '.2rem' }
                useFormRegister={ register('newPassword') }
                inputError={ errors.newPassword }
                errorMessage={ errors?.newPassword?.message }
              />
              <Input
                type={ 'password' }
                placeholder={ 'Confirm password' }
                borderTopRightRadius={ '5px' }
                borderTopLeftRadius={ '5px' }
                borderBottomRightRadius={ '25px' }
                borderBottomLeftRadius={ '25px' }
                padding={ '1.5rem' }
                width={ '45rem' }
                marginBottom={ '.2rem' }
                useFormRegister={ register('confirmPassword') }
                inputError={ errors.confirmPassword }
                errorMessage={ errors?.confirmPassword?.message }
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
                    content={"Update password"}
                    typeButton="submit"
                    buttonFunction={ () => '' }
                    color=""
                  />
                }
              </ButtonsContainer>

            </Form>
          </InputsContainer>
        </ContentBox>

      </Box>
    </MainSection>
  );
};

export default index;

const MainSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Box = styled.section`
  width: 95%;
  height: 55rem;
  padding: 2rem;
  background-color: var(--main-box);
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
`;

const ContentBox = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: .5rem;
  background-color: var(--card-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 6rem;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: .8rem;
  margin-left: 3rem;
`;

const HeaderIcon = styled.img`
  height: 5.5rem;
  margin-top: 2.5rem;
  margin-right: 3rem;
`;

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

const ErrorMessage = styled.span`
  color: var(--delete-color);
  font-size: .8rem;
`;
