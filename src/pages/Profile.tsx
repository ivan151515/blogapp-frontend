import { useQuery } from "react-query";
import { getUserProfile } from "../services/profile";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import BlogCard from "../components/blog/BlogCard";
import UserProfileInfo from "../components/profile/UserProfileInfo";
import { useUserValue } from "../context/UserContextHooks";
import EditProfile from "../components/profile/EditProfile";
import AddBlogPostForm from "../components/blog/AddBlogPostForm";

const Profile = () => {
  const { id } = useParams();
  const user = useUserValue();
  const query = useQuery(["profile", id], () => getUserProfile(id as string), {
    refetchOnWindowFocus: "always",
  });

  if (query.isLoading) {
    return <div>lOADING....</div>;
  }

  if (query.isError) {
    return <div>Something went wrong</div>;
  }

  if (query.data) {
    return (
      <Grid container spacing={2} direction={"row-reverse"}>
        <Grid
          item
          xs={12}
          md={6}
          container
          spacing={0}
          direction="column"
          alignItems="center"
        >
          <Typography variant="h5" margin={2} textAlign={"center"}>
            Profile info
          </Typography>
          <UserProfileInfo user={query.data} />
          {query.data.id == user.id && <EditProfile />}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          spacing={0}
          direction="column"
          alignItems="center"
        >
          <Typography variant="h5" margin={2} textAlign={"center"}>
            Blogs published by {query.data.name}
          </Typography>
          {query.data?.blogs?.map((b) => (
            <BlogCard blog={{ ...b, user: query.data }} key={b.id} />
          ))}
          {user.id == Number(id) && <AddBlogPostForm />}
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
