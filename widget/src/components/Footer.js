import * as React from 'react';
//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { FormattedMessage } from 'react-intl';

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

const LinksFooter = (
  <Typography variant="h6" align="center" gutterBottom>
    {/*{title} */}
    <Link
      color="inherit"
      href="https://es.reactjs.org/docs/getting-started.html"
      underline="hover"
    >
      React js
    </Link>
    &nbsp; &nbsp;
    <Link
      color="inherit"
      href="https://www.weatherapi.com/docs/"
      underline="hover"
    >
      Weather API
    </Link>
  </Typography>
);

function Footer(props) {
  ///const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          {/*{title} */}
          <FormattedMessage
            id="app.title"
            defaultMessage="Widget Weather on React"
          />
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/*{description}*/}
          <FormattedMessage
            id="app.footer-description"
            defaultMessage=" Widget to check the weather in a certain city anywhere in the world,
              developed in React Js consuming WeatherApi data"
          />
        </Typography>
        {LinksFooter}
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
