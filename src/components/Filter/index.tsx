import { SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import { getProductByOthers } from "../../api/products";

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styled from "styled-components";

type Props = {
  data: any,
  setFiltered: Function,
  setIsLoading: Function,
}

const index = ({ data, setFiltered, setIsLoading }: Props) => {
  
  const token = useSelector((state: any) => state.token);
  const [ search, setSearch ] = useState('');

  const searchProduct = async () => {
    
    setIsLoading(true);
    
    const searchResult = await getProductByOthers(search, token);
    
    setFiltered(searchResult.data)
    
    setIsLoading(false);
    setSearch('');
  };

  const handleChange = (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const refreshSearch = () => {
    location.reload();
  };

  return (
    <FilterContainer>
      <SearchInput
        placeholder="Search products by name, model, brand"
        value={ search }
        onChange={ handleChange }
      />
      <I onClick={ () => { searchProduct() } }>{ <SearchRoundedIcon /> }</I>

      <RefreshButon
        onClick={() => { refreshSearch() }}
      >
        <RefreshRoundedIcon />
      </RefreshButon>
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
  width: 40rem;
  height: 4.188rem;
  border-radius: 40px;
  padding: .5rem;
  background-color: var(--transparent-main-color);
  backdrop-filter: blur(10px);
  z-index: 9999;

  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  width: 85%;
  height: 3.2rem;
  border-top-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 20px;
  border: none;
  outline: none;
  background-color: var(--main-box);
  color: var(--main-fontColor);
  padding-left: 1rem;
  position: relative;

  ::placeholder {
    color: var(--main-fontColor);
  }
`; 

const I = styled.i`
  position: absolute;
  right: 6rem;
  cursor: pointer;

  :hover {
    color: var(--active-color);
    transition: .5s;
  }
`;

const RefreshButon = styled.button`
  height: 3.2rem;
  width: 10%;
  border-top-right-radius: 20px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 8px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: var(--main-box);
  color: var(--main-fontColor);

  :hover {
    color: var(--active-color);
    transition: .5s;
  }
`;

export default index;
