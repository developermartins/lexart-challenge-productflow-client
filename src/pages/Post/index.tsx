import styled from 'styled-components';
import Nav from '../../components/Nav';
import PostPreview from '../../components/PostPreview';

type Props = {}

const index = (props: Props) => {
  return (
    <MainSection>

      <Box>

        <Nav />

        <ContentBox>

          <PostPreview />

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
  flex-direction: column;
  margin-left: 1rem;
`;

export default index;