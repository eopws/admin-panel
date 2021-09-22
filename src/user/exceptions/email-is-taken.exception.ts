import { BadRequestException } from '@nestjs/common';

export class EmailIsTakenException extends BadRequestException {
    constructor() {
        super(
            'Email is taken by another user',
            'email_is_taken_by_another_user',
        );
    }
}
