import ApiErrorMessageSpan from "../../components/ApiErrorMessageSpan";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styled from "styled-components";

import { userLoginFormSchema } from "../../schemas/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { makeLogin } from "../../state/state";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { login } from "../../api/adm";
import { useState } from "react";
import { z } from "zod";

type Props = {}

type loginFormData = z.infer<typeof userLoginFormSchema>;

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
  } = useForm<loginFormData>({
    resolver: zodResolver(userLoginFormSchema)
  });

  const makeLoginSchema = async (data: object) => {
    setIsLoading(true);

    try {
      const loginResponse = await login(data);
      
      dispatch(
        makeLogin({
          user: loginResponse?.data?.others,
          token: loginResponse?.data?.token,
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
      initial={{ y: -5000 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring",
        duration: .8,
        ease: [0, 0.71, 0.2, 0.5]
      }}
    >

      <Left
        as={ motion.div }
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ 
          type: "spring",
          duration: 3.5,
          ease: [0, 0.81, 0.2, 0.5]
        }}
      >
      </Left>

      <Right
        as={ motion.div }
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        transition={{ 
          type: "spring",
          duration: 3.5,
          ease: [0, 0.81, 0.2, 0.5]
        }}
      >
        <Form onSubmit={ handleSubmit(makeLoginSchema) }>
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
            <Recover as={ Link } to="/create-account">Create account</Recover>
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
                content={ "Login" }
              />
            }
          </Bottom>

        </Form>
      </Right>

    </Box>
  );
};

const Box = styled.section`
  width: 80.1rem;
  height: 49rem;
  background-color: var(--main-box);
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;


  @media (max-width: 1024px) {
    width: 56rem;
    height: 40rem;
  };
`;

const Left = styled.div`
  width: 39.909rem;
  height: 48.625rem;
  background-color: var(--main-color);
  background-image: url('/static/images/login-banner.png');
  background-size: cover;
  background-position: center;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  
  @media (max-width: 1024px) {
    width: 27.909rem;
    height: 40.625rem;
  };
`;

const Right = styled.div`
  width: 39.909rem;
  height: 48.625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--card-color);
  border-top-right-radius: 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 10px;

  @media (max-width: 1024px) {
    width: 27.909rem;
    height: 40.625rem;
  };
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
`;

const Recover = styled.p`
  display: contents;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--main-font-color);
  cursor: pointer;
  transition: all .6s ;
  margin-right: 11rem;

  :hover {
    color: var(--active-color);
    transition-timing-function: ease-in-out;
  }
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 3.5rem;

  @media (max-width: 1024px) {
    width: 90%;
    justify-content: space-between;
  };
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
