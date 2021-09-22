import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const { message, error } = exception.getResponse() as Record<
            string,
            any
        >;
        const messages = Array.isArray(message) ? message : [message];

        response.status(status).json({
            statusCode: status,
            name: exception.name,
            messages,
            error,
        });
    }
}
