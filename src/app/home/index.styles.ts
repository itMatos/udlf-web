import type { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 64px)',
  gap: 3,
  width: '100%',
  maxWidth: '24rem',
  margin: '0 auto',
  padding: 2,
};

export const cardStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: '22rem',
  boxShadow: 3,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 6,
  },
};

export const cardContentStyles: SxProps<Theme> = {
  textAlign: 'center',
  py: 3,
};

export const addIconStyles: SxProps<Theme> = {
  fontSize: 48,
  color: 'primary.main',
  mb: 2,
};

export const playIconStyles: SxProps<Theme> = {
  fontSize: 48,
  color: 'secondary.main',
  mb: 2,
};

export const cardActionsStyles: SxProps<Theme> = {
  justifyContent: 'center',
  pb: 2,
  px: 2,
};

export const buttonStyles: SxProps<Theme> = {
  minWidth: { xs: 150, sm: 200 },
  width: { xs: '100%', sm: 'auto' },
};
