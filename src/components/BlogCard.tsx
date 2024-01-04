import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Blog } from '../types/blog';
import { Link, useNavigate } from 'react-router-dom';
import { CardActions, IconButton } from '@mui/material';
import { ChatBubble, Remove } from '@mui/icons-material';
import { useUserValue } from '../context/UserContextHooks';

interface Props {
    blog: Blog
}

export default function BlogCard(props: Props) {
  const user = useUserValue()
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 720, minWidth: 360 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" component={Link} to={"/user/"+ props.blog.userId}>
            {props.blog.user?.name[0]}
          </Avatar>
        }
        
        title="BlogTitle"
        subheader={props.blog.date || "03-01-2024"}
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.blog.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="view comments" onClick={() => navigate("/blog/"+ props.blog.id)}>
            <ChatBubble />
        </IconButton>
        {props.blog.userId == user.id && 
                <IconButton aria-label="view comments" onClick={()=> console.log("delete")}>
                    <Remove />
                </IconButton>}
        </CardActions>

    </Card>
  );
}
