/* eslint-disable */
import Layout from "../views/layout/Layout";
export default [
  {
    path: "/",
    component: Layout,
    redirect: "/test5",
    name: "test5123",
    hidden: true,
  },
  {
    path: "/test2",
    component: Layout,
    alwaysShow: true,
    redirect: "/test2/test21",
    name: "test2",
    meta: { title: "test2", icon: "example" },
    children: [
      {
        path: "test21",
        name: "test21",
        component: () => import("@/views/test2/test21"),
        meta: { title: "test21", icon: "table" },
      },
      {
        path: "test22",
        name: "test22",
        component: () => import("@/views/test2/test22"),
        meta: { title: "test22", icon: "table" },
      },
      {
        path: "test23",
        name: "test23",
        component: () => import("@/views/test2/test23"),
        meta: { title: "test23", icon: "table" },
      },
      {
        path: "test24",
        name: "test24",
        component: () => import("@/views/test2/test24"),
        meta: { title: "test24", icon: "table" },
      },
      {
        path: "document",
        name: "document",
        component: () => import("@/views/test2/document"),
        meta: { title: "document", icon: "table" },
      },
    ],
  },
  {
    path: "/test3",
    component: Layout,
    alwaysShow: true,
    redirect: "/test3/test31",
    name: "test3",
    meta: { title: "test3", icon: "example" },
    children: [
      {
        path: "test31",
        name: "test31",
        component: () => import("@/views/test3/test31"),
        meta: { title: "test31", icon: "table" },
      },
    ],
  },
  {
    path: "/test4",
    component: Layout,
    alwaysShow: true,
    redirect: "/test4/test41",
    name: "test4",
    meta: { title: "test4", icon: "example" },
    children: [
      {
        path: "test41",
        name: "test41",
        component: () => import("@/views/test4/test41"),
        meta: { title: "test41", icon: "table" },
      },
      {
        path: "test42",
        name: "test42",
        component: () => import("@/views/test4/test42"),
        meta: { title: "test42", icon: "table" },
      },
      {
        path: "test43",
        name: "test43",
        component: () => import("@/views/test4/test43"),
        meta: { title: "test43", icon: "table" },
      },
    
    ],
  },
  {
    path: "/test1",
    component: Layout,
    alwaysShow: true,
    redirect: "/test1/test11",
    name: "test1",
    meta: { title: "test1", icon: "example" },
    children: [
      {
        path: "test11",
        name: "test11",
        component: () => import("@/views/test1/test11"),
        meta: { title: "test11", icon: "table" },
      },
    ],
  },
];
