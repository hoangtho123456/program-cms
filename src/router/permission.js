import router from "./index";
import store from "@/store";
import authRouter from "./modules/auth";
import { ROLES_AS_OBJ } from '@/utils/constant';

/**
 * Generate white list
 */
const whiteList = ["/landing", "/land"]
  .concat(Array.from(authRouter, (route) => route.path))
  .concat(Array.from(authRouter, (route) => route.alias))
  .filter((route) => route); // remove undefined element

/**
 * Check user has permission for this routes.
 * 'Administrator' permission passed directly.
 * @param {Array} roles
 * @param {Array} permissionRoles
 */
function hasPermission(roles, permissionRoles) {
  if (
    roles.includes(ROLES_AS_OBJ.admin) ||
    !permissionRoles
  ) return true;

  return roles.some((role) => permissionRoles.includes(role));
}

router.beforeEach(async (to, from, next) => {
  let logMsg = "[router.beforeEach]";
  try {
    if (store.getters.token) {
      logMsg += "\t[token]";

      // clear router
      const clearRoute = Object.keys(store.state.autoLoad).find((key) => {
        const config = store.state.autoLoad[key];

        return config.clearRoute === from.name;
      });
      if (clearRoute) {
        store.state.autoLoad[clearRoute].list = [];
        store.state.autoLoad[clearRoute].touched = false;
      }

      if (whiteList.includes(to.path)) {
        next({ path: "/" });
      } else {
        if (!store.getters.roles || store.getters.roles.length === 0) {
          logMsg += `\t[roles=${store.getters.roles}]`;

          alert('This user has not had any role!')
          store.dispatch("LogOut");
          if (!/\/signin/.test(from.path)) {
            next({ path: "/" });
          }
        } else if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: "/401", replace: true, query: { noGoBack: true } });
        }
      }
    } else {
      logMsg += "\t[!token]";
      if (whiteList.includes(to.path)) {
        next();
      } else {
        next(`/signin`);
      }
    }
  } catch (err) {
    console.warn(`[router.beforeEach]\t${to.path}: ${err}`);
  } finally {
    console.log(logMsg, to.path);
  }
});
