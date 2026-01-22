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
  // Colores principales - Verde orgánico profesional
  primary: {
    main: '#2D6A4F',        // Verde bosque profundo - Profesional y confiable
    light: '#52B788',       // Verde hoja fresca - Acciones positivas
    lighter: '#95D5B2',     // Verde menta suave - Fondos sutiles
    dark: '#1B4332',        // Verde oscuro intenso - Elementos importantes
  },
  
  // Colores secundarios - Tierra y naturaleza
  secondary: {
    main: '#457B9D',        // Azul profesional - Confianza y estabilidad
    light: '#A8DADC',       // Azul claro - Información secundaria
    dark: '#1D3557',        // Azul oscuro - Textos formales
  },
  
  // Acentos - Sistema de estados para trabajadores
  accent: {
    orange: '#E76F51',      // Rojo coral - Alertas y urgencia
    yellow: '#F4A261',      // Naranja melocotón - Advertencias
    red: '#E63946',         // Rojo intenso - Errores críticos
    purple: '#6A4C93',      // Morado profesional - Estadísticas
  },
  
  // Neutrales - Paleta extendida para UI profesional
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#E9ECEF',
    gray: '#ADB5BD',
    darkGray: '#495057',
    charcoal: '#212529',
  },
  
  // Estados - Sistema profesional de feedback
  success: '#52B788',      // Verde éxito - Completado
  warning: '#F4A261',      // Naranja advertencia - Atención
  error: '#E63946',        // Rojo error - Crítico
  info: '#457B9D',         // Azul información - Neutral
  
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

// Hook para usar el tema en los componentes
export const useAppTheme = () => ({
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
});
