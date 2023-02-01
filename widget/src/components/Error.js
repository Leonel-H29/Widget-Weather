import * as React from 'react';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Error() {
  return (
    <Container flex>
      <Card sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>Not found 404</CardContent>
        </Box>
      </Card>
    </Container>
  );
}
