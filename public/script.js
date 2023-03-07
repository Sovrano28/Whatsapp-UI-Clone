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
e_2.setAttribute("class", "animate__animated animate__faster absolute top-0 right-0 w-2/5 z-10 bg-white dark:bg-WADarkGreen hidden text-black dark:text-white shadow-md focus:outline-none");
e_2.setAttribute("tabindex", "-1");

var e_22 = document.createElement("img");
e_22.setAttribute("class", "w-6 dual");
e_22.setAttribute("id", "chat-setting-btn");
e_22.setAttribute("src", "https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/100/null/external-Menu-interface-glyph-silhouettes-icons-papa-vector-3.png");
e_22.setAttribute("alt", "kebab");

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
      e_1.setAttribute("class", "w-full relative");
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
      e_11.setAttribute("class", "flex flex-col w-full bg-WATeal dark:bg-WADarkTeal text-white dark:text-gray-400 p-3");
      var e_12 = document.createElement("div");
      e_12.setAttribute("class", "flex flex-row items-center");
      var e_13 = document.createElement("div");
      e_13.setAttribute("class", "flex");
      var e_14 = document.createElement("div");
      e_14.setAttribute("class", "flex-center");
      var e_15 = document.createElement("img");
      e_15.setAttribute("class", "w-9 h-9 object-cover rounded-full");
      e_15.setAttribute("src", `public/imgs/friends/${friendName}.${imageType}`);
      e_15.setAttribute("alt", "friend");
      e_14.appendChild(e_15);
      e_13.appendChild(e_14);
      var e_16 = document.createElement("div");
      e_16.setAttribute("class", "flex flex-col px-3 py-1");
      var e_17 = document.createElement("div");
      e_17.setAttribute("class", "text-white font-bold text-sm");
      e_17.appendChild(document.createTextNode("My Barber"));
      e_16.appendChild(e_17);
      var e_18 = document.createElement("div");
      e_18.setAttribute("class", "text-white font-normal text-xs");
      e_18.appendChild(document.createTextNode("Online"));
      e_16.appendChild(e_18);
      e_13.appendChild(e_16);
      e_12.appendChild(e_13);
      var e_19 = document.createElement("div");
      e_19.setAttribute("class", "ml-auto flex gap-4");
      var e_20 = document.createElement("img");
      e_20.setAttribute("class", "w-6 dual");
      e_20.setAttribute("src", "https://img.icons8.com/android/96/null/video-call.png");
      e_20.setAttribute("alt", "video call");
      e_19.appendChild(e_20);
      var e_21 = document.createElement("img");
      e_21.setAttribute("class", "w-6 dual");
      e_21.setAttribute("src", "https://img.icons8.com/material-sharp/96/000000/phone.png");
      e_21.setAttribute("alt", "phone");
      e_19.appendChild(e_21);
      e_19.appendChild(e_22);
      e_12.appendChild(e_19);
      e_11.appendChild(e_12);
      e_0.appendChild(e_11);
      var e_23 = document.createElement("section");
      e_23.setAttribute("class", "chat-page");
      var e_24 = document.createElement("div");
      e_24.setAttribute("class", "relative z-[1]");
      var e_25 = document.createElement("div");
      e_25.setAttribute("class", "text-[8px] text-center mx-auto my-2 p-1 w-12 text-black dark:text-gray-400 bg-white dark:bg-WADarkTeal rounded-xl shadow-md");
      e_25.appendChild(document.createTextNode("Today"));
      e_24.appendChild(e_25);
      var e_26 = document.createElement("div");
      e_26.setAttribute("class", "text-[8px] text-center mx-auto my-2 p-2 w-80 text-black dark:text-gray-400 bg-WALightYellow dark:bg-WADarkTeal rounded-xl shadow-md");
      var e_27 = document.createElement("img");
      e_27.setAttribute("class", "inline-flex w-2 mb-[2px] mr-[1px]");
      e_27.setAttribute("src", "public/imgs/lock.svg");
      e_27.setAttribute("alt", "lock");
      e_26.appendChild(e_27);
      e_26.appendChild(document.createTextNode("\nMessages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more\n"));
      e_24.appendChild(e_26);
      e_23.appendChild(e_24);
      e_0.appendChild(e_23);
      container.appendChild(e_0);
        
        friendChat.setAttribute("friend", `${friendName}`)
        friendChat.append(e_1, e_11, e_23);
        rightColumn.append(friendChat);
      }
    });
  }
};

// event listeners for chat-option btn and chat-option at md-and-above screens.
e_22.addEventListener('click', ()=> {
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