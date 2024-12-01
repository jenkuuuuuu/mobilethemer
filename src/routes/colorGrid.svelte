<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { makeItGlow, stopGlow } from './makeItGlow.js';
    import "./app.css";
    
    const localStorageKey = "savedColors"; 
    
    let defaultColors = {}; 
    let colors = {}; 
    let transparency = {
      '--fa-idk': 0.8
    };
    const dispatch = createEventDispatcher();
  
    function getCssVariables() {
      const style = getComputedStyle(document.documentElement);
      const variables = {};
      
      for (let i = 0; i < style.length; i++) {
        const key = style[i];
        if (key.startsWith('--') && !key.startsWith('--fa-')) {
          let value = style.getPropertyValue(key).trim();
          variables[key] = value;
        }
      }
      
      return variables;
    }
  
    function applyColor(variable, color) {
      const alpha = transparency[variable] !== undefined ? transparency[variable] : 1;
      document.documentElement.style.setProperty(variable, `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`);
    }
  
    function saveColorsToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(colors));
    }
  
    function getSavedColors() {
      const savedColors = localStorage.getItem(localStorageKey);
      return savedColors ? JSON.parse(savedColors) : null;
    }
  
    function updColour(variable, color) {
      colors[variable] = color;  
      applyColor(variable, color); 
      saveColorsToLocalStorage();
    }
  
    function restoreDefaults() {
      colors = { ...defaultColors };
      Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));
      saveColorsToLocalStorage();
      dispatch('restore');
    }
  
    function handleMouseOver(variable, color) {
      makeItGlow(variable, color);
    }
  
    function handleMouseOut(variable, color) {
      stopGlow(variable, color);
    }
  
    onMount(() => {
      defaultColors = getCssVariables();
      colors = { ...defaultColors };
  
      const savedColors = getSavedColors();
      if (savedColors) {
        colors = { ...colors, ...savedColors };
      }
  
      Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));
    });
  </script>
  
  
  <style>
    .color-picker-container {
      filter: drop-shadow(0 0 1rem color-mix(in srgb, rgba(0, 0, 0, 0.5), color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%)));
      border-radius: 15px;
      width: 100%;
      border: 4px solid rgb(19, 20, 20);
      margin-top: 5%;
      display: none;
      grid-template-rows: 50% 50%;
      grid-auto-flow: column;
      grid-auto-columns: 40%;
      background-color: color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);
      overflow-y:visible;
      overflow-x: scroll;
      font-family: gg sans;
      font-size: 12px;
      z-index: 1000;
      color: var(--TEXT_PRIMARY);
      position: relative;
    }
  
    .color-picker {
      margin-left: -50%;
      display: flex;
      padding-top: 10%;
      padding-bottom: 15%;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1em;
    }
  
    @media (max-width: 900px) {
      .color-picker-container {
        display: grid;
      }
    }
  </style>
  
  <div class="color-picker-container" id="portal">
    {#each Object.entries(colors) as [variable, color]}
    <div class="color-picker">
      <input
        id={variable}
        type="color"
        bind:value={colors[variable]}
        on:input={() => updColour(variable, colors[variable])}
        on:mouseenter={() => handleMouseOver(variable, colors[variable])}
        on:mouseleave={() => handleMouseOut(variable, colors[variable])}
        style="width: 80px; height: 40px; border-radius: 10px; border: none;" />
      <label for={variable}>{variable}:</label>
    </div>
    {/each}
  </div>
  