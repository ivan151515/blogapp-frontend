import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Profile } from "../types/profile";

interface Props {
    user : Profile
}

const UserProfileInfo = ({user}: Props) => {
    console.log(user)
    return ( 
        <Card sx={{ maxWidth: 720, minWidth: 360 }}>
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
        <Typography textAlign={"center"} variant="h6" color="text.secondary">
          Username: {user.name}
        </Typography>
        <Typography>
            Bio: {user.bio ? user.bio : "User has not updated their bio yet"}
        </Typography>
        <Typography>
            Occupation: {user.occupation ? user.occupation : "User has not updated their occupation yet"}
        </Typography>
        <Typography>
            Age: {user.age ? user.age : "User has not updated their age yet"}
        </Typography>
      </CardContent>
    
    </Card>
     );
}
 
export default UserProfileInfo;