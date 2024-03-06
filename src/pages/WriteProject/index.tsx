import styled from "styled-components";
import Nav from '../../components/Nav';
import Input from "../../components/Input";
import Button from '../../components/Button';
import Projects from '../../assets/projects.png';

import { createPortfolioPost, getPortfolioPostById, updateProject } from "../../api/projects";
import { projectValidationSchema } from "../../schemas/validationSchemas";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { PostData } from "../../types";
import { motion } from "framer-motion";

type Props = {}

type projectFormData = PostData;

const index = (props: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: any) => state.token);
  const navigate = useNavigate();
  const location = useLocation();
  const pageMode = location.pathname.split('/')[1];
  const projectId = location.pathname.split('/')[3];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<projectFormData>({
    resolver: zodResolver(projectValidationSchema)
  });

  const makeProjectSchema = async (data: projectFormData) => {

    setIsLoading(true);

    const projectSchema = {
      title: data.title,
      category: data.category,
      description: data.description,
      stackList: data.stackList,
      liveApplicationLink: data.liveApplicationLink,
    };

    if (pageMode === 'update') {
      const updateProjectResponse = await updateProject(projectId, projectSchema, token);

      if (updateProjectResponse.status === 201) {
        setIsLoading(false);
        navigate(`/project-preview/project/${projectId}`);
        reset();
      };

    } else {
      const projectResponse = await createPortfolioPost(projectSchema, token);

      if (projectResponse.status === 201) {
        setIsLoading(false);
        navigate("/home");
        reset();
      };
    };
  };

  useEffect(() => {
    if(pageMode === 'update') {
      const projectToUpdate = async () => {
        const res = await getPortfolioPostById(projectId);

        const fields = ["imgUrl", "title", "category", "description", "stackList", "liveApplicationLink"]

        fields.forEach((field: any) => setValue(field, res.data[field]));
      };

      projectToUpdate();
    };
  }, []);

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
            <Header>
              { pageMode === 'update' ? 'Update project' : 'Write project'}
            </Header>
            <HeaderIcon src={ Projects } />
          </HeaderContainer>

          <Form onSubmit={ handleSubmit(makeProjectSchema) }>

            <Input
              type={ 'text' }
              placeholder={ 'Title' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('title') }
              inputError={ errors.title }
              errorMessage={ errors?.title?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Category' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('category') }
              inputError={ errors.category }
              errorMessage={ errors?.category?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Description' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('description') }
              inputError={ errors.description }
              errorMessage={ errors?.description?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Project URL' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('liveApplicationLink') }
              inputError={ errors.liveApplicationLink }
              errorMessage={ errors?.liveApplicationLink?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Stacks' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('stackList') }
              inputError={ errors.stackList }
              errorMessage={ errors?.stackList?.message }
            />

            <ButtonsContainer>
              { isLoading ?
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
                  typeButton="submit"
                  buttonFunction={() => ""}
                  content={"Publish"}
                />
              }
            </ButtonsContainer>
          </Form>
        </ContentBox>

      </Box>
    </MainSection>
  );
};

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
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  margin-left: .5rem;
  overflow-y: scroll;
  background-color: var(--card-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-top: 4rem;
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

const Form = styled.form`
  width: 80rem;
  height: 55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  width: 52rem;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 51rem;
  margin-bottom: 1rem;
`;

const Progress = styled.p`
  font-size: .8rem;
  color: var(--active-color);
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
