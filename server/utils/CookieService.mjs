class CookieService {
    static saveCookie(res, cookieName, cookieData, time=86400000, only=true) {
        res.cookie(cookieName, cookieData, {
            maxAge: time,
            httpOnly: only,
        });
        console.log('cookie');
    }
    static getCookie(req, cookieName) {
        return req.cookies[cookieName];
    }
}
export default CookieService;
