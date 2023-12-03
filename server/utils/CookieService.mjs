const saveCookie = (res, cookieName, cookieData, time = 86400000, only = true) => {
    res.cookie(cookieName, cookieData, {
        maxAge: time,
        httpOnly: only,
    });
    console.log('cookie saved');
};
const getCookie = (req, cookieName) => {
    return req.cookies[cookieName];
};
export { saveCookie, getCookie };
