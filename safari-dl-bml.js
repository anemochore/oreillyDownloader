(async () => {
  if(window.location.search.startsWith('?scrape=')) {
    alert('탬퍼멍키 스크립트가 실행 중인 듯?');
    return;
  }
  else {
    const BASE_ORIGIN = 'https://learning.oreilly.com';
    const BASE_PATH_PREFIX = '/library/view/';

    let urlWithoutHash = document.URL;
    if(urlWithoutHash.lastIndexOf('#') > -1) urlWithoutHash = urlWithoutHash.slice(0, urlWithoutHash.lastIndexOf('#'));

    const matches = urlWithoutHash.match(new RegExp((BASE_ORIGIN + '/library/view/').replace(/\//g, '\\/').replace(/\./g, '\\.') + '(.+)\\/(\\d{13})\\/'));
    if(!matches) {
      alert('please run on ' + BASE_ORIGIN + BASE_PATH_PREFIX + 'TITLE/ISBN/');
      return;
    }

    window.location.replace(urlWithoutHash + '?scrape=start');
    //이후는 탬퍼멍키 스크립트가 처리
  }
})();