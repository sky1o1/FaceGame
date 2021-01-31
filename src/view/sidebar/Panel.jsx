import React from 'react';
import { Link } from "react-router-dom";
import Routes from "../../routes"
import {get_data} from "../utils/localstorage";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {Button, Grid} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import TableChartIcon from '@material-ui/icons/TableChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    '& > svg': {
      margin: theme.spacing(2),
    },
  }, 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grid: {
    marginTop: 100,
    marginLeft: 250,
  }
}));

const userData = get_data("cred")
console.log(userData)
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
      <AppBar position="fixed" className={classes.appBar} lg={12}>
         <Toolbar>
         <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
         <Link to="/" style={{color:"white"}}> <HomeIcon /> </Link>
             </IconButton>
             <Typography variant="h6" className={classes.title}>
              {/* Welcome {userData.username} */}
              Welcome
             </Typography>
            <Button color="white"><Link style={{color: "white", textDecoration: 'none'}} to="/login">Login</Link></Button>
           <Button color="white"><Link style={{color: "white", textDecoration: 'none'}} to="/register">Register</Link></Button>
        </Toolbar>
      </AppBar>
      </Grid>

      <Grid item lg={2} >
      <Drawer 
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List lg={4}>

            <ListItem button key="Home" >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <Link  style={{color: "black", textDecoration: 'none'}}  to="/"><ListItemText primary="Home"/></Link>
            </ListItem>

              <ListItem button key="About" >
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <Link style={{color: "black", textDecoration: 'none'}}  to="/about"><ListItemText primary="About"/></Link>
            </ListItem>

              <ListItem button key="Contact" >
              <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
              <Link style={{color: "black", textDecoration: 'none'}}  to="/contact"><ListItemText primary="Contact"/></Link>
            </ListItem>

              <ListItem button key="Add Blog" >
              <ListItemIcon><NoteAddIcon /></ListItemIcon>
              <Link style={{color: "black", textDecoration: 'none'}}  to="/add"><ListItemText primary="Add Blog"/></Link>
            </ListItem>
            
              <ListItem button key="Table" >
              <ListItemIcon><TableChartIcon /></ListItemIcon>
              <Link style={{color: "black", textDecoration: 'none'}}  to="/table"><ListItemText primary="Table"/></Link>
            </ListItem>

            <ListItem button key="Profile" >
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <Link style={{color: "black", textDecoration: 'none'}}  to="/profile"><ListItemText primary="Profile"/></Link>
            </ListItem>
           </List>
          <Divider />
        </div>
      </Drawer>
      </Grid>
        <Grid className={classes.grid} item lg={10} style={{backgroundColor: '#f4f4f2'}}>
          <Routes />
        </Grid>
      </Grid>
    </div>
      );
}
