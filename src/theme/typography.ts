// src/theme/typography.ts
const typography = {
  fontFamily: 'Noto Sans, sans-serif',
  fontSize: 14,
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    '@media (max-width:600px)': {
      fontSize: '2rem',
    },
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    'media (max-width: 600px)': {
      fontSize: '1.75rem',
    },
  },
  h3: {
    fontSize: '1.5rem',
    'media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
  h4: {
    fontSize: '1.25rem',
    'media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  h5: {
    fontSize: '1rem',
    'media (max-width: 600px)': {
      fontSize: '0.875rem',
    },
  },
  h6: {
    fontSize: '0.875rem',
    'media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    'media (max-width: 600px)': {
      fontSize: '0.875rem',
      lineHeight: '1.2',
    },
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    'media (max-width: 600px)': {
      fontSize: '0.75rem',
      lineHeight: '1.2',
    },
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.66,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  button: {
    textTransform: 'uppercase' as 'uppercase',
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: 1.75,
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
  customSize: {
    fontSize: '1.25rem',
    lineHeight: 1.6,
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      lineHeight: 1.4,
    },
  },
};

export default typography;
