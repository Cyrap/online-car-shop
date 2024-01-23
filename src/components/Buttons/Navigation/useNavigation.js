import { useNavigate } from "react-router-dom";

const useNavigation = () =>{
  const navigate = useNavigate();

  const handleNavigation = (path) =>{
    navigate(`/Popup/${path.id}`);
  }

  return {handleNavigation}
}

export default useNavigation