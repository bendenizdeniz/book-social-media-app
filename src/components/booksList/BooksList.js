import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { red } from '@material-ui/core/colors';
import axios from 'axios';
import AddBook from '../addBook/AddBook';
import { UserContext } from '../UserContext';
import './Card.css';
import PrimarySearchAppBar from '../root/PrimarySearchAppBar';

const useStyles = makeStyles((theme) => ({

    hero: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('https://gidivermek.com/wp-content/uploads/amazing-old-book-high-resolution-wallpaper-download-free-1-1.jpg')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "6rem",
        fontFamily: 'Garamond',
        fontStyle: 'italic'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    card: {
        maxWidth: "100p%",
    },
    root2: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

const api = axios.create({
    baseURL: '/api'
})

function BooksList() {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [books, setBooks] = useState([]);
    const [Likes, setLikes] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [BooksUsers, setBooksUsers] = useState([]);
    const [gender, setGender] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [isChangedPosts, setIsChangedPosts] = useState(false);
    const [IDUser, setIDUser] = useState('');
    const [IDBook, setIDBook] = useState('');
    const [readedUser, setReadedUser] = useState('');
    const [ListWhoLiked, setListWhoLiked] = useState([]);
    const [ListWhoRead, setListWhoRead] = useState([]);
    const [LikedBook, setLikedBook] = useState([]);
    const [urlMen, setUrlMen] = useState('https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png');
    const [urlWomen, setUrlWomen] = useState('https://icons-for-free.com/iconfiles/png/512/lady+user+woman+icon-1320166737958685846.png');

    // useEffect(() => {
    //     api.get('/Book/GetAllBooks')
    //         .then(res => {
    //             setBooks(res.data);

    //         }).catch(err => {
    //             console.log(err);
    //         })
    // }, []);

    const getAllBooks = () => {
        api.get('/Book/GetAllBooks')
            .then(res => {
                setBooks(res.data);

            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        api.get('/Book/GetAllBooks')
            .then(res => {
                setBooks(res.data);

            }).catch(err => {
                console.log(err);
            })
    }, [trigger]);

    const handlePost = () => {
        setTrigger(!trigger);
    }

    const handleExpandClick = (id) => {
        setExpanded(!expanded);

        axios.all([
            api.get('Book/GetWhoLiked/' + id),
            api.get('Book/GetWhoRead/' + id)
        ]).then(res => {
            setListWhoLiked(res[0].data);
            setListWhoRead(res[1].data);
        })

        // let res = api.get('Book/GetWhoLiked/' + id)
        //     .then(res => {
        //         console.log("Like: " + res.data);
        //         setListWhoLiked(res.data);
        //     })


        // let res2 = api.get('Book/GetWhoRead/' + id)
        //     .then(res => {
        //         console.log("Read: " + res.data);
        //         setListWhoRead(res.data);
        //     })

    };

    const handleLikes = (id) => {
        let res = api.post('/Book/LikeBook', {
            IDUser: user.idUser,
            IDBook: id
        }).then(res => {
            if (res.data.isSuccess) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err);
        }
        );
    };

    const handleReads = (id) => {

        let res = api.get('/User/GetUserById/' + user.idUser)
            .then(res => {
                //setReadedUser(res.data.name)
                setReadedUser(res.data.name);
            }).catch(err => {
                console.log(err);
            })

        api.post('/Book/ReadBook', {
            IDBook: id,
            IDUser: user.idUser,
            Name: readedUser

        }).then(res => {
            if (res.data.isSuccess) {
                console.log(res.data);
            }
        }).catch(err => {
            console.log(err);
        }
        );
    };

    const handleSortChange = (e) => {
        // console.log(e.target.value);
        // if (e.target.value == 'asc') {
            setBooks(books.sort((a, b) => a.bookName.localeCompare(b.bookName)));
            setIsChangedPosts(!isChangedPosts);
        // }
        // setBooks(books.sort((a, b) => b.bookName.localeCompare(a.bookName)));
        // setIsChangedPosts(!isChangedPosts);
    }

    const handleSortDateChange = (e) => {
            setBooks(books.sort((a, b) => a.postedTime.localeCompare(b.postedTime)));
            setIsChangedPosts(!isChangedPosts);

    }

    const handleILiked = () => {
        let res = api.get('/Book/GetILiked/' + user.idUser)
            .then(res => {
                //setReadedUser(res.data.name)
                setBooks(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleIRead = () => {
        let res = api.get('/Book/GetIRead/' + user.idUser)
            .then(res => {
                //setReadedUser(res.data.name)
                setBooks(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleGender = (id) => {
        let res = api.get('/Book/GetWhoPostedGender/' + id)
            .then(res => {
                setGender(res.data);
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Box className={classes.hero}>
                <Box>
                    Book Blog
                </Box>
            </Box>

            <Grid container justify="center" style={{ marginTop: "20px" }}>
                <Grid container justify="center" style={{ marginTop: "20px" }}>
                    <Button style={{ marginLeft: "20px" }} size="small" variant="contained" color="primary"  onClick={handleSortDateChange}>
                        Eklenme Tarihine Göre Sırala</Button>

                </Grid>

                <Grid container justify="center" style={{ marginTop: "20px" }}>
                    <Button style={{ marginLeft: "20px" }} size="small" variant="contained" color="primary"  onClick={handleSortChange}>
                        Alfabetik Sırala</Button>

                </Grid>

                <Grid container justify="center" style={{ marginTop: "20px" }}>
                    <Button style={{ marginLeft: "20px" }} size="small" variant="contained" color="primary" onClick={handleILiked}>
                        Beğendiğim Kitaplar</Button>

                    <Button style={{ marginLeft: "20px" }} size="small" variant="contained" color="primary" onClick={handleIRead}>
                        Okuduğum Kitaplar</Button>
                </Grid>
                <Button style={{ marginLeft: "20px", marginTop: "20px" }} size="small" variant="contained" color="primary" onClick={getAllBooks}>
                    Normale Dön</Button>
            </Grid>

            <Container maxWidth="lg" className="classes.blogsContainer">
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>


                        {books.map((book) => {

                            return (
                                <div className="Card">

                                    <Card className={classes.card} {...() => handleGender(book.id)} key={book.id}>
                                        <CardHeader
                                            avatar={
                                                <div>
                                                    <div gender={'Male'}>
                                                        <Avatar aria-label="recipe" className={classes.avatar}
                                                            src={urlMen} />
                                                    </div>
                                                    {/* <div gender={'Female'}>
                                                        <Avatar aria-label="recipe" className={classes.avatar}
                                                            src={urlWomen} /> 
                                                    </div> */}
                                                </div>

                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={book.reader}
                                            subheader={book.postedTime}
                                        />
                                        <CardMedia className={classes.media}
                                            image="https://www.itl.cat/pngfile/big/205-2055172_book-vintage-old-book-background.jpg" />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                <Grid container justify="center">
                                                    {book.bookName}
                                                </Grid>
                                                <Grid container justify="center">
                                                    {book.authorName}
                                                </Grid>
                                            </Typography>
                                        </CardContent>

                                        <CardActions disableSpacing>
                                            <IconButton aria-label="Like"
                                                name="Like"
                                                value={Likes}
                                                onClick={() => handleLikes(book.id)}>
                                                <FavoriteIcon />
                                            </IconButton>

                                            <Checkbox
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                onClick={() => handleReads(book.id)}
                                            />
                                            <div>Okudum</div>

                                            <IconButton
                                                className={clsx(classes.expand, {
                                                    [classes.expandOpen]: expanded,
                                                })}
                                                onClick={() => handleExpandClick(book.id)}
                                                aria-expanded={expanded}
                                                aria-label="show more">
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </CardActions>


                                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <Typography paragraph>
                                                    {book.comment}
                                                </Typography>
                                            </CardContent>



                                            <div className={classes.root2}>
                                                <Grid
                                                >
                                                    <Paper className={classes.paper}>
                                                        <Typography>Bu Postu Beğenenler: </Typography>
                                                        <Divider />
                                                        {ListWhoLiked.map(list =>
                                                            <Typography>
                                                                <ul>
                                                                    {list.name}
                                                                </ul>
                                                            </Typography>
                                                        )}

                                                        <Typography>Bu Postu Okuyanlar: </Typography>
                                                        <Divider />
                                                        {ListWhoRead.map(read =>
                                                            <Typography>
                                                                <ul>
                                                                    {read.name}
                                                                </ul>
                                                            </Typography>
                                                        )}
                                                    </Paper>
                                                </Grid>
                                            </div>
                                        </Collapse>
                                    </Card>
                                </div>
                            );
                        })}
                    </Grid>
                </Grid>
            </Container>
            { isChangedPosts ? '' : ''}

            <div className="Card"><AddBook handlePost={handlePost} /></div>
        </div >
    );
}
export default BooksList;