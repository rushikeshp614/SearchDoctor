import Router from '@koa/router';
import  getData  from '../controllers/maps-api';

const router = new Router();

router.get('/gps', getData);

export default router;
