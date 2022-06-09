import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SvgIcon, TextField,
  Toolbar,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import CardItem from './CardItem';

export default function App() {
  const [launches, setLaunches] = useState([]);
  const [rocketName, setRocketName] = useState(null);
  const [launchDate, setLaunchDate] = useState(0);
  const [launchStatus, setLaunchStatus] = useState(0);
  const [upcoming, setUpcoming] = useState(0);

  useEffect(() => {
    let start = null;
    let end = null;
    let launchSuccess = null;
    switch (launchDate) {
      case 0:
        break;
      case 1:
        start = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
        end = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
        break;
      case 2:
        start = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
        end = moment().subtract(1, 'months').endOf('months').format('YYYY-MM-DD');
        break;
      case 3:
        start = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD');
        end = moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD');
        break;
      default:
        break;
    }
    switch (launchStatus) {
      case 0:
        break;
      case 1:
        launchSuccess = false;
        break;
      case 2:
        launchSuccess = true;
        break;
      default:
        break;
    }

    axios.get('https://api.spacexdata.com/v3/launches', {
      params: {
        rocket_name: rocketName,
        start,
        end,
        launch_success: launchSuccess,
      },
    })
      .then((response) => {
        const data = response.data.filter((item) => {
          if (upcoming === 1) return item.upcoming === true;
          if (upcoming === 2) return item.upcoming === false;
          return item;
        });
        setLaunches(data);
      })
      .catch(() => {
        setLaunches([]);
      });
  });

  return (
    <Box>
      <AppBar position="static" color="dark">
        <Toolbar>
          <Grid container>
            <TextField
              placeholder="Rocket name"
              variant="outlined"
              value={rocketName}
              onChange={(event) => setRocketName(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <Search />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <FormControl>
                <InputLabel>Launch Date</InputLabel>
                <Select
                  value={launchDate}
                  onChange={(event) => setLaunchDate(parseInt(event.target.value, 10))}
                >
                  <MenuItem value={0}>-</MenuItem>
                  <MenuItem value={1}>Last Week</MenuItem>
                  <MenuItem value={2}>Last Month</MenuItem>
                  <MenuItem value={3}>Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl>
                <InputLabel>Launch Status</InputLabel>
                <Select
                  value={launchStatus}
                  onChange={(event) => setLaunchStatus(parseInt(event.target.value, 10))}
                >
                  <MenuItem value={0}>-</MenuItem>
                  <MenuItem value={1}>Failure</MenuItem>
                  <MenuItem value={2}>Success</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <FormControl>
                <InputLabel>Upcoming</InputLabel>
                <Select
                  value={upcoming}
                  onChange={(event) => setUpcoming(parseInt(event.target.value, 10))}
                >
                  <MenuItem value={0}>-</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="row"
        alignContent="center"
      >
        {
          launches.map((launch) => (
            <CardItem key={launch.flight_number} launch={launch} />
          ))
        }
      </Grid>
    </Box>
  );
}
