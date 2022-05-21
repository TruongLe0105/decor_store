import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

function DividerText({ text }) {

  return (
    <Root>
      <Divider>
        <Typography sx={{ mb: { xs: 0, md: 2 }, color: "#00a6b1", fontSize: { xs: "1rem", md: "1.8rem" } }}>
          {text}
        </Typography>
      </Divider>
    </Root>
  );
}
export default DividerText;