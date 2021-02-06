import React, { Component, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { UserContext } from '../UserContext';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const api = axios.create({
    baseURL: '/api'
})

export default function AddBook(props) {
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const [BookName, setBookName] = useState("");
    const [Comment, setComment] = useState("");
    const [AuthorName, setAuthorName] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let res = api.post('/Book/CreateBook', {
            BookName: BookName,
            AuthorName: AuthorName,
            Comment: Comment,
            Likes: 0,
            IDUser: user?.idUser
        }).then(res => {
            if (res.data.isSuccess)
                props.handlePost();

        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <Container maxWidth="lg" className="classes.blogsContainer">
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card >
                        <Container maxWidth="lg">
                            <Grid container justify="center" spacing={3}>
                                <form className={classes.form} noValidate
                                    onSubmit={onSubmitHandler}>
                                    <Grid>
                                        <TextField
                                            style={{ marginTop: "20px" }}
                                            required
                                            id="authorName"
                                            label="Author Name"
                                            name="AuthorName"
                                            value={AuthorName}
                                            onChange={(e) => setAuthorName(e.target.value)} />
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            style={{ marginTop: "20px" }}
                                            required
                                            id="bookName"
                                            label="Book's Name"
                                            name="BookName"
                                            value={BookName}
                                            onChange={(e) => setBookName(e.target.value)} />
                                    </Grid>

                                    <Grid container justify="center">
                                        <TextField
                                            style={{ marginTop: "20px" }}

                                            variant="outlined"
                                            id="text-area"
                                            label="Your Comment"
                                            multiline
                                            value={Comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={5}
                                        />
                                    </Grid>
                                    <Grid container justify="center" style={{ marginTop: "20px", marginBottom: "40px" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            onClick={onSubmitHandler}
                                        >Share</Button>
                                    </Grid>

                                </form>
                            </Grid>
                        </Container>
                    </Card>
                </Grid>
            </Grid>
        </Container>

    )
}
