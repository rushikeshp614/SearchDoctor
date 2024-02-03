import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import errorHandlerMiddleware from './middleware/error-handler';
import gpsRoutes from './routes/maps-route';
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"});

const PORT = process.env.BACKEND_PORT || 5000;

const app = new Koa();

app.use(bodyParser());
app.use(cors());


app.use(gpsRoutes.routes()).use(gpsRoutes.allowedMethods());

app.use(errorHandlerMiddleware);




const server = app.listen(PORT, () => {
  console.info(`API available on port http://localhost:${PORT}`);
});


process.on('SIGINT', () => {
  console.info('Trapped SIGINT, terminating');
  server.close();
});
