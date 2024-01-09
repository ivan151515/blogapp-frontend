import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useUserValue } from "../../context/UserContextHooks";
import { User } from "../../types/user";

interface Props {
  user: User;
}

const UserProfileInfo = ({ user }: Props) => {
  console.log(user);
  const authUser = useUserValue();
  if (!user.profile) {
    return <div>ERROR</div>;
  }
  return (
    <Card sx={{ width: "75%", minWidth: "120px", marginBottom: "15px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
            {user.name[0]}
          </Avatar>
        }
        title={user.username}
        subheader={"03-01-2024"}
      />
      <CardContent>
        <Typography variant="overline">Username: {user.name}</Typography>
        <Typography>
          Bio:{" "}
          {user.profile.bio
            ? user.profile.bio
            : (authUser.id == user.id ? "You have" : "User has") +
              " not updated bio yet"}
        </Typography>
        <Typography>
          Occupation:{" "}
          {user.profile.occupation
            ? user.profile.occupation
            : (authUser.id == user.id ? "You have" : "User has") +
              " not updated occupation yet"}
        </Typography>
        <Typography>
          Age:{" "}
          {user.profile.age
            ? user.profile.age
            : (authUser.id == user.id ? "You have" : "User has") +
              " not updated age yet"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfileInfo;
