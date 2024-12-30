export const themeConfig = {
  colors: {
    primary: {
      light: 'hsl(231, 48%, 48%)', // indigo-500 in light mode
      dark: 'hsl(231, 48%, 56%)', // indigo-500 in dark mode
    },
    secondary: {
      light: 'hsl(217, 91%, 60%)', // blue-500 in light mode
      dark: 'hsl(217, 91%, 65%)', // blue-500 in dark mode
    },
    background: {
      light: 'hsl(0, 0%, 100%)',
      dark: 'hsl(224, 71%, 4%)',
    },
    foreground: {
      light: 'hsl(222.2, 47.4%, 11.2%)',
      dark: 'hsl(210, 40%, 98%)',
    },
    muted: {
      light: 'hsl(210, 40%, 96.1%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    accent: {
      light: 'hsl(210, 40%, 96.1%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    popover: {
      light: 'hsl(0, 0%, 100%)',
      dark: 'hsl(224, 71%, 4%)',
    },
    card: {
      light: 'hsl(0, 0%, 100%)',
      dark: 'hsl(224, 71%, 4%)',
    },
    border: {
      light: 'hsl(214.3, 31.8%, 91.4%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    input: {
      light: 'hsl(214.3, 31.8%, 91.4%)',
      dark: 'hsl(217.2, 32.6%, 17.5%)',
    },
    ring: {
      light: 'hsl(222.2, 47.4%, 11.2%)',
      dark: 'hsl(212.7, 26.8%, 83.9%)',
    },
  },
  fontFamily: {
    sans: ['Work Sans', 'sans-serif'],
  },
} as const; 