
const createServer = require('./create.js');
const sinon = require('sinon');
const { assert } = require('chai');
const path = require('path');

describe('server create -- unit', () => {
  context('when create is called', () => {
    let sandbox;
    let mounts;
    let apps;
    let logger;
    let app;
    let Koa;
    let port;
    let ip;
    let root;
    let server;
    let httpServer;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      httpServer = createHttpServer(sandbox);
      apps = [createApp(sandbox, httpServer)];
      mounts = createMounts(sandbox, apps);
      logger = createLogger(sandbox);
      app = createApp(sandbox, httpServer);
      Koa =  sinon.spy(function() { return app });
      port = 8080;
      ip = '156.129.55.01';
      root = path.resolve(__dirname, '../tests/scenarios/basic-server');

      config = {
        server: {
          ip,
          port,
          root
        }
      };

      server = createServer(Koa, mounts, config, logger);

    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should define the server root path', () => {
      assert.isDefined(server.root, 'The server root path was not set');
    });

    it('should call the koa constructor once', () => {
      assert.isTrue(Koa.calledOnce, 'The Koa constructor was not called once');
    });

    it('should set the server.config to the config passed into the create method', () => {
      assert.deepEqual(server.config, config, 'The server config did not equal to the expected config');
    });

    it('should call mounts register once', () => {
      assert.isTrue(mounts.register.calledOnce, 'The mounts.register was not call once');
    });

  });
});

function createMounts(sandbox, apps) {
  return {
    register: sandbox.spy(() => {
      return apps;
    })
  };
}
function createApp(sandbox, httpServer) {
  return {
    use: sandbox.stub(),
    emit: sandbox.stub(),
    env: 'test',
    listen: sandbox.stub().returns(httpServer)
  };
}

function createHttpServer(sandbox) {
  return {
    close: sandbox.stub()
  };
}

function createLogger(sandbox) {
  return {
    error: sandbox.stub(),
    debug: sandbox.stub(),
    info: sandbox.stub(),
    warn: sandbox.stub(),
    trace: sandbox.stub()
  }
}
