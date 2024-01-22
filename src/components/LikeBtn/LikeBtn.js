import { collection } from "firebase/firestore";
import { useFirebase } from "../../config/FirebaseContext";
import { useUser } from "../../config/UserProvider";
import { addDoc } from "firebase/firestore";

const LikeBtn = (e) =>{
    const postId = e.e;
    console.log(postId)
    const user = useUser();
    const {db} = useFirebase();
    const LikeRef = collection(db,"InterestedCars");
    const userId = user?.uid;

    const postLike = {
        CarId: postId,
        UserId: userId,
    }
    

    const Like = async ()=>{
        try{
            await addDoc(LikeRef, postLike);
            alert("function called")
        }catch(err){
            alert(err);
        }
    }


    return (
        <button onClick={Like}>Like</button>
    )
}

export default LikeBtn;