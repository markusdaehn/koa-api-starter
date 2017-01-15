const DEFAULT_CONFIG_FILE_NAME = 'defaults';

module.exports = function getEnvDefaults(getModule, joinPath, freezeObject, logger, configPath) {
  try {
    let filePath = joinPath(configPath, DEFAULT_CONFIG_FILE_NAME);
    let defaults = getModule(filePath);

    return freezeObject(typeof defaults === 'function' ? defaults(logger) : defaults);
  } catch(e) {
    logger.error({exception: e}, 'server.config.get-env-defaults');
  }

  return {};
}
