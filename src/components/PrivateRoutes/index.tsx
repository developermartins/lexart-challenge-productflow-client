import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

type Props = {};

type state = {
  user?: object | null,
  token?: string | null,
};

const index = ({}: Props) => {

  const token = useSelector((state: state) => state.token);

  let auth = { 'token': token }

  return (
    auth.token ? <Outlet /> : <Navigate to="/" />
  );
};

export default index;
