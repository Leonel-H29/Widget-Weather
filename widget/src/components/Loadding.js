import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

//import { langContext, LangProvider } from '../context/lang-context';
export default function Loadding() {
  //const idioma = React.useContext(langContext);
  return (
    <Container>
      <Card sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <CircularProgress />
            <Typography component="div" variant="h6">
              <FormattedMessage
                id="app.loadding"
                defaultMessage="Loadding ..."
              />
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
