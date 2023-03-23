(async () => {
  const url = window.location;
  if(url.search.startsWith('?scrape=finished')) {
    await heyLoad('https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js', 'JSZip');
    const zip = new JSZip();

    if(!window.GM_getValue) {
      url.replace(url.href + '?scrape=going');
      return;
    }
    const consts = await GM_getValue('consts');
    const BOOK_DIR = consts.BOOK_TITLE.replace(/[/\\?%*:|"<>]/g, '_');

    const qObj = await GM_getValue('q');
    for(let [filename, value] of Object.entries(qObj)) {
      if(!(filename.endsWith('.html') || filename.endsWith('.xhtml') || filename.endsWith('.htm') || filename.endsWith('.css'))) {
        //blob이 b64로 저장된 값이라면 b64를 blob으로 다시 변환
        const base64Response = await fetch(value);
        value = await base64Response.blob();
      }
      zip.folder(BOOK_DIR).file(filename, value);
    }

    //generateAsync가 탬퍼멍키 안에서 작동하지 않아서 어쩔 수 없이 밖으로 뺐다...
    zip.generateAsync({type: "blob"})
    .then(blob => {
      const fileLink = document.createElement('a');
      fileLink.href = window.URL.createObjectURL(blob);
      fileLink.download = `${BOOK_DIR}.zip`;
      fileLink.click();
    });

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
  }
  else if(url.search.startsWith('?scrape=')) {
    alert('탬퍼멍키 스크립트가 실행 중인 듯? 다시 실행하려면 주소에서 ?scrape=... 부분을 떼어보세요.');
    return;
  }
  else {
    const BASE_ORIGIN = 'https://learning.oreilly.com';
    const matches = url.href.match(new RegExp((BASE_ORIGIN+'/library/view/').replace(/\//g, '\\/').replace(/\./g, '\\.')+'(.+)/(\\d{13})/$'));
    if(url.hash || url.search || !matches) {
      alert('please run on ' + BASE_ORIGIN+'/library/view/TITLE/ISBN/');
      return;
    }

    url.replace(url.href + '?scrape=start');
    //이후는 탬퍼멍키 스크립트가 처리
  }
})();