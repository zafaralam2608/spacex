import {Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, SvgIcon, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";

export default function SearchLayout() {
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <TextField
                        fullWidth
                        placeholder="Rocket name"
                        variant="outlined"
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
                            <RadioGroup value={"0"}>
                                <FormControlLabel value="0" control={<Radio/>} label="All"/>
                                <FormControlLabel value="1" control={<Radio/>} label="Last Week"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Last Month"/>
                                <FormControlLabel value="3" control={<Radio/>} label="Last Year"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl>
                            <FormLabel>Launch Status</FormLabel>
                            <RadioGroup value={"0"}>
                                <FormControlLabel value="0" control={<Radio/>} label="All"/>
                                <FormControlLabel value="1" control={<Radio/>} label="Failure"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Success"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={4}>
                        <FormControl>
                            <FormLabel>Upcoming</FormLabel>
                            <RadioGroup value={"0"}>
                                <FormControlLabel value="0" control={<Radio/>} label="All"/>
                                <FormControlLabel value="1" control={<Radio/>} label="Yes"/>
                                <FormControlLabel value="2" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
