var GOOGLE_FORMS = {
  registerFarm: 'https://docs.google.com/forms/d/e/1FAIpQLScYnKKK-byx_Y8SdkagxnxbbaeSUS8AXygkr1INLG9EoblY4w/viewform?usp=publish-editor',
  nuram: 'https://docs.google.com/forms/d/e/1FAIpQLSezo7x4SZkI5Ug528nwZWpwgu4HiYxoPdIJz7jRpflZesdfiA/viewform?usp=publish-editor',
  manufacturer: 'https://docs.google.com/forms/d/e/1FAIpQLSfd8u_MVBABeG5TDL6mk4-8PeZevK_sm74b-hEuBDDJDRCDsw/viewform?usp=publish-editor',
  subscription: 'https://docs.google.com/forms/d/e/1FAIpQLScl67FDe9LzOm6SFFsbCEMr2iofjRhIvAct-5kkSAQ00BEtBw/viewform?usp=publish-editor'
};

function showPage(page) {
  var homePage = document.getElementById('home-page');
  var subscribePage = document.getElementById('subscribe-page');
  var partnerDropdown = document.getElementById('partner-dropdown');

  if (homePage) homePage.style.display = page === 'home' ? 'block' : 'none';
  if (subscribePage) subscribePage.style.display = page === 'subscribe' ? 'block' : 'none';
  if (partnerDropdown) partnerDropdown.classList.remove('open');
  window.scrollTo(0, 0);
}

function toggleDropdown(e) {
  var partnerDropdown = document.getElementById('partner-dropdown');
  if (!partnerDropdown) return;
  e.stopPropagation();
  partnerDropdown.classList.toggle('open');
  var toggleButton = partnerDropdown.querySelector('.dropdown-toggle');
  if (toggleButton) {
    toggleButton.setAttribute('aria-expanded', String(partnerDropdown.classList.contains('open')));
  }
}

function openSubscriptionForm(planName) {
  var url = GOOGLE_FORMS.subscription + '?usp=pp_url&entry.111111111=' + encodeURIComponent(planName);
  window.open(url, '_blank', 'noopener,noreferrer');
}

var mobileToggle = document.querySelector('.mobile-menu-toggle');
var siteNav = document.querySelector('.site-nav');
if (mobileToggle && siteNav) {
  mobileToggle.addEventListener('click', function () {
    var isOpen = siteNav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      siteNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

var partnerDropdown = document.getElementById('partner-dropdown');
if (partnerDropdown) {
  var partnerToggle = partnerDropdown.querySelector('.dropdown-toggle');
  if (partnerToggle) {
    partnerToggle.addEventListener('click', function (event) {
      toggleDropdown(event);
    });
  }
}

document.addEventListener('click', function (event) {
  var partnerDropdown = document.getElementById('partner-dropdown');
  if (partnerDropdown && !partnerDropdown.contains(event.target)) {
    partnerDropdown.classList.remove('open');
    var toggleButton = partnerDropdown.querySelector('.dropdown-toggle');
    if (toggleButton) toggleButton.setAttribute('aria-expanded', 'false');
  }
});

var subscriptionButtons = document.querySelectorAll('[data-plan]');
subscriptionButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    openSubscriptionForm(button.getAttribute('data-plan'));
  });
});

if (document.getElementById('home-page') && document.getElementById('subscribe-page')) {
  showPage('home');
}
