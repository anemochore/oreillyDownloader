//이미 safari-dl로 받은 html 파일을 파폭에서 열고 실행할 것. 크롬에서 열면 mathjax까지 포함된다ㅠㅠ
//오라일리 책만 해당

(() => {
  const doc = document;
  [...doc.querySelectorAll('a:not([href^="#"]):not([class]):not([id]):not([data-type])')].forEach(el => {
    const HTML = el.innerHTML;
    const href = el.href;
    if(HTML == href.replace(/\/$/, ''))
      return true;  //continue
    el.outerHTML = `${HTML} (<a href="${href}">${href}</a>)`;
  });

  (() => {
    //로컬 파일로 저장
    let data = document.documentElement.outerHTML;
    let blob = new Blob([data], { type: 'text/plain' });
    let docURI = document.documentURI;
    if(docURI.indexOf('#') > -1)
      docURI = docURI.slice(0, docURI.indexOf('#'));
    let saveFile = docURI.split('/').pop();
    
    let anchor  = document.createElement('a');
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.download = '_addon_' + saveFile;
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    document.body.appendChild(anchor);
    anchor.click();
    alert('애드온 적용한 파일을 다운로드 폴더에 다시 저장했습니다.');
    document.body.removeChild(anchor);
  })();
})();