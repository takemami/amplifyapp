import React, {useState} from 'react';
import './App.css';
//import { API} from 'aws-amplify';
import { Link, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
//import { listNotes } from './graphql/queries';
// import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
//import { createNote as createNoteMutation } from './graphql/mutations';
import { Grid, Box, ListItem, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { Autocomplete, ImageList, ImageListItem, ImageListItemBar, ListItemButton, ListSubheader, TextField } from '@mui/material';
import { AppBar, Toolbar, IconButton, Typography, Button, Stack, CardActionArea } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import  {styled}  from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import NoSsr from "@material-ui/core/NoSsr";
import GoogleFontLoader from "react-google-font-loader";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import { useBeatsInfoStyles } from "@mui-treasury/styles/info/beats";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

// import { CreateLiquor } from './CreateLiquor';

export const CockTitle = React.createContext()

//cognito?????????????????????????????????



//??????????????????????????????
const IconLabelButtons = (props) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<FreeBreakfastIcon />} >
        {props.children}
      </Button>
    </Stack>
    </Box>
  );
}

//???????????????????????????????????????
const FullWidthTextField = (props) => {
  return (
    <Box
      sx={{
        width: '70%',
        display: 'inline-flex',
        maxWidth: '100%',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <TextField fullWidth label={props.children} id={props.children} />
    </Box>
  );
}

//????????????????????????????????????
function TitlebarImageList() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'inline-flex',
        maxWidth: '30%',
        paddingTop: '0px',
        paddingBottom: '20px',
      }}
    >
    <ImageList sx={{ width: "100%", height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">????????????</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <div className="selection-group">
            <input id={item.title} type="radio" name="rate" value={item.title} />
            <label for={item.title}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </label>
          </div>
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>
  );
}

//?????????????????????????????????
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function CustomizedTables() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'inline-flex',
        maxWidth: '50%',
        paddingTop: '0px',
        paddingBottom: '20px',
      }}
    >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>????????????ml???</StyledTableCell>
            <StyledTableCell align="right">????????????</StyledTableCell>
            <StyledTableCell align="right">????????????</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

//??????????????????????????????
function ActionAreaCard() {
  return (
    <Box
      sx={{
        paddingBottom: '30px',
      }}
    >
      <Card sx={{ mx:'auto', maxWidth: 345}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1567306301408-9b74779a11af"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

//select??????????????????????????????
function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">???</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>???????????????</em>
          </MenuItem>
          <MenuItem value={10}>??????</MenuItem>
          <MenuItem value={21}>??????</MenuItem>
          <MenuItem value={22}>??????</MenuItem>
          <MenuItem value={23}>????????????</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

//select???????????????????????????????????????
function SelectAutoWidthCock(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ mt:1, mb:1, minWidth: 680 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>???????????????</em>
          </MenuItem>
          <MenuItem value={10}>??????</MenuItem>
          <MenuItem value={21}>??????</MenuItem>
          <MenuItem value={22}>??????</MenuItem>
          <MenuItem value={23}>????????????</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

//List?????????????????????
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}
function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}


//Header?????????????????????
function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="home">Drink@HOME</Link>
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/UserInfo" className="linkBlack">????????????</Link>
                  {/* ???????????? */}
                </MenuItem>
                <AmplifySignOut />
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//const initialFormState = { name: '', description: '' }

const BeatsInfoStyle = (props) => {
  if (props.cock === undefined) {
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Spartan", weights: [400, 600] }]} />
      </NoSsr>
      <Info useStyles={useBeatsInfoStyles}>
        <InfoTitle className="stripe">????????????</InfoTitle>
        <InfoSubtitle>yanbon</InfoSubtitle>
      </Info>
      <br />
      <br />
        <Info useStyles={useBeatsInfoStyles}>
        <InfoTitle className="stripe">?????????????????????</InfoTitle>
        <InfoSubtitle>?????????????????????</InfoSubtitle>
        <InfoSubtitle>??????????????????</InfoSubtitle>
        <InfoSubtitle>???????????????</InfoSubtitle>
        <InfoSubtitle>????????????</InfoSubtitle>
        <InfoSubtitle>????????????</InfoSubtitle>
        </Info>
      <br />
      <br />
        <Info useStyles={useBeatsInfoStyles}>
        <InfoTitle className="stripe">?????????????????????</InfoTitle>
        <InfoSubtitle>???????????????</InfoSubtitle>
        <InfoSubtitle>??????????????????</InfoSubtitle>
        <InfoSubtitle>???????????????</InfoSubtitle>
        <InfoSubtitle>????????????</InfoSubtitle>
        <InfoSubtitle>????????????</InfoSubtitle>
      </Info>
    </>
  )} else {
    return (
      <>
        <NoSsr>
          <GoogleFontLoader fonts={[{ font: "Spartan", weights: [400, 600] }]} />
        </NoSsr>
        <Info useStyles={useBeatsInfoStyles}>
          <InfoTitle className="stripe">????????????</InfoTitle>
          <InfoSubtitle>yanbon</InfoSubtitle>
        </Info>
        <br />
      </>
    )
  }
};



//????????????????????????
//???????????????
function App() {
  const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  //??????????????????
  
  //const [notes, setNotes] = useState([]);
  //const [formData, setFormData] = useState(initialFormState);

  //useEffect(() => {
  // fetchNotes();
  //}, []);

  //async function fetchNotes() {
  //  const apiData = await API.graphql({ query: listNotes });
  //  setNotes(apiData.data.listNotes.items);
  //}

  /*async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }    
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }*/
  // async function deleteNote({ id }) {
  //   const newNotesArray = notes.filter(note => note.id !== id);
  //   setNotes(newNotesArray);
  //   await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  // }
  // async function onChange(e) {
  //   if (!e.target.files[0]) return
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, image: file.name });
  //   await Storage.put(file.name, file);
  //   fetchNotes();
  // }
  
  

  //???????????????????????????
  function UserInfoApp() {
    return (
      <div className="UserInfoApp">
      <div>
      <h1>???????????????</h1>
      </div>
        
      <div>
        <BeatsInfoStyle />
      </div>
      <div>
        <IconLabelButtons>
          <Link to="/UserInfo/UserInfoEdit" className="linkBlue">????????????</Link>
        </IconLabelButtons>
      </div>
      </div>

    );
  };
  //???????????????????????????
  function UserInfoEditApp() {
    return (
      <div className="UserInfoEditApp">
      <div>
      <h1>????????????????????????</h1>
      </div>
      <div>
        <BeatsInfoStyle cock="False"/>
      </div>  
      <div>
      <select title="Select your surfboard" class="selectpicker">
        <option>Select...</option>
        <option data-thumbnail="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">Chrome</option>
        <option data-thumbnail="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">Firefox</option>
        <option data-thumbnail="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">IE</option>
        <option data-thumbnail="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">Opera</option>
        <option data-thumbnail="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e">Safari</option>
      </select>
        <SelectAutoWidthCock name="????????????"/>
        <SelectAutoWidthCock name="????????????"/>
        <SelectAutoWidthCock name="????????????"/>
        <SelectAutoWidthCock name="????????????"/>
        <SelectAutoWidthCock name="????????????"/>
      </div>
      <div>
        <SelectAutoWidthCock name="??????????????????"/>
        <SelectAutoWidthCock name="??????????????????"/>
        <SelectAutoWidthCock name="??????????????????"/>
        <SelectAutoWidthCock name="??????????????????"/>
        <SelectAutoWidthCock name="??????????????????"/>
      </div>
      <div>
        <IconLabelButtons>
          <Link to="/UserInfo" className="linkBlue">??????</Link>
        </IconLabelButtons>
      </div>
      </div>

    );
  };

  //????????????????????????
  function CreateLiquor2(){
    return (
      <div>
        <p>?????????????????????</p>
        <div>
          <FullWidthTextField>??????????????????</FullWidthTextField>
        </div> 
        <div> 
          <FullWidthTextField>???????????????</FullWidthTextField>
        </div>
        <div>
          <FullWidthTextField>??????(%)</FullWidthTextField>
        </div>
        <div>
          <TitlebarImageList />
        </div>
        {/* <IconLabelButtons children="??????????????????" /> */}
        <IconLabelButtons>
          <Link to="/CreateLiquor/CalResultFiltered" className="linkBlue">??????????????????</Link>
        </IconLabelButtons>
      </div>
      
    )
  }


  //????????????????????????????????????
  function CalResultFilteredApp() {
    return (
      <div className="CalResultFilteredApp">
        <div className="CalNumber">
          <h1>????????????</h1>
          <ul>
            <li>???????????????10ml??????????????????10ml</li>
            <li>??????????????????????????? ??? 1???1</li>
            <li>?????????????????????????????????</li>
            <CustomizedTables />
          </ul>
        </div>

        <div>
          <h1>???????????????</h1>
          
        </div>
        <div>
        <ActionAreaCard />
        </div>
      </div>

    );
  };

  //????????????????????????????????????
  function CalResultApp() {
    return (
      <div className="CalResultApp">
        <div className="CalNumber">
          <h1>????????????</h1>
          <ul>
            <li>???????????????10ml??????????????????10ml</li>
            <li>??????????????????????????? ??? 1???1</li>
            <li>?????????????????????????????????</li>
            <CustomizedTables />
          </ul>
        </div>

        <div>
          <h1>??????????????????????????????????????????</h1>
          <div>
            <FullWidthTextField>??????????????????????????????</FullWidthTextField>
          </div>
          <div><SelectAutoWidth /></div>
          <div>
            <IconLabelButtons>
              <Link to="/" className="linkBlue">??????</Link>
            </IconLabelButtons>
          </div>
          
        </div>
        <div>
        </div>
      </div>

    );
  };

  //????????????????????????????????????
  const SearchResultCockApp = () => {
    const { aboutId } = useParams();
    return (
      <div className="SearchResultCockApp">
      <h1>????????????</h1>
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <div>
              <p>????????????</p>
              <div>
                <p>??????????????????{aboutId}</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <div>
              <Box
                sx={{
                  display: 'inline-flex',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <VirtualizedList/>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>   
        
        </div>

      </div>

    );
  };

  //???????????????????????????
  function SearchResultTasteApp() {
    return (
      <div className="SearchResultTasteApp">
      <h1>????????????</h1>
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <div>
              <p>????????????</p>
              <div>
                <p>??????</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <div>
              <Box
                sx={{
                  display: 'inline-flex',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <VirtualizedList/>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>   
        
        </div>

      </div>

    );
  };

  //???????????????????????????????????????
  function SearchResultLiqApp() {
    return (
      <div className="SearchResultLiqApp">
      <h1>????????????</h1>
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <div>
              <p>????????????</p>
              <div>
                <p>?????????????????????</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <div>
              <Box
                sx={{
                  display: 'inline-flex',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
              >
                <VirtualizedList/>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>   
        
        </div>

      </div>

    );
  };

  //???????????????
  function Home(){
    const [cockText, setCockText] = useState('');
    const onChangeCockText = () => evt => setCockText(evt.target.value);
    console.log(cockText);
    // const onClickAdd = () => {
    //   alert(cockText);
    //   console.log("oppai");
    // };
  
    return (
      <div>
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className="Cock-history">
                <p></p>
                <FixedSizeList
                  height={500}
                  width={Autocomplete}
                  itemSize={46}
                  itemCount={200}
                  overscanCount={5}
                >
                  {/* {historyocktail} */}
                  {renderRow}
                </FixedSizeList>
              </div>
            </Grid>

            <Grid item xs={6}>
            <div className="Cock-search">
              <p>?????????????????????</p>
              <div className="Search">
                <div className="Cocktail-search">
                  <p>????????????????????????</p>
                  <div className="form-group">
                    <label for="cocktail-name"></label>
                    <div>
                    <FullWidthTextField type="text" value={cockText} onChange={onChangeCockText()}>???????????????</FullWidthTextField>
                    </div>
                    <div>
                    <IconLabelButtons onClick={()=>setCockText(cockText)}>
                      <Link to={`/SearchResultCock/${cockText}`} className="linkBlue">????????????</Link>
                    </IconLabelButtons>
                    </div>
                  </div>
                </div>
                
                <div className="Cocktail-search">
                    <p>????????????</p>
                    <label for="taste"></label>
                    <SelectAutoWidth />
                    <IconLabelButtons>
                      <Link to="/SearchResultTaste" className="linkBlue">????????????</Link>
                    </IconLabelButtons>
                </div>

                <div className="Cocktail-search">
                  <p>???????????????????????????</p>
                  <div class="form-group">
                    <label for="liqueur-name"></label>
                    <div>
                      <FullWidthTextField>??????????????????</FullWidthTextField>
                    </div>
                    <IconLabelButtons>
                      <Link to="/SearchResultLiq" className="linkBlue">????????????</Link>
                    </IconLabelButtons>
                  </div>
                </div>
              </div>
            </div>
            </Grid>
          </Grid>
        </Box>   
        
        <div>
        <FullWidthTextField>??????????????????????????????</FullWidthTextField>        
        <IconLabelButtons>
          <Link to="/CreateLiquor" className="linkBlue">???????????????</Link>
        </IconLabelButtons>
        </div>
        </div>
    );
  }

  //??????
  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <Route exact path="/UserInfo/UserInfoEdit" component={UserInfoEditApp}/>
        <Route exact path="/UserInfo" component={UserInfoApp}/>
        <Route exact path="/SearchResultLiq" component={SearchResultLiqApp}/>
        <Route exact path="/SearchResultTaste" component={SearchResultTasteApp}/>
        <Route path="/SearchResultCock/:aboutId" component={SearchResultCockApp}/>
        <Route exact path="/CreateLiquor/CalResult" component={CalResultApp}/>
        <Route exact path="/CreateLiquor/CalResultFiltered" component={CalResultFilteredApp}/>
        <Route exact path="/CreateLiquor" component={CreateLiquor2}/>
        <Route exact path="/" component={Home}/>
      </Router>
    </div>
    
  );


  /*
  return (
    <div className="App">
      <h1>Drink@HOME</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
              {
                note.image && <img src={note.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );*/
}

export default withAuthenticator(App);




//????????????
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    ml: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    ml: "@rollelflex_graphy726"
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    ml: "@helloimnik"
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    ml: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    ml: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    ml: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    ml: "@tjdragotta"
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    ml: "@katie_wasserman"
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    ml: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    ml: "@shelleypauls"
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    ml: "@peterlaster"
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    ml: "@southside_customs",
  }
];

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
