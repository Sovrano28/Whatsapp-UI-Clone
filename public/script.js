const themeBtn = document.getElementById('themeSwitch');

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