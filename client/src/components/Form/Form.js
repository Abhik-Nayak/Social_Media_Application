
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from '../../actions/posts';

const Form = (currentId) => {
  const [postData, setPostdata] = useState({ creator: '', title: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId.currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(currentId);

  useEffect(() => {
    if (post) setPostdata(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentId.currentId) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId.currentId, postData));
      clear();
    }
  }

  const clear = () => {
    setPostdata({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    currentId.setCurrentId(null);
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes}`} onSubmit={handleSubmit}>
        <Typography varient="h6">{currentId.currentId ? "Editing a Memory" : "Creating a Memory"} </Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostdata({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostdata({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostdata({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostdata({ ...postData, tags: e.target.value.split(",") })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} value={postData.selectedFile} onDone={({ base64 }) => setPostdata({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form