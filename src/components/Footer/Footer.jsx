import TelegramIcon from '@mui/icons-material/Telegram';
import { Typography, Link, Stack, Paper } from '@mui/material';

export default function Footer () {
  return (
    <Paper>
      <Stack direction='row' justifyContent='center'>
        <Typography>Pet Project 2026 •</Typography>

        <Link href='https://t.me/' rel='noopener noreferrer'>
          <TelegramIcon sx={{ fontSize: 20 }} />
        </Link>
      </Stack>
    </Paper>
  );
}
