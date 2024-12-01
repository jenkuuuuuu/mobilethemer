let intervalMap = {};

export function makeItGlow(variable, color) {
  if (intervalMap[variable]) {
    cancelAnimationFrame(intervalMap[variable]);
  }

  let isBrightening = true;
  const baseColor = color;
  let currentFactor = 1;
  const duration = 1000;
  let startTime = null;

  const adjustColor = (factor) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const adjust = (component) => Math.min(Math.floor(component * factor), 255);

    const newColor = `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
    return newColor;
  };

  const animateGlow = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (isBrightening) {
      currentFactor = 1 + progress * 0.8;
    } else {
      currentFactor = 1.8 - progress * 0.8;
    }

    document.documentElement.style.setProperty(variable, adjustColor(currentFactor));

    if (progress >= 1) {
      isBrightening = !isBrightening;
      startTime = null;
    }

    intervalMap[variable] = requestAnimationFrame(animateGlow);
  };

  intervalMap[variable] = requestAnimationFrame(animateGlow);
}

export function stopGlow(variable, color) {
  if (intervalMap[variable]) {
    cancelAnimationFrame(intervalMap[variable]);
    delete intervalMap[variable];
    
    document.documentElement.style.setProperty(variable, color);
  }
}