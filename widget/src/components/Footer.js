import * as React from 'react';
//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Leonel-H29/Widget-Weather">
        Leonel Herrera
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  ///const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {/*{title} */}
          Widget Weather on React
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/*{description}*/}
          Widget to check the weather in a certain city anywhere in the world,
          developed in React Js consuming WeatherApi data
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
/*
Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
*/
export default Footer;
