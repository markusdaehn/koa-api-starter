module.exports = function getHandler(getObjectKeys, getHooks, defaultHandler, server, logger) {
  let hooks = getHooks(server, logger);
  let hookNames = getObjectKeys(hooks);

  if(hookNames.length > 0) {
    logger.info({func: 'server.middleware.hooks.error-handler.get-handler'}, `${hooksNames[0]} error handler returned`);
  } else {
    logger.info({func: 'server.middlware.hooks.error-handler.get-handler'}, 'Default error handler returned');
    return defaultHandler;
  }
}
