//이미 safari-dl 등으로 받은 html 파일을 파폭에서 열고 실행할 것. 크롬에서 열면 mathjax까지 포함된다ㅠㅠ

//ex: 오라일리 책(내부 링크는 처리하지 않을 때)
unhyperlink(document, 'a:not([class]):not([id]):not([data-type])');

//ex: mdbooks에서 받은 책
//외부 링크는 기본값대로.
//unhyperlink(document);

//내부 링크는 클래스 넣고 링크와 텍스트까지 삭제하고 (xxx쪽) 삽입
/*
unhyperlink(document, 'a:not(.header)[href^="#"]', el => { 
  el.outerHTML = `<span class="with-page">${el.innerHTML}(xxx쪽)</span>`;
  return el;
});
*/

//로컬 파일로 저장
saveCurDoc();


function unhyperlink(doc, aSelector = 'a:not([class])', mapOnEl = el => { if(!el.getAttribute('href').startsWith('#')) el.outerHTML = `${el.innerHTML}(<a href="${el.href}">${el.href}</a>)`; }) {
  [...doc.querySelectorAll(aSelector)].forEach(el => {
    const HTML = el.innerText;
    const href = el.href;
    if(HTML == href || HTML == href.replace(/\/$/, ''))
      return true;  //continue

    el = mapOnEl(el);  //no error-check
  });
}

function saveCurDoc() {
  //현재 문서를 로컬 파일로 저장
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
}