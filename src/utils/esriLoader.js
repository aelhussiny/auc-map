import * as esriLoader from 'esri-loader';

export function bootstrapJSAPI(portalUrl, jsapiUrl, jsapiV4) {
  return new Promise((resolve, reject) => {
    if (esriLoader.isLoaded()) {
      resolve();
      return;
    }

    const options = {
      url: jsapiUrl
    };

    esriLoader.loadScript(options)
    .then( () => {
      initApi(portalUrl,jsapiV4).then(
        success => resolve(),
        error => reject(error)
      );
    })
    .catch(err => {
      reject(err);
    });


  });
}

function initApi(portalUrl, jsapiV4) {
  return new Promise((resolve, reject) => {
    if(jsapiV4){
      esriLoader.loadModules(['esri/identity/IdentityManager'])
      .then( ([IdentityManager]) => {
        resolve();
      });
    }
    else {
      esriLoader.loadModules([
        'esri/IdentityManager',
        'esri/arcgis/utils'
      ])
      .then ( ([IdentityManager, arcgisUtils]) => {
        arcgisUtils.arcgisUrl = `${portalUrl}/sharing/rest/content/items`;
        resolve();
      });
    }
  });
}

function initView(node, webmapId, viewOptions) {
  return new Promise((resolve, reject) => {
    esriLoader.loadModules([
      'esri/WebMap',
      'esri/views/MapView',
    ])
    .then( ([WebMap, MapView]) => {

      const webMapOptions = Object.assign({},
        {
          portalItem: {
            id: webmapId
          }
        }
      );

      let  webmap = new WebMap(
        webMapOptions
      );

      new MapView({
        map: webmap,
        container: node,
        ...viewOptions
    }).when(
        response => {
          resolve({
            view: response,
          });
        },
        error => {
          reject(error);
        }

      )
    });
  });
}

export function createView(node, webmapId, viewOptions) {
  return new Promise((resolve, reject) => {
    if (!esriLoader.isLoaded()) {
      reject('JSAPI is not yet loaded');
      return;
    }

    initView(node, webmapId, viewOptions).then(
      response => {
        resolve(response);
      },
      error => {
        reject(error);
      }
    );

  });
}
