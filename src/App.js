import {
  Box,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Popover,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import {
  BarChart,
  InfoOutlined,
  Input,
  DarkModeOutlined,
  LightModeOutlined,
  FeedbackOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import Ticketing from "./Ticketing";
import Stats from "./Stats";
import Help from "./Help";
import ReactGA from "react-ga4";


import carrierDark from "./carrier-darkm.png"
import carrierLight from "./carrier-lightm.png"

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme =  createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#eeb114',
    },
    secondary: {
      main: '#1452ee',
    }
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  },
});
const lightTheme = createTheme({
  palette: {
    htmlFontSize: 15,
    mode: 'light',
    // primary: {
    //   main: '#1452ee',
    // },
    primary: {
      main: '#eeb114',
    },
    secondary: {
      main: '#1452ee',
    }
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  },
});

const CURRENT = "09.03.22"

function App() {

  let localDarkSetting = null;
  let localTab = null;
  let localNews = null;

  if (typeof(Storage) !== "undefined") {
    // Getting user settings
    localDarkSetting = localStorage.getItem("dark")
    localTab = localStorage.getItem("tab")
    localNews = localStorage.getItem("news")
  }

  const browserDarkSetting = useMediaQuery('(prefers-color-scheme: dark)');

  const [tab, setTab] = React.useState((localTab !== null) ? parseInt(localTab) : 0);
  const [dark, setDark] = React.useState((localDarkSetting !== null) ? localDarkSetting==="true" : browserDarkSetting);

  // News & News Popover
  const [news, setNews] = React.useState((localNews !== null) ? localNews : "08.18.22");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'news-popover' : undefined;
  // ********************************************************

  ReactGA.initialize("G-EVN3SKCV1C");
  ReactGA.send("pageview");

  const [mobile, setMobile] = React.useState((typeof window !== "undefined" ? window.innerWidth : 0) < 750 );
  const updateWidth = () => {
    setMobile((typeof window !== "undefined" ? window.innerWidth : 0) < 750);
  }

  React.useEffect(()=>{
    window.addEventListener("resize", updateWidth)
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  })

  const handleTabChange = (e,newMode) => {
    setTab(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("tab", newMode);
  }

  const handleNews = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNews(CURRENT);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("news", CURRENT);
    setAnchorEl(event.currentTarget);
  };

  const handleDark = (e) => {
    const newMode = !dark;
    setDark(newMode);
    if (typeof(Storage) !== "undefined")
        localStorage.setItem("dark", newMode);
  }

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
          }}
        >
        <AppBar position="sticky" >
        <Toolbar variant="dense">
          <img src={dark ? carrierDark : carrierLight} alt="jt-carrier-logo"/>

          <Typography variant="h5" component="div" sx={{
            flexGrow: 1,
            marginLeft: 2,
            fontFamily: "Koulen"
          }}>
            {mobile ? "" : "JT Carrier"}
          </Typography>

          {mobile ?
            <React.Fragment />
            :
            <Tabs
              value={tab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{flexGrow: 1}}
            >
              <Tab
                icon={<Input />}
                iconPosition="start"
                label="Submit"
              />
              <Tab
                icon={<BarChart />}
                iconPosition="start"
                label="Stats"
              />
              <Tab
                icon={<InfoOutlined />}
                iconPosition="start"
                label="Help"
              />
            </Tabs>
          }

          {mobile ?
            <IconButton
              href="https://forms.gle/t9R29o6ZJXDM7NE37"
              target="_blank"
              rel="noreferrer"
              color="inherit"
            >
              <FeedbackOutlined />
            </IconButton>
            :
            <Tooltip title="Report Bugs & Feedback">
              <Button
                href="https://forms.gle/t9R29o6ZJXDM7NE37"
                target="_blank"
                rel="noreferrer"
                color="inherit"
              >
                <FeedbackOutlined />
                report
              </Button>
            </Tooltip>
          }




          <Tooltip title="News & Updates">
            <IconButton color="inherit" onClick={handleNews}>
              <Badge color="secondary" variant="dot" invisible={news === CURRENT}>
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: { width: mobile ? "75%" : "25%" },
            }}
          >
            <Paper sx={{
              padding: 3,
            }}>
              <Typography variant="h6">🎉What's New?! {CURRENT}</Typography>
              <hr />
              <Typography variant="body1">
                This textbox! It describes updates &
                features recently added to JT Carrier
              </Typography>
              <br />
              <Typography variant="body1">
                Under the Stats tab, find a running total
                of all WINGS tickets submitted this year
              </Typography>
            </Paper>
          </Popover>

          <Tooltip title={dark ? "Switch to Light Mode": "Switch to Dark Mode"}>
            <IconButton color="inherit" onClick={handleDark}>
              {dark ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
          </Tooltip>

          </Toolbar>
        </AppBar>

        {/********************* Body *********************/}
        <Box sx={{
          width: mobile ? "90%" : "50%",
          margin: "auto",
          marginBottom: mobile ? "80px" : "auto"
        }}>
          {tab === 0 ? <Ticketing /> : (tab === 1 ? <Stats /> : <Help />)}
        </Box>

        {/************** Bottom Nav for Mobile **************/}
        {mobile ?
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={tab}
              onChange={handleTabChange}
            >
              <BottomNavigationAction label="Submit" icon={<Input />} />
              <BottomNavigationAction label="Stats" icon={<BarChart />} />
              <BottomNavigationAction label="Help" icon={<InfoOutlined />} />
            </BottomNavigation>
          </Paper>
          :
          <React.Fragment />
        }
        </Box>
    </ThemeProvider>
  );
}

export default App;
