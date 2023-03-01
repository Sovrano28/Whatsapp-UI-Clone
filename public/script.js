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
}

const rightColumn = document.getElementById("column-2");
const myChats = document.getElementsByClassName('chats');

if (myChats != null) {
  for (var i = 0; i < myChats.length; i++) {

    let clickedChat = myChats[i];
    let friendName = clickedChat.getAttribute('friend-name');
    let imageType = clickedChat.getAttribute('img-type');

    clickedChat.addEventListener('click', ()=> {
      chatPage = `
      <div class="w-full relative">
       <div id="chat-settings" class="animate__animated animate__faster absolute hidden top-0 right-0 w-3/5 z-10 bg-white dark:bg-WADarkGreen text-black dark:text-white shadow-md focus:outline-none" tabindex="-1">
         <ul>
            <li class="options">View contact</li>
            <li class="options">Media, links and docs</li>
            <li class="options">Search</li>
            <li class="options">Mute notification</li>
            <li class="options">Disappearing messages</li>
            <li class="options">Wallpaper</li>
            <li class="options">More</li>
         </ul>
       </div>
      </div>
      <header class="flex flex-col w-full bg-WATeal dark:bg-WADarkTeal text-white dark:text-gray-400 p-3">
      <div class="flex flex-row items-center">
          <div class="flex">
            <div class="flex-center">
              <img class="w-9 h-9 object-cover rounded-full" src="public/imgs/friends/${friendName}.${imageType}" alt="friend">
            </div>
            <div class="flex flex-col px-3 py-1">
              <div class="text-white font-bold text-sm">My Barber</div>
              <div class="text-white font-normal text-xs">Online</div>
            </div>
          </div>
          <div class="ml-auto flex gap-4">
            <img class="w-6 dual" src="https://img.icons8.com/android/96/null/video-call.png" alt="video call"/>
            <img class="w-6 dual" src="https://img.icons8.com/material-sharp/96/000000/phone.png" alt="phone"/>
            <img class="w-6 dual" id="chat-setting-btn" src="https://img.icons8.com/external-glyph-silhouettes-icons-papa-vector/100/null/external-Menu-interface-glyph-silhouettes-icons-papa-vector-3.png" alt="kebab">
          </div>
        </div>
      </header>
      <section class="chat-page">
        <div class="relative z-[1]">
          <div class="text-[8px] text-center mx-auto my-2 p-1 w-12 text-black dark:text-gray-400 bg-white dark:bg-WADarkTeal rounded-xl shadow-md">Today</div>
          <div class="text-[8px] text-center mx-auto my-2 p-2 w-80 text-black dark:text-gray-400 bg-WALightYellow dark:bg-WADarkTeal rounded-xl shadow-md">
            <img class="inline-flex w-2 mb-[2px] mr-[1px]" src="public/imgs/lock.svg" alt="lock">
            Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more
          </div>
        </div>
      </section>`;
    
      rightColumn.innerHTML = chatPage;
    })
  }
};

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