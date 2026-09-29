const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const dataDir = path.join(root, 'data');
const dataFile = path.join(dataDir, 'results.json');
fs.mkdirSync(dataDir, {recursive:true});
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]\n');
function readResults(){ try{return JSON.parse(fs.readFileSync(dataFile,'utf8'))}catch{return []} }
function writeResults(x){ fs.writeFileSync(dataFile, JSON.stringify(x,null,2)+'\n'); }
function json(res, code, body){res.writeHead(code, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(body));}
function serve(res, file, type){fs.readFile(path.join(root,file),(e,b)=>{if(e){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':type});res.end(b)})}
const server=http.createServer((req,res)=>{
  if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET,POST,DELETE'});return res.end()}
  if(req.method==='GET' && req.url==='/api/health') return json(res,200,{ok:true,service:'MyTestXPro new server'});
  if(req.method==='GET' && req.url==='/api/results') return json(res,200,readResults().sort((a,b)=>String(b.sentAt).localeCompare(String(a.sentAt))));
  if(req.method==='POST' && req.url==='/api/results'){
    let raw=''; req.on('data',c=>{raw+=c}); req.on('end',()=>{try{const p=JSON.parse(raw||'{}'); if(!p.studentName||!p.studentSurname) return json(res,400,{ok:false,error:'studentName and studentSurname are required'}); const rows=readResults(); const row={id:'r_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), ...p, receivedAt:new Date().toISOString()}; rows.push(row); writeResults(rows); json(res,201,{ok:true,id:row.id});}catch(e){json(res,400,{ok:false,error:'invalid json'})}}); return;
  }
  if(req.method==='DELETE' && req.url.startsWith('/api/results/')){const id=req.url.split('/').pop();writeResults(readResults().filter(x=>x.id!==id));return json(res,200,{ok:true});}
  if(req.method==='GET' && (req.url==='/'||req.url==='/MyTestXPro-new.html')) return serve(res,'MyTestXPro-new.html','text/html; charset=utf-8');
  if(req.method==='GET' && req.url==='/dashboard.html') return serve(res,'dashboard.html','text/html; charset=utf-8');
  res.writeHead(404);res.end('Not found');
});
const port=process.env.PORT||8787; server.listen(port,'0.0.0.0',()=>console.log(`MyTestXPro server: http://0.0.0.0:${port}`));
