import StackTag from '../StackTag';
import PostMenu from '../PostMenu';
import styled from 'styled-components';

import { deletePortfolioPost } from '../../api/projects';
import { PostData, styleTypes } from '../../types';
import { deleteBlogPost } from '../../api/products';
import { useNavigate } from 'react-router-dom';
import { deleteDraft } from '../../api/draft';
import { Link, To } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

interface Props extends styleTypes {
  cardContent: PostData,
  path: To,
  filtered: any,
  setFiltered: Function, 
  activeFilter: string,
};

const index = ({ path, cardContent, filtered, setFiltered, activeFilter }: Props) => {

  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);

  const handleDiscart = async () => {

      if (activeFilter === 'posts') {
        const res = await deleteBlogPost(cardContent._id, token);

        if (res.status === 200) {
          const updatedCardList = filtered.filter((data: any) => data._id !== cardContent._id);

          setFiltered(updatedCardList);
        }
      } else if (activeFilter === 'portfolio') {
          const res = await deletePortfolioPost(cardContent._id, token);

          if (res.status === 200) {
            const updatedCardList = filtered.filter((data: any) => data._id !== cardContent._id);
  
            setFiltered(updatedCardList);
          }
      } else if (activeFilter === 'drafts') {
        const res = await deleteDraft(cardContent._id, token);

        if (res.status === 200) {
          const updatedCardList = filtered.filter((data: any) => data._id !== cardContent._id);

          setFiltered(updatedCardList);
        }
      } else {
        return;
      };
  };

  return (
    <Card
      as={ motion.div }
      key={ cardContent._id }
      transition={{ duration: 0.5 }}
      initial={{
        opacity: 0,
        x: -100
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{ x: -100, opacity: 0 }}
    >
      <CardBanner imgUrl={ cardContent.imgUrl } />

      <Link to={`${ path }${ cardContent._id }` } style={{ textDecoration: 'none', color: 'var(--main-font-color)' }}>
        <CardTitle>{ cardContent.title }</CardTitle>
      </Link>

      <CardDescription>
        { cardContent.description }
      </CardDescription>

      <p>
        <Time dateTime={ new Date(cardContent?.createdAt).toDateString() }>
          { new Date(cardContent?.createdAt).toDateString() }
        </Time>
      </p>

      <StackTagsContainer>
        {
          cardContent?.stackList?.map((stack) => (
            <StackTag content={ stack } />
          ))
        }
      </StackTagsContainer>

      <PostMenu
        deleteFunction={ () => handleDiscart() }
        updateFunction={ () => navigate(
            activeFilter === 'posts' ? `/update/update-post/${ cardContent._id }`
                                    : `/update/update-project/${ cardContent._id }`
            ) }
        typeButton='button'
      />
    </Card>
  );
};

const Card = styled.div`
  width: 90.375rem;
  height: 5.438rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  background-color: var(--card-color);
  padding: .5rem;
  margin: 1rem;
  filter: drop-shadow(0 8px 5px black);
  cursor: pointer;
`;

const CardBanner = styled.div<styleTypes>`
  width: 8rem;
  height: 4.188rem;
  border-radius: 15px;
  background-image: url(${ props => props.imgUrl });
  background-size: cover;
  background-position: 5%;
  pointer-events: none;
`;

const CardTitle = styled.p`
  font-size: 1rem!important;
  font-weight: 300;
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :hover {
    color: var(--active-color);
    transition: .5s;
  }
`;

const CardDescription = styled.p`
  font-size: .9rem!important;
  font-weight: 300;
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.time`
  color: white;
  font-size: 1rem;
  font-weight: 300;
`;

const StackTagsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  height: auto;
  width: auto;
`;

export default index;
