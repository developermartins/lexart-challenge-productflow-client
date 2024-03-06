import styled from 'styled-components';
import Photo from '../../assets/code.png';
import PostMenu from '../PostMenu';
import StackTag from '../StackTag';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deletePortfolioPost, getPortfolioPostById } from '../../api/projects';

type Props = {}

const index = (props: Props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/')[3];
  const token = useSelector((state: any) => state.token);

  const [project, setProject] = useState<any>({});

  useEffect(() => {
    const getProject = async () => {
      const res = await getPortfolioPostById(id);

      setProject(res.data);
    };

    getProject();
  }, []);

  const discartProject = async () => {
    const res = await deletePortfolioPost(id, token);

    res.status === 200 && navigate('/home');
  };

  return (
    <Box
      as={ motion.section }
      initial={{ x: 3000 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        duration: 1.0,
        ease: [0, 0.71, 0.2, 0.5]
      }}
    >
      <PostContainer>
        <ContentWrapper>
          <PostHeader>
            <TitleWrapper>
              <PostTitle>{ project?.title }</PostTitle>
            </TitleWrapper>
            <PostImage src={ project?.imgUrl } />
          </PostHeader>

          <MenuContainer>
            <PostMenu
              deleteFunction={ () => discartProject() }
              updateFunction={ () => '' }
              typeButton='button'
            />
          </MenuContainer>

          <PostArticle>
            <PostContent>
              <p>{ project?.description }</p>
            </PostContent>
          </PostArticle>
          <StackTagsContainer>

            { project?.stackList?.map((stack: string) => <StackTag content={ stack } />) }

          </StackTagsContainer>
        </ContentWrapper>
      </PostContainer>
    </Box>
  );
};

const Box = styled.section`
  width: 95rem;
  height: 55rem;
  color: var(--main-font-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background-color: var(--card-color);

  ::-webkit-scrollbar {
    display: none;
  }
`;

const PostContainer = styled.section`
  width: 71rem;
  height: auto;
  color: var(--main-font-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const PostHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const TitleWrapper = styled.div`
  width: 50rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled.h1`
  font-size: 2.35rem;
  margin-bottom: 2.5rem;
`;

const PostImage = styled.img`
  height: 25rem;
  width: 50rem;
  border-radius: 30px;
  margin-bottom: 2.5rem;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 50rem;
  margin-bottom: 2rem;
`;

const PostArticle = styled.article``;

const PostContent = styled.section`
  width: 50rem;
`;

const StackTagsContainer = styled.section`
  display: flex;
  gap: 1.5rem;
  height: auto;
  width: 50rem;
  margin-top: 3rem;
`;

export default index;
