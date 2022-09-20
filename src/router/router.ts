import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Routes } from "./routes"
import { i18n } from "../plugins/i18n"
import { useUserStore } from "../store/user"
import { clearStore } from "../store"

enum RouteSecurity {
  Public = "public",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../pages/App.vue"),
    children: [
      {
        name: Routes.HOME,
        path: "/",
        component: () => import("../pages/app/Home.vue"),
      },
      {
        name: Routes.DOCUMENTS,
        path: "/documents",
        component: () => import("../pages/app/Documents.vue"),
      },
      {
        name: Routes.INTRO_RECORDS,
        path: "/intro-records",
        component: () => import("../pages/app/IntroRecords.vue"),
      },
      {
        name: Routes.DIAGNOSTICS,
        path: "/diagnostics",
        component: () => import("../pages/app/Diagnostics.vue"),
      },
      {
        name: Routes.MEETING_RECORDS,
        path: "/meeting-records",
        component: () => import("../pages/app/MeetingRecords.vue"),
      },
      {
        name: Routes.CALCULATORS,
        path: "/calculators",
        component: () => import("../pages/app/Calculators.vue"),
      },
      {
        name: Routes.VIDEO_MANUALS,
        path: "/video-manuals",
        component: () => import("../pages/app/VideoManuals.vue"),
      },
      {
        name: Routes.DOCUMENTATIONS,
        path: "/documentations",
        component: () => import("../pages/app/Documentations.vue"),
      },
      {
        name: Routes.SUPPORTS,
        path: "/supports",
        component: () => import("../pages/app/Supports.vue"),
      },
      {
        name: Routes.GDPR,
        path: "/gdpr",
        component: () => import("../pages/app/Gdpr.vue"),
      },
      {
        name: Routes.AML,
        path: "/aml",
        component: () => import("../pages/app/Aml.vue"),
      },
      {
        name: Routes.UIKIT,
        path: "/uikit",
        component: () => import("../pages/app/UiKit.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: Routes.NOT_FOUND_PRIVATE,
        component: () => import("../pages/app/NotFound.vue"),
      },
    ],
  },
  {
    path: "/sign-in",
    name: Routes.SIGN_IN,
    meta: {
      security: RouteSecurity.Public,
    },
    component: () => import("../pages/SignInPage.vue"),
  },
  {
    path: "/mask",
    name: "mask",
    meta: {
      security: RouteSecurity.Public,
    },
    component: () => import("../pages/Mask.vue"),
  },
  {
    path: "/wizard",
    name: "wizard",
    meta: {
      security: RouteSecurity.Public,
    },
    component: () => import("../pages/WizardTestPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: Routes.NOT_FOUND,
    meta: {
      security: RouteSecurity.Public,
    },
    component: () => import("../pages/NotFound.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  window.document.title = `${i18n.global.t("pages.title")} - ${i18n.global.t(`pages.${to.name?.toString()}`)}`

  if (to.meta.security === RouteSecurity.Public) {
    next()
    return
  }

  const userStore = useUserStore()

  if (!userStore.isLogged) {
    if (!(await userStore.refreshToken())) {
      clearStore()
      next({ name: Routes.SIGN_IN })
      return
    }
  }

  next()
})

export { router }
