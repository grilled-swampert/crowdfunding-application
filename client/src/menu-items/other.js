// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home Page',
      type: 'item',
      url: '/home',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'create-campaign',
      title: 'Create Campaign Page',
      type: 'item',
      url: '/create-campaign',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }

    
  ]
};

export default other;
