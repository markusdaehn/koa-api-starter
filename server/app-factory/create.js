module.exports = function create(createMount, Koa, middleware, config, logger)  {
  let { root, prefix ='/' } = config;
  let app = createApp(createMount, Koa, config, logger);

  middleware.register(app, logger);

  return app;
}

module.exports = function createApp(createMount, Koa, config, logger)  {
  let { root, prefix ='/' } = config;
  let instance = new Koa();
  let app = {
    instance,
    root,
    config,

    use: instance.use.bind(instance),
    emit: instance.emit.bind(instance),

    register(server, logger) {
      let mount = createMount(prefix, app.instance);

      if(typeof mount === 'function') {
        server.use(mount);
      }

      return app;
    },

    logger
  };

  return app;
}
