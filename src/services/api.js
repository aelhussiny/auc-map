import Request from './request';

const defaults = {
  apiUrl: 'api',
  portalUrl: '',
  user: '',
  folder: ''
};

export default class Api {
  constructor(params) {
    this.props = Object.assign({}, defaults, params);
    this.request = new Request(this.props.token);


    this.basename = process.env.NODE_ENV !== 'production' ? '' : '/auc-map';
  }

  setApiUrl(url) {
    this.props.apiUrl = url;
  }

  setPortalUrl(url) {
    this.props.portalUrl = url;
  }


  setAuth(user) {
    this.props.user = user;
  }


  getToken() {
    return this.props.user.credential.token;
  }

  getUsername() {
    return this.props.user.username;
  }

  getPortalUrl() {
    return this.props.portalUrl;
  }


  getApiUrl() {
    return `${window.location.protocol}//${window.location.host}${this.basename}/${this.props.apiUrl}`;
  }

  getAppConfig() {
    return new Promise((resolve, reject) => {
      this.request.makeRequest({
        url: `${this.basename}/config.json`,
        method: 'get'
      }).then(resp => resolve(resp));
    });
  }

  getAppStrings() {
    return new Promise((resolve, reject) => {
      this.request.makeRequest({
        url: `${this.basename}/strings.json`,
        method: 'get'
      }).then(resp => resolve(resp));
    });
  }

  getUserGroups() {
    return new Promise((resolve, reject) => {
      this.request.makeRequest({
        url: `${this.getPortalUrl()}/sharing/rest/community/users/${this.getUsername()}`,
        method: 'post',
        data: { f: 'json', token: this.getToken() }
      }).then(
        resp => resolve(resp),
        error => reject(error)
        )
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.request.makeRequest({
        url: `${this.getPortalUrl()}/sharing/rest/oauth2/signout`,
        handleAs: 'text'
      }).then(
        resp => resolve(resp),
        error => reject(error)
        );
    });
  }
}
