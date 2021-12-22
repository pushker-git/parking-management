class ParkingError extends Error {
    constructor (message, code) {
        super(message);
        this.code = 'P1' || code;
        this.name = 'ParkingError';
    }

    toString() {
        return {
            code: this.code,
            message: this.message
        }
    }

}

class ValidationError extends ParkingError {
    constructor (message, code) {
        super(message);
        this.code = code || 'E101';
        this.name = "ValidationError";
    }
}

class InternalError extends ParkingError {
    constructor (message, code) {
        super(message);
        this.code = code || 'E201';
        this.name = 'Internal server error';
    }
}

class CustomError extends ParkingError {
    constructor (message, code) {
        super(message);
        this.code = code || 'E301';
        this.name = 'Error';
    }
}

class SearlizeError {
    static getMessage(error) {
        if (error instanceof ParkingError) {
            return error.toString();
        } else {
            return (new CustomError(error.message)).toString();
        }
    }

}

module.exports = {
    ParkingError,
    ValidationError,
    InternalError,
    CustomError,
    SearlizeError
}