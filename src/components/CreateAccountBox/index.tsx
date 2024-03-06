import ApiErrorMessageSpan from "../../components/ApiErrorMessageSpan";
import Button from "../../components/Button";
import Input from '../../components/Input';
import styled from "styled-components";

import { userRegisterFormSchema } from "../../schemas/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { makeLogin } from "../../state/state";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { registerUser } from "../../api/adm";
import { useState } from "react";
import { z } from "zod";

type Props = {}

type registerFormData = z.infer<typeof userRegisterFormSchema>;

const index = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<registerFormData>({
    resolver: zodResolver(userRegisterFormSchema)
  });

  const makeRegisterSchema = async (data: object) => {
    setIsLoading(true);

    try {
      const registerResponse = await registerUser(data);

      dispatch(
        makeLogin({
          user: registerResponse?.data?.others,
          token: registerResponse?.data?.token,
        })
      );
      setIsLoading(false);
      navigate("/home");
      reset();

    } catch (error: any) {
      setApiErrorMessage(error.response.data.message);
      setIsLoading(false);
    };
  };

  return (
    <Box
      as={ motion.section }
      initial={{ x: 5000}}
      animate={{ x: 0 }}
      transition={{ 
        type: "spring",
        duration: 1.6,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <Top>
        <Title>Wellcome to ProductFlow App!</Title>
        <Subtitle>Create account and join us!</Subtitle>
      </Top>

      <Middle>

        <Form onSubmit={ handleSubmit(makeRegisterSchema) }>
            <Input
              type={ 'text' }
              placeholder={ 'Username' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '30rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('username') }
              inputError={ errors.username }
              errorMessage={ errors?.username?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Email' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '30rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('email') }
              inputError={ errors.username }
              errorMessage={ errors?.email?.message }
            />

            <Input
              type={ 'password' }
              placeholder={ 'Password' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '30rem' }
              marginBottom={ '.5rem' }
              useFormRegister={ register('password') }
              inputError={ errors.password }
              errorMessage={ errors?.password?.message }
            />

            {
              apiErrorMessage && 
                <ApiErrorMessageSpan message={ apiErrorMessage } />
            }

            <Bottom>

              {isLoading ?
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
                  typeButton={ "submit" }
                  buttonFunction={ () => '' }
                  content={ "Create Account" }
                />
              }

            </Bottom>

          </Form>

      </Middle>
    </Box>
  );
};

const Box = styled.section`
  width: 80rem;
  height: 40rem;
  background-color: var(--card-color);
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Top = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default index;
