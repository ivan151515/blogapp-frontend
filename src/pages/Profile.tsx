import { useQuery } from "react-query";
import { getUserProfile } from "../services/profile";
import { useParams } from "react-router-dom";
import { Grid, Typography} from "@mui/material";
import BlogCard from "../components/BlogCard";
import UserProfileInfo from "../components/UserProfileInfo";
import { useUserValue } from "../context/UserContextHooks";
import EditProfile from "../components/EditProfile";
import AddBlogPostForm from "../components/AddBlogPostForm";

const Profile = () => {
    const {id} = useParams()
    const user = useUserValue()
    const query = useQuery(["profile", id], () => getUserProfile(id as string), {
        refetchOnWindowFocus: "always",
        
    })

    if (query.isLoading) {
        return <div>lOADING....</div>
    }

    if (query.isError) {
        return <div>Something went wrong</div>
    }

    if (query.data) {
        return ( <Grid container spacing={2}>
            <Grid item xs={8} >
                {(user.id == Number(id)) && <AddBlogPostForm />}
                <Typography variant="h5" margin={2}  textAlign={"center"}>Blogs published by {query.data.name}</Typography>
                {query.data?.blogs?.map(b => <BlogCard blog={b} key={b.id}/>)}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" margin={2}  textAlign={"center"}>Profile info</Typography>
              <UserProfileInfo user={query.data} />
              {query.data.id == user.id && <EditProfile />}
            </Grid>
          </Grid>);
    }
    }
    
 
export default Profile;