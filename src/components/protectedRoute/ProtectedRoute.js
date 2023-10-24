import { useAppDispatch } from '../../app/hooks';
import { checkAuthorityAsync } from './Slice';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // if (!user) {
  //   return <Navigate to='/' />;
  // }
  return children;
};
export default ProtectedRoute;
