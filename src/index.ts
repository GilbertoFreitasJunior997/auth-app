import { Hono } from 'hono';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { authRoute } from '@/routes/auth-route';
const app = new Hono();

app.route('auth', authRoute);
app.use('api', authMiddleware);

// app.route('api/user', userRoute);

export default app;
