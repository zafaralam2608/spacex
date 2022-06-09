import React from 'react';
import {
  Card, CardContent, CardHeader, CardMedia, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function CardItem({ launch }) {
  return (
    <Grid md={5} xs={12} className="m-1 p-1 align-items-center">
      <Card>
        <CardHeader
          title={launch.mission_name}
          subheader={launch.launch_year}
        />
        <CardMedia
          component="img"
          image={launch.links.mission_patch_small}
          style={{
            height: '200px',
            width: '200px',
          }}
        />
        <CardContent>
          <List>
            <Typography>
              {`Upcoming : ${launch.upcoming ? 'Yes' : 'No'}`}
            </Typography>
            <Typography>
              {`Tentative : ${launch.is_tentative ? 'Yes' : 'No'}`}
            </Typography>
            <Typography>
              {`Success : ${launch.launch_success ? 'Yes' : 'No'}`}
            </Typography>
            <Typography>
              {`Rocket name : ${launch.rocket.rocket_name}`}
            </Typography>
            <Typography>
              {`Rocket type : ${launch.rocket.rocket_type}`}
            </Typography>
            <Typography>
              {`Launched on : ${launch.launch_date_local}`}
            </Typography>
            <Typography>
              {`Launched at : ${launch.launch_site.site_name}`}
            </Typography>
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
}

CardItem.propTypes = {
  launch: PropTypes.exact({
    mission_name: PropTypes.string.isRequired,
    upcoming: PropTypes.bool.isRequired,
    launch_year: PropTypes.string.isRequired,
    is_tentative: PropTypes.string.isRequired,
    launch_success: PropTypes.string.isRequired,
    launch_date_local: PropTypes.string.isRequired,
    launch_site: PropTypes.exact({
      site_name: PropTypes.string.isRequired,
    }).isRequired,
    links: PropTypes.exact({
      mission_patch_small: PropTypes.string.isRequired,
    }).isRequired,
    rocket: PropTypes.exact({
      rocket_name: PropTypes.string.isRequired,
      rocket_type: PropTypes.bool.isRequired,
      launch_year: PropTypes.string.isRequired,
      is_tentative: PropTypes.string.isRequired,
      launch_success: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
