<script>
  import { onMount } from 'svelte';
  import { makeItGlow, stopGlow } from './makeItGlow.js';
  import "./app.css";
  import ColorPicker from 'svelte-awesome-color-picker';
  import defaultTheme from './assets/defaultTheme.json';

  const localStorageKey = "savedColors"; 
  
  let defaultColors = {}; 
  let colors = {}; 
  let transparency = { '--fa-idk': 0.8 };

  function getCssVariables() {
    const style = getComputedStyle(document.documentElement);
    return Array.from(style)
      .filter(key => key.startsWith('--') && !key.startsWith('--fa-'))
      .reduce((vars, key) => {
        vars[key] = style.getPropertyValue(key).trim();
        return vars;
      }, {});
  }

  function applyColor(variable, color) {
    const alpha = transparency[variable] || 1;
    const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;
    document.documentElement.style.setProperty(variable, rgba);
  }

  function saveColorsToLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(colors));
  }

  function getSavedColors() {
    return JSON.parse(localStorage.getItem(localStorageKey)) || null;
  }

  function updColour(variable, color) {
    colors[variable] = color;  
    applyColor(variable, color); 
    saveColorsToLocalStorage();
  }

  export function restoreDefaults() {
    if (defaultTheme?.semanticColors) {
      Object.entries(defaultTheme.semanticColors).forEach(([key, value]) => {
        const variable = `--${key}`;
        colors[variable] = value.toString();
        applyColor(variable, colors[variable]);
      });
      saveColorsToLocalStorage();
    }
  }

  export async function importTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const content = await file.text();
        const json = JSON.parse(content);
        if (json?.semanticColors) {
          Object.entries(json.semanticColors).forEach(([key, value]) => {
            const variable = `--${key}`;
            colors[variable] = value.toString();
            applyColor(variable, colors[variable]);
          });
          saveColorsToLocalStorage();
        }
      }
    };
    input.click();
  }

  function handleMouseOver(variable, color) {
    makeItGlow(variable, color);
  }

  function handleMouseOut(variable, color) {
    stopGlow(variable, color);
  }

  export function getColors() {
    return Object.fromEntries(
      Object.entries(colors).map(([variable, color]) => [variable.replace('--', '').toUpperCase(), [color]])
    );
  }

  onMount(() => {
    defaultColors = getCssVariables();
    colors = { ...defaultColors, ...getSavedColors() || {} };

    Object.entries(colors).forEach(([variable, color]) => applyColor(variable, color));
    if (!Object.keys(colors).length) restoreDefaults();
  });
</script>

<style>
  .color-picker-container {
    display: flex;
    flex-direction: column;
    background-color: color-mix(in srgb, var(--BACKGROUND_PRIMARY), var(--BACKGROUND_SECONDARY) 50%);
    overflow-y: scroll;
    font-family: "gg sans";
    font-size: small;
    color: var(--TEXT_PRIMARY);
    z-index: 1000;
    position: relative;
  }

  .color-picker {
    margin-bottom: 1em;
    position: relative;
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
    <ColorPicker 
      id={variable}
      label=""
      bind:hex={colors[variable]}
      --picker-z-index="10"
      --picker-overflow="show"
      position="responsive"
      on:input={() => updColour(variable, colors[variable])}
      on:mouseenter={() => handleMouseOver(variable, colors[variable])}
      on:mouseleave={() => handleMouseOut(variable, colors[variable])}
    />
    <label for={variable}>{variable}:</label>
  </div>
  {/each}
</div>
