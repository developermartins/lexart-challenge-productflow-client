import { useEffect } from "react";
import { motion } from "framer-motion";

import styled from "styled-components";

type SelectedFilter = {
  activeFilter: String,
}

type Props = {
  data: { blogPosts: Array<Object>, portfolio: Array<Object>, drafts: Array<object> },
  setFiltered: Function,
  activeFilter: String,
  setActiveFilter: Function
}

const index = ({ data, setFiltered, activeFilter, setActiveFilter }: Props) => {

  useEffect(() => {
    if (activeFilter === 'posts') {
      setFiltered(data.blogPosts);
    } else if (activeFilter === 'portfolio') {
      setFiltered(data.portfolio);
    } else if (activeFilter === 'drafts') {
      setFiltered(data.drafts);
    } else {
      return;
    }

  }, [setFiltered, activeFilter, data]);


  return (
    <FilterContainer>
      <PostsBtn
        as={ motion.div }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
        activeFilter={ activeFilter }
        onClick={(e) => setActiveFilter('posts')}
      >
        <p>Blog Posts</p>
      </PostsBtn>

      <ProjectsBtn
        as={ motion.div }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
        activeFilter={ activeFilter }
        onClick={(e) => setActiveFilter('portfolio')}
      >
        <p>Projects</p>
      </ProjectsBtn>

      <DraftsBtn
        as={ motion.div }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10
        }}
        activeFilter={ activeFilter }
        onClick={(e) => setActiveFilter('drafts')}
      >
        <p>Drafts</p>
      </DraftsBtn>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 135px;
  right: 35px;
  width: 20.063rem;
  height: 4.188rem;
  border-radius: 40px;
  padding: .5rem;
  background-color: var(--transparent-main-color);
  backdrop-filter: blur(10px);
  z-index: 9999;
`;

const PostsBtn = styled.div<SelectedFilter>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  height: 3.375rem;
  background-color: ${({ activeFilter }) => activeFilter === 'posts' ? 'var(--active-color)' : 'var(--main-button)'};
  color: ${({ activeFilter }) => activeFilter === 'posts' && 'var(--main-color)'};
  border:  ${({ activeFilter }) => activeFilter === 'posts' && '3px solid var(--deep-purple)'};
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

const ProjectsBtn = styled.div<SelectedFilter>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.313rem;
  height: 3.375rem;
  background-color: ${({ activeFilter }) => activeFilter === 'portfolio' ? 'var(--active-color)' : 'var(--main-button)'};
  color: ${({ activeFilter }) => activeFilter === 'portfolio' && 'var(--main-color)'};
  border:  ${({ activeFilter }) => activeFilter === 'portfolio' && '3px solid var(--deep-purple)'};
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: var(--active-color);
    color: var(--main-color);
  }
`;

const DraftsBtn = styled.div<SelectedFilter>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  height: 3.375rem;
  background-color: ${({ activeFilter }) => activeFilter === 'drafts' ? 'var(--active-color)' : 'var(--main-button)'};
  color: ${({ activeFilter }) => activeFilter === 'drafts' && 'var(--main-color)'};
  border:  ${({ activeFilter }) => activeFilter === 'drafts' && '3px solid var(--deep-purple)'};
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

export default index;
