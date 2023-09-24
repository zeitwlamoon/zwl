// Translation button
(async () => {
  const ERROR_ALERT = 'An error has occurred while translating the page';
  const lang = localStorage.getItem('lang');

  const translate_buttons = document.getElementsByClassName('translate-button');
  for (const translate_button of translate_buttons) {
    translate_button.addEventListener('click', () => {
      const target_language = lang === 'ar' ? 'en' : 'ar';
      localStorage.setItem('lang', target_language);
      location.reload();
    });
  }

  if (lang === 'ar') {
    const arabic_req = await fetch('/data/arabic.json');
    if (arabic_req.status >= 400) {
      return alert(ERROR_ALERT);
    }

    const translation = await arabic_req.json();
    if (!translation) {
      alert(ERROR_ALERT);
    }

    document.documentElement.classList.add('arabic');
    document.title = 'زيت وليمون - طعم شارع الحنين';
    document.documentElement.lang = 'ar';

    const locale_texts = document.getElementsByTagName('locale-text');
    for (const lt of locale_texts) lt.innerHTML = translation[lt.getAttribute('value')];
  }
})();

// Hamburger menu
(async () => {
  const burger_menu = document.getElementById('burger-menu');
  const nav_menu = document.getElementById('nav-menu');
  const burger_menu_class_list = burger_menu.classList;
  const nav_menu_class_list = nav_menu.classList;

  burger_menu.addEventListener('click', () => {
    if (burger_menu_class_list.contains('open')) {
      nav_menu_class_list.add('hidden');
      // If a transition is somehow externally skipped this can lead to the 'removed' class name never being applied
      nav_menu.addEventListener('transitionend', function removeAfterTransition() {
        nav_menu_class_list.add('removed');
        nav_menu.removeEventListener('transitionend', removeAfterTransition);
      });
      burger_menu_class_list.remove('open');
    } else {
      nav_menu_class_list.remove('removed');
      // Force 'hidden' class name to be removed afterwards
      setTimeout(() => {
        nav_menu_class_list.remove('hidden');
      }, 0);
      burger_menu_class_list.add('open');
    }
  });
})();
