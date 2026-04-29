'use client';
import { motion, useReducedMotion } from 'framer-motion';

const items = ['Lead Capture Systems','Workflow Automation','Internal Tools','Smart Google Workspace','Websites that Convert','AI Training','Support Assistants','Dashboards','Client Portals','Quote Systems','Reporting Systems','Follow-up Systems'];

export function ServiceTicker(){
  const reduce = useReducedMotion();
  const rail = [...items, ...items];
  return <div className='mx-auto max-w-[1400px] px-6'><div className='overflow-hidden rounded-2xl border border-cyan-300/25 bg-slate-950/70 py-3'><motion.div animate={reduce?undefined:{x:['0%','-50%']}} transition={{duration:30,repeat:Infinity,ease:'linear'}} className='flex w-max gap-7 px-5 text-sm text-cyan-100/90'>{rail.map((i,idx)=><span key={idx} className='whitespace-nowrap'>{i}</span>)}</motion.div></div></div>;
}
