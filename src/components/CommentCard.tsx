import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Comment } from '../types/comment';
import { Link } from 'react-router-dom';
import { CardActions, IconButton, Tooltip } from '@mui/material';
import {  Delete } from '@mui/icons-material';
import { useUserValue } from '../context/UserContextHooks';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment } from '../services/comment';

interface Props {
    comment: Comment
}

export default function CommentCard(props: Props) {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () =>  deleteComment(props.comment.blogId, user.token, props.comment.id as number),

    onSuccess: () => queryClient.invalidateQueries({predicate: query =>
        (query.queryKey[0] == "blog" && query.queryKey[1] === String(props.comment.blogId))
  }),})
  const handleDelete = () => {
    mutation.mutate()
  }
  return (
    <Card  sx={{ marginTop: ".3rem", maxWidth: 540, minWidth: 240}}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" component={Link} to={"/user/"+ props.comment.userId}>
            {props.comment.user?.name[0]}
          </Avatar>
        }
        
        title={"comment by "+ props.comment.user?.name}
        
        
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.comment.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.comment.userId == user.id && 
                <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Tooltip>}
        </CardActions>

    </Card>
  );
}
