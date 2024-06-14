import { element } from 'prop-types'
import React from 'react'
import Login from './views/pages/auth/Login'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Chat = React.lazy(() => import('./views/pages/chat/Chat'))
const Agent = React.lazy(() => import('./views/pages/agent/Agent'))
const Lead = React.lazy(() => import('./views/pages/lead/Lead'))
const ChatUI= React.lazy(()=>import('./views/pages/chat/ChatComp'))

const routes = [
  // { path: '/login', exact: true, name: 'login',element:Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/chat', name: 'Chat', element: ChatUI },
  { path: '/agents', name: 'Agent', element: Agent },
  { path: '/leads', name: 'Lead', element: Lead },
]

export default routes
