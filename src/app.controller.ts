import { Controller, Get, Render, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Index')
@Controller()
export class AppController {
    @ApiOperation({ summary: 'Main page' })
    @ApiResponse({ status: 200, type: String })
    @Get()
    @Render('index')
    getAllUsers(@Request() req) {
        return;
    }
}
