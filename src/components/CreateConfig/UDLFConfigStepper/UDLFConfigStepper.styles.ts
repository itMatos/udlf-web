import type { SxProps, Theme } from '@mui/material';

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  margin: 'auto',
  py: 4,
  justifyItems: 'center',
};

export const stepButtonLabelStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const activeStepIndicatorStyles: SxProps<Theme> = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  bgcolor: 'primary.main',
};

export const contentWrapperStyles: SxProps<Theme> = {
  mt: 4,
  mb: 2,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const contentContainerStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '500px',
  alignItems: 'flex-start',
  pt: 1,
};

export const getTabPanelStyles = (isActive: boolean): SxProps<Theme> => ({
  display: isActive ? 'flex' : 'none',
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center',
});

export const navigationButtonsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  pt: 2,
  width: '100%',
  maxWidth: '500px',
  mt: 'auto',
};

export const backButtonStyles: SxProps<Theme> = {
  mr: 1,
};

export const spacerStyles: SxProps<Theme> = {
  flex: '1 1 auto',
};
