import { lazy } from "react"

export const Routes = [
  {
    path: "/login",
    component: lazy(() => import("../views/auth/Login")),
    layout: "BlankLayout",
    meta: {
      publicRoute:true
    }
  },

  {
    path: "/brands/list",
    component: lazy(() => import("../views/brands")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/products/index",
    component: lazy(() => import("../views/products")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/purchaseOrders/index",
    component: lazy(() => import("../views/purchaseOrders")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/indexes/countries/index",
    component: lazy(() => import("../views/indexes/countries")),
    meta: {
      publicRoute: true
    }
  }, {
    path: "/indexes/cities/index",
    component: lazy(() => import("../views/indexes/cities")),
    meta: {
      publicRoute: true
    }
  }, {
    path: "/indexes/brandsCountries/index",
    component: lazy(() => import("../views/indexes/brandsCountries")),
    meta: {
      publicRoute: true
    }
  }, {
    path: "/carModels/index",
    component: lazy(() => import("../views/carModels")),
    meta: {
      publicRoute:true
    }
  }, {
    path: "/order/index",
    component: lazy(() => import("../views/order")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/supplier/index",
    component: lazy(() => import("../views/suppliers")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/carSell/index",
    component: lazy(() => import("../views/carSell")),
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/privacy",
    component: lazy(() => import("../views/privacy")),
    layout: "BlankLayout",
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/support",
    component: lazy(() => import("../views/support")),
    layout: "BlankLayout",
    meta: {
      publicRoute:true
    }
  },
  {
    path: "/admin/list",
    component: lazy(() => import("../views/admin-list")),
    meta: {
      action: "call",
      resource: "NoPermissionCode"
    }
  },
  {
    path: "/users/list",
    component: lazy(() => import("../views/responsibles/responsibles-list")),
    meta: {
      action: "call",
      resource: "NoPermissionCode"
    }
  },
  {
    path: '/users/:id',
    component: lazy(() => import('../views/responsibles/responsible-profile')),
    meta: {
      action: "call",
      resource: "NoPermissionCode"
      // navLink: '/teams'
    }
  },
  {
    path: '/categories/list',
    component: lazy(() => import('../views/characteristics/categories')),
    meta: {
      action: "call",
      resource: "NoPermissionCode"
      // navLink: '/teams'
    }
  },
  {
    path: '/characteristics/list',
    component: lazy(() => import('../views/characteristics/characteristics-list')),
    meta: {
      action: "call",
      resource: "NoPermissionCode"
      // navLink: '/teams'
    }
  }
]
