import {Card, CardContent, CardHeader, CardMedia, Grid, List, Typography} from "@material-ui/core";

export default function CardItem({launch}) {

    return (
        <>
            {

                    <Grid container
                          direction="column"
                          justify="center"
                          alignlaunchs="center" md={4}>
                        <Card >
                            <CardHeader
                                title={launch.mission_name}
                                subheader={launch.launch_year}
                            />
                            <CardMedia
                                component="img"
                                image={launch.links.mission_patch_small}
                                style={{height: "200px", width: "200px"}}
                            />
                            <CardContent>
                                <List>
                                    <Typography>
                                        {"Upcoming : " + (launch.upcoming ? "Yes" : "No")}
                                    </Typography>
                                    <Typography>
                                        {"Tentative : " + (launch.is_tentative ? "Yes" : "No")}
                                    </Typography>
                                    <Typography>
                                        {"Success : " + (launch.launch_success ? "Yes" : "No")}
                                    </Typography>
                                    <Typography>
                                        {"Rocket name : " + launch.rocket.rocket_name}
                                    </Typography>
                                    <Typography>
                                        {"Rocket type : " + launch.rocket.rocket_type}
                                    </Typography>
                                    <Typography>
                                        {"Launched on : " + launch.launch_date_local}
                                    </Typography>
                                    <Typography>
                                        {"Launched at : " + launch.launch_site.site_name}
                                    </Typography>
                                </List>
                            </CardContent>
                        </Card>

                    </Grid>
            }
        </>
    );
}
