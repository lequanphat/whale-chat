
const checkAccessToken = (req, res, next) => {
    console.log(req.rawHeaders[1]+ ' -> '+ req.url);
    const ignoreUrls = [
        '/auth/login',
        '/auth/register',
    ]
    if(ignoreUrls.includes(req.url.toLowerCase().trim())){ 
        return next();
    }
    if(req.url.includes(process.env.BACKEND_SERVER_PATH+'/storage/')){
        return next();
    }
    const cookieReq = req.cookies;
    console.log(cookieReq);
    if (!cookieReq) {
        return next(new Error('Unauthorized'));
    }
    next();
}
export {
    checkAccessToken,
}