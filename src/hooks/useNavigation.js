import React from "react";
import { useNavigate } from "react-router-dom";

const useNavigation = () =>{
  const navigate = useNavigate();

  const handleNavigation = (path) =>{
    if(path == undefined){
      alert("path not resived eyet")
    }else{
      navigate(`/Popup/${path.id}`);
    }
  }

  return {handleNavigation}
}

export default useNavigation