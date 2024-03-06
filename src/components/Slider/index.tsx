import styled from 'styled-components';
import Card from '../../components/Card';

import { motion } from 'framer-motion';
import { PostData } from '../../types';
import { To } from 'react-router-dom';
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useRef, useState } from 'react';

type Props = {
  content: Array<PostData>
  loading: Boolean
  path: To
}

const index = ({ loading, path, content }: Props) => {

  const [width, setWidth] = useState(0);
  const slider = useRef(document.createElement("div"));

  useEffect(() => {
    setWidth(slider.current.scrollWidth - slider.current.offsetWidth)
  }, [loading, slider.current]);

  return (
    <Slider as={ motion.div } ref={ slider } whileTap={{ cursor: "grabbing" }}>
      <SliderContainer
        as={ motion.div }
        loading={ loading ? loading.toString() : undefined }
        drag='x'
        dragConstraints={{ right: 0, left: -width }}
      > 
        { loading ?
          <ThreeCircles
            height="30"
            width="30"
            color="#06b6d4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#06b6d4"
            innerCircleColor="#22d3ee"
            middleCircleColor="#67e8f9"
          /> : content?.map((data) => (
                // <Card
                //   path={ `${ path }${ data._id }` }
                //   cardContent={ data }
                // />

                <></>
              ))
        }
      </SliderContainer>
    </Slider>
  );
};

const Slider = styled.div<{ ref: any }>`
  width: 90rem;
  height: 20rem;
  background-color: var(--main-color);
  border-radius: 35px;
  display: flex;
  cursor: grab;
  overflow: hidden;
`; 

const SliderContainer = styled.div<{ loading: String | undefined }>`
  display: flex;
  align-items: center;
  justify-content: ${({ loading }) => loading === 'true' ? 'center' : ''};
  min-width: ${({ loading }) => loading === 'true' ? '100%' : '30rem'};
`;

export default index;
