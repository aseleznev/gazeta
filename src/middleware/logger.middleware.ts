export function logger(req, res, next) {
    console.log(`Request...`);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    console.log(req.body);

    next();
}
