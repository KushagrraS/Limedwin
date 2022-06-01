import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import appLogo from '../assets/logo.png'
import {Link } from "react-router-dom";
import {ReactComponent as CourseIcon} from '../assets/svgs/audio-course.svg';
import {ReactComponent as TrainerIcon} from '../assets/svgs/trainer.svg';
import {useHistory} from 'react-router-dom'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import HelpIcon from '@material-ui/icons/Help';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:"#3ea8ad"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appLogo:{
    display: 'flex',
    width:40,
    height:40,
    marginRight:10,
    [theme.breakpoints.up('sm')]: {
      width:45,
      height:45,
    }
  },
  link:{
    textDecoration:"none",
    color:'#3ea8ad'
}
}));

const routes = [
    {name: 'Videos', route: '/', iconComponent: <OndemandVideoIcon  /> },
    {name: 'Video Bank', route: '/video-bank', iconComponent: <VideoLibraryIcon width={25} height={25} />},
    {name: 'Dashboard', route: '/dashboard', iconComponent: <DashboardIcon width={25} height={25} />},
    {name: 'Hero Carousel', route: '/hero-carousel', iconComponent: <ViewCarouselIcon width={25} height={25} />},
    {name: 'Question Bank', route: '/question-bank', iconComponent: <HelpIcon width={25} height={25} />},
    {name: 'Programmes', route: '/programme', iconComponent: <CourseIcon width={25} height={25} />},
    {name: 'Trainers', route: '/trainers', iconComponent: <TrainerIcon width={25} height={25} />},
    {name: 'Users', route: '/users', iconComponent: <PeopleIcon width={25} height={25} />},
    {name: 'Notification', route: '/notification', iconComponent: <NotificationsIcon width={25} height={25} />}
  ]

export default function MiniDrawer({children}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    
  }, [history.location.pathname])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' >
              <img className={classes.appLogo} src={appLogo}/>
            </Link>
          <Typography variant="h6" noWrap>
            W3 CMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map((router, index) => (
              <Link className={classes.link} to={router.route} >
                <ListItem button key={router.name}>
                <ListItemIcon>{router.iconComponent}</ListItemIcon>
                <ListItemText primary={router.name} />
                </ListItem>
              </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}