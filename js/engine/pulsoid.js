export const Pulsoid = {
  token:null,
  bpm:0,
  alert:120,
  danger:150,
  listeners:[],

  setToken(t){ this.token=t; },
  onUpdate(fn){ this.listeners.push(fn); },
  notify(){ this.listeners.forEach(fn=>fn(this.bpm)); },

  async fetch(){
    if(!this.token) return;
    try{
      const r = await fetch(
        'https://dev.pulsoid.net/api/v1/data/heart_rate/latest',
        { headers:{ Authorization:'Bearer '+this.token } }
      );
      const j = await r.json();
      if(j?.data?.heart_rate){
        this.bpm=j.data.heart_rate;
        this.notify();
      }
    }catch(e){}
  },

  start(i=1500){ setInterval(()=>this.fetch(),i); }
};
