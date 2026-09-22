import type {Metadata} from 'next';
import {Header,Footer} from '@/components/site/shared';
import {HomePage} from '@/components/site/pages';
export const metadata:Metadata={title:'ALIN · Zahnmedizin mit Gefühl',description:'Persönliche Beratung und verständliche Antworten. Damit Sie Ihre Behandlung mit einem guten Gefühl planen können.',robots:{index:false,follow:false},icons:{icon:'/favicon.png'}};
export default function Entry(){return <><Header lang="de" page="home" alternate="/en"/><main id="main" tabIndex={-1}><HomePage lang="de"/></main><Footer lang="de"/></>}
