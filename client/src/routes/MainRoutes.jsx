import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const Home = Loadable(lazy(() => import ('views/home')));
const CreateCampaign = Loadable(lazy(() => import('views/create-campaigns')));
const CampaignDetails=Loadable(lazy(() => import('views/campaign-details')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path:'/home',
      element: <Home/>
    },
    {
      path:'/create-campaign',
      element: <CreateCampaign/>
    },
    {
      path: '/campaign-details/:title',
      element: <CampaignDetails/>
    }
  ]
};

export default MainRoutes;
