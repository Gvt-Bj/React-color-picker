import React, { useState, useEffect } from 'react';

export default function ColorPicker() {
  const [hexColor, setHexColor] = useState("#ffffff");
  const [hslColor, setHslColor] = useState("hsl(0, 0%, 100%)");

  // Update HSL only (no body color change)
  useEffect(() => {
    setHslColor(hexToHSL(hexColor));
  }, [hexColor]);

  function handleColorChange(e) {
    setHexColor(e.target.value);
  }

  // Convert hex to HSL string
  function hexToHSL(hex) {
    let r = 0, g = 0, b = 0;
    hex = hex.replace('#', '');

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d) + (g < b ? 6 : 0); break;
        case g: h = ((b - r) / d) + 2; break;
        case b: h = ((r - g) / d) + 4; break;
      }
      h *= 60;
    }

    s = (s * 100).toFixed(1);
    l = (l * 100).toFixed(1);
    h = Math.round(h);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div 
        className="color-display" 
        style={{ 
          backgroundColor: hexColor, 
          padding: '1rem', 
          borderRadius: '8px',
          color: '#333',
          marginBottom: '1rem'
        }}
      >
        <p>Hex: {hexColor}</p>
        <p>HSL: {hslColor}</p>
      </div>
      <label>Select a color</label><br />
      <input type="color" value={hexColor} onChange={handleColorChange} />
    </div>
  );
}
