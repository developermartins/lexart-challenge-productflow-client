import PostMenu from '../PostMenu';
import styled from 'styled-components';

import { ProductData, styleTypes } from '../../types';
import { deleteProduct } from '../../api/products';
import { useNavigate } from 'react-router-dom';
import { Link, To } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

interface Props extends styleTypes {
  cardContent: ProductData,
  path: To,
  filtered: any,
  setFiltered: Function, 
  activeFilter: string,
};

const index = ({ path, cardContent, filtered, setFiltered, activeFilter }: Props) => {

  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  let details: any = {};
  let productVariationsList: any = [];

  if (cardContent.details) {
    const parsedData = JSON.parse(cardContent?.details);

    details = parsedData
  };

  if (cardContent.data) {
    const parsedData = JSON.parse(cardContent?.data);

    productVariationsList = parsedData
  }

  const handleDiscart = async () => {

    const res = await deleteProduct(cardContent.id, token);

    if (res.status === 200) {
      const updatedCardList = filtered.filter((data: any) => data.id !== cardContent.id);

      setFiltered(updatedCardList);
    }
  };

  return (
    <Card
      as={ motion.div }
      key={ cardContent.id }
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
      <Link to={`/home` } style={{ textDecoration: 'none', color: 'var(--main-font-color)' }}>
        <CardTitle>{ cardContent.name }</CardTitle>
      </Link>

      <CardDescription>
        <>
          {
            !cardContent.details && !cardContent.data && (
              <>
                <span>Model: { cardContent.model }</span>
                <span>Brand: { cardContent.brand }</span>
                <span>Price: { cardContent && new Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(cardContent.price!)) }</span>
                <span>Color: { cardContent.color }</span>
              </>
            )
          }
        </>        

        <>
          {
            cardContent?.details ? (
              <>
                <span>Price: { new Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(cardContent.price!)) }</span>
                <span>Brand: { details.brand }</span>
                <span>Model: { details.model }</span>
                <span>Color: { details.color }</span>
              </>
            ) : (
                productVariationsList.map((variation: any) => (
                  <>
                    <span>Price: { new Intl.NumberFormat('BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(variation.price!)) }</span>
                    <span>Color: { variation.color }</span>
                  </>
                )
              )
            )
          }
        </>
      </CardDescription>

      <p>
        <Time dateTime={ new Date(cardContent?.createdAt).toDateString() }>
          { new Date(cardContent?.createdAt).toDateString() }
        </Time>
      </p>

      <PostMenu
        deleteFunction={ () => handleDiscart() }
        updateFunction={ () => navigate(`/update/update-project/${ cardContent.id }`) }
        typeButton='button'
      />
    </Card>
  );
};

const Card = styled.div`
  width: 95%;
  height: 8rem;
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
  max-height: 15ch;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.time`
  color: white;
  font-size: 1rem;
  font-weight: 300;
`;

export default index;
