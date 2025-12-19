export class HttpError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

export class ConflictError extends HttpError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}
