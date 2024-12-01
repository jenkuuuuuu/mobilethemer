<script>
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import {
      faArrowLeft, faBell, faGear, faHashtag, faCity, faUser,
      faMagnifyingGlass, faCircle, faSquare, faFaceSmile, faGift,
      faPlus, faMicrophone, faChevronRight, faChevronDown,
      faComment, faFolder, faUserPlus, faList
  } from '@fortawesome/free-solid-svg-icons';

  import '@fortawesome/fontawesome-free/css/all.min.css';
  import './app.css';
  import ColorPicker from './colorPicker.svelte';
  import ColorGrid from './colorGrid.svelte';
  import { onMount } from 'svelte';

  let circles = Array(7).fill(); // Simplified circle array
  let activeChildIndex = 0;
  let colorPickerRef;

  function changeChild(index) {
      if (index >= 0 && index < 3) activeChildIndex = index;
  }

  function restoreDefaults() {
      colorPickerRef?.restoreDefaults();
  }

  function importTheme() {
      colorPickerRef?.importTheme();
  }

  function getCSSVariables() {
      const styles = getComputedStyle(document.documentElement);
      const cssVariables = colorPickerRef?.getColors() || {};
      
      Array.from(styles).forEach((name) => {
          if (name.startsWith('--') && !name.startsWith('--fa')) {
              cssVariables[name.replace('--', '')] = styles.getPropertyValue(name).trim();
          }
      });

      return cssVariables;
  }

  function downloadTheme(json, filename = 'theme.json') {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
  }

  export function exportVars() {
      const semanticColors = getCSSVariables();
      const themeName = document.getElementById('themename')?.value || 'Custom Theme';
      const username = document.getElementById('username')?.value || 'None inputted';
      const userId = document.getElementById('userid')?.value || 'None inputted';

      const themeData = JSON.stringify({
          name: themeName,
          description: 'Made with theme.jenku.xyz',
          authors: [{ name: username, id: userId }],
          semanticColors,
          rawColors: {},
          spec: 2
      }, null, 2);

      console.log(themeData);
      downloadTheme(themeData);
  }

  let startX, endX;

  const handleTouchStart = (e) => startX = e.touches[0].clientX;
  const handleTouchMove = (e) => endX = e.touches[0].clientX;
  const handleTouchEnd = () => {
      const threshold = 50;
      if (startX - endX > threshold) changeChild(activeChildIndex + 1);
      else if (endX - startX > threshold) changeChild(activeChildIndex - 1);
  };

  onMount(() => {
      window.onresize = () => {
          const zoom = Math.round(window.devicePixelRatio * 100);
          const message = document.getElementById('zoomMsg');
          if (message) message.style.display = zoom > 100 ? 'block' : 'none';
      };
  });
</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<div class="grid" on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd}>
    <div class="child serverlist" class:active={activeChildIndex === 0}>
      <div class="serverListFooter">
        <div class="icons">
        <div class="home">
          <span class="fa-layers fa-fw fa-2x">
            <div 
            style="background-color: var(--INTERACTIVE_ACTIVE); 
                  mask: url(./icons/ServerIcon.svg) no-repeat center; 
                  position:absolute; 
                  transform: translate(-27.5%, -37%) scale(0.5); 
                  width: 100px;
                  height: 100px;">
            </div>
            <FontAwesomeIcon icon={faCircle} class="icon" style=" height:40%; margin-left: 65%; margin-bottom:0%; color: var(--BG-BRAND); border: solid var(--BACKGROUND_FLOATING); border-radius:100% 100%; "/>
          </span>
          <div class="name">Home</div>
        </div>
        <div class="notifications">
          <span class="fa-layers fa-fw fa-2x"><div 
            style="background-color: var(--INTERACTIVE_NORMAL); 
                  mask: url(./icons/BellIcon.svg) no-repeat center; 
                  position:absolute; 
                  transform: translate(-27.5%, -37%) scale(0.5); 
                  width: 100px;
                  height: 100px;">
            </div>
          </span>
          <div class="name">Notifications</div>
        </div>
   
        <div class="you">
          <span class="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faUser} transform="shrink-2" style="color: var(--INTERACTIVE_NORMAL); transform: translate(0%, -12%);"/>
          </span>
          <div class="name">You</div>
        </div>
        </div>
      </div>
        <div class="otherServers">
          <span class="fa-layers fa-fw fa-2x DMS">
          <FontAwesomeIcon icon={faCircle} class="icon" transform="grow-8" style="color: var(--CARD_SECONDARY_BG);"/>
          <div 
          style="background-color: var(--TEXT_MUTED); 
                mask: url(./icons/ChatIcon.svg) no-repeat center; 
                position:absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%) scale(0.4); 
                width: 100px;
                height: 100px;">
          </div>
        </span>
            {#each circles as _}
                <FontAwesomeIcon icon={faCircle} class="icon" transform="grow-30" style="color: var(--BACKGROUND_SECONDARY);" />
            {/each}
            <FontAwesomeIcon icon={faSquare} class="icon" transform="grow-30" style="color: var(--BACKGROUND_SECONDARY);"/>
            <span class="folder">
            <span class="fa-layers">
                <FontAwesomeIcon icon={faCircle} class="icon" transform="grow-30"  style="color: var(--BACKGROUND_SECONDARY);"/>
                <FontAwesomeIcon icon={faFolder} transform="grow-10" style="color: var(--INTERACTIVE_ACTIVE);"/>
            </span>
              <FontAwesomeIcon icon={faCircle} class="icon" transform="grow-30"  style="color: var(--BACKGROUND_SECONDARY);"/>
              <FontAwesomeIcon icon={faCircle} class="icon" transform="grow-30"  style="color: var(--BACKGROUND_SECONDARY);"/>
        </span>
      </div>
        <div class="activeServer"> 
            <div class="serverName">This Server <FontAwesomeIcon icon={faChevronRight} style="color: var(--TEXT_MUTED)" transform="shrink-8"/>
              <div class="info">192,354 members
                <FontAwesomeIcon icon={faCircle} class="icon" transform="shrink-10"/> 
              Community</div>
            </div>
            <div class="searchInviteWrapper">
            <div class="type">
              <div class="search"> 
                <div class="centerSearchStuff"><FontAwesomeIcon icon={faMagnifyingGlass} class="icon" transform="grow-4" style="padding:10%"/>  Search</div></div>
            </div>
            <span class="fa-layers fa-fw fa-2x inviteButton">
              <FontAwesomeIcon icon={faCircle} style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND); 
                border: 1px solid var(--REDESIGN_BUTTON_SECONDARY_BORDER); border-radius: 100% 100%"/>
                <div 
                  style="background-color: var(--INTERACTIVE_NORMAL); 
                        mask: url(./icons/UserPlusIcon.svg) no-repeat center; 
                        position:absolute; 
                        top: 50%; 
                        left: 50%; 
                        transform: translate(-50%, -50%) scale(0.3); 
                        width: 100px; /* Set the width and height as needed */ 
                        height: 100px;">
                </div>
            </span></div>
            <div class="channelList">

              <div class="channelsAndRoles" style="margin-left: 4%;">
                <div 
                style="background-color: var(--TEXT_MUTED); 
                      mask: url(./icons/ChannelListMagnifyingGlassIcon.svg) no-repeat center; 
                      position:absolute; 
                      transform: translate(-70%, -40%) scale(0.3); 
                      width: 100px;
                      height: 100px;">
                </div>
                Channels & Roles</div>
              
              <div class="category"><FontAwesomeIcon icon={faChevronDown} style="padding-right:2.5%" class="icon"/>Text Channels</div>

              <div class="channel active unread">
                <FontAwesomeIcon icon={faHashtag} style="padding-right:2.5%" class="icon"/>general
              </div>
              <div class="channel">
                <FontAwesomeIcon icon={faHashtag} style="padding-right:2.5%" class="icon"/>Idek
              </div>
              <div class="channel">
                <FontAwesomeIcon icon={faHashtag} style="padding-right:2.5%" class="icon"/>thetoastedpotato-art
              </div>
              <div class="channel">
                <FontAwesomeIcon icon={faHashtag} style="padding-right:2.5%" class="icon"/>explode
              </div>
              <div class="channel unread">
                <FontAwesomeIcon icon={faHashtag} style="padding-right:2.5%" class="icon"/>bots
              </div>   
            </div>
        </div>
    </div>
    <div class="child swipeFixer" class:active={activeChildIndex === 1}>
    <div class="messages">
      <div class="channelHeader">
        <div class="back"> <FontAwesomeIcon icon={faArrowLeft}/> </div>
        <div class="channelName"> <FontAwesomeIcon icon={faHashtag} id="hash"/> general &gt; </div>
        <div class="search"> 
          <span class="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} transform="shrink-2"/>
            <FontAwesomeIcon icon={faMagnifyingGlass} transform="shrink-8" style="color: var(--INTERACTIVE_NORMAL);"/>
          </span>
        </div>
      </div>
      <div class="messages">
        <div class="messageswrapper2tofixwhateverifuckedup">
        <div class="message">
          <div class="pfp"></div>
          <div class="username">name</div>
          <div class="timestamp">Today at 15:48</div>
          <div class="theMessage">this is a message with no ping</div>
        </div>
        <div class="message ping">
          <div class="pfp"></div>
          <div class="username">name</div>
          <div class="timestamp">Today at 15:48</div>
          <div class="theMessage">this is a message with a <span class="atping">@ping</span></div>
        </div>
        <div class="message">
          <div class="pfp"></div>
          <div class="username">name</div>
          <div class="timestamp">Today at 15:48</div>
          <div class="theMessage">this is a message with a <span class="link">link</span></div>
        </div>
          <div class="embed">
            <div class="sitename">wsg</div>
            <div class="title link">title</div>
            <div class="description">description</div>
          </div>
          <div class="unread"> NEW MESSAGES </div>
        </div>
      </div>
      
      <div class="channelFooter">
        <div class="attachment">
          <span class="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} transform="grow-4" style="color: var(--BACKGROUND_SECONDARY);"/>
            <FontAwesomeIcon icon={faPlus} transform="shrink-4" />
          </span>
        </div>
        <div class="gift">
          <span class="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} transform="grow-4" style="color: var(--BACKGROUND_SECONDARY);"/>
            <FontAwesomeIcon icon={faGift} transform="shrink-5" />
          </span>
        </div>

        <div class="type">
          <div class="chatplaceholder">Message #general </div>
          <div class="emojifella"><div 
            style="background-color: var(--TEXT_MUTED); 
                  mask: url(./icons/ReactionIcon.svg) no-repeat center; 
                  position:absolute; 
                  transform: translate(-60%, -50%) scale(0.4); 
                  width: 100px;
                  height: 100px;">
            </div>
          </div>
        </div>

        
        <div class="voice">
          <span class="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} transform="grow-4" class="chatplaceholder" style="color: var(--BACKGROUND_SECONDARY);"/>
            <div 
          style="background-color: var(--TEXT_NORMAL); 
                mask: url(./icons/MicrophoneIcon.svg) no-repeat center; 
                position:absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%) scale(0.35); 
                width: 100px;
                height: 100px;">
          </div>
          </span>
        </div>
      </div>

    </div></div>
    <div class="child memberlist"class:active={activeChildIndex === 2}>
        <div class="channelName"> <FontAwesomeIcon icon={faHashtag} id="hash"/> general &gt; </div>
        <div class="channelDesc"> this rah rah </div>
        <div class="buttonsss"> 
          <span class="fa-layers fa-fw fa-3x">
            <FontAwesomeIcon icon={faCircle} transform="shrink-2"  style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"/>
            <FontAwesomeIcon icon={faMagnifyingGlass} transform="shrink-10" style="color: var(--TEXT_NORMAL);"/>
          </span> 
          <span class="fa-layers fa-fw fa-3x">
            <FontAwesomeIcon icon={faCircle} transform="shrink-2"  style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"/>
            <div 
          style="background-color: var(--TEXT_NORMAL); 
                mask: url(./icons/ThreadIcon.svg) no-repeat center; 
                position:absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%) scale(0.3); 
                width: 100px;
                height: 100px;">
          </div>
          </span>
          <span class="fa-layers fa-fw fa-3x">
            <FontAwesomeIcon icon={faCircle} transform="shrink-2"  style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"/>
            <FontAwesomeIcon icon={faBell} transform="shrink-10" style="color: var(--TEXT_NORMAL);"/>
          </span>
          <span class="fa-layers fa-fw fa-3x">
            <FontAwesomeIcon icon={faCircle} transform="shrink-2"  style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"/>
            <FontAwesomeIcon icon={faGear} transform="shrink-10" style="color: var(--TEXT_NORMAL);"/>
          </span>
        </div>
        <div class="buttonNames">
        <div>Search</div>
        <div>Threads</div>
        <div>Mute</div>
        <div>Settings</div>
      </div>
      <div class="tabs">
        <div class="active">Members</div>
        <div>Media</div>
        <div>Pins</div>
        <div>Links</div>
        <div>Files</div>
      </div>


      <div class="invButton">
        <span class="fa-layers fa-fw fa-2x theFriend">
          <FontAwesomeIcon icon={faCircle} style="color: #5865f2; float: left;"/>
          <div 
          style="background-color: var(--TEXT_NORMAL); 
                mask: url(./icons/UserPlusIcon.svg) no-repeat center; 
                position:absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%) scale(0.3); 
                width: 100px;
                height: 100px;">
          </div>
        </span>
        Invite Members
        <div class="arrow">
          <FontAwesomeIcon icon={faChevronRight} style="color: var(--REDESIGN_BUTTON_SECONDARY_BACKGROUND);"/>
        </div>

      </div>
      <input type="text" id="themename" placeholder="Theme name">
      <input type="text" id="username" placeholder="username">
      <input type="text" id="userid" placeholder="userid">

      <button on:click={() => exportVars()}> Export </button>
      <button class="reset-button" on:click={() => restoreDefaults()}>Restore Default Colors</button>
      <button class="reset-button" on:click={() => importTheme()}>Import Theme</button>
    </div>
    <ColorPicker bind:this={colorPickerRef} />
  </div>
  <ColorGrid />