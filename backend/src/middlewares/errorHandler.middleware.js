export const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err
    res.status(statusCode).send(message)
}