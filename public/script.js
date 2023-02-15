const themeBtn = document.getElementById('themeSwitch');
const settingBtn = document.getElementById('setting-btn');
const appOptions = document.getElementById('settings');

themeBtn.addEventListener('click', ()=> {

  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } 
  else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

settingBtn.addEventListener('click', ()=> {
  appOptions.classList.toggle('hidden');
  appOptions.classList.add('animate__slideInDown');

  appOptions.addEventListener('animationend', ()=> {
    appOptions.classList.remove('animate__slideInDown');
  })
  
  appOptions.classList.toggle('show');
  appOptions.focus({focusVisible: false});
})

appOptions.addEventListener('blur', ()=> {
  appOptions.classList.add('animate__fadeOut');

  appOptions.addEventListener('animationend', ()=> {
    appOptions.classList.remove('animate__fadeOut');
    appOptions.classList.remove('show');
    appOptions.classList.add('hidden');
  }, {once: true})
});