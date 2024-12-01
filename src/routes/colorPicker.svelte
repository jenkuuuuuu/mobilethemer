<script>
  import { onMount } from 'svelte';
  import { makeItGlow, stopGlow } from './makeItGlow.js';
  import "./app.css";
  import ColorPicker from 'svelte-awesome-color-picker';
  import defaultTheme from './assets/defaultTheme.json';


  const localStorageKey = "savedColors"; 
  
  let defaultColors = {}; 
  let colors = {}; 
  let transparency = {
    '--fa-idk': 0.8
  };

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

  export function getColors() {
  const semanticColors = {};

  Object.entries(colors).forEach(([variable, color]) => {
    const variableName = variable.replace('--', '').toUpperCase();
    semanticColors[variableName] = [color];
  });

  return semanticColors;
}

  export function restoreDefaults() {
        const json = defaultTheme;
        if (json.semanticColors) {
            for (const [key, value] of Object.entries(json.semanticColors)) {
                applyColor(`--${key}`, value.toString());
                colors[`--${key}`] = value.toString();
            }
            saveColorsToLocalStorage();
          }
  }

  function handleMouseOver(variable, color) {
    makeItGlow(variable, color);
  }

  function handleMouseOut(variable, color) {
    stopGlow(variable, color);
  }
  export async function importTheme() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const json = JSON.parse(e.target.result);
              if (json.semanticColors) {
                  for (const [key, value] of Object.entries(json.semanticColors)) {
                    applyColor(`--${key}`, value.toString());
                    colors[`--${key}`] = value.toString();
                  }
                  saveColorsToLocalStorage();
              }
          };
          reader.readAsText(file);
      }
  };
  input.click();
}

onMount(async () => {
  defaultColors = getCssVariables();
  colors = { ...defaultColors };

  const savedColors = getSavedColors();
  if (savedColors) {
    colors = { ...colors, ...savedColors };
  } else{
    restoreDefaults();
  }

  Object.keys(colors).forEach(variable => applyColor(variable, colors[variable]));

  await tick();
  console.log('Colors applied:', colors); 
});


</script>

<style>
  .color-picker-container {
    display: flex;
    flex-direction: column;
    background-color: color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);
    overflow-y: scroll;
    font-family: gg sans;
    font-size: small;
    z-index: 1000;
    color: var(--TEXT_PRIMARY);
    position: relative;
  }

  .color-picker {
    margin-bottom: 1em;
    margin-right: auto;
    position: relative;
  }

  .color-picker label {
    margin-right: 0.5em;
  }
  @media (max-width: 900px) {
    
    .color-picker-container {
      display: none;
    }
    

    }
</style>


<div class="color-picker-container">
  {#each Object.entries(colors) as [variable, color]}
  <div class="color-picker">
    <ColorPicker id={variable} bind:hex={colors[variable]} label="" 
    --picker-z-index="10" --picker-overflow="show" position="responsive" 
    on:input={() => updColour(variable, colors[variable]) }
    on:mouseenter={() => handleMouseOver(variable, colors[variable])}
    on:mouseleave={() => handleMouseOut(variable, colors[variable])}/>
    <label for={variable}>{variable}:</label>
  </div>
  {/each}
</div>
