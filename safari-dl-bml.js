(async () => {
  //const
  const CORS_PROXY = 'https://corscorsfy.herokuapp.com/';
  const GITHUB_URL =  CORS_PROXY + 'https://anemochore.github.io/oreillyDownloader/';
  const GD_FILE_ID = '1KHloRHkyBdWoCckdCz5VsQcKo6O_klya';

  async function main(gapiInstance) {
    await heyLoad('https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js', 'JSZip');

    const res = await gapi.client.drive.files.get({
      fileId: GD_FILE_ID,
      alt: "media",
    });

    //console.log(res.body);
    eval(res.body);
    new safari_dl().main(GITHUB_URL);
  }

  async function heyLoad(url, varToTest = true) {
    let response;
    try {
      response = handleErrors(await fetch(url));  //to catch 404, etc
    }
    catch(error) {
      console.warn(url, 'cannot be loaded due to:', error);
      return null;
    }

    let txt = await response.text();
    let se = document.createElement('script');
    se.type = 'text/javascript';
    se.text = txt;
    document.getElementsByTagName('head')[0].appendChild(se);

    return eval(varToTest);

    function handleErrors(response) {
      if(!response.ok) throw Error(response.statusText);
      return response;
    }
  }


  //gapi boilerplates
  const API_KEY = 'AIzaSyCQhd-zjVM9qjSvJU3oYuX3VwvgzI1bK-A';
  const CLIENT_ID = '733533368675-dgs8n9gktiboc2olmijof6f1r9sqtmob.apps.googleusercontent.com';
  const SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
  const D_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

  async function handleClientLoad() {
    await new Promise((resolve, reject) => {
      gapi.load('client:auth2', resolve);
    });
    initClient();
  }

  async function initClient() {
    await gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'scope': SCOPE,
      'discoveryDocs': D_DOCS,
    });

    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  function updateSigninStatus(isSignedIn) {
    if(isSignedIn) {
      main(gapi.auth2.getAuthInstance());
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
  }


  //gapi js injection (cors is ok)
  await heyLoad('https://apis.google.com/js/api.js', 'window.gapi');
  const gapi = window.gapi;
  handleClientLoad();
})();