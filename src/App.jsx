import "bootstrap/dist/css/bootstrap.min.css";
import {
    AppBar,
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SvgIcon,
    TextField,
    Toolbar
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import CardItem from "./CardItem";
import moment from "moment";

export default function App() {

    const [launches, setLaunches] = useState([]);
    const [rocketName, setRocketName] = useState("");
    const [launchDate, setLaunchDate] = useState(0);
    const [launchStatus, setLaunchStatus] = useState(0);
    const [upcoming, setUpcoming] = useState(0);

    useEffect(() => {
        let start = "", end = "", launch_success = "";
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
                launch_success = false;
                break;
            case 2:
                launch_success = true;
                break;
            default:
                break;

        }

        axios.get("https://api.spacexdata.com/v3/launches", {
            params: {
                rocket_name: rocketName,
                start: start,
                end: end,
                launch_success: launch_success
            }
        })
            .then(response => {
                const data = response.data.filter((item) => {
                    if (upcoming === 1)
                        return item.upcoming === true;
                    else if (upcoming === 2)
                        return item.upcoming === false;
                    else
                        return item;
                })
                setLaunches(data);
            })
            .catch(err => {
                setLaunches([]);
            })
    })

    return (
        <Box>
            <AppBar position="static" color={"dark"}>
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
                                            <Search/>
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid container>
                        <Grid item md={4}>
                            <FormControl>
                                <InputLabel>Launch Date</InputLabel>
                                <Select
                                    value={launchDate}
                                    onChange={(event) => setLaunchDate(parseInt(event.target.value))}
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
                                    onChange={(event) => setLaunchStatus(parseInt(event.target.value))}
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
                                    onChange={(event) => setUpcoming(parseInt(event.target.value))}
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
            <Grid container
                  direction="row"
                  alignContent={"center"}
            >

                {
                    launches.map((launch, index) => (
                        <CardItem key={index} launch={launch}/>
                    ))
                }
            </Grid>
        </Box>
    );
}
