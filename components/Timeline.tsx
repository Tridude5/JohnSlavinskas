export default function Timeline({ items }:{ items: Array<{ role:string; org:string; loc?:string; period:string; bullets:string[] }>}){
  return (
    <div className="timeline">
      {items.map((it,idx)=>(
        <div className="timeline-item" key={idx}>
          <div className="timeline-bullet" />
          <h3 className="font-semibold">{it.role} <span className="text-gray-500">— {it.org}</span></h3>
          <div className="text-sm text-gray-500">{it.period}{it.loc ? ` · ${it.loc}` : ""}</div>
          <ul className="list-disc ml-5 mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {it.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
          </ul>
        </div>
      ))}
    </div>
  )
}