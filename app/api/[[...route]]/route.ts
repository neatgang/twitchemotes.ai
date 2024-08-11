import { handle } from 'hono/vercel';
import { Hono } from 'hono';

import images from './images'

export const runetime = 'nodejs'

const app = new Hono().basePath('/api')

const routes = app.route('/images', images)

export const GET = handle(app)

export type AppType = typeof routes

