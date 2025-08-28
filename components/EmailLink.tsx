'use client'
export default function EmailLink({ className='' }:{ className?: string }){
  const addr = "Slavinskasjack@gmail.com";
  return <a className={className} href={`mailto:${addr}`}>{addr}</a>
}
