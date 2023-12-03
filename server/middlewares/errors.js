const errorHandler = (err, req, res, next) => {
    console.log('error middleware -> '+ err.message);
    let status = 500;
    let data = {
        message: ['Internal Server Error'],
    };
    if (err instanceof Error) {
        status = 403;
        data.message = err.message;
        return res.status(status).json(data);
    }
    if (err.message) {
        data.message = err.message;
    }
    if (err.status) {
        status = err.status;
    }
    
    return res.status(status).json(data);
};
export default errorHandler;
