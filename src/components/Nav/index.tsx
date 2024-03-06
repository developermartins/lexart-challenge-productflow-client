import styled from "styled-components";
import Menu from '../../components/Menu';
import CodeIcon from '@mui/icons-material/Code';
import settingsIcon from '../../assets/settings.png';
import logo from "../../assets/martscode-base-logo.png";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Face6RoundedIcon from '@mui/icons-material/Face6Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

import { motion, AnimatePresence } from "framer-motion";
import { makeLogout } from "../../state/state";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

type Props = {}

const index = (props: Props) => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Top>
        <Logo src={ logo } alt="Hero-logo" />
        <LogoutButton
          as={ motion.button }
          whileHover={{ scale: 1.2 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10
          }}
          onClick={ () => dispatch(makeLogout()) }
        >
          <LogoutRoundedIcon style={{ fontSize: 'medium' }} />
        </LogoutButton>
      </Top>

      <NavBox>
        <LinksContainer
          as={ motion.div }
          transition={{ duration: 0.5 }}
        >
          <NavLink to={'/home'}>
            <HomeRoundedIcon style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}  />
            Home
          </NavLink>
          <NavLink to={'/write-post'}>
            <EditNoteRoundedIcon style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            Write post
          </NavLink>
          <NavLink to={'/write-project'}>
            <CodeIcon style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            Add a project
          </NavLink>
          <NavLink to={'/bio'}>
            <Face6RoundedIcon style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
            Bio
          </NavLink>
        </LinksContainer>
      </NavBox>

      <Bottom>
        <SettingsIcon
          src={ settingsIcon }
          as={ motion.img }
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          onClick={() => setOpen(!open) }
        />
      </Bottom>	
      <p>Developed by developermartins</p>
      <AnimatePresence>
        { open && <Menu /> }
      </AnimatePresence>
    </Nav>
  );
};

const Nav = styled.nav`
  height: 55rem;
  width: 18rem;
  background-color: var(--card-color);
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  flex-direction: column;
  position: relative;

  hr {
    width: 80%;
    border: 1px solid var(--line-color);
  }

  p {
    color: var(--main-font-color);
    font-size: .6rem;
    margin-bottom: 2rem;
    cursor: pointer;
  }
`;

const Top = styled.div`
  margin-top: 4rem;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  width: 80%;
`;

const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SettingsIcon = styled.img`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const LogoutIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const NavBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: 2rem;
    margin-bottom: .8rem;
    color: var(--main-font-color);
    font-size: 1.3rem;
    font-weight: 300;
    transition: all .6s;
    width: 15rem;
    padding: 10px;
    position: relative;
  }

  a:hover {
    color: var(--active-color);
    transition-timing-function: ease-in-out;
  }

  a.active {
    color: var(--active-color);
    background-color: var(--main-box);
    border-top-left-radius: 90px;
    border-bottom-left-radius: 90px;
  }

  a.active::before {
    content: "";
    position: absolute;

    background-color: var(--main-color);
    bottom: 45px;
    right: 4px;
    height: 25px;
    width: 20px;
    border-bottom-right-radius: 90px;
    box-shadow: var(--main-box) 5px 8px 0px 0px;
  }

  a.active::after {
    content: "";
    position: absolute;

    background-color: white;
    height: 25px;
    width: 20px;
    right: 4px;
    bottom: -25px;
    border-top-right-radius: 90px;
    box-shadow: var(--main-box) 5px -8px 0px 0px;
    background-color: var(--main-color);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main-button);
  border: none;
  color: var(--main-font-color);
  margin-left: 2.7rem;
  padding: 0;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 100px;

  :hover {
    color: var(--delete-color);
  }
`;

export default index;
