// // Without function
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        console.error(err.stack);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    }
};

export { asyncHandler };


// // With Promise.resolve
// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//     };
// };

// export { asyncHandler };
