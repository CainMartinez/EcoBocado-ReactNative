import { MD3LightTheme, MD3Theme } from 'react-native-paper';

// Interfaces para la estructura del tema
interface ColorShades {
  main: string;
  light: string;
  lighter: string;
  dark: string;
}

interface SecondaryColors {
  main: string;
  light: string;
  dark: string;
}

interface AccentColors {
  orange: string;
  yellow: string;
  red: string;
  purple: string;
}

interface NeutralColors {
  white: string;
  offWhite: string;
  lightGray: string;
  gray: string;
  darkGray: string;
  charcoal: string;
}

interface BackgroundColors {
  default: string;
  paper: string;
  dark: string;
}

interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
  inverse: string;
}

export interface Colors {
  primary: ColorShades;
  secondary: SecondaryColors;
  accent: AccentColors;
  neutral: NeutralColors;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: BackgroundColors;
  text: TextColors;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadius {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  round: number;
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  small: Shadow;
  medium: Shadow;
  large: Shadow;
}

export interface Typography {
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeights: {
    regular: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

// Paleta de colores inspirada en alimentos ecológicos
export const colors: Colors = {
  // Colores principales - Verde orgánico
  primary: {
    main: '#2D6A4F',        // Verde bosque profundo
    light: '#52B788',       // Verde hoja fresca
    lighter: '#95D5B2',     // Verde menta suave
    dark: '#1B4332',        // Verde oscuro intenso
  },
  
  // Colores secundarios - Tierra y naturaleza
  secondary: {
    main: '#D4A574',        // Beige tierra cálido
    light: '#E8C9A1',       // Arena clara
    dark: '#8B6F47',        // Marrón tierra
  },
  
  // Acentos - Frutos y vegetales
  accent: {
    orange: '#F4A261',      // Naranja calabaza
    yellow: '#E9C46A',      // Amarillo maíz
    red: '#E76F51',         // Rojo tomate
    purple: '#9D4EDD',      // Morado berenjena
  },
  
  // Neutrales
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#E9ECEF',
    gray: '#ADB5BD',
    darkGray: '#495057',
    charcoal: '#212529',
  },
  
  // Estados
  success: '#52B788',
  warning: '#F4A261',
  error: '#E76F51',
  info: '#457B9D',
  
  // Fondos
  background: {
    default: '#F8F9FA',
    paper: '#FFFFFF',
    dark: '#1B4332',
  },
  
  // Textos
  text: {
    primary: '#212529',
    secondary: '#495057',
    disabled: '#ADB5BD',
    inverse: '#FFFFFF',
  },
};

// Espaciado consistente
export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordes redondeados
export const borderRadius: BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 24,
  round: 999,
};

// Sombras
export const shadows: Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Tipografía
export const typography: Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Tema de React Native Paper
export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.main,
    primaryContainer: colors.primary.lighter,
    secondary: colors.secondary.main,
    secondaryContainer: colors.secondary.light,
    tertiary: colors.accent.orange,
    error: colors.error,
    background: colors.background.default,
    surface: colors.background.paper,
    surfaceVariant: colors.neutral.offWhite,
    onSurface: colors.text.primary,
    onSurfaceVariant: colors.text.secondary,
    outline: colors.neutral.gray,
  },
  roundness: borderRadius.medium,
};
