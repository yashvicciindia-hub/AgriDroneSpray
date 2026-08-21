
function showPage(page){
    document.getElementById('home-page').style.display = page === 'home' ? 'block' : 'none';
    document.getElementById('subscribe-page').style.display = page === 'subscribe' ? 'block' : 'none';
    document.getElementById('partner-dropdown').classList.remove('open');
    window.scrollTo(0,0);
  }
  function toggleDropdown(e){
    e.stopPropagation();
    document.getElementById('partner-dropdown').classList.toggle('open');
  }
  document.addEventListener('click', function(){
    document.getElementById('partner-dropdown').classList.remove('open');
  });
  showPage('home');