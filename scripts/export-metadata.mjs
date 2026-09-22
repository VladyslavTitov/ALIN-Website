import fs from 'node:fs';
import path from 'node:path';
import {practice} from '../lib/practice.ts';
// Vinext's export does not currently emit metadata route files. Write these
// from the same practice configuration after the HTML export is complete.
const root=path.resolve('dist/client');
if(!fs.existsSync(path.join(root,'index.html')))throw new Error('Build the site before exporting metadata.');
if(!practice.concept&&!/^https:\/\//.test(practice.siteUrl))throw new Error('Production needs a verified HTTPS siteUrl.');
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(p,d.name)):[path.join(p,d.name)]);}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const origin=practice.siteUrl.replace(/\/$/,'');
const routes=practice.concept?[]:walk(root).filter(f=>f.endsWith('.html')).map(f=>'/'+path.relative(root,f).replaceAll(path.sep,'/').replace(/\.html$/,'')).filter(s=>/^\/(de|en)(\/|$)/.test(s));
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(r=>`  <url><loc>${escape(origin+r)}</loc></url>`).join('\n')+'\n</urlset>\n');
fs.writeFileSync(path.join(root,'robots.txt'),practice.concept?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Exported robots.txt and sitemap.xml (${practice.concept?'private concept':routes.length+' URLs'}).`);
