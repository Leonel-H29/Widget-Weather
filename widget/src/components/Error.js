import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Alert, Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function Error() {
  return (
    <Container fixed>
      <Card sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto', margin: '0 auto' }}>
            <Alert variant="filled" severity="error">
              <FormattedMessage
                id="app.error"
                defaultMessage="Not found 404: "
              />
            </Alert>
            <br />
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
            >
              <FormattedMessage id="app.error-button" defaultMessage="RELOAD" />
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
