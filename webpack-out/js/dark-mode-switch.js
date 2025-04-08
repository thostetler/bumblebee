define(['analytics'], function (analytics) {
  var STORAGE_KEY = 'darkSwitch';
  var darkSwitch;

  var getDarkSwitchValue = function getDarkSwitchValue() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  };

  var setDarkSwitchValue = function setDarkSwitchValue(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val);
    } catch (e) {// localStorage is disabled
    }
  };

  var turnOnDarkMode = function turnOnDarkMode(save) {
    document.body.setAttribute('data-theme', 'dark');
    darkSwitch.classList.add('darkModeOn');
    darkSwitch.setAttribute('title', 'Turn off dark mode');

    if (save) {
      setDarkSwitchValue('on');
    }
  };

  var turnOffDarkMode = function turnOffDarkMode(save) {
    document.body.removeAttribute('data-theme');
    darkSwitch.classList.remove('darkModeOn');
    darkSwitch.setAttribute('title', 'Turn on dark mode');

    if (save) {
      setDarkSwitchValue('off');
    }
  };

  var emitAnalytics = function emitAnalytics(action, label) {
    analytics('send', 'event', 'uitheme', action, label);
  };

  var toggle = function toggle() {
    if (darkSwitch.classList.contains('darkModeOn')) {
      turnOffDarkMode(true);
      emitAnalytics('appSetting', 'light');
    } else {
      turnOnDarkMode(true);
      emitAnalytics('appSetting', 'dark');
    }
  };

  var init = function init() {
    darkSwitch = document.getElementById('darkSwitch');
    if (!darkSwitch) return;
    darkSwitch.classList.remove('hidden');
    var savedMode = getDarkSwitchValue(); // 1. check app setting

    if (!savedMode) {
      savedMode !== 'on' ? turnOffDarkMode(false) : turnOnDarkMode(false);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // 2. check system setting
      turnOnDarkMode(false);
    } else {
      // 3. default to light
      turnOffDarkMode(false);
    }

    darkSwitch.addEventListener('click', function () {
      toggle();
    });
  };

  init();
});
