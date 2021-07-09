/* eslint-disable */
import Layout from "../views/layout/Layout";
/* Layout */
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/test5",
    component: Layout,
    redirect: "/test5/test51",
    name: "test5",
    meta: {
      title: "test5",
      icon: "example",
    },
    children: [
      {
        path: "test51",
        name: "test51",
        component: () => import("@/views/test5/test51"),
        meta: {
          title: "test51",
          icon: "table",
        },
      },
      {
        path: "test52",
        name: "test52",
        component: () => import("@/views/test5/test52"),
        meta: {
          title: "test52",
          icon: "table",
        },
      },
      {
        path: "test53",
        name: "test53",
        // component: () => import("@/views/test5/test53"),
        component: resolve => require(["@/views/test5/test53"], resolve),
        meta: {
          title: "test53",
          icon: "table",
        },
      },
      {
        path: "test54",
        name: "test54",
        component: () => import("@/views/test5/test54"),
        meta: {
          title: "test54",
          icon: "table",
        },
      },
      {
        path: "test55",
        name: "test55",
        component: () => import("@/views/test5/test55"),
        meta: {
          title: "test55",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "/test6",
    component: Layout,
    redirect: "/test6/test61",
    name: "test6",
    meta: {
      title: "test6",
      icon: "example",
    },
    children: [
      {
        path: "test61",
        name: "test61",
        component: () => import("@/views/test6/test61"),
        meta: {
          title: "test61",
          icon: "table",
        },
      },
      {
        path: "test62",
        name: "test62",
        component: () => import("@/views/test6/test62"),
        meta: {
          title: "test62",
          icon: "table",
        },
      },
      {
        path: "test63",
        name: "test63",
        component: () => import("@/views/test6/test63"),
        meta: {
          title: "test63",
          icon: "table",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];
