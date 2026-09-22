import type {Metadata} from 'next';
import '../globals.css';
export const metadata:Metadata={title:'ALIN · Zahnmedizin mit Gefühl',description:'Ein ruhiges, persönliches Praxiskonzept. Moderne Zahnmedizin verständlich erklärt.',robots:{index:false,follow:false},icons:{icon:'/favicon.png',shortcut:'/favicon.png'}};
export function generateStaticParams(){return [{lang:'de'},{lang:'en'}]}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}){const {lang}=await params;return <html lang={lang==='en'?'en':'de'}><body>{children}</body></html>}
