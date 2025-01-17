import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'architecture',
    'authentication',
    'examples',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/rest',
        'api/graphql',
        'api/typescript-examples'
      ],
    },
  ],
};

export default sidebars;