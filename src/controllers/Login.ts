import { logger } from './../utils/Logger';
import { JsonController, Get, Post, Res, Body } from 'routing-controllers';
import path from 'path';

@JsonController('/auth')
export class LoginController {
    @Get('/login')
    public login(@Res() res: any): any {
        const file = path.join(__dirname, '../', '/public/login.html');
        res.render(file);
    }
    @Post('/callback')
    public async saveUser(@Body() data: any): Promise<string> {
        logger.info(data);
        return 'ok';
    }
}
