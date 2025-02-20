import React from "react"
import {Bell, List, Shield, Home, Lock, Star, User, Users, UserCheck} from "react-feather"

import {trans} from '@utils'

export const Navigation = [
  {
    id: 'homePage',
    title: 'Home Page',
    icon: <Home size={20}/>,
    navLink: '/homepage',
    action: 'call',
    resource: 'general'
  },
  {
    id: 'indexes',
    title: 'Indexes',
    icon: <List size={20}/>,
    children: [
      {
        id: 'country',
        title: 'Country',
        icon: <UserCheck size={12} />,
        navLink: '/indexes/countries/index',
        action: 'call',
        resource: 'general'
      },
      {
        id: 'city',
        title: 'City',
        icon: <UserCheck size={12} />,
        navLink: '/indexes/cities/index',
        action: 'call',
        resource: 'general'
      },
      {
        id: 'brandsCountries',
        title: 'Brands Countries',
        icon: <UserCheck size={12} />,
        navLink: '/indexes/brandsCountries/index'
      }
    ]
  },
  {
    id: 'brand',
    title: 'Brand',
    icon: <Home size={20}/>,
    navLink: '/brands/list',
    // action: 'call',
    meta: {
      general: true
    },

    resource: 'general'
  },
  {
    id: 'adminList',
    title: 'user.nav.adminList',
    icon: <Lock />,
    navLink: '/admin/list',
    action: 'call',
    resource: 'NoPermissionCode'
  },
  {
    id: 'teams',
    title: 'user.nav.users',
    icon: <User />,
    navLink: '/users/list',
    action: 'call',
    resource: 'NoPermissionCode'
  }
]
