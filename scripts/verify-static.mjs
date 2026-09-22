import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist/client');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(p,d.name)):[path.join(p,d.name)]);}
const files=walk(root),html=files.filter(p=>p.endsWith('.html'));
const errors=[];
const exists=p=>fs.existsSync(p)||fs.existsSync(p+'.html')||fs.existsSync(path.join(p,'index.html'));
for(const file of html){
 const s=fs.readFileSync(file,'utf8'),relative=path.relative(root,file);
 if(relative.startsWith('__qa'))errors.push('QA artifact included: '+relative);
 if(relative==='404.html')continue;
 const lang=relative.startsWith('en')?'en':'de';
 if(!s.includes(`lang="${lang}"`))errors.push('Incorrect document language: '+relative);
 if((s.match(/<h1[ >]/g)||[]).length!==1)errors.push('Expected one H1: '+relative);
 if(!s.includes('<title>')||s.includes('Starter Project'))errors.push('Missing page title: '+relative);
 if(s.includes('alin-zahnpraxis.example'))errors.push('Invented canonical domain: '+relative);
 for(const match of s.matchAll(/(?:href|src)="([^"#]+)"/g)){
  const url=match[1].split(/[?#]/)[0];
  if(!url.startsWith('/')||url.startsWith('//'))continue;
  if(!exists(path.join(root,decodeURIComponent(url))))errors.push(`${relative}: missing ${url}`);
 }
}
const localized=html.filter(p=>/^en[/.]|^de[/.]/.test(path.relative(root,p)));
if(localized.length!==32)errors.push(`Expected 32 localized pages, found ${localized.length}`);
if(!fs.existsSync(path.join(root,'index.html')))errors.push('Missing root index');
if(!fs.existsSync(path.join(root,'robots.txt')))errors.push('Missing robots.txt');
if(!fs.existsSync(path.join(root,'sitemap.xml')))errors.push('Missing sitemap.xml');
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exit(1);}
console.log(`Verified ${localized.length} localized pages; document languages, H1s, titles and all internal links/assets pass.`);
