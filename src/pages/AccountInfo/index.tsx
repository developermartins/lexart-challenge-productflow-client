import styled from "styled-components";
import Nav from '../../components/Nav';
import Password from '../../assets/user.png';
import FeedbackToast from '../../components/FeedbackToast';
import UpdateEmailForm from '../../components/UpdateEmailForm';
import UpdateUsernameForm from '../../components/UpdateUsernameForm';

import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

type Props = {}

const index = (props: Props) => {

  const [isUpdating, setIsUpdating] = useState(false);
  const [show, setShow] = useState(false);

  const token = useSelector((state: any) => state.token);
  const id = useSelector((state: any) => state.user._id);

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
            <Header>Update account</Header>
            <HeaderIcon src={ Password } />
          </HeaderContainer>

          <ProfileImageBackground>

          </ProfileImageBackground>

          <FormWrapper>
            <UpdateEmailForm
              setIsUpdating={ setIsUpdating }
              setShow={ setShow }
              id={ id }
              token={ token }
              isUpdating={ isUpdating }
            />

            <UpdateUsernameForm
              setIsUpdating={ setIsUpdating }
              setShow={ setShow }
              id={ id }
              token={ token }
              isUpdating={ isUpdating }
            />
          </FormWrapper>


          <AnimatePresence>
            { show &&
              <FeedbackToast setShow={ setShow } />
            }
          </AnimatePresence>
        </ContentBox>

      </Box>
    </MainSection>
  );
};

export default index;

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
  margin-left: .5rem;
  background-color: var(--card-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
`;

const ProfileImageBackground = styled.div`
  width: 12.438rem;
  height: 6.75rem;
  position: absolute;
  top: 16rem;
  right: 7rem;
  border-radius: 25px;
  background-image: url('/static/images/profile-wallpaper.png');
  background-position: center;
  background-size: cover;
  outline: 10px solid var(--main-box);
  cursor: pointer;
  z-index: 9999;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin-bottom: 5rem;
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
