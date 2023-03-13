const themeBtn = document.getElementById('themeSwitch');
const settingBtn = document.getElementById('setting-btn');
const appOptions = document.getElementById('settings');

if (settingBtn != null) {
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
};

const rightColumn = document.getElementById("column-2");
const myChats = document.querySelectorAll('div.chats');
const rightColumnContent = document.getElementById('column-2-default-inner');
var friendChat = document.createElement('div');

var e_2 = document.createElement("div");
e_2.setAttribute("id", "chat-settings");
e_2.setAttribute("class", "animate__animated animate__faster md:w-2/5 dark:bg-WADarkGreen dark:text-white focus:outline-none absolute top-0 right-0 z-10 hidden w-3/5 text-black bg-white shadow-md");
e_2.setAttribute("tabindex", "-1");

var e_24 = document.createElement("img");
e_24.setAttribute("class", "dual w-6");
e_24.setAttribute("id", "chat-setting-btn");
e_24.setAttribute("src", "https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/100/null/external-Menu-interface-glyph-silhouettes-icons-papa-vector-3.png");
e_24.setAttribute("alt", "kebab");

var e_38 = document.createElement("input");
e_38.setAttribute("class", "w-4/5 bg-white dark:bg-WADarkTeal focus:outline-none caret-WATeal dark:text-white animate__animated animate__faster");
e_38.setAttribute("type", "text");
e_38.setAttribute("placeholder", "Message");

var e_39 = document.createElement("div");
e_39.setAttribute("class", "ml-auto flex");

var e_50 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
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

var e_55 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
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
var e_56 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
e_56.setAttribute("id", "Layer_x0020_1");
var e_57 = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
e_57.setAttribute("id", "CorelCorpID_0Corel-Layer");
e_56.appendChild(e_57);
var e_58 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
e_58.setAttribute("id", "_2099917458768");
var e_59 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); //* just like I guessed, I needed to use createElementNS() method for polygon tag too.
e_59.setAttribute("fill", "white");
e_59.setAttribute("fill-rule", "nonzero");
e_59.setAttribute("points", "-0,284.14 331.49,142.07 -0,0 0.16,115.54 199.1,142.07 0.16,168.6 ");

if (myChats != null) {

  for (var i = 0; i < myChats.length; i++) {

    let clickedChat = myChats[i];
    let friendName = clickedChat.getAttribute('friend-name');
    let imageType = clickedChat.getAttribute('img-type');

    clickedChat.addEventListener('click', function createNode() {
      console.log('clicked a chat');
      rightColumnContent.remove();

      if (friendChat.getAttribute('friend') != friendName){
        var container = document.createDocumentFragment();
        var e_0 = document.createElement("div");
        var e_1 = document.createElement("div");
        e_1.setAttribute("class", "font-roboto relative w-full");
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
        e_11.setAttribute("class", "bg-WATeal dark:bg-WADarkTeal dark:text-gray-400 flex flex-col w-full p-3 text-white");
        var e_12 = document.createElement("div");
        e_12.setAttribute("class", "flex flex-row items-center");
        var e_13 = document.createElement("div");
        e_13.setAttribute("class", "flex");
        // var e_14 = document.createElement("a"); //! I don't need the a-tag (back button) for chats in md and larger screens.
        // e_14.setAttribute("href", "/index.html");
        // e_14.setAttribute("class", "flex-center mr-2 invert-[1]");
        // var e_15 = document.createElement("img");
        // e_15.setAttribute("class", "w-5");
        // e_15.setAttribute("src", "https://img.icons8.com/android/96/null/left.png");
        // e_15.setAttribute("alt", "back icon");
        // e_14.appendChild(e_15); 
        // e_13.appendChild(e_14);
        var e_16 = document.createElement("div");
        e_16.setAttribute("class", "flex-center");
        var e_17 = document.createElement("img");
        e_17.setAttribute("class", "w-9 h-9 object-cover rounded-full");
        e_17.setAttribute("src", `public/imgs/friends/${friendName}.${imageType}`);
        e_17.setAttribute("alt", "friend");
        e_16.appendChild(e_17);
        e_13.appendChild(e_16);
        var e_18 = document.createElement("div");
        e_18.setAttribute("class", "flex flex-col px-3 py-1");
        var e_19 = document.createElement("div");
        e_19.setAttribute("class", "text-sm font-bold text-white");
        e_19.appendChild(document.createTextNode("My Barber"));
        e_18.appendChild(e_19);
        var e_20 = document.createElement("div");
        e_20.setAttribute("class", "text-xs font-normal text-white");
        e_20.appendChild(document.createTextNode("Online"));
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
        var e_32 = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); //! I only used the createElementNS() method for svg, path, g, and metadata tags. Just in case something breaks I know where to start.
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
        e_33.appendChild(e_37);
        e_32.appendChild(e_33);
        e_31.appendChild(e_32);
        e_31.appendChild(e_38);
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
        // return container;
        
        friendChat.setAttribute("friend", `${friendName}`)
        friendChat.append(e_1, e_11, e_25, e_30);
        rightColumn.append(friendChat);
      }
    });
  }
};

// event listeners for chat-option btn and chat-option at md-and-above screens.
e_24.addEventListener('click', ()=> {
  e_2.classList.toggle('hidden');
  e_2.classList.add('animate__slideInDown');

  e_2.addEventListener('animationend', ()=> {
    e_2.classList.remove('animate__slideInDown');
  })
  
  e_2.classList.toggle('show');
  e_2.focus({focusVisible: false});
});

e_2.addEventListener('blur', ()=> {
  e_2.classList.add('animate__fadeOut');

  e_2.addEventListener('animationend', ()=> {
    e_2.classList.remove('animate__fadeOut');
    e_2.classList.remove('show');
    e_2.classList.add('hidden');
  }, {once: true})
});

// event listeners for animations of the icons in the input section at md-and-above screens.
e_38.addEventListener('input', ()=> {
  e_39.classList.add('animate-hide-camera');
  e_39.classList.remove('animate-show-camera');

  e_50.classList.remove('z-[1]');
  e_50.classList.add('scale-0');
  e_55.classList.add('z-[1]');
  e_55.classList.remove('scale-0');
})

e_38.addEventListener('blur', ()=> {
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

if (chatOptions != null) {

  chatSettingBtn.addEventListener('click', ()=> {
    chatOptions.classList.toggle('hidden');
    chatOptions.classList.add('animate__slideInDown');
  
    chatOptions.addEventListener('animationend', ()=> {
      chatOptions.classList.remove('animate__slideInDown');
    })
    
    chatOptions.classList.toggle('show');
    chatOptions.focus({focusVisible: false});
  })
  
  chatOptions.addEventListener('blur', ()=> {
    chatOptions.classList.add('animate__fadeOut');
  
    chatOptions.addEventListener('animationend', ()=> {
      chatOptions.classList.remove('animate__fadeOut');
      chatOptions.classList.remove('show');
      chatOptions.classList.add('hidden');
    }, {once: true})
  });
}

const leftColumn = document.getElementById('column-1');
const intSettingBtn = document.getElementById('int-setting-btn');

if (intSettingBtn != null) {
  intSettingBtn.addEventListener('click', ()=> {
    //* fetch() statement argument is relative to the root folder not this script.js
    //* the page it loads also has all it files relative to root folder [or the index.html which it we load it from, apparently this index.html file is also located in the root folder].
    //* remember that 'public/pages/settings.html#body-content' also worked as an argument for the fetch statement.
    //* I could also use XMLHttpRequest() method by David Reid on youtube.
      fetch('public/pages/settings.html')
        .then(response => {
          if (response.ok) {
            return response.text();
          }
        })
        .then(htmlFile => {
          var settingsHtmlFile = new DOMParser();
          var settingsHtmlFileString = settingsHtmlFile.parseFromString(htmlFile, 'text/html');
          var neededContent = settingsHtmlFileString.getElementById('body-content');
    
          var imagesHere = neededContent.querySelectorAll('img');
    
          function correctImgSrc() {
            for (var i = 1; i < imagesHere.length; i++) {
              let imageSRC = imagesHere[i].getAttribute('src');
              let newSRC = imageSRC.replace('..', 'public');
              imagesHere[i].setAttribute('src', `${newSRC}`);
              //* notice how I could literally use js to create all of those friends pages without using an html file for each of them. all I've got to do is manipulate those image src that are unique to each friend. in fact I think this is how React/Angular/Vue works!!!
            }
          }
          correctImgSrc()
    
          leftColumn.innerHTML = '';
          leftColumn.append(neededContent);
        })
    })
}

const messageBar = document.querySelector('input[placeholder="Message"]')
const animeContainer = document.querySelector('.flex.ml-auto:has(#input-area-camera)')
const inputAreaMic = document.getElementById('input-area-mic');
const inputAreaSendBtn = document.getElementById('input-area-send-btn');

if (messageBar != null) {
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