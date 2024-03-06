import React, { useEffect } from "react";
import styled from "styled-components";
import Nav from '../../components/Nav';
import Input from "../../components/Input";
import Editor from '../../components/Editor';
import Button from '../../components/Button';
import Blogging from '../../assets/blogging.png';

import { useState } from "react";
import { motion } from "framer-motion";
import { PostData } from "../../types";
import { useForm } from "react-hook-form";
import { createDraft } from "../../api/draft";
import { updateBlogPost } from "../../api/products";
import { ThreeCircles } from "react-loader-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlogPost, getBlogPostById } from "../../api/products";
import { postValidationSchema } from "../../schemas/validationSchemas";
import { cleanEditorContent, setEditorContent } from "../../state/state";

type Props = {}

type postFormData = PostData;

const index = (props: Props) => {
  const content = useSelector((state: any) => state.editorContent);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [quillValue, setQuillValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pageMode = location.pathname.split('/')[1];
  const postId = location.pathname.split('/')[3];
  const token = useSelector((state: any) => state.token);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<postFormData>({
    resolver: zodResolver(postValidationSchema)
  });

  const makePostSchema = async (data: postFormData) => {
  
    setIsPublishLoading(true);

    const postSchema = {
      title: data.title,
      description: data.description,
      stackList: data.stackList,
      content: content,
    };

    if (pageMode === 'update') {
      const updatePostResponse = await updateBlogPost(postId, postSchema, token);

      if (updatePostResponse.status === 201) {
        setIsPublishLoading(false);
        dispatch(cleanEditorContent());
        setQuillValue('');
        navigate(`/post-preview/post/${postId}`);
        reset();
      };

    } else {
      const postResponse = await createBlogPost(postSchema, token);

      if (postResponse.status === 201) {
        setIsPublishLoading(false);
        dispatch(cleanEditorContent());
        setQuillValue('');
        navigate("/home");
        reset();
      };
    };
  };

  const makePostDraftSchema = async (data: postFormData) => {
  
    setIsDraftLoading(true);

    const postSchema = {
      title: data?.title,
      description: data?.description,
      stackList: data?.stackList?.toString().split(','),
      content: content,
    };


    const postResponse = await createDraft(postSchema, token);

    if (postResponse.status === 201) {
      setIsDraftLoading(false);
      navigate("/drafts");
      reset();
    };
  };

  const discartPost = () => {
    dispatch(cleanEditorContent());
    setQuillValue('');

    reset({
      title: '',
      description: '',
      stackList: [],
      content: '',
    });
  };

  useEffect(() => {
    if(pageMode === 'update') {
      const postToUpdate = async () => {
        const res = await getBlogPostById(postId);

        const fields = ["title", "description", "stackList", "content"]

        fields.forEach((field: any) => setValue(field, res.data[field]));

        dispatch(
          dispatch(setEditorContent({
            editorContent: res.data.content
          })),
        );
      };

      postToUpdate();
    };
  }, []);

  useEffect(() => {
    setQuillValue(content)
  }, [content]);

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
              { pageMode === 'update' ? 'Update post' : 'Write post'}
            </Header>
            <HeaderIcon src={ Blogging } />
          </HeaderContainer>

          <Form onSubmit={ handleSubmit(makePostSchema) }>

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
              useFormRegister={ register('stackList') }
              inputError={ errors.stackList }
              errorMessage={ errors?.stackList?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Description' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('description') }
              inputError={ errors.description }
              errorMessage={ errors?.description?.message }
            />

            <EditorContainer>
              <Editor  quillValue={ quillValue } setQuillValue={setQuillValue}/>
            </EditorContainer>

            <WritePostButtonsContainer>
              <Button
                typeButton="button"
                buttonFunction={ () => discartPost() }
                content={"Discart Post"}
                color="delete"
                borderTopRightRadius="5px"
                borderTopLeftRadius="15px"
                borderBottomRightRadius="5px"
                borderBottomLeftRadius="15px"
              />
              {  isDraftLoading ?
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
                  typeButton="button"
                  buttonFunction={ () => {
                    const values = getValues();
                    makePostDraftSchema(values);
                  }  }
                  content={"Save draft"}
                  borderTopRightRadius="5px"
                  borderTopLeftRadius="5px"
                  borderBottomRightRadius="5px"
                  borderBottomLeftRadius="5px"
                />
              }
              {  isPublishLoading ?
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
                  buttonFunction={ () => '' }
                  content={"Publish"}
                  borderTopRightRadius="15px"
                  borderTopLeftRadius="5px"
                  borderBottomRightRadius="15px"
                  borderBottomLeftRadius="5px"
                />
              }
            </WritePostButtonsContainer>
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

const EditorContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const WritePostButtonsContainer = styled.div`
  width: 77rem;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-bottom: 5rem;
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
