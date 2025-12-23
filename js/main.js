import { generateAITheme } from './features/ai.js';
import { applyTheme } from './core/theme.js';
import { Pulsoid } from './engine/pulsoid.js';

document.getElementById('btnAI').onclick=()=>{
  applyTheme(generateAITheme());
};

Pulsoid.setToken('COLE_SEU_TOKEN_PULSOID');

const hud=document.createElement('div');
hud.id='pulsoid-hud';
hud.innerHTML='<span id=\"bpm\">--</span><span>BPM</span>';
document.body.appendChild(hud);

Pulsoid.onUpdate(bpm=>{
  document.getElementById('bpm').textContent=bpm;
  hud.classList.remove('alert','danger');
  if(bpm>=Pulsoid.danger) hud.classList.add('danger');
  else if(bpm>=Pulsoid.alert) hud.classList.add('alert');
});

Pulsoid.start();
