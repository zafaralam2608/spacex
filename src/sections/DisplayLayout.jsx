import {Card, CardContent, CardHeader, CardMedia, Grid, List, Typography} from "@material-ui/core";

export default function DisplayLayout() {

    const items = [

    ];

    return (
        <>
            {
                items.map((item, index) => (

                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="center" md={4} key={index}>
                            <Card >
                                <CardHeader
                                    title={item.mission_name}
                                    subheader={item.launch_year}
                                />
                                <CardMedia
                                    component="img"
                                    image={item.links.mission_patch_small}
                                    style={{height: "200px", width: "200px"}}
                                />
                                <CardContent>
                                    <List>
                                        <Typography>
                                            {"Upcoming : " + (item.upcoming ? "Yes" : "No")}
                                        </Typography>
                                        <Typography>
                                            {"Tentative : " + (item.is_tentative ? "Yes" : "No")}
                                        </Typography>
                                        <Typography>
                                            {"Success : " + (item.launch_success ? "Yes" : "No")}
                                        </Typography>
                                        <Typography>
                                            {"Rocket name : " + item.rocket.rocket_name}
                                        </Typography>
                                        <Typography>
                                            {"Rocket type : " + item.rocket.rocket_type}
                                        </Typography>
                                        <Typography>
                                            {"Launched on : " + item.launch_date_local}
                                        </Typography>
                                        <Typography>
                                            {"Launched at : " + item.launch_site.site_name}
                                        </Typography>
                                    </List>
                                </CardContent>
                            </Card>

                    </Grid>
                ))
            }
        </>
    );
}
