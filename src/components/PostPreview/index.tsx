import styled from 'styled-components';
import PostMenu from '../../components/PostMenu';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteDraft } from '../../api/draft';
import { getDraftById } from '../../api/draft';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteBlogPost, getBlogPostById } from '../../api/blog';

type Props = {}

const index = (props: Props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split('/')[3];
  const page = location.pathname.split('/')[2];
  const token = useSelector((state: any) => state.token);

  const [post, setPost] = useState<any>({});

  useEffect(() => {

    if (page === 'draft') {
      const getPostData = async () => {
        const res = await getDraftById(id);
  
        setPost(res.data);
      };

      getPostData();
    } else {
      const getPostData = async () => {
        const res = await getBlogPostById(id);
  
        setPost(res.data);
      };

      getPostData();
    };

  }, []);

  const handleDiscart = async () => {
    if (page === 'draft') {
      const res = await deleteDraft(id, token);

      res.status === 200 && navigate('/drafts')
    } else {
      const res = await deleteBlogPost(id, token);
  
      res.status === 200 && navigate('/home');
    };
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
              <PostTitle>{ post.title }</PostTitle>
            </TitleWrapper>

            { post.imgUrl !== '' ?
              <PostImage src={ post.imgUrl } /> :

              <PostEmptyImage>
                <PhotoCameraRoundedIcon style={{ fontSize: "3.5rem" }} />
              </PostEmptyImage>
            }
  
          </PostHeader>

          <PostArticle>

            <PostAuthorContainer>
              <PostAuthor>
                <Person4RoundedIcon />
                <p>Por Lucas Silva</p>
                <p>•</p>
                <p>{ new Date(post.createdAt).toLocaleDateString() }</p>
              </PostAuthor>

              <PostMenu
                deleteFunction={ () => handleDiscart() }
                updateFunction={ () => navigate(`/update/update-post/${ id }`) }
                typeButton='button'
              />
            </PostAuthorContainer>

            <PostContent
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

          </PostArticle>

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
  width: 90rem;
  height: auto;
  color: var(--main-font-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rem;
  padding-top: 5rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90rem;
`;

const PostHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const TitleWrapper = styled.div`
  width: 55rem;
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
  width: 55rem;
  border-radius: 30px;
  margin-bottom: 2.5rem;
`;

const PostEmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-color);
  height: 22rem;
  width: 46rem;
  border-radius: 30px;
  margin-bottom: 2.5rem;
`;

const PostArticle = styled.article``;

const PostAuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 55rem;
`;

const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  p {
    margin-left: 1.5rem;
    font-size: 1rem;
  }
`;

const PostContent = styled.section`
  width: 55rem;

  margin-top: 1.5rem;

  img {
    height: 35rem;
    border-radius: 30px;
  }

  h1 {
    font-size: 2.75rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  h6 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1.2rem;
  }

  ul li {
    font-size: 1.50rem;
  }

  pre {
    background-color: #060A10;
    border-radius: 30px;
    height: auto;
    padding: 5rem;
    margin-top: 2rem;
    font-size: 1.5rem;
  }
`;

export default index;
