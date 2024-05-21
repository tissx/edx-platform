import { createMiddleware } from 'redux-api-middleware';
import messagesMiddleware from 'unitboardApp/core/messages/data/middleware';

// routerMiddleware is configured in setupStore separately
const apiMiddleware = createMiddleware();

export const coreMiddlewares = [messagesMiddleware];
export const featureMiddlewares = [];

const middlewares = [apiMiddleware, ...coreMiddlewares, ...featureMiddlewares];

export default middlewares;
