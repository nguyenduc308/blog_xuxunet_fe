import { isClient } from "./utils";
import { setToken } from '../store/auth/actions';

export const getCookieFromBrowser = (key) => {
                return window.cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
if (!req.headers.cookie) {
    return undefined;
}
const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
if (!rawCookie) {
    return undefined;
}
return rawCookie.split("=")[1];
};

export const getCookie = (key, req) => {
    return isClient
      ? getCookieFromBrowser(key)
      : getCookieFromServer(key, req);
};
  
export const checkServerSideCookie = (req, store) => {
    const token = getCookie("token", req);

    if (token) {
      store.dispatch(setToken(token));
    }

    return token;
};

export const serverSideRedirect = (res, path = '/', statusCode = 302) => {
    res.statusCode = statusCode;
    res.setHeader('location', `${path}`) ;
    res.end();
 
    return { props: {} };
};