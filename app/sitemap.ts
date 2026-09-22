import type {MetadataRoute} from 'next';
import {practice,routeNames,PageKey,pathFor,Lang} from '@/lib/practice';
import {treatments,treatmentPath} from '@/lib/treatments';
export default function sitemap():MetadataRoute.Sitemap {
 if(!practice.siteUrl||practice.concept)return [];
 const entries:MetadataRoute.Sitemap=[];
 for(const lang of ['de','en'] as Lang[]){
  for(const page of Object.keys(routeNames) as PageKey[])entries.push({url:practice.siteUrl+pathFor(lang,page),alternates:{languages:{de:practice.siteUrl+pathFor('de',page),en:practice.siteUrl+pathFor('en',page)}}});
  for(const t of treatments)entries.push({url:practice.siteUrl+treatmentPath(lang,t),alternates:{languages:{de:practice.siteUrl+treatmentPath('de',t),en:practice.siteUrl+treatmentPath('en',t)}}});
 }
 return entries;
}
