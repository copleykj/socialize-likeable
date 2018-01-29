/* global Package */
Package.describe({
  name: 'socialize:likeable',
  summary: 'A package implementing social "liking" or "starring"',
  version: '1.0.0',
  git: 'https://github.com/copleykj/socialize-likeable.git'
});

Package.onUse(function _(api) {
  api.versionsFrom('1.3');

  api.use(['socialize:user-model@1.0.0', 'reywood:publish-composite@1.5.2']);

  api.imply(['socialize:linkable-model']);

  api.mainModule('server/server.js', 'server');
  api.mainModule('common/common.js');
});
