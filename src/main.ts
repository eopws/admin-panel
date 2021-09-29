import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/*import * as redis from 'redis';
import * as connectRedis from 'connect-redis';*/
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import { HttpExceptionFilter } from './http-exception.filter';
//import { RolesGuard } from './roles/guard/roles.guard';
//import { SessionSocketAdapter } from './session-socket-adapter';

/*const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: 6379,
});
const RedisStore = connectRedis(session);*/

async function start() {
    try {
        const SERVER_PORT = process.env.SERVER_PORT || 5000;
        const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: { credentials: true, origin: 'http://localhost:3000' }});
        const viewsPath = join(__dirname, '../views');
        app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
        app.set('views', viewsPath);
        app.set('view engine', '.hbs');

        const config = new DocumentBuilder()
            .setTitle('Cry')
            .setDescription('REST API Documentation')
            .setVersion('1.0.0')
            .addTag('Where is LAMBO?')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api/docs', app, document);

        const sessionMiddleware = session({
            //store: new RedisStore({ client: redisClient }),
            secret: process.env.SESSION_SECRET_KEY,
            resave: false, //true,
            //rolling: true,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
            },
        });
        app.use(sessionMiddleware);

        const passportInitializing = passport.initialize();
        app.use(passportInitializing);
        const passportSession = passport.session();
        app.use(passportSession);

        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new HttpExceptionFilter());

        /*app.useWebSocketAdapter(
            new SessionSocketAdapter(
                app,
                sessionMiddleware,
                passportInitializing,
                passportSession,
            ),
        );*/

        await app.listen(SERVER_PORT, () => {
            console.log(`server started on PORT ${SERVER_PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
start();
