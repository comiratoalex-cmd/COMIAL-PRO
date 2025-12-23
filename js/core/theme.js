export function applyTheme(t){
  Object.entries(t).forEach(([k,v])=>{
    document.documentElement.style.setProperty('--'+k,v);
  });
}
