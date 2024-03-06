import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Button from "../../components/Button";
import Input from "../../components/Input";
import User from '../../assets/user.png';
import styled from "styled-components";
import Nav from '../../components/Nav';

// import { ThreeCircles } from "react-loader-spinner";
import { resumeValidationSchema } from '../../schemas/validationSchemas';
import { AnimatePresence, motion } from 'framer-motion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ResumeData } from '../../types';

type ResumeFormData = ResumeData;

type SelectedOption = {
  option: String,
}

const index = () => {

  const mock = [
    {
      skillsSection: {
        sectionName: 'Educação',
        sectionContent: [
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          },
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          }
        ]
      },
    },
    {
      skillsSection: {
        sectionName: 'Experiência',
        sectionContent: [
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          },
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          }
        ]
      },
    },
    {
      skillsSection: {
        sectionName: 'Habilidades de design',
        sectionContent: [
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          },
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          }
        ]
      },
    },
    {
      skillsSection: {
        sectionName: 'Habilidades técnicas',
        sectionContent: [
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          },
          {
            institution: 'Lorem Ipsum',
            description: 'Lorem Ipsum dolor sit ammet,',
            date: 'Julho, 2022'
          }
        ]
      },
    },
  ];
  
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeValidationSchema)
  });

  // const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [biographyPart, setBiographyPart] = useState('resume');
  const [updateMode, setUpdateMode] = useState(false);

  let isDevelopment = false

  // useEffect(() => {
  //   const getBlogPostDraft = async () => {
  //     setIsLoading(true);
  //     const res = await getDraft();

  //     setDrafts(res.data);
  //     setIsLoading(false);
  //   };

  //   getBlogPostDraft();
  // }, []);

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
            <Header>Biography</Header>
            <HeaderIcon src={ User } />
          </HeaderContainer>
          
          
          { isDevelopment ?
          <>
          <FilterContainer>

            <ResumeBtn
              as={ motion.div }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              option={ biographyPart }
              onClick={(e) => setBiographyPart('resume')}
            >
              <p>Resume</p>
            </ResumeBtn>

            <SkillsBtn
              as={ motion.div }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              option={ biographyPart }
              onClick={(e) => setBiographyPart('skills')}
            >
              <p>Skills</p>
            </SkillsBtn>

          </FilterContainer>

        { biographyPart === 'resume' ?
         <>
                <TitleContainer>

                  <ResumeTitle>
                    Um pouco sobre mim
                  </ResumeTitle>

                  <EditResumeBtn
                    as={ motion.button }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }}
                    onClick={ () => setUpdateMode(!updateMode) }
                  >
                    <BorderColorRoundedIcon fontSize='small' />
                  </EditResumeBtn>

                </TitleContainer>
                
                <Resume>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel dui aliquam, rutrum neque et, posuere justo. 
                  In iaculis mauris ac rutrum ultrices. Nulla nec sollicitudin est. Nulla facilisi. Phasellus finibus metus erat,
                  eu vulputate nunc mattis non. Donec luctus, turpis a tempor efficitur, nisl sapien tempus dolor, et tristique 
                  lorem metus ut purus. Nunc feugiat libero at tortor ornare, condimentum cursus justo aliquet. 
                  Nam fringilla accumsan nisi quis imperdiet. Cras vel quam ut erat cursus iaculis sit amet et est. 
                  Fusce volutpat dictum purus, at tempus ligula. Maecenas leo nisi, tristique sit amet libero eget, 
                  egestas laoreet mi.
                </Resume>
                
                <AnimatePresence>
                  {
                    updateMode &&
                    <UpdateFormContainer
                      as={ motion.div }
                      transition={{ duration: 0.5 }}
                      initial={{
                        opacity: 0,
                        y: 100
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{ y: 100, opacity: 0 }}
                    >

                      <Form as={ motion.form }>

                        <Input
                          type={ 'text' }
                          placeholder={ 'Resume title' }
                          borderTopRightRadius={ '25px' }
                          borderTopLeftRadius={ '25px' }
                          borderBottomRightRadius={ '5px' }
                          borderBottomLeftRadius={ '5px' }
                          padding={ '1.5rem' }
                          width={ '37rem' }
                          marginBottom={ '.2rem' }
                          useFormRegister={ register('title') }
                          inputError={ errors.title }
                          errorMessage={ errors?.title?.message }
                        />

                        <TextArea
                          as={ motion.textarea }
                          rows={ 15 }
                          cols={ 90 }
                          placeholder={
                            errors.resume ? 
                              errors?.resume?.message
                            : 'Resume'
                          }
                          { ...register('resume') }
                        />

                        <ButtonContainer>

                          <Button
                            content={ 'Update resume' }
                            buttonFunction={ () => '' }
                            typeButton={ 'button' }
                          />

                        </ButtonContainer>

                      </Form>

                    </UpdateFormContainer>
                  }
                </AnimatePresence>
              </> :
              <>
                <TitleContainer>

                  <ResumeTitle>
                    Skills
                  </ResumeTitle>
                  
                  <EditResumeBtn
                    as={ motion.button }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }}
                    >
                    <BorderColorRoundedIcon fontSize='small' />
                  </EditResumeBtn>

                </TitleContainer>

                <SkillsWrapper>

                  {
                    mock.map((mocked) => (
                      <SkillsSection>
                        <SkillsSectionTitle>{ mocked.skillsSection.sectionName }</SkillsSectionTitle>

                        {
                          mocked.skillsSection.sectionContent.map((content) => (
                            <>
                              <InstitutionName>{ content.institution }</InstitutionName>
                              <Description>{ content.description }</Description>
                              <DurationTime>{ content.date }</DurationTime>
                            </>
                          ))
                        }

                      </SkillsSection>
                    ))
                  }

                </SkillsWrapper>
              </>
            }
          </>
          : <p style={{ marginLeft: '4rem', marginTop: '20rem' }}> Comming soon... </p> }

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
  /* align-items: center; */
  flex-direction: column;
  /* justify-content: space-around; */
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 13.70rem;
  height: 4.188rem;
  border-radius: 40px;
  padding: .4rem;
  background-color: var(--transparent-main-color);
  backdrop-filter: blur(10px);
  margin-left: 2rem;
  margin-top: 2rem;
`;

const ResumeBtn = styled.div<SelectedOption>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  height: 3.375rem;
  background-color: ${({ option }) => option === 'resume' ? 'var(--active-color)' : 'var(--main-button)' };
  color: ${({ option }) => option === 'resume' && 'var(--main-color)' };
  border: ${({ option }) => option === 'resume' && '3px solid var(--deep-purple)' };
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: var(--active-color);
    color: var(--main-color);
  }
`;

const SkillsBtn = styled.div<SelectedOption>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  height: 3.375rem;
  background-color: ${({ option }) => option === 'skills' ? 'var(--active-color)' : 'var(--main-button)' };
  color: ${({ option }) => option === 'skills' && 'var(--main-color)' };
  border: ${({ option }) => option === 'skills' && '3px solid var(--deep-purple)' };
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;

  :hover {
    background-color: var(--active-color);
    color: var(--main-color);
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ResumeTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  margin-left: 3rem;
`;

const Resume = styled.p`
  width: 59.625rem;
  font-size: 1rem;
  font-weight: 200;
  line-height: 1.5rem;
  margin-left: 3rem;
`;

const EditResumeBtn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: var(--main-button);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .95rem;
  color: var(--main-font-color);
  margin-left: 1rem;

  :hover {
    color: var(--active-color);
  }
`;

const UpdateFormContainer = styled.div`
  width: 59.625rem;
  height: 100%;
  margin-top: 1rem;
  margin-left: 3rem;
  padding-left: .5rem;
`;

const Form = styled.form`
  width: 40rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: none;
  background-color: var(--main-button);
  color: var(--main-font-color);
  outline: none;
  padding: 1.5rem;

  ::placeholder {
    font-size: 1rem;
    color: var(--main-font-color);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 40rem;
  margin-top: 1rem;
`;

const SkillsWrapper = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-left: 3rem;
  width: 90%;
`;

const SkillsSection = styled.div``;

const SkillsSectionTitle = styled.h1`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 4px;
`;

const InstitutionName = styled.h2`
  font-size: .8rem;
  font-weight: 400;
  margin-top: 2rem;
`

const Description = styled.p`
  font-size: .8rem;
  font-weight: 300;
`;

const DurationTime = styled.span`
  font-size: .8rem;
  font-weight: 300;
  font-style: italic;
`;

export default index;
