import styled from "styled-components";
import Nav from '../../components/Nav';
import Input from "../../components/Input";
import Button from '../../components/Button';

import { addProduct, getProductById, updateProduct } from "../../api/products";
import { productValidationSchema } from "../../schemas/validationSchemas";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreeCircles } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ProductData } from "../../types";
import { motion } from "framer-motion";

type SelectedProductFormat = {
  productType: String
};

type productFormData = ProductData;

const index = () => {

  const [productType, setProductType] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: any) => state.token);
  const navigate = useNavigate();
  const location = useLocation();
  const pageMode = location.pathname.split('/')[1];
  const productId = location.pathname.split('/')[3];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<productFormData>({
    resolver: zodResolver(productValidationSchema)
  });

  const makeProductSchema = async (data: productFormData) => {

    setIsLoading(true);

    let productSchema = {};

    if (productType === 'detailed') {
      productSchema = {
        name: data.name,
        details: {
          brand: data.brand,
          model: data.model,
          color: data.color,
        },
        price: data.price,
      };
      
    } else if (productType === 'productWithOptions') {

    } else {
      productSchema = {
        name: data.name,
        brand: data.brand,
        model: data.model,
        price: data.price,
        color: data.color,
      };
    }

    if (pageMode === 'update') {
      const updateProductResponse = await updateProduct(productId, productSchema, token);

      if (updateProductResponse.status === 200) {
        setIsLoading(false);
        // navigate(`/product-preview/product/${productId}`);
        navigate('/home')
        reset();
      };

    } else {

      const productResponse = await addProduct(productSchema, token);

      if (productResponse.status === 201) {
        setIsLoading(false);
        navigate("/home");
        reset();
      };
    };
  };

  useEffect(() => {
    if(pageMode === 'update') {
      const productToUpdate = async () => {
        const res = await getProductById(productId, token);

        const fields = ["name", "brand", "model", "price", "color"]

        fields.forEach((field: any) => setValue(field, res.data[field]));
      };

      productToUpdate();
    };
  }, []);

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
            <Header>
              { pageMode === 'update' ? 'Update a product' : 'Add a product'}
            </Header>
          </HeaderContainer>

          <OptionsContainer>
            <BasicProductOptionBtn
              productType={ productType }
              as={ motion.button }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              onClick={() => setProductType("default")}
            >
              Add default product
            </BasicProductOptionBtn>
            <DetailedProductOptionBtn
              productType={ productType }
              as={ motion.button }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              onClick={() => setProductType("detailed")}
            >
              Add detailed product
            </DetailedProductOptionBtn>
            <ProductOptionByPriceAndColorBtn
              productType={ productType }
              as={ motion.button }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              onClick={() => setProductType("productWithOptions")}
            >
              Add product with price & color
            </ProductOptionByPriceAndColorBtn>
          </OptionsContainer>

          {
            productType === 'default' &&
            
            <Form onSubmit={ handleSubmit(makeProductSchema) }>

            <Input
              type={ 'text' }
              placeholder={ 'Name' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('name') }
              inputError={ errors.name }
              errorMessage={ errors?.name?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Brand' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('brand') }
              inputError={ errors.brand }
              errorMessage={ errors?.brand?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Model' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('model') }
              inputError={ errors.model }
              errorMessage={ errors?.model?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Price' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('price') }
              inputError={ errors.price }
              errorMessage={ errors?.price?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Color' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('color') }
              inputError={ errors.color }
              errorMessage={ errors?.color?.message }
            />

            <ButtonsContainer>
              { isLoading ?
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
                <Button
                  typeButton={ "submit" }
                  buttonFunction={() => ''}
                  content={"Add product"}
                />
              }
            </ButtonsContainer>
            </Form>
          }


          {
            productType === 'detailed' &&
            
            <Form onSubmit={ handleSubmit(makeProductSchema) }>

            <Input
              type={ 'text' }
              placeholder={ 'Name' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('name') }
              inputError={ errors.name }
              errorMessage={ errors?.name?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Price' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('price') }
              inputError={ errors.price }
              errorMessage={ errors?.price?.message }
            />

            <LabelContainer>
              <Label>Product details</Label>
            </LabelContainer>

            <Input
              type={ 'text' }
              placeholder={ 'Brand' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('brand') }
              inputError={ errors.brand }
              errorMessage={ errors?.brand?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Model' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('model') }
              inputError={ errors.model }
              errorMessage={ errors?.model?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Color' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('color') }
              inputError={ errors.color }
              errorMessage={ errors?.color?.message }
            />

            <ButtonsContainer>
              { isLoading ?
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
                <Button
                  typeButton={ "submit" }
                  buttonFunction={() => ''}
                  content={"Add product"}
                />
              }
            </ButtonsContainer>
            </Form>
          }

          {
            productType === 'productWithOptions' &&
            
            <Form onSubmit={ handleSubmit(makeProductSchema) }>

            <Input
              type={ 'text' }
              placeholder={ 'Name' }
              borderTopRightRadius={ '25px' }
              borderTopLeftRadius={ '25px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('name') }
              inputError={ errors.name }
              errorMessage={ errors?.name?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Brand' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('brand') }
              inputError={ errors.brand }
              errorMessage={ errors?.brand?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Model' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('model') }
              inputError={ errors.model }
              errorMessage={ errors?.model?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Price' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '5px' }
              borderBottomLeftRadius={ '5px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('price') }
              inputError={ errors.price }
              errorMessage={ errors?.price?.message }
            />

            <Input
              type={ 'text' }
              placeholder={ 'Color' }
              borderTopRightRadius={ '5px' }
              borderTopLeftRadius={ '5px' }
              borderBottomRightRadius={ '25px' }
              borderBottomLeftRadius={ '25px' }
              padding={ '1.5rem' }
              width={ '48.563rem' }
              marginBottom={ '.2rem' }
              useFormRegister={ register('color') }
              inputError={ errors.color }
              errorMessage={ errors?.color?.message }
            />

            <ButtonsContainer>
              { isLoading ?
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
                <Button
                  typeButton={ "submit" }
                  buttonFunction={() => ''}
                  content={"Add product"}
                />
              }
            </ButtonsContainer>
            </Form>
          }


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
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  margin-left: .5rem;
  overflow-y: scroll;
  background-color: var(--card-color);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: .8rem;
  margin-left: 3rem;
`;

const Form = styled.form`
  width: 80rem;
  height: 55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const ButtonsContainer = styled.div`
  width: 52rem;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 2rem;
  background-color: var(--main-button);
  border-radius: 15px;
  margin-left: 1.5rem;
  cursor: pointer;
`;

const OptionsContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

const BasicProductOptionBtn = styled.button<SelectedProductFormat>`
  border: none;
  outline: none;
  padding: .8rem;
  border-top-right-radius: 6px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 12px;
  background-color: var(--main-button);
  cursor: pointer;
  color: ${({ productType }) => productType === 'default' ?  'var(--active-color)'  : 'var(--main-font-color)'};

  :hover {
    color: var(--active-color);
  }
`;

const DetailedProductOptionBtn = styled.button<SelectedProductFormat>`
  border: none;
  outline: none;
  padding: .8rem;
  margin-left: .2rem;
  margin-right: .2rem;
  border-radius: 6px;
  background-color: var(--main-button);
  cursor: pointer;
  color: ${({ productType }) => productType === 'detailed' ?  'var(--active-color)'  : 'var(--main-font-color)'};

  :hover {
    color: var(--active-color);
  }
`;

const ProductOptionByPriceAndColorBtn = styled.button<SelectedProductFormat>`
  border: none;
  outline: none;
  padding: .8rem;
  border-top-right-radius: 12px;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 6px;
  background-color: var(--main-button);
  cursor: pointer;
  color: ${({ productType }) => productType === 'productWithOptions' ?  'var(--active-color)'  : 'var(--main-font-color)'};

  :hover {
    color: var(--active-color);
  }
`;

const LabelContainer = styled.div`
  width: 62%;
  margin-top: .8rem;
  margin-bottom: .8rem;
`;

const Label = styled.label`
  font-size: 1rem;
`;

export default index;
