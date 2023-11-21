class CookieService {
    static saveCookie(res, cookieName, cookieData, time=86400000, only = true) {
        res.cookie(cookieName, cookieData, {
            maxAge: time,
            httpOnly: only,
        });
        console.log('cookie');
    }
}
export default CookieService;
