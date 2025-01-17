import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ParaSports API',
  tagline: 'Documentation for Paralympic Sports Management API',
  favicon: 'img/favicon.ico',

  url: 'http://localhost:3000',
  baseUrl: '/',

  organizationName: 's24551',
  projectName: 'parasports-api',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Konfiguracja strony głównej
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // mainpage redirect
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'ParaSports API',
      items: [
        {
          href: 'https://github.com/s24551/parasports-api',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'REST API',
              to: '/api/rest',
            },
            {
              label: 'GraphQL API',
              to: '/api/graphql',
            },
            {
              label: 'TypeScript Examples',
              to: '/api/typescript-examples',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ParaSports API Documentation`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
