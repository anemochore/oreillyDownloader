//이미 safari-dl 등으로 받은 html 파일을 파폭에서 열고 실행할 것. 크롬에서 열면 mathjax까지 포함된다ㅠㅠ

//ex: 오라일리 책
//unhyperlink(document);

function unhyperlink(doc, mapOnEl) {
  [...doc.querySelectorAll('a:not([href^="#"]):not([class]):not([id]):not([data-type])')].forEach(el => {
    const HTML = el.innerHTML;
    const href = el.href;
    if(HTML == href || HTML == href.replace(/\/$/, ''))
      return true;  //continue
    if(mapOnEl) el = mapOnEl(el);  //no error-check
    el.outerHTML = `${HTML} (<a href="${href}">${href}</a>)`;
  });

  (() => {
    //로컬 파일로 저장
    let data = document.documentElement.outerHTML;
    let docURI = document.documentURI;
    if(docURI.indexOf('#') > -1)
      docURI = docURI.slice(0, docURI.indexOf('#'));
    let saveFile = docURI.split('/').pop();

    const fileLink = document.createElement('a');
    fileLink.href = 'data:text/html;charset=UTF-8,' + encodeURIComponent(data);
    fileLink.download = '_addon_applied ' + saveFile;
    fileLink.click();

    alert('애드온 적용한 파일을 다운로드 폴더에 다시 저장합니다.');
  })();
}