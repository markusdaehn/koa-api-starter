module.exports = function create(applyDefaults, createEnv, deepMerge, BASE_CONFIG_NAME, logger, processEnv, serverRoot) {
  const env = applyDefaults(logger, processEnv, serverRoot);
  let baseConfig = createEnv(logger, env, serverRoot, BASE_CONFIG_NAME);
  let envConfig = createEnv(logger, env, serverRoot, env.NODE_ENV);

  let config = deepMerge(baseConfig, envConfig || {});

  return config;
}