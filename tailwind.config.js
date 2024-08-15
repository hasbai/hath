export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./pages/*.vue",
  "./plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
  "./app.vue",
];

export const corePlugins = {
  preflight: false,
};

export const darkMode = ['class', '[data-theme="dark"]'];
export const theme = {
  extend: {
    typography: {
      DEFAULT: {
        css: { // 相同选择器越长的优先级越高
          color: 'var(--fallback-bc, oklch(var(--bc)))', // change global color scheme
          'h1, h2, h3, h4, th': {
            color: 'var(--fallback-bc, oklch(var(--bc)))',
          },
          'p, ul, ol, menu, pre, blockquote': {
            marginBlock: '0.5em',
          },
          a: {
            color: 'var(--fallback-p, oklch(var(--p)))',
            fontWeight: 'normal',
          },
          'ul, ol, menu': {
            'padding-inline-start': '1em',
          },
          li: {
            margin: 0,
            padding: 0,
          },
          'ol > li, ul > li': {
            paddingLeft: 0,
          },
          'ul ul, ul ol, ol ul, ol ol, ul ul ul': {
            marginTop: 0,
            marginBottom: 0,
            marginBlock: '0 !important',
          },
        },
      },
    },
  }
};
export const plugins = [
  require("daisyui"),
  require('@tailwindcss/typography'),
];

const colors = {
  'primary': 'oklch(50% 0.16 271)',
  'secondary': 'oklch(50% 0.16 320)',
  'info': 'oklch(50% 0.16 255)',
  'success': 'oklch(50% 0.16 144)',
  'warning': 'oklch(60% 0.16 48)',
  'error': 'oklch(50% 0.16 27)',
}

export const daisyui = {
  themes: [
    {
      light: {
        ...require('daisyui/src/theming/themes')['light'],
        ...colors,
        'base-100': '#ffffff',
        'base-200': 'oklch(96% 0 0)',
        'primary-content': 'oklch(96% 0 0)',
        'info-content': 'oklch(96% 0 0)',
        'success-content': 'oklch(96% 0 0)',
        'warning-content': 'oklch(96% 0 0)',
        'error-content': 'oklch(96% 0 0)',
      },
      dark: {
        ...require('daisyui/src/theming/themes')['dark'],
        ...colors,
        'primary-content': 'oklch(85% 0 0)',
        'base-100': 'oklch(26% 0.016 252)',
        'base-200': 'oklch(20% 0.016 252)',
      },
    },
  ],
}