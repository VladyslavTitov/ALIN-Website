import type {MetadataRoute} from 'next';
import {practice} from '@/lib/practice';
export default function robots():MetadataRoute.Robots {
 return practice.concept?{rules:{userAgent:'*',disallow:'/'}}:{rules:{userAgent:'*',allow:'/'},...(practice.siteUrl?{sitemap:`${practice.siteUrl}/sitemap.xml`}:{})};
}
