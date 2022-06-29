import  tabsArr  from './data.js';

window.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.tabsmenu');
  const mainContent = document.querySelector('.container');
  const key = 'key';
  let filter = localStorage.getItem(key) ? localStorage.getItem(key): 'Lorem ipsum' ;


  window.onunload =  () => {
     localStorage.setItem(key, filter)
  }

 
  function onChangeTab (e) {
    const data = tabsArr.filter(item => item.tab === e.target.textContent)[0];
    makeContent(data.content);
    changeActiveFilter(data.tab, '.li_tab')
  }


  function makeContent (content) {
    mainContent.textContent = content;
  }


  function changeActiveFilter (newFilter, selector) {
    const arr = document.querySelectorAll(selector);

    filter = newFilter;
    
    arr.forEach(item => {
      if(item.classList.contains('active')){
        item.classList.remove('active')
      }
     
      if(item.textContent === newFilter){
        item.classList.add('active')
      }
    })
  }
  

  function makeTabs (tabs, filter) {
    tabs.map(item => {
        const newTab =  document.createElement('li');

        newTab.classList.add('li_tab');
        newTab.textContent = item.tab;
        newTab.addEventListener('click', onChangeTab)

        if(filter === item.tab){
          newTab.classList.add('active');
          makeContent(item.content)
        }

        header.append(newTab);
      })
  }

  makeTabs(tabsArr, filter)
})