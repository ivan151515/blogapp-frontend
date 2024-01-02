import { useQuery } from "react-query";
import { getUserProfile } from "../services/profile";
import { useParams } from "react-router-dom";


const Profile = () => {
    const {id} = useParams()
    const query = useQuery("profile", () => getUserProfile(id as string))

    if (query.isLoading) {
        return <div>lOADING....</div>
    }

    return ( <div>
        {JSON.stringify(query.data)}
    </div> );
}
 
export default Profile;