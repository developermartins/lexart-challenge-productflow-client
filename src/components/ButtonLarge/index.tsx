import { Link, To } from 'react-router-dom';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import styled from "styled-components";

type styleTypes = {
  customBorder?: string
};

interface Props extends styleTypes {
  content: String,
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  path: To,
}

const index = ({ content, Icon, path, customBorder }: Props) => {
  return (
    <Link to={ path } style={{ textDecoration: 'none' }}>
      <Button customBorder={ customBorder }>
        <ContentButton>
          <Icon style={{ marginTop: '.2rem' }} />
          <Paragraph>{ content }</Paragraph>
        </ContentButton>
      </Button>
    </Link>
  );
};

export default index;

const Button = styled.div<styleTypes>`
  width: 20rem;
  height: 5rem;
  background-color: var(--main-button);
  border-radius: ${({ customBorder }) => customBorder ? customBorder : '1.8rem'};
  margin-top: .2rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  transition: all .6s;
  color: var(--main-font-color);

  :hover {
    background-color: var(--card-smooth-color);
    transition-timing-function: ease-in-out;
  }
`;

const ContentButton = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  margin-left: 1.5rem;
`;

const Paragraph = styled.p`
  margin-left: 1rem;
  cursor: pointer;
`;