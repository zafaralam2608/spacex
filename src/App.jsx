import {Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, SvgIcon, TextField} from "@material-ui/core";
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

        axios.get("/launches", {
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
            <Card>
                <CardContent>
                    <Grid container>
                        <TextField
                            fullWidth
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
                                <FormLabel>Launch Date</FormLabel>
                                <RadioGroup value={launchDate}
                                            onChange={(event) => setLaunchDate(parseInt(event.target.value))}>
                                    <FormControlLabel value={0} control={<Radio/>} label="All"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="Last Week"/>
                                    <FormControlLabel value={2} control={<Radio/>} label="Last Month"/>
                                    <FormControlLabel value={3} control={<Radio/>} label="Last Year"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl>
                                <FormLabel>Launch Status</FormLabel>
                                <RadioGroup value={launchStatus}
                                            onChange={(event) => setLaunchStatus(parseInt(event.target.value))}>
                                    <FormControlLabel value={0} control={<Radio/>} label="All"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="Failure"/>
                                    <FormControlLabel value={2} control={<Radio/>} label="Success"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl>
                                <FormLabel>Upcoming</FormLabel>
                                <RadioGroup value={upcoming}
                                            onChange={(event) => setUpcoming(parseInt(event.target.value))}>
                                    <FormControlLabel value={0} control={<Radio/>} label="All"/>
                                    <FormControlLabel value={1} control={<Radio/>} label="Yes"/>
                                    <FormControlLabel value={2} control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {
                launches.map((launch, index) => (
                    <CardItem key={index} launch={launch}/>
                ))
            }
        </Box>
    );
}
