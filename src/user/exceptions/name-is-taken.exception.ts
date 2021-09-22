import { BadRequestException } from '@nestjs/common';

export class NameIsTakenException extends BadRequestException {
    constructor() {
        super('Name is taken by another user', 'name_is_taken_by_another_user');
    }
}
