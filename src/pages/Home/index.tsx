import styled from 'styled-components';
import Nav from '../../components/Nav';
import Card from '../../components/Card';
import Filter from '../../components/Filter';

import { AnimatePresence, motion } from 'framer-motion';
import { getPortfolioPost } from '../../api/projects';
import { ThreeCircles } from "react-loader-spinner";
import { getBlogPost } from '../../api/blog';
import { useEffect, useState } from 'react';
import { getDraft } from '../../api/draft';

type Props = {}

const index = (props: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('posts');
  const [data, setData] = useState({
    blogPosts: [],
    portfolio: [],
    drafts: [],
  });

  useEffect(() => {

    const loadData = async () => {
      setIsLoading(true);

      const [
        posts,
        projects,
        drafts
      ] = await Promise.all([
        getBlogPost(),
        getPortfolioPost(),
        getDraft(),
      ]);

      setData({
        blogPosts: posts.data,
        portfolio: projects.data,
        drafts: drafts.data
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <MainSection>
      <MainBox>
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

          <Top>
            <h1>Overview</h1>

            <Filter
              data={ data }
              setFiltered={ setFiltered }
              activeFilter={ activeFilter }
              setActiveFilter={ setActiveFilter }
            />
          </Top>

          <Bottom>
            {
              isLoading ? 
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

              <AnimatePresence>
                {
                  !filtered.length ? <p>Nothing yet...</p> :
                  filtered?.map((data) => (
                    <Card
                      path={ activeFilter === 'posts' ? '/post-preview/post/' : '/project-preview/project/' }
                      cardContent={ data }
                      filtered={ filtered }
                      setFiltered={ setFiltered }
                      activeFilter={ activeFilter }
                    />
                  ))
                }
              </AnimatePresence>
            }
          </Bottom>

        </ContentBox>
      </MainBox>
    </MainSection>
  );
};

const MainSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainBox = styled.section`
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
  margin-left: .5rem;
  background-color: var(--card-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  padding: .5rem;
  /* justify-content: space-around; */
`;

const Top = styled.div`
  width: 100%;
  height: 15.313rem;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 15px;
  background-image: url('/static/images/home-banner.jpg');
  background-position: center;
  background-size: cover;
  position: relative;

  h1 {
    font-size: 2.5rem;
    font-weight: 300;
    top: -45px;
    left: 25px;
    position: absolute;
    z-index: 9999;
  }

  ::before {
    content: '';
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 15.313rem;
    background: rgba(0, 0, 0, 0.40);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 35px;
    border-bottom-right-radius: 15px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: 39.563rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  margin-top: 1rem;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 35px;
  background-color: var(--main-box);

  h1 {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: .8rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 39.563rem;
  background-color: var(--main-button);
  border-radius: 15px;
  margin-left: 1.5rem;
  cursor: pointer;
`;

export default index;
