// setting the page theme on popstate event.
function setUserTheme() {
  if (!('theme' in localStorage)) {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('theme', 'default');
  }

  else if (localStorage.theme === 'default') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  else if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }

  else {
    document.documentElement.classList.remove('dark')
  }
}

window.addEventListener("pageshow", function (event) {
  var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  
  if (historyTraversal) {
    setUserTheme();
  }
});

const leftColumn = document.getElementById('column-1');
const settingBtn = document.getElementById('setting-btn');
const appOptions = document.getElementById('settings');

const searchBtn = document.querySelector('#search-btn');
const searchDropdown = document.querySelector('#search-dropdown');
const searchBox = document.querySelector('#search-dropdown div:nth-child(1)');
const searchOptions = document.querySelector('#search-dropdown div:nth-child(2)');
const searchBackBtn = document.querySelector('#search-back-btn');

const navItems = document.querySelectorAll('.nav-items');
const chatNav = document.querySelector('.nav-items:nth-child(1)');
const statusNav = document.querySelector('.nav-items:nth-child(2)');
const callNav = document.querySelector('.nav-items:nth-child(3)');

const slidesContainer = document.querySelector("#slides-container");

// dropping down the search bar
if (searchBtn !== null) {
  searchBtn.addEventListener('click', ()=> {
    chatNav.classList.contains('active') ? (
      searchBox.classList.add('border-b-2'),
      searchOptions.classList.remove('hidden') 
    ) : (
      searchBox.classList.remove('border-b-2'),
      searchOptions.classList.add('hidden')
    );

    searchDropdown.classList.remove('-translate-y-full');
  });

  searchBackBtn.addEventListener('click', ()=> {
    searchDropdown.classList.add('-translate-y-full');
  });

  leftColumn.addEventListener('scroll', ()=> {
    searchDropdown.classList.add('-translate-y-full');
  });
};

// project settingsDropdown events
function showThis(settingsDropdown, timeToRemoveAnimationClass = 500) {
  settingsDropdown.classList.remove('hidden');
  settingsDropdown.classList.add('animate-slideInDown');

  setTimeout(() => {
    settingsDropdown.classList.remove('animate-slideInDown');
  }, timeToRemoveAnimationClass);
  
  settingsDropdown.focus({focusVisible: false});
};

function hideThis(settingsDropdown) {
  settingsDropdown.classList.add('animate-fadeOut');

  setTimeout(() => {
    settingsDropdown.classList.remove('animate-fadeOut');
    settingsDropdown.classList.remove('block');
    settingsDropdown.classList.add('hidden');
  }, 500);
};

// dropping down the settings options
if (settingBtn !== null) {
  let settingBtnClicked = false;

  settingBtn.addEventListener('click', ()=> {
    settingBtnClicked = true;

    // changing the options of the settings dropdown base on the active nav-item
    if (statusNav.classList.contains('active')) {
      appOptions.classList.remove('call-active');
      appOptions.classList.add('status-active');
    } else if (callNav.classList.contains('active')) {
      appOptions.classList.remove('status-active');
      appOptions.classList.add('call-active');
    } else if (chatNav.classList.contains('active')) {
      appOptions.classList.remove('status-active');
      appOptions.classList.remove('call-active');
    } else {}
    // end
    
    showThis(appOptions);
  });
  
  appOptions.addEventListener('blur', (event)=> {  
    event.stopPropagation();
    event.stopImmediatePropagation();

    hideThis(appOptions);

    settingBtnClicked = false;
  });

  leftColumn.addEventListener('scroll', (event)=> {
    event.stopPropagation();
    event.stopImmediatePropagation();

    settingBtnClicked ? hideThis(appOptions) : null;

    settingBtnClicked = false;
  });
  
  slidesContainer.addEventListener('click', ()=> {
    settingBtnClicked ? hideThis(appOptions) : null;

    settingBtnClicked = false;
  })

};

// App bottom-left floating icon change functionalities
const chatsMessageIcon = document.querySelector('#chats-message-icon');
const statusCameraIcon = document.querySelector('#status-camera-icon');
const statusPenIcon = document.querySelector('#status-pen-icon');
const callsAddCallIcon = document.querySelector('#calls-add-call-icon');

const statusUpdateNotification = document.querySelector('#status-update-notification');
  
// swiping functionalities
// initialising swiper.js externally
document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {

    autoHeight: true,

    on: {
      slideChange: function () {
        const activeSlideIndex = this.activeIndex;
        
        navItems.forEach((navItem) => {
          navItem.classList.remove('active');
        });
        
        const activeElement = document.querySelector(`.nav-items:nth-child(${activeSlideIndex + 1})`);
        activeElement.classList.add('active');

        const showChatsMessageIcon = () => {
          chatsMessageIcon.classList.remove('hidden');
          chatsMessageIcon.classList.add('flex');
        };

        const hideChatsMessageIcon = () => {
          chatsMessageIcon.classList.add('hidden');
          chatsMessageIcon.classList.remove('flex');
        };

        const showStatusCameraIcon = () => {
          statusCameraIcon.classList.remove('hidden');
          statusCameraIcon.classList.add('flex');
           
          statusPenIcon.classList.add('-translate-y-20')
        };

        const hideStatusCameraIcon = () => {
          statusCameraIcon.classList.add('hidden');
          statusCameraIcon.classList.remove('flex');

          statusPenIcon.classList.remove('-translate-y-20');
        };

        const showCallsAddCallIcon = () => {
          callsAddCallIcon.classList.remove('hidden');
          callsAddCallIcon.classList.add('flex');
        };

        const hideCallsAddCallIcon = () => {
          callsAddCallIcon.classList.add('hidden');
          callsAddCallIcon.classList.remove('flex');
        };

        if (chatNav.classList.contains('active')) {
          showChatsMessageIcon();
          hideStatusCameraIcon();
          hideCallsAddCallIcon();
        } else if (statusNav.classList.contains('active')) {
          hideChatsMessageIcon();
          showStatusCameraIcon();
          hideCallsAddCallIcon();

          statusUpdateNotification.classList.add('hidden');
        } else if (callNav.classList.contains('active')) {
          hideChatsMessageIcon();
          hideStatusCameraIcon();
          showCallsAddCallIcon();
        } else {}
      },
    },
  });
  
  // sliding to pages on click
  navItems.forEach(nav => {
    nav.addEventListener('click', () => {
      const slideIndex = nav.dataset.slideIndex;
      swiper.slideTo(slideIndex);
    });
  });
});

// adding the `active` class to a nav-item
navItems.forEach(nav => {
  nav.addEventListener('click', ()=> {
    
    navItems.forEach((navItem) => {
      navItem.classList.remove('active');
    });

    nav.classList.add('active');
  })
});

// LOADING CHATS
const myChats = document.querySelectorAll('div.chats');
const chatFilePath = 'public/pages/chat.html';
const rightColumn = document.getElementById("column-2");
const friendChat = document.createElement('div');

friendChat.setAttribute("id", "friend-chat")

// declaring would-be-interacted-with elements of the chat-column in md and > screens
var e_2 = document.createElement("div");
var e_17 = document.createElement("img");
var e_19 = document.createElement("div")       
var e_20 = document.createElement("div")
var e_24 = document.createElement("img");
var e_38 = document.createElement("input");
var e_39 = document.createElement("div");
var e_50 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var e_55 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var e_56 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var e_57 = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
var e_58 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var e_59 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

function removeAllChildElements(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

myChats.forEach(chat => {
  chat.addEventListener('click', () => {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
  
    const friendName = chat.getAttribute('friend-name');
    const friendStatus = chat.getAttribute('friend-status');
    const imageName = chat.getAttribute('img-name');
    const imageFormat = chat.getAttribute('img-format');
    
    const chatProfileImageSrc = `../imgs/friends/${imageName}.${imageFormat}`;

    if (screenWidth < 768) {
      // loading on mobile/smaller screens
      window.localStorage.setItem('chatProfileImageSrc', chatProfileImageSrc);
      window.localStorage.setItem('friendName', friendName);
      window.localStorage.setItem('friendStatus', friendStatus);
  
      window.location.href = chatFilePath;
    } else {
      // loading on desktop/larger screens

      function createNode() {
          
        var container = document.createDocumentFragment();
        var e_0 = document.createElement("div");
        var e_1 = document.createElement("div");
        e_1.setAttribute("class", "font-roboto fixed right-0 w-3/5 z-20");
        // e_2 created above
        e_2.setAttribute("id", "chat-settings");
        e_2.setAttribute("class", "animate__animated animate__faster md:w-2/5 dark:bg-WADarkGreen dark:text-white focus:outline-none absolute top-0 right-0 hidden w-3/5 text-black bg-white shadow-md");
        e_2.setAttribute("tabindex", "-1");
        var e_3 = document.createElement("ul");
        var e_4 = document.createElement("li");
        e_4.setAttribute("class", "options");
        e_4.appendChild(document.createTextNode("View contact"));
        e_3.appendChild(e_4);
        var e_5 = document.createElement("li");
        e_5.setAttribute("class", "options");
        e_5.appendChild(document.createTextNode("Media, links and docs"));
        e_3.appendChild(e_5);
        var e_6 = document.createElement("li");
        e_6.setAttribute("class", "options");
        e_6.appendChild(document.createTextNode("Search"));
        e_3.appendChild(e_6);
        var e_7 = document.createElement("li");
        e_7.setAttribute("class", "options");
        e_7.appendChild(document.createTextNode("Mute notification"));
        e_3.appendChild(e_7);
        var e_8 = document.createElement("li");
        e_8.setAttribute("class", "options");
        e_8.appendChild(document.createTextNode("Disappearing messages"));
        e_3.appendChild(e_8);
        var e_9 = document.createElement("li");
        e_9.setAttribute("class", "options");
        e_9.appendChild(document.createTextNode("Wallpaper"));
        e_3.appendChild(e_9);
        var e_10 = document.createElement("li");
        e_10.setAttribute("class", "options");
        e_10.appendChild(document.createTextNode("More"));
        e_3.appendChild(e_10);
        e_2.appendChild(e_3);
        e_1.appendChild(e_2);
        e_0.appendChild(e_1);
        var e_11 = document.createElement("header");
        e_11.setAttribute("class", "sticky top-0 z-10 bg-WATeal dark:bg-WADarkTeal dark:text-gray-400 flex flex-col w-full p-3 text-white");
        var e_12 = document.createElement("div");
        e_12.setAttribute("class", "flex flex-row items-center");
        var e_13 = document.createElement("div");
        e_13.setAttribute("class", "flex");
        var e_16 = document.createElement("div");
        e_16.setAttribute("class", "flex-center");
        // e_17 is created above
        e_17.setAttribute("class", "w-9 h-9 object-cover rounded-full");
        e_17.setAttribute("src", `public/imgs/friends/${imageName}.${imageFormat}`);
        e_17.setAttribute("alt", "friend");
        e_16.appendChild(e_17);
        e_13.appendChild(e_16);
        var e_18 = document.createElement("div");
        e_18.setAttribute("class", "flex flex-col px-3 py-1");
        // e_19 is created above
        e_19.setAttribute("class", "text-sm font-bold text-white");
        e_19.appendChild(document.createTextNode(`${friendName}`));
        e_18.appendChild(e_19);
        // e_20 is created above
        e_20.setAttribute("class", "text-xs font-normal text-white");
        e_20.appendChild(document.createTextNode(`${friendStatus}`));
        e_18.appendChild(e_20);
        e_13.appendChild(e_18);
        e_12.appendChild(e_13);
        var e_21 = document.createElement("div");
        e_21.setAttribute("class", "flex gap-4 ml-auto");
        var e_22 = document.createElement("img");
        e_22.setAttribute("class", "dual w-6");
        e_22.setAttribute("src", "https://img.icons8.com/android/96/null/video-call.png");
        e_22.setAttribute("alt", "video call");
        e_21.appendChild(e_22);
        var e_23 = document.createElement("img");
        e_23.setAttribute("class", "dual w-6");
        e_23.setAttribute("src", "https://img.icons8.com/material-sharp/96/000000/phone.png");
        e_23.setAttribute("alt", "phone");
        // e_24 created above
        e_24.setAttribute("class", "dual w-6");
        e_24.setAttribute("id", "chat-setting-btn");
        e_24.setAttribute("src", "https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/100/null/external-Menu-interface-glyph-silhouettes-icons-papa-vector-3.png");
        e_24.setAttribute("alt", "kebab");
        e_21.appendChild(e_23);
        e_21.appendChild(e_24);
        e_12.appendChild(e_21);
        e_11.appendChild(e_12);
        e_0.appendChild(e_11);
        var e_25 = document.createElement("section");
        e_25.setAttribute("class", "chat-page");
        var e_26 = document.createElement("div");
        e_26.setAttribute("class", "relative z-[1]");
        var e_27 = document.createElement("div");
        e_27.setAttribute("class", "text-[8px] text-center mx-auto my-2 p-1 w-12 text-black dark:text-gray-400 bg-white dark:bg-WADarkTeal rounded-xl shadow-md");
        e_27.appendChild(document.createTextNode("Today"));
        e_26.appendChild(e_27);
        var e_28 = document.createElement("div");
        e_28.setAttribute("class", "text-[8px] text-center mx-auto my-2 p-2 w-80 text-black dark:text-gray-400 bg-WALightYellow dark:bg-WADarkTeal rounded-xl shadow-md");
        var e_29 = document.createElement("img");
        e_29.setAttribute("class", "inline-flex w-2 mb-[2px] mr-[1px]");
        e_29.setAttribute("src", "public/imgs/lock.svg");
        e_29.setAttribute("alt", "lock");
        e_28.appendChild(e_29);
        e_28.appendChild(document.createTextNode("\nMessages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more\n"));
        e_26.appendChild(e_28);
        e_25.appendChild(e_26);
        e_0.appendChild(e_25);
        var e_30 = document.createElement("section");
        e_30.setAttribute("class", "fixed bottom-2 md:w-[55%] right-[2%] flex gap-1 z-10"); //? how this worked, I just don't know. Lol
        var e_31 = document.createElement("div");
        e_31.setAttribute("class", "rounded-full flex py-3 px-2 grow bg-white dark:bg-WADarkTeal drop-shadow overflow-x-hidden");
        var e_32 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        e_32.setAttribute("class", "w-6 h-6 mx-3");
        e_32.setAttribute("version", "1.0");
        e_32.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        e_32.setAttribute("width", "458.000000pt");
        e_32.setAttribute("height", "457.000000pt");
        e_32.setAttribute("viewBox", "0 0 458.000000 457.000000");
        e_32.setAttribute("preserveAspectRatio", "xMidYMid meet");
        var e_33 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_33.setAttribute("class", "fill-gray-400");
        e_33.setAttribute("transform", "translate(0.000000,457.000000) scale(0.100000,-0.100000)");
        e_33.setAttribute("fill", "#000000");
        e_33.setAttribute("stroke", "none");
        var e_34 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_34.setAttribute("d", `M2065 4564 c-490 -51 -893 -217 -1245 -512 -666 -557 -964 -1500
          -751 -2377 190 -781 798 -1389 1597 -1595 561 -145 1156 -91 1664 151 453 216
          804 561 1020 1004 107 218 168 415 207 665 24 160 24 510 0 670 -80 514 -301
          953 -662 1315 -358 358 -801 583 -1305 660 -101 15 -441 28 -525 19z m420
          -349 c233 -27 452 -93 665 -200 727 -365 1161 -1157 1080 -1966 -71 -698 -484
          -1266 -1120 -1542 -547 -237 -1200 -220 -1735 45 -737 365 -1134 1152 -1010
          2004 155 1062 1073 1781 2120 1659z`);
        e_33.appendChild(e_34);
        var e_35 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_35.setAttribute("d", `M1592 3154 c-123 -61 -202 -234 -189 -414 7 -99 29 -165 77 -236 97
          -146 257 -176 376 -71 56 49 87 97 113 174 41 123 35 264 -18 386 -26 60 -104
          145 -156 168 -60 28 -140 25 -203 -7z`);
        e_33.appendChild(e_35);
        var e_36 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_36.setAttribute("d", `M2832 3154 c-213 -106 -261 -488 -87 -691 102 -120 272 -122 377 -5
          121 134 146 380 56 555 -72 143 -221 203 -346 141z`);
        e_33.appendChild(e_36);
        var e_37 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_37.setAttribute("d", `M1035 2023 c34 -289 152 -540 340 -728 410 -411 1158 -478 1662 -150
          261 170 441 453 498 782 8 47 15 101 15 120 0 33 -2 35 -27 29 -446 -95 -969
          -138 -1436 -116 -356 16 -674 51 -932 101 -137 26 -128 29 -120 -38z m307
          -192 c324 -47 673 -71 1038 -71 363 0 628 21 894 71 59 11 110 18 113 15 8 -8
          -53 -90 -101 -134 -127 -117 -315 -195 -571 -239 -155 -26 -598 -26 -765 0
          -368 57 -663 189 -747 335 -30 50 -40 49 139 23z`);
        // e_38 is created above
        e_38.setAttribute("class", "w-4/5 bg-white dark:bg-WADarkTeal focus:outline-none caret-WATeal dark:text-white animate__animated animate__faster");
        e_38.setAttribute("type", "text");
        e_38.setAttribute("placeholder", "Message");
        e_33.appendChild(e_37);
        e_32.appendChild(e_33);
        e_31.appendChild(e_32);
        e_31.appendChild(e_38);
        // e_39 is created above
        e_39.setAttribute("id", "input-anime-container");
        e_39.setAttribute("class", "ml-auto flex");
        var e_40 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        e_40.setAttribute("id", "input-area-hairpin");
        e_40.setAttribute("class", "w-6 h-6 mr-3");
        e_40.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        e_40.setAttribute("xml:space", "preserve");
        e_40.setAttribute("width", "42.406mm");
        e_40.setAttribute("height", "37.7339mm");
        e_40.setAttribute("version", "1.1");
        e_40.setAttribute("shape-rendering", "geometricPrecision");
        e_40.setAttribute("text-rendering", "geometricPrecision");
        e_40.setAttribute("image-rendering", "optimizeQuality");
        e_40.setAttribute("fill-rule", "evenodd");
        e_40.setAttribute("clip-rule", "evenodd");
        e_40.setAttribute("viewBox", "0 0 86.94 77.36");
        e_40.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        e_40.setAttribute("xmlns:xodm", "http://www.corel.com/coreldraw/odm/2003");
        var e_41 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_41.setAttribute("id", "Layer_x0020_1");
        var e_42 = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        e_42.setAttribute("id", "CorelCorpID_0Corel-Layer");
        e_41.appendChild(e_42);
        var e_43 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_43.setAttribute("id", "_2099867683792");
        var e_44 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_44.setAttribute("class", "fill-gray-400");
        e_44.setAttribute("fill", "black");
        e_44.setAttribute("fill-rule", "nonzero");
        e_44.setAttribute("d", "M-0 53.18l0 0.01c0,6.46 2.51,12.53 7.08,17.09 4.57,4.56 10.64,7.09 17.1,7.09 6.46,0 12.52,-2.51 17.09,-7.08l41.07 -41.08c3.31,-3.3 4.93,-7.6 4.55,-12.12 -0.34,-4.16 -2.36,-8.29 -5.67,-11.61 -6.86,-6.85 -17.5,-7.36 -23.73,-1.13l-34.05 34.05c-3.79,3.79 -3.41,9.68 0.92,14.03 4.13,4.12 10.42,4.53 14.04,0.93 0,0 16.42,-16.43 23.71,-23.71 1.2,-1.2 1.15,-3.11 0.23,-4.03 -0.34,-0.34 -0.71,-0.71 -1.05,-1.05 -0.82,-0.82 -2.44,-1.5 -4.12,0.17 -7.31,7.31 -23.69,23.69 -23.69,23.69 -0.77,0.77 -2.73,0.55 -4.2,-0.92 -0.42,-0.42 -2.48,-2.64 -0.92,-4.19l34.05 -34.06c3.52,-3.52 9.75,-3.01 13.9,1.13 2.15,2.16 3.45,4.73 3.65,7.25 0.22,2.47 -0.67,4.78 -2.53,6.64l-41.07 41.08c-3.25,3.26 -7.58,5.04 -12.17,5.04 -4.6,0 -8.92,-1.79 -12.18,-5.05 -3.25,-3.25 -5.04,-7.57 -5.04,-12.17l0 0c0,-4.61 1.79,-8.93 5.04,-12.18 0,0 22.9,-22.9 31.01,-31.02 0.67,-0.67 1.14,-2.49 0.12,-3.5 -0.59,-0.59 -0.9,-0.9 -1.47,-1.47 -0.86,-0.86 -2.38,-1.13 -3.59,0.08 -8.15,8.15 -31,31.01 -31,31.01 -4.56,4.56 -7.07,10.63 -7.07,17.08z");
        e_43.appendChild(e_44);
        e_41.appendChild(e_43);
        e_40.appendChild(e_41);
        e_39.appendChild(e_40);
        var e_45 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        e_45.setAttribute("id", "input-area-camera");
        e_45.setAttribute("class", "w-6 h-6 mr-3");
        e_45.setAttribute("version", "1.0");
        e_45.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        e_45.setAttribute("width", "96.000000pt");
        e_45.setAttribute("height", "96.000000pt");
        e_45.setAttribute("viewBox", "0 0 96.000000 96.000000");
        e_45.setAttribute("preserveAspectRatio", "xMidYMid meet");
        var e_46 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_46.setAttribute("class", "fill-gray-400");
        e_46.setAttribute("transform", "translate(0.000000,96.000000) scale(0.100000,-0.100000)");
        e_46.setAttribute("fill", "#000000");
        e_46.setAttribute("stroke", "none");
        var e_47 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_47.setAttribute("d", "M326 840 c-43 -39 -44 -40 -120 -40 -68 0 -80 -3 -101 -25 l-25 -24 0 -271 0 -271 25 -24 24 -25 351 0 351 0 24 25 25 24 0 271 0 271 -25 24 c-21 22 -33 25 -101 25 -76 0 -77 1 -120 40 l-44 40 -110 0 -110 0 -44 -40z m264 -194 c59 -39 85 -89 85 -166 0 -78 -26 -127 -88 -168 -56 -37 -153 -39 -210 -3 -76 47 -111 140 -88 229 14 51 75 117 123 131 53 16 135 6 178 -23z");
        e_46.appendChild(e_47);
        var e_48 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_48.setAttribute("d", "M435 591 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33 82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46 -129 30z");
        e_46.appendChild(e_48);
        e_45.appendChild(e_46);
        e_39.appendChild(e_45);
        e_31.appendChild(e_39);
        e_30.appendChild(e_31);
        var e_49 = document.createElement("div");
        e_49.setAttribute("class", "rounded-full w-11 h-11 bg-WATeal relative drop-shadow");
        // e_50 is created above
        e_50.setAttribute("id", "input-area-mic");
        e_50.setAttribute("class", "w-6 h-6 absolute top-0 left-0 right-0 bottom-0 m-auto transition-[scale] duration-500 z-[1]");
        e_50.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        e_50.setAttribute("xml:space", "preserve");
        e_50.setAttribute("width", "35.2124mm");
        e_50.setAttribute("height", "47.7916mm");
        e_50.setAttribute("version", "1.1");
        e_50.setAttribute("shape-rendering", "geometricPrecision");
        e_50.setAttribute("text-rendering", "geometricPrecision");
        e_50.setAttribute("image-rendering", "optimizeQuality");
        e_50.setAttribute("fill-rule", "evenodd");
        e_50.setAttribute("clip-rule", "evenodd");
        e_50.setAttribute("viewBox", "0 0 56.45 76.62");
        e_50.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        e_50.setAttribute("xmlns:xodm", "http://www.corel.com/coreldraw/odm/2003");
        var e_51 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_51.setAttribute("id", "Layer_x0020_1");
        var e_52 = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        e_52.setAttribute("id", "CorelCorpID_0Corel-Layer");
        e_51.appendChild(e_52);
        var e_53 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        e_53.setAttribute("id", "_2099912064368");
        var e_54 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        e_54.setAttribute("fill", "white");
        e_54.setAttribute("fill-rule", "nonzero");
        e_54.setAttribute("d", "M28.23 48.39c6.86,0 12.1,-5.24 12.1,-12.1l0 -24.19c0,-6.86 -5.24,-12.1 -12.1,-12.1 -6.86,0 -12.1,5.25 -12.1,12.1l0 24.19c0,6.86 5.24,12.1 12.09,12.1zm21.37 -12.1c0,12.1 -10.08,20.56 -21.37,20.56 -11.29,0 -21.37,-8.47 -21.37,-20.56l-6.86 0c0,13.71 10.89,25 24.19,27.02l0 13.31 8.07 0 0 -13.31c13.31,-2.01 24.19,-13.31 24.19,-27.02l-6.85 -0z");
        // e_55 is created above
        e_55.setAttribute("id", "input-area-send-btn");
        e_55.setAttribute("class", "w-6 h-6 absolute top-0 left-0 right-0 bottom-0 m-auto transition-[scale] scale-0 duration-500");
        e_55.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        e_55.setAttribute("xml:space", "preserve");
        e_55.setAttribute("width", "84.952mm");
        e_55.setAttribute("height", "72.8184mm");
        e_55.setAttribute("version", "1.1");
        e_55.setAttribute("shape-rendering", "geometricPrecision");
        e_55.setAttribute("text-rendering", "geometricPrecision");
        e_55.setAttribute("image-rendering", "optimizeQuality");
        e_55.setAttribute("fill-rule", "evenodd");
        e_55.setAttribute("clip-rule", "evenodd");
        e_55.setAttribute("viewBox", "0 0 331.49 284.14");
        e_55.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        e_55.setAttribute("xmlns:xodm", "http://www.corel.com/coreldraw/odm/2003");
        // e_56, e_57, e_58, e_59 created above
        e_56.setAttribute("id", "Layer_x0020_1");
        e_57.setAttribute("id", "CorelCorpID_0Corel-Layer");
        e_56.appendChild(e_57);
        e_58.setAttribute("id", "_2099917458768");
        e_59.setAttribute("fill", "white");
        e_59.setAttribute("fill-rule", "nonzero");
        e_59.setAttribute("points", "-0,284.14 331.49,142.07 -0,0 0.16,115.54 199.1,142.07 0.16,168.6 ");
        e_53.appendChild(e_54);
        e_51.appendChild(e_53);
        e_50.appendChild(e_51);
        e_49.appendChild(e_50);
        e_58.appendChild(e_59);
        e_56.appendChild(e_58);
        e_55.appendChild(e_56);
        e_49.appendChild(e_55);
        e_30.appendChild(e_49);
        e_0.appendChild(e_30);
        container.appendChild(e_0);
        
        friendChat.setAttribute('class', 'relative');
        friendChat.setAttribute("friend", `${friendName}`)
        removeAllChildElements(friendChat);
        friendChat.append(e_1, e_11, e_25, e_30);
      }

      function showChat() {
        removeAllChildElements(rightColumn);
        createNode();
        rightColumn.append(friendChat);
      }

      if (!rightColumn.contains(friendChat)) {
        showChat();
      } else {
        e_17.setAttribute("src", `public/imgs/friends/${imageName}.${imageFormat}`);
        e_19.innerText = friendName;
        e_20.innerText = friendStatus;
      }
    };
  });
});
// END

// event listeners for chat-option btn and chat-option at md-and-above screens.
let e_24Clicked = false;

e_24.addEventListener('click', ()=> {
  e_24Clicked = true;

  showThis(e_2, 900);
});

e_2.addEventListener('blur', (event)=> {
  event.stopPropagation();
  event.stopImmediatePropagation();

  hideThis(e_2);

  e_24Clicked = false;
});

if (rightColumn) {
  rightColumn.addEventListener("scroll", (event)=> {
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    e_24Clicked ? hideThis(e_2) : null;

    e_24Clicked = false;
  });

  slidesContainer.addEventListener('click', ()=> {
    e_24Clicked ? hideThis(e_2) : null;

    e_24Clicked = false;
  })
}

// clearing call logs
const clearCallLogsBtn = document.querySelector('.options.call-option');
const callLogs = document.querySelector('[aria-labelledby="calls"]');

if (clearCallLogsBtn !== null) {
  clearCallLogsBtn.addEventListener('click', ()=> {
    callLogs.remove();
  });
};

// event listeners for animations of the icons in the input section at md-and-above screens.
e_38.addEventListener('input', ()=> {
  e_39.classList.add('animate-hide-camera');
  e_39.classList.remove('animate-show-camera');

  e_50.classList.remove('z-[1]');
  e_50.classList.add('scale-0');
  e_55.classList.add('z-[1]');
  e_55.classList.remove('scale-0');

})

e_38.addEventListener('input', ()=> {
  if (e_38.value == '') {
  e_39.classList.remove('animate-hide-camera');
  e_39.classList.add('animate-show-camera');
  
  e_50.classList.add('z-[1]');
  e_50.classList.remove('scale-0');
  e_55.classList.remove('z-[1]');
  e_55.classList.add('scale-0');
  }
})

// event listener for chat-option btn and chat-option at small screens.
const chatSettingBtn = document.getElementById('chat-setting-btn');
const chatOptions = document.getElementById('chat-settings');

if (chatOptions !== null) {
  let chatOptionsClicked = false;

  chatSettingBtn.addEventListener('click', ()=> {
    chatOptionsClicked = true;

    showThis(chatOptions, 900);
  })
  
  chatOptions.addEventListener('blur', ()=> {
    hideThis(chatOptions);

    chatOptionsClicked = false;
  });

  document.addEventListener('scroll', ()=> {
    chatOptionsClicked ? hideThis(chatOptions) : null;

    chatOptionsClicked = false;
  });
};

// settings page on md:screens
const intSettingBtn = document.getElementById('int-setting-btn');

// settings page Js elements for md:screens
var neWe_0 = document.createElement("div");
neWe_0.setAttribute("id", "body-content");
neWe_0.setAttribute("class", "relative");
var neWe_1 = document.createElement("div");
neWe_1.setAttribute("id", "theme-modal-bg");
neWe_1.setAttribute("class", "theme-modal-bg z-20 invisible opacity-0");
var neWe_2 = document.createElement("div");
neWe_2.setAttribute("id", "theme-modal");
neWe_2.setAttribute("class", "p-4 w-9/12 md:max-w-[40%] lg:max-w-[30%] bg-white dark:bg-WADarkTeal md:drop-shadow-xl");
var neWe_3 = document.createElement("div");
neWe_3.setAttribute("class", "text-black dark:text-white py-2 text-lg font-medium");
neWe_3.appendChild(document.createTextNode("Choose theme"));
neWe_2.appendChild(neWe_3);
var neWe_4 = document.createElement("div");
neWe_4.setAttribute("class", "flex items-center");
var neWe_5 = document.createElement("input");
neWe_5.setAttribute("class", "theme");
neWe_5.setAttribute("type", "radio");
neWe_5.setAttribute("name", "theme");
neWe_5.setAttribute("id", "default");
neWe_5.setAttribute("value", "default");
neWe_5.setAttribute("checked", "");
neWe_4.appendChild(neWe_5);
var neWe_6 = document.createElement("label");
neWe_6.setAttribute("class", "text-black dark:text-white");
neWe_6.setAttribute("for", "default");
neWe_6.appendChild(document.createTextNode("System default"));
neWe_4.appendChild(neWe_6);
neWe_2.appendChild(neWe_4);
var neWe_7 = document.createElement("div");
neWe_7.setAttribute("class", "flex items-center mt-2");
var neWe_8 = document.createElement("input");
neWe_8.setAttribute("class", "theme");
neWe_8.setAttribute("type", "radio");
neWe_8.setAttribute("name", "theme");
neWe_8.setAttribute("id", "light");
neWe_8.setAttribute("value", "light");
neWe_7.appendChild(neWe_8);
var neWe_9 = document.createElement("label");
neWe_9.setAttribute("class", "text-black dark:text-white");
neWe_9.setAttribute("for", "light");
neWe_9.appendChild(document.createTextNode("Light"));
neWe_7.appendChild(neWe_9);
neWe_2.appendChild(neWe_7);
var neWe_10 = document.createElement("div");
neWe_10.setAttribute("class", "flex items-center mt-2");
var neWe_11 = document.createElement("input");
neWe_11.setAttribute("class", "theme");
neWe_11.setAttribute("type", "radio");
neWe_11.setAttribute("name", "theme");
neWe_11.setAttribute("id", "dark");
neWe_11.setAttribute("value", "dark");
neWe_10.appendChild(neWe_11);
var neWe_12 = document.createElement("label");
neWe_12.setAttribute("class", "text-black dark:text-white");
neWe_12.setAttribute("for", "dark");
neWe_12.appendChild(document.createTextNode("Dark"));
neWe_10.appendChild(neWe_12);
neWe_2.appendChild(neWe_10);
var neWe_13 = document.createElement("div");
neWe_13.setAttribute("class", "flex justify-end");
var neWe_14 = document.createElement("div");
neWe_14.setAttribute("class", "theme-select-btn flex text-WATeal p-2 hover:bg-gray-200 mr-3 md:px-4 cursor-pointer md:border-gray-100 dark:md:border-[#27353f] md:rounded-sm md:border-2 md:hover:bg-inherit md:transition-shadow md:duration-300 md:hover:shadow-md");
neWe_14.appendChild(document.createTextNode("Cancel"));
neWe_13.appendChild(neWe_14);
var neWe_15 = document.createElement("div");
neWe_15.setAttribute("class", "theme-select-btn flex text-WATeal p-2 hover:bg-gray-200 md:px-6 md:items-center cursor-pointer md:rounded-sm md:text-white dark:md:text-WADarkTeal md:bg-WATeal md:hover:bg-WATeal md:transition-shadow md:duration-300 md:hover:shadow-md");
neWe_15.appendChild(document.createTextNode("Ok"));
neWe_13.appendChild(neWe_15);
neWe_2.appendChild(neWe_13);
neWe_1.appendChild(neWe_2);
neWe_0.appendChild(neWe_1);

var neWe_45 = document.createElement("div");
neWe_45.setAttribute("class", "in-settings theme-setting");
var neWe_112 = document.createElement("div");
neWe_112.setAttribute("class", "in-settings-md theme-setting");

if (intSettingBtn !== null) {
  intSettingBtn.addEventListener('click', ()=> {

        function createSettingsPage() {
          var e_16 = document.createElement("header");
          e_16.setAttribute("class", "sticky top-0 bg-WATeal dark:bg-WADarkTeal p-4 md:py-6 md:px-7 flex items-center");
          var e_17 = document.createElement("a");
          e_17.setAttribute("href", "../../index.html");
          e_17.setAttribute("class", "flex-center mr-2 invert-[1]");
          var e_18 = document.createElement("img");
          e_18.setAttribute("class", "w-5");
          e_18.setAttribute("src", "https://img.icons8.com/android/96/null/left.png");
          e_18.setAttribute("alt", "back icon");
          e_17.appendChild(e_18);
          e_16.appendChild(e_17);
          var e_19 = document.createElement("div");
          e_19.setAttribute("class", "text-xl text-white font-medium px-12 py-1");
          e_19.appendChild(document.createTextNode("Settings"));
          e_16.appendChild(e_19);
          neWe_0.appendChild(e_16);
          var e_20 = document.createElement("section");
          e_20.setAttribute("class", "profile-tab");
          var e_21 = document.createElement("div");
          e_21.setAttribute("class", "flex items-center justify-between py-5 px-6 transition duration-100 dark:bg-WADarkGreen hover:bg-gray-200 hover:dark:bg-WADarkTeal");
          var e_22 = document.createElement("div");
          e_22.setAttribute("class", "flex");
          var e_23 = document.createElement("div");
          var e_24 = document.createElement("img");
          e_24.setAttribute("class", "w-20 h-20 object-cover rounded-full");
          e_24.setAttribute("src", "public/imgs/my-profile-pic.jpg");
          e_24.setAttribute("alt", "profile pic");
          e_23.appendChild(e_24);
          e_22.appendChild(e_23);
          var e_25 = document.createElement("div");
          e_25.setAttribute("class", "flex flex-col p-3");
          var e_26 = document.createElement("div");
          e_26.setAttribute("class", "text-black dark:text-white font-bold");
          e_26.appendChild(document.createTextNode("Ayokanmi"));
          e_25.appendChild(e_26);
          var e_27 = document.createElement("div");
          e_27.setAttribute("class", "mt-1 text-gray-900 dark:text-gray-400 font-normal text-xs");
          e_27.appendChild(document.createTextNode("Only 🙏🏾 by His grace"));
          e_25.appendChild(e_27);
          e_22.appendChild(e_25);
          e_21.appendChild(e_22);
          var e_28 = document.createElement("div");
          e_28.setAttribute("class", "flex");
          var e_29 = document.createElement("img");
          e_29.setAttribute("class", "w-8");
          e_29.setAttribute("src", "public/imgs/qr-code.png");
          e_29.setAttribute("alt", "qr-code");
          e_28.appendChild(e_29);
          e_21.appendChild(e_28);
          e_20.appendChild(e_21);
          neWe_0.appendChild(e_20);
          var e_30 = document.createElement("main");
          e_30.setAttribute("class", "md:hidden");
          var e_31 = document.createElement("div");
          e_31.setAttribute("class", "in-settings");
          var e_32 = document.createElement("div");
          e_32.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_33 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_33.setAttribute("class", "w-6 h-6 rotate-[40deg] fill-gray-400");
          e_33.setAttribute("fill", "currentColor");
          e_33.setAttribute("height", "96");
          e_33.setAttribute("viewBox", "0 0 24 24");
          e_33.setAttribute("width", "96");
          e_33.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          var e_34 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_34.setAttribute("d", "M 14.414063 11.144531 C 14.957031 10.09375 15.273438 8.902344 15.273438 7.636719 C 15.273438 3.421875 11.851563 0 7.636719 0 C 3.421875 0 0 3.417969 0 7.636719 C 0 11.851563 3.421875 15.273438 7.636719 15.273438 C 8.902344 15.273438 10.09375 14.960938 11.140625 14.414063 L 15.273438 18.542969 L 17.453125 18.542969 C 17.453125 18.546875 17.453125 20.726563 17.453125 20.726563 L 19.636719 20.726563 L 19.636719 22.910156 L 20.726563 24 L 24 24 L 24 20.726563 Z M 5.5 8 C 4.121094 8 3 6.882813 3 5.5 C 3 4.117188 4.121094 3 5.5 3 C 6.882813 3 8 4.117188 8 5.5 C 8 6.882813 6.882813 8 5.5 8 Z");
          e_33.appendChild(e_34);
          e_32.appendChild(e_33);
          e_31.appendChild(e_32);
          var e_35 = document.createElement("div");
          e_35.setAttribute("class", "flex flex-col");
          var e_36 = document.createElement("div");
          e_36.setAttribute("class", "text-black dark:text-white");
          e_36.appendChild(document.createTextNode("Account"));
          e_35.appendChild(e_36);
          var e_37 = document.createElement("div");
          e_37.setAttribute("class", "text-gray-400 text-[10px]");
          e_37.appendChild(document.createTextNode("Security notifications, change number"));
          e_35.appendChild(e_37);
          e_31.appendChild(e_35);
          e_30.appendChild(e_31);
          var e_38 = document.createElement("div");
          e_38.setAttribute("class", "in-settings");
          var e_39 = document.createElement("div");
          e_39.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_40 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_40.setAttribute("viewBox", "0 0 28 35");
          e_40.setAttribute("height", "24");
          e_40.setAttribute("width", "24");
          e_40.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_40.setAttribute("class", "");
          e_40.setAttribute("version", "1.1");
          var e_41 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_41.setAttribute("class", "fill-gray-400");
          e_41.setAttribute("d", "M14,1.10204082 C18.5689011,1.10204082 22.2727273,4.80586698 22.2727273,9.37476809 L22.272,12.1790408 L22.3564837,12.181606 C24.9401306,12.294858 27,14.4253101 27,17.0368705 L27,29.4665309 C27,32.1506346 24.824104,34.3265306 22.1400003,34.3265306 L5.85999974,34.3265306 C3.175896,34.3265306 1,32.1506346 1,29.4665309 L1,17.0368705 C1,14.3970988 3.10461313,12.2488858 5.72742704,12.178644 L5.72727273,9.37476809 C5.72727273,4.80586698 9.43109889,1.10204082 14,1.10204082 Z M14,19.5600907 C12.0418995,19.5600907 10.4545455,21.2128808 10.4545455,23.2517007 C10.4545455,25.2905206 12.0418995,26.9433107 14,26.9433107 C15.9581005,26.9433107 17.5454545,25.2905206 17.5454545,23.2517007 C17.5454545,21.2128808 15.9581005,19.5600907 14,19.5600907 Z M14,4.79365079 C11.4617216,4.79365079 9.39069048,6.79417418 9.27759175,9.30453585 L9.27272727,9.52092352 L9.272,12.1760408 L18.727,12.1760408 L18.7272727,9.52092352 C18.7272727,6.91012289 16.6108006,4.79365079 14,4.79365079 Z");
          e_41.setAttribute("fill", "currentColor");
          e_40.appendChild(e_41);
          e_39.appendChild(e_40);
          e_38.appendChild(e_39);
          var e_42 = document.createElement("div");
          e_42.setAttribute("class", "flex flex-col");
          var e_43 = document.createElement("div");
          e_43.setAttribute("class", "text-black dark:text-white");
          e_43.appendChild(document.createTextNode("Privacy"));
          e_42.appendChild(e_43);
          var e_44 = document.createElement("div");
          e_44.setAttribute("class", "text-gray-400 text-[10px]");
          e_44.appendChild(document.createTextNode("Block contact, disappearing messages"));
          e_42.appendChild(e_44);
          e_38.appendChild(e_42);
          e_30.appendChild(e_38);
          var e_46 = document.createElement("div");
          e_46.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_47 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_47.setAttribute("viewBox", "0 0 24 24");
          e_47.setAttribute("height", "24");
          e_47.setAttribute("width", "24");
          e_47.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_47.setAttribute("class", "");
          e_47.setAttribute("version", "1.1");
          e_47.setAttribute("x", "0px");
          e_47.setAttribute("y", "0px");
          e_47.setAttribute("enable-background", "new 0 0 24 24");
          e_47.setAttribute("xml:space", "preserve");
          var e_48 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_48.setAttribute("class", "fill-gray-400");
          e_48.setAttribute("fill", "currentColor");
          e_48.setAttribute("enable-background", "new    ");
          e_48.setAttribute("d", "M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z");
          e_47.appendChild(e_48);
          e_46.appendChild(e_47);
          neWe_45.appendChild(e_46);
          var e_49 = document.createElement("div");
          e_49.setAttribute("class", "flex flex-col");
          var e_50 = document.createElement("div");
          e_50.setAttribute("class", "text-black dark:text-white");
          e_50.appendChild(document.createTextNode("Chats"));
          e_49.appendChild(e_50);
          var e_51 = document.createElement("div");
          e_51.setAttribute("class", "text-gray-400 text-[10px]");
          e_51.appendChild(document.createTextNode("Theme, wallpapers, chat history"));
          e_49.appendChild(e_51);
          neWe_45.appendChild(e_49);
          e_30.appendChild(neWe_45);
          var e_52 = document.createElement("div");
          e_52.setAttribute("class", "in-settings");
          var e_53 = document.createElement("div");
          e_53.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_54 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_54.setAttribute("viewBox", "0 0 24 24");
          e_54.setAttribute("height", "24");
          e_54.setAttribute("width", "24");
          e_54.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_54.setAttribute("class", "");
          e_54.setAttribute("version", "1.1");
          e_54.setAttribute("x", "0px");
          e_54.setAttribute("y", "0px");
          e_54.setAttribute("enable-background", "new 0 0 24 24");
          e_54.setAttribute("xml:space", "preserve");
          var e_55 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_55.setAttribute("class", "fill-gray-400");
          e_55.setAttribute("fill", "currentColor");
          e_55.setAttribute("d", "M12,21.7c0.9,0,1.7-0.8,1.7-1.7h-3.4C10.3,20.9,11.1,21.7,12,21.7z M17.6,16.5v-4.7 c0-2.7-1.8-4.8-4.3-5.4V5.8c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3v0.6C8.2,7,6.4,9.1,6.4,11.8v4.7l-1.7,1.7v0.9h14.6v-0.9 L17.6,16.5z");
          e_54.appendChild(e_55);
          e_53.appendChild(e_54);
          e_52.appendChild(e_53);
          var e_56 = document.createElement("div");
          e_56.setAttribute("class", "flex flex-col");
          var e_57 = document.createElement("div");
          e_57.setAttribute("class", "text-black dark:text-white");
          e_57.appendChild(document.createTextNode("Notifications"));
          e_56.appendChild(e_57);
          var e_58 = document.createElement("div");
          e_58.setAttribute("class", "text-gray-400 text-[10px]");
          e_58.appendChild(document.createTextNode("Message, group & call tones"));
          e_56.appendChild(e_58);
          e_52.appendChild(e_56);
          e_30.appendChild(e_52);
          var e_59 = document.createElement("div");
          e_59.setAttribute("class", "in-settings");
          var e_60 = document.createElement("div");
          e_60.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_61 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_61.setAttribute("class", "w-6 h-6");
          e_61.setAttribute("width", "800px");
          e_61.setAttribute("height", "800px");
          e_61.setAttribute("viewBox", "0 0 24 24");
          e_61.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          var e_62 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          var e_63 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_63.setAttribute("fill", "none");
          e_63.setAttribute("d", "M0 0H24V24H0z");
          e_62.appendChild(e_63);
          var e_64 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_64.setAttribute("class", "fill-gray-400");
          e_64.setAttribute("d", "M11 2.05v3.02C7.608 5.557 5 8.475 5 12c0 3.866 3.134 7 7 7 1.572 0 3.024-.518 4.192-1.394l2.137 2.137C16.605 21.153 14.4 22 12 22 6.477 22 2 17.523 2 12c0-5.185 3.947-9.449 9-9.95zM21.95 13c-.2 2.011-.994 3.847-2.207 5.328l-2.137-2.136c.687-.916 1.153-2.006 1.323-3.192h3.022zM13.002 2.05c4.724.469 8.48 4.226 8.95 8.95h-3.022c-.438-3.065-2.863-5.49-5.928-5.929V2.049z");
          e_62.appendChild(e_64);
          e_61.appendChild(e_62);
          e_60.appendChild(e_61);
          e_59.appendChild(e_60);
          var e_65 = document.createElement("div");
          e_65.setAttribute("class", "flex flex-col");
          var e_66 = document.createElement("div");
          e_66.setAttribute("class", "text-black dark:text-white");
          e_66.appendChild(document.createTextNode("Storage and data"));
          e_65.appendChild(e_66);
          var e_67 = document.createElement("div");
          e_67.setAttribute("class", "text-gray-400 text-[10px]");
          e_67.appendChild(document.createTextNode("Network usage, auto-download"));
          e_65.appendChild(e_67);
          e_59.appendChild(e_65);
          e_30.appendChild(e_59);
          var e_68 = document.createElement("div");
          e_68.setAttribute("class", "in-settings");
          var e_69 = document.createElement("div");
          e_69.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_70 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_70.setAttribute("class", "w-6 h-6");
          e_70.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          e_70.setAttribute("xml:space", "preserve");
          e_70.setAttribute("width", "13.4088mm");
          e_70.setAttribute("height", "13.4088mm");
          e_70.setAttribute("version", "1.1");
          e_70.setAttribute("shape-rendering", "geometricPrecision");
          e_70.setAttribute("text-rendering", "geometricPrecision");
          e_70.setAttribute("image-rendering", "optimizeQuality");
          e_70.setAttribute("fill-rule", "evenodd");
          e_70.setAttribute("clip-rule", "evenodd");
          e_70.setAttribute("viewBox", "0 0 3.24 3.24");
          e_70.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
          e_70.setAttribute("xmlns:xodm", "http://www.corel.com/coreldraw/odm/2003");
          var e_71 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          e_71.setAttribute("id", "Layer_x0020_1");
          var e_72 = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
          e_72.setAttribute("id", "CorelCorpID_0Corel-Layer");
          e_71.appendChild(e_72);
          var e_73 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_73.setAttribute("fill", "none");
          e_73.setAttribute("stroke", "#9ca3af");
          e_73.setAttribute("stroke-width", "0.13");
          e_73.setAttribute("stroke-linecap", "round");
          e_73.setAttribute("stroke-linejoin", "round");
          e_73.setAttribute("stroke-miterlimit", "22.9256");
          e_73.setAttribute("d", "M1.62 0.06c0.39,0.43 0.61,0.98 0.62,1.55 -0.01,0.58 -0.23,1.13 -0.62,1.55m0 -3.11c-0.39,0.43 -0.61,0.98 -0.62,1.55 0.01,0.58 0.23,1.13 0.62,1.55m0 -3.11c-0.86,0 -1.55,0.7 -1.55,1.55 0,0.86 0.7,1.55 1.55,1.55m0 -3.11c0.86,0 1.55,0.7 1.55,1.55 0,0.86 -0.7,1.55 -1.55,1.55m-1.48 -2.02l2.95 0m-2.95 0.93l2.95 0");
          e_71.appendChild(e_73);
          e_70.appendChild(e_71);
          e_69.appendChild(e_70);
          e_68.appendChild(e_69);
          var e_74 = document.createElement("div");
          e_74.setAttribute("class", "flex flex-col");
          var e_75 = document.createElement("div");
          e_75.setAttribute("class", "text-black dark:text-white");
          e_75.appendChild(document.createTextNode("App language"));
          e_74.appendChild(e_75);
          var e_76 = document.createElement("div");
          e_76.setAttribute("class", "text-gray-400 text-[10px]");
          e_76.appendChild(document.createTextNode("English (phone's language)"));
          e_74.appendChild(e_76);
          e_68.appendChild(e_74);
          e_30.appendChild(e_68);
          var e_77 = document.createElement("div");
          e_77.setAttribute("class", "in-settings");
          var e_78 = document.createElement("div");
          e_78.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_79 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_79.setAttribute("class", "w-6 h-6");
          e_79.setAttribute("fill", "#9ca3af");
          e_79.setAttribute("width", "800px");
          e_79.setAttribute("height", "800px");
          e_79.setAttribute("viewBox", "0 0 31.925 31.925");
          e_79.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          var e_80 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          e_80.setAttribute("transform", "translate(-673.321 -514.099)");
          var e_81 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_81.setAttribute("d", "M689.284,516.1a13.962,13.962,0,1,1-13.963,13.962A13.977,13.977,0,0,1,689.284,516.1m0-2a15.962,15.962,0,1,0,15.962,15.962A15.962,15.962,0,0,0,689.284,514.1Z");
          e_80.appendChild(e_81);
          var e_82 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_82.setAttribute("d", "M687.65,531.612a2.374,2.374,0,0,1,.49-1.433,9.248,9.248,0,0,1,1.443-1.483,10.084,10.084,0,0,0,1.321-1.371,1.993,1.993,0,0,0,.367-1.2,1.953,1.953,0,0,0-1.982-2,2.073,2.073,0,0,0-1.419.543,3.56,3.56,0,0,0-.954,1.582l-2.152-.939a5.027,5.027,0,0,1,1.724-2.657,4.632,4.632,0,0,1,2.9-.926,4.959,4.959,0,0,1,2.287.531,4.154,4.154,0,0,1,1.651,1.5,3.979,3.979,0,0,1,.611,2.175,3.681,3.681,0,0,1-.538,1.965,8.76,8.76,0,0,1-1.638,1.865,13.792,13.792,0,0,0-1.359,1.322,1.536,1.536,0,0,0-.379,1,2.868,2.868,0,0,0,.1.667h-2.2A2.74,2.74,0,0,1,687.65,531.612Zm1.468,6.969a1.855,1.855,0,0,1-1.357-.543,1.831,1.831,0,0,1-.551-1.359,1.875,1.875,0,0,1,.551-1.372,1.835,1.835,0,0,1,1.357-.556,1.868,1.868,0,0,1,1.908,1.928,1.833,1.833,0,0,1-.549,1.359A1.863,1.863,0,0,1,689.118,538.581Z");
          e_80.appendChild(e_82);
          e_79.appendChild(e_80);
          e_78.appendChild(e_79);
          e_77.appendChild(e_78);
          var e_83 = document.createElement("div");
          e_83.setAttribute("class", "flex flex-col");
          var e_84 = document.createElement("div");
          e_84.setAttribute("class", "text-black dark:text-white");
          e_84.appendChild(document.createTextNode("Help"));
          e_83.appendChild(e_84);
          var e_85 = document.createElement("div");
          e_85.setAttribute("class", "text-gray-400 text-[10px]");
          e_85.appendChild(document.createTextNode("Help centre, contact us, privacy policy"));
          e_83.appendChild(e_85);
          e_77.appendChild(e_83);
          e_30.appendChild(e_77);
          var e_86 = document.createElement("div");
          e_86.setAttribute("class", "in-settings");
          var e_87 = document.createElement("div");
          e_87.setAttribute("class", "grid place-items-center pl-3 pr-6");
          var e_88 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_88.setAttribute("class", "fill-gray-400");
          e_88.setAttribute("fill", "#000000");
          e_88.setAttribute("width", "24px");
          e_88.setAttribute("height", "24px");
          e_88.setAttribute("viewBox", "-3 0 32 32");
          e_88.setAttribute("version", "1.1");
          e_88.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          var e_89 = document.createElement("title");
          e_89.appendChild(document.createTextNode("friend"));
          e_88.appendChild(e_89);
          var e_90 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_90.setAttribute("d", "M17.25 20.5c1.281 0.719 2 1.906 1.875 3.125-0.063 0.75-0.031 0.75-1 0.875-0.594 0.063-4.375 0.094-8.219 0.094-4.375 0-8.938-0.031-9.281-0.125-1.281-0.344-0.531-2.719 1.156-3.844 1.344-0.844 4.063-2.156 4.813-2.313 1.031-0.219 1.156-0.875 0-2.844-0.25-0.469-0.531-1.813-0.563-3.25-0.031-2.313 0.375-3.875 2.406-4.656 0.375-0.125 0.813-0.188 1.219-0.188 1.344 0 2.594 0.75 3.125 1.844 0.719 1.469 0.375 5.313-0.375 6.719-0.906 1.594-0.813 2.094 0.188 2.344 0.625 0.156 2.688 1.125 4.656 2.219zM24.094 18.531c1 0.531 1.563 1.5 1.469 2.438-0.031 0.563-0.031 0.594-0.781 0.688-0.375 0.063-2.344 0.094-4.656 0.094-0.406-0.969-1.188-1.844-2.25-2.406-1.219-0.688-2.656-1.406-3.75-1.875 0.719-0.344 1.344-0.625 1.625-0.688 0.781-0.188 0.875-0.625 0-2.188-0.219-0.375-0.469-1.438-0.5-2.563-0.031-1.813 0.375-3.063 1.938-3.656 0.313-0.094 0.656-0.156 0.969-0.156 1.031 0 2 0.563 2.406 1.438 0.531 1.156 0.281 4.156-0.281 5.281-0.688 1.25-0.625 1.625 0.156 1.813 0.5 0.125 2.094 0.906 3.656 1.781z");
          e_88.appendChild(e_90);
          e_87.appendChild(e_88);
          e_86.appendChild(e_87);
          var e_91 = document.createElement("div");
          e_91.setAttribute("class", "flex flex-col");
          var e_92 = document.createElement("div");
          e_92.setAttribute("class", "text-black dark:text-white");
          e_92.appendChild(document.createTextNode("Invite friend"));
          e_91.appendChild(e_92);
          e_86.appendChild(e_91);
          e_30.appendChild(e_86);
          neWe_0.appendChild(e_30);
          var e_93 = document.createElement("main");
          e_93.setAttribute("class", "hidden md:block");
          var e_94 = document.createElement("div");
          e_94.setAttribute("class", "in-settings-md");
          var e_95 = document.createElement("div");
          e_95.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_96 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_96.setAttribute("viewBox", "0 0 24 24");
          e_96.setAttribute("height", "24");
          e_96.setAttribute("width", "24");
          e_96.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_96.setAttribute("class", "");
          e_96.setAttribute("version", "1.1");
          e_96.setAttribute("x", "0px");
          e_96.setAttribute("y", "0px");
          e_96.setAttribute("enable-background", "new 0 0 24 24");
          e_96.setAttribute("xml:space", "preserve");
          var e_97 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_97.setAttribute("class", "fill-gray-400");
          e_97.setAttribute("fill", "currentColor");
          e_97.setAttribute("d", "M12,21.7c0.9,0,1.7-0.8,1.7-1.7h-3.4C10.3,20.9,11.1,21.7,12,21.7z M17.6,16.5v-4.7 c0-2.7-1.8-4.8-4.3-5.4V5.8c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3v0.6C8.2,7,6.4,9.1,6.4,11.8v4.7l-1.7,1.7v0.9h14.6v-0.9 L17.6,16.5z");
          e_96.appendChild(e_97);
          e_95.appendChild(e_96);
          e_94.appendChild(e_95);
          var e_98 = document.createElement("div");
          e_98.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_99 = document.createElement("div");
          e_99.setAttribute("class", "text-black dark:text-white text-base");
          e_99.appendChild(document.createTextNode("Notifications"));
          e_98.appendChild(e_99);
          e_94.appendChild(e_98);
          e_93.appendChild(e_94);
          var e_100 = document.createElement("div");
          e_100.setAttribute("class", "in-settings-md");
          var e_101 = document.createElement("div");
          e_101.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_102 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_102.setAttribute("viewBox", "0 0 28 35");
          e_102.setAttribute("height", "24");
          e_102.setAttribute("width", "24");
          e_102.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_102.setAttribute("class", "");
          e_102.setAttribute("version", "1.1");
          var e_103 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_103.setAttribute("class", "fill-gray-400");
          e_103.setAttribute("d", "M14,1.10204082 C18.5689011,1.10204082 22.2727273,4.80586698 22.2727273,9.37476809 L22.272,12.1790408 L22.3564837,12.181606 C24.9401306,12.294858 27,14.4253101 27,17.0368705 L27,29.4665309 C27,32.1506346 24.824104,34.3265306 22.1400003,34.3265306 L5.85999974,34.3265306 C3.175896,34.3265306 1,32.1506346 1,29.4665309 L1,17.0368705 C1,14.3970988 3.10461313,12.2488858 5.72742704,12.178644 L5.72727273,9.37476809 C5.72727273,4.80586698 9.43109889,1.10204082 14,1.10204082 Z M14,19.5600907 C12.0418995,19.5600907 10.4545455,21.2128808 10.4545455,23.2517007 C10.4545455,25.2905206 12.0418995,26.9433107 14,26.9433107 C15.9581005,26.9433107 17.5454545,25.2905206 17.5454545,23.2517007 C17.5454545,21.2128808 15.9581005,19.5600907 14,19.5600907 Z M14,4.79365079 C11.4617216,4.79365079 9.39069048,6.79417418 9.27759175,9.30453585 L9.27272727,9.52092352 L9.272,12.1760408 L18.727,12.1760408 L18.7272727,9.52092352 C18.7272727,6.91012289 16.6108006,4.79365079 14,4.79365079 Z");
          e_103.setAttribute("fill", "currentColor");
          e_102.appendChild(e_103);
          e_101.appendChild(e_102);
          e_100.appendChild(e_101);
          var e_104 = document.createElement("div");
          e_104.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_105 = document.createElement("div");
          e_105.setAttribute("class", "text-black dark:text-white text-base");
          e_105.appendChild(document.createTextNode("Privacy"));
          e_104.appendChild(e_105);
          e_100.appendChild(e_104);
          e_93.appendChild(e_100);
          var e_106 = document.createElement("div");
          e_106.setAttribute("class", "in-settings-md");
          var e_107 = document.createElement("div");
          e_107.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_108 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_108.setAttribute("viewBox", "0 0 24 24");
          e_108.setAttribute("height", "24");
          e_108.setAttribute("width", "24");
          e_108.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_108.setAttribute("class", "");
          e_108.setAttribute("version", "1.1");
          var e_109 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_109.setAttribute("class", "fill-gray-400");
          e_109.setAttribute("d", "M12.027027,2 L4,5.56756757 L4,10.9189189 C4,15.8689189 7.42486486,20.4978378 12.027027,21.6216216 C16.6291892,20.4978378 20.0540541,15.8689189 20.0540541,10.9189189 L20.0540541,5.56756757 L12.027027,2 Z M12.027027,11.8018919 L18.2702703,11.8018919 C17.7975676,15.4764865 15.3448649,18.7497297 12.027027,19.7754054 L12.027027,11.8108108 L5.78378378,11.8108108 L5.78378378,6.72702703 L12.027027,3.95324324 L12.027027,11.8018919 Z");
          e_109.setAttribute("fill", "currentColor");
          e_109.setAttribute("fill-rule", "nonzero");
          e_108.appendChild(e_109);
          e_107.appendChild(e_108);
          e_106.appendChild(e_107);
          var e_110 = document.createElement("div");
          e_110.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_111 = document.createElement("div");
          e_111.setAttribute("class", "text-black dark:text-white text-base");
          e_111.appendChild(document.createTextNode("Security"));
          e_110.appendChild(e_111);
          e_106.appendChild(e_110);
          e_93.appendChild(e_106);
          var e_113 = document.createElement("div");
          e_113.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_114 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_114.setAttribute("viewBox", "0 0 24 24");
          e_114.setAttribute("height", "24");
          e_114.setAttribute("width", "24");
          e_114.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_114.setAttribute("class", "");
          e_114.setAttribute("version", "1.1");
          var e_115 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_115.setAttribute("class", "fill-gray-400");
          e_115.setAttribute("d", "M12,1 L15.219275,4.21927498 L19.780725,4.21927498 L19.780725,8.78072502 L23,12 L19.780725,15.219275 L19.780725,19.780725 L15.219275,19.780725 L12,23 L8.78072502,19.780725 L4.21927498,19.780725 L4.21927498,15.219275 L1,12 L4.21927498,8.78072502 L4.21927498,4.21927498 L8.78072502,4.21927498 L12,1 Z M12,6 L12,18 C15.31,18 18,15.31 18,12 C18,8.76522727 15.4308833,6.12259298 12.2246968,6.00414409 L12,6 Z");
          e_115.setAttribute("fill", "currentColor");
          e_115.setAttribute("fill-rule", "nonzero");
          e_114.appendChild(e_115);
          e_113.appendChild(e_114);
          neWe_112.appendChild(e_113);
          var e_116 = document.createElement("div");
          e_116.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_117 = document.createElement("div");
          e_117.setAttribute("class", "text-black dark:text-white text-base");
          e_117.appendChild(document.createTextNode("Theme"));
          e_116.appendChild(e_117);
          neWe_112.appendChild(e_116);
          e_93.appendChild(neWe_112);
          var e_118 = document.createElement("div");
          e_118.setAttribute("class", "in-settings-md");
          var e_119 = document.createElement("div");
          e_119.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_120 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_120.setAttribute("viewBox", "0 0 24 24");
          e_120.setAttribute("height", "24");
          e_120.setAttribute("width", "24");
          e_120.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_120.setAttribute("class", "");
          e_120.setAttribute("version", "1.1");
          e_120.setAttribute("x", "0px");
          e_120.setAttribute("y", "0px");
          e_120.setAttribute("enable-background", "new 0 0 24 24");
          e_120.setAttribute("xml:space", "preserve");
          var e_121 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_121.setAttribute("class", "fill-gray-400");
          e_121.setAttribute("fill", "currentColor");
          e_121.setAttribute("d", "M4.9,5.9h6.4V4.1H4.9c-1,0-1.8,0.8-1.8,1.8v6.4h1.8V5.9z M10.2,13.9l-3.6,4.4h10.7 l-2.7-3.6l-1.8,2.4L10.2,13.9z M16.4,9.9c0-0.7-0.6-1.3-1.3-1.3s-1.3,0.6-1.3,1.3s0.6,1.3,1.3,1.3S16.4,10.6,16.4,9.9z M19.1,4.1 h-6.4v1.8h6.4v6.4h1.8V5.9C20.9,4.9,20.1,4.1,19.1,4.1z M19.1,20.1h-6.4v1.8h6.4c1,0,1.8-0.8,1.8-1.8v-6.4h-1.8V20.1z M4.9,13.7H3.1 v6.4c0,1,0.8,1.8,1.8,1.8h6.4v-1.8H4.9V13.7z");
          e_120.appendChild(e_121);
          e_119.appendChild(e_120);
          e_118.appendChild(e_119);
          var e_122 = document.createElement("div");
          e_122.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_123 = document.createElement("div");
          e_123.setAttribute("class", "text-black dark:text-white text-base");
          e_123.appendChild(document.createTextNode("Chat Wallpaper"));
          e_122.appendChild(e_123);
          e_118.appendChild(e_122);
          e_93.appendChild(e_118);
          var e_124 = document.createElement("div");
          e_124.setAttribute("class", "in-settings-md");
          var e_125 = document.createElement("div");
          e_125.setAttribute("class", "grid place-items-center pl-3 pr-6 py-5");
          var e_126 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_126.setAttribute("viewBox", "0 0 24 24");
          e_126.setAttribute("height", "24");
          e_126.setAttribute("width", "24");
          e_126.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_126.setAttribute("class", "");
          e_126.setAttribute("version", "1.1");
          var e_127 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_127.setAttribute("class", "fill-gray-400");
          e_127.setAttribute("d", "M19.4725963,12.2 L15.1725963,12.2 L15.1725963,2.9 C15.1725963,2.4 14.7725963,2 14.2725963,2 L9.97259631,2 C9.47259631,2 9.07259631,2.4 9.07259631,2.9 L9.07259631,12.2 L4.77259631,12.2 C3.97259631,12.2 3.77259631,12.7 4.27259631,13.3 L11.0725963,20.6 C11.7725963,21.5 12.4725963,21.3 13.1725963,20.6 L19.9725963,13.3 C20.4725963,12.7 20.2725963,12.2 19.4725963,12.2 Z");
          e_127.setAttribute("fill", "currentColor");
          e_126.appendChild(e_127);
          e_125.appendChild(e_126);
          e_124.appendChild(e_125);
          var e_128 = document.createElement("div");
          e_128.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 py-5");
          var e_129 = document.createElement("div");
          e_129.setAttribute("class", "text-black dark:text-white text-base");
          e_129.appendChild(document.createTextNode("Media auto-download"));
          e_128.appendChild(e_129);
          e_124.appendChild(e_128);
          e_93.appendChild(e_124);
          var e_130 = document.createElement("div");
          e_130.setAttribute("class", "in-settings-md");
          var e_131 = document.createElement("div");
          e_131.setAttribute("class", "grid place-items-center pl-3 pr-6 pt-5 pb-8");
          var e_132 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          e_132.setAttribute("viewBox", "0 0 24 24");
          e_132.setAttribute("height", "24");
          e_132.setAttribute("width", "24");
          e_132.setAttribute("preserveAspectRatio", "xMidYMid meet");
          e_132.setAttribute("class", "");
          e_132.setAttribute("fill", "none");
          var e_133 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          e_133.setAttribute("class", "fill-gray-400");
          e_133.setAttribute("fill-rule", "evenodd");
          e_133.setAttribute("clip-rule", "evenodd");
          e_133.setAttribute("d", "M6 2C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.58 2.59C14.21 2.21 13.7 2 13.17 2H6ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8ZM8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8ZM14 17C14 16.4477 13.5523 16 13 16H8C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H13C13.5523 18 14 17.5523 14 17Z");
          e_133.setAttribute("fill", "currentColor");
          e_132.appendChild(e_133);
          e_131.appendChild(e_132);
          e_130.appendChild(e_131);
          var e_134 = document.createElement("div");
          e_134.setAttribute("class", "flex border-b grow border-b-gray-300 dark:border-b-gray-800 pt-5 pb-8");
          var e_135 = document.createElement("div");
          e_135.setAttribute("class", "text-black dark:text-white text-base");
          e_135.appendChild(document.createTextNode("Request Account Info"));
          e_134.appendChild(e_135);
          e_130.appendChild(e_134);
          e_93.appendChild(e_130);
          neWe_0.appendChild(e_93);
          // return e_0;
          }
          
          createSettingsPage();

          removeAllChildElements(leftColumn);
          leftColumn.append(neWe_0);
    })
}

const messageBar = document.querySelector('input[placeholder="Message"]')
const animeContainer = document.querySelector('#input-anime-container');
const inputAreaMic = document.getElementById('input-area-mic');
const inputAreaSendBtn = document.getElementById('input-area-send-btn');

if (messageBar !== null) {
  messageBar.addEventListener('input', ()=> {
    animeContainer.classList.add('animate-hide-camera');
    animeContainer.classList.remove('animate-show-camera');

    inputAreaMic.classList.remove('z-[1]');
    inputAreaMic.classList.add('scale-0');
    inputAreaSendBtn.classList.add('z-[1]');
    inputAreaSendBtn.classList.remove('scale-0');
  })

  messageBar.addEventListener('blur', ()=> {
    if (messageBar.value == '') {
    animeContainer.classList.remove('animate-hide-camera');
    animeContainer.classList.add('animate-show-camera');

    inputAreaMic.classList.add('z-[1]');
    inputAreaMic.classList.remove('scale-0');
    inputAreaSendBtn.classList.remove('z-[1]');
    inputAreaSendBtn.classList.add('scale-0');
    }
  })
}

// Everything on application themes!!!
const themeSettingJs = [neWe_45, neWe_112];
const themeSettingMarkUp = document.getElementsByClassName('theme-setting');
const themeSetting = [...themeSettingMarkUp, ...themeSettingJs];

const themeModalBgMarkUp = document.getElementById('theme-modal-bg');
const themeModalBg = [themeModalBgMarkUp, neWe_1];
const bgExist = themeModalBg.filter(bg => bg !== null);

const themeSetBtnsMarkUp = document.getElementsByClassName('theme-select-btn');
const themeSetBtnsJs = [neWe_14, neWe_15];
const themeSetBtns = [...themeSetBtnsMarkUp, ...themeSetBtnsJs];

const defaultRadioMarkUp = document.querySelector('input[value="default"]');
const lightRadioMarkUp = document.querySelector('input[value="light"]');
const darkRadioMarkUp = document.querySelector('input[value="dark"]');
const okBtnMarkUp = document.querySelector('.ok-btn');

const jsRadios = [neWe_5, neWe_8, neWe_11];
const markUpRadios = [defaultRadioMarkUp, lightRadioMarkUp, darkRadioMarkUp];

const defaultRadios = [defaultRadioMarkUp, neWe_5];
const lightRadios = [lightRadioMarkUp, neWe_8];
const darkRadios = [darkRadioMarkUp, neWe_11];
const okBtns = [okBtnMarkUp, neWe_15];

if (markUpRadios !== null) {
  markUpRadios.forEach(radio => {
    if (radio !== null) {
      radio.addEventListener('click', ()=> {
        var selectedTheme = document.querySelector('input[name="theme"][checked]');
        
        if (radio.id !== selectedTheme.id) {
          selectedTheme.removeAttribute('checked');
          radio.setAttribute('checked', '');
        }
      })
    }
  })
}

if (jsRadios !== null) {
  jsRadios.forEach(radio => {
    if (radio !== null) {
      radio.addEventListener('click', ()=> {
        var selectedTheme = document.querySelector('input[name="theme"][checked]');
        
        if (radio.id !== selectedTheme.id) {
          selectedTheme.removeAttribute('checked');
          radio.setAttribute('checked', '');
        }
      })
    }
  })
}

okBtns.filter(okBtn => okBtn !== null).forEach(okBtnExist => {
  
  okBtnExist.addEventListener('click', ()=> {
    var selectedTheme = document.querySelector('input[name="theme"][checked]');
    
    if (selectedTheme.value === 'default') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem('theme', 'default');

    } else if (selectedTheme.value === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');

    } else if (selectedTheme.value === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');

    }

  })
}); 

// ticking the last selected theme
function tickLastSelectedTheme() {
  var selectedTheme = document.querySelector('input[name="theme"][checked]');
  selectedTheme.removeAttribute('checked');
  
  if (localStorage.getItem('theme') === 'default') {
    defaultRadios.filter(defaultRadio => defaultRadio !== null).forEach(defaultRadioExist => {defaultRadioExist.setAttribute('checked', '')})
    
  } else if (localStorage.getItem('theme') === 'light') {
    lightRadios.filter(lightRadio => lightRadio !== null).forEach(lightRadioExist => {lightRadioExist.setAttribute('checked', '')})
    
  } else if (localStorage.getItem('theme') === 'dark') {
    darkRadios.filter(darkRadio => darkRadio !== null).forEach(darkRadioExist => {darkRadioExist.setAttribute('checked', '')})

  }
}  

function showModal() {
  bgExist.forEach(modalBg => {
    modalBg.classList.remove('invisible');
    modalBg.classList.remove('opacity-0');
    
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    screenWidth < 768 ? document.documentElement.classList.add('overflow-y-hidden') : null;
  });
};

function hideModal() {
  bgExist.forEach(modalBg => {
    modalBg.classList.add('opacity-0');
  });
  
  bgExist.forEach(modalBg => {
    modalBg.classList.add('invisible');
  }, {once: true})
  document.documentElement.classList.remove('overflow-y-hidden');
}

// showing the modal
themeSetting.forEach(btns => 
  btns.addEventListener('click', (event)=> {
    event.stopPropagation();
    tickLastSelectedTheme();
    showModal();
  })
)

// hiding the modal
document.addEventListener('keydown', (e)=> {
  if (e.key === 'Escape' && !bgExist.forEach(modalBg => modalBg.classList.contains('invisible'))) {
    hideModal();
  }
})

themeSetBtns.filter(setBtn => setBtn !== null).forEach(btn => {
  btn.addEventListener('click', (e)=> {
    e.stopPropagation();
    hideModal();
  })
})

bgExist.forEach(clickedOne => {
  clickedOne.addEventListener('click', (event) => {
    if (event.target.id == event.currentTarget.id) {
      hideModal();
    }
  })
})