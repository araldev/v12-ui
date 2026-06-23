import{r as a,j as e}from"./iframe-BsOeIXpe.js";import{a as x}from"./utils-H4fX6pm_.js";import{c as F}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const J=F("flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"text-text-default hover:text-text-default-hover",muted:"text-text-muted hover:text-text-muted-hover",ghost:"text-text-ghost hover:text-text-ghost-hover"},size:{sm:"text-sm py-2 px-3",md:"text-base py-3 px-4",lg:"text-lg py-4 px-5"}},defaultVariants:{variant:"default",size:"md"}}),_=F("overflow-hidden",{variants:{variant:{default:"text-text-default",muted:"text-text-muted",ghost:"text-text-ghost"},size:{sm:"text-sm",md:"text-base",lg:"text-lg"}},defaultVariants:{variant:"default",size:"md"}}),W=a.createContext({variant:"default",size:"md",defaultExpanded:!1});function K(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function P({title:t,children:g,variant:v,size:s,disabled:I,defaultExpanded:M=!1,expanded:A,onToggle:y},u){const n=a.useContext(W),p=v??n.variant,T=s??n.size,c=I??n.disabled,q=M??n.defaultExpanded,N=n.reducedMotion??!1,l=a.useId(),h=`accordion-content-${l}`,o=`accordion-trigger-${l}`,m=a.useRef(null);a.useEffect(()=>(n.registerItem?.(o,m.current),()=>n.unregisterItem?.(o)),[n,o]);const f=A!==void 0||n.expanded!==void 0,[L,O]=a.useState(q),b=f?A??n.expanded:L,V=a.useCallback(()=>{if(c)return;const i=!b;f||O(i),y?.(i),n.onToggle?.(i)},[c,b,f,y,n]),G=a.useCallback(i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),V()),i.key==="ArrowDown"&&(i.preventDefault(),n.onFocusChange?.(o,"next")),i.key==="ArrowUp"&&(i.preventDefault(),n.onFocusChange?.(o,"prev"))},[V,n,o]);return e.jsxs("div",{"data-accordion-item":!0,className:x("border-b border-border-default last:border-b-0",c&&"opacity-50 cursor-not-allowed"),children:[e.jsxs("button",{ref:i=>{m.current=i,typeof u=="function"?u(i):u&&"current"in u&&(u.current=i)},id:o,type:"button",role:"button","aria-expanded":b,"aria-controls":h,"aria-disabled":c??void 0,disabled:c,onClick:V,onKeyDown:G,className:x(J({variant:p,size:T}),c&&"cursor-not-allowed hover:cursor-not-allowed"),children:[e.jsx("span",{className:"flex-1",children:t}),e.jsx("span",{className:x("ml-2 inline-block transition-transform duration-200",b?"rotate-180":"rotate-0"),"aria-hidden":"true",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4 6L8 10L12 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.jsx("div",{id:h,role:"region","aria-labelledby":o,className:x("grid",!N&&"transition-[grid-template-rows] duration-200 ease-out"),style:b?{gridTemplateRows:"1fr"}:{gridTemplateRows:"0fr"},children:e.jsx("div",{className:"min-h-0 overflow-hidden",children:e.jsx("div",{className:x(_({variant:p,size:T}),"pt-2 pb-3"),children:g})})})]})}const r=a.forwardRef(P);function $({children:t,className:g,variant:v="default",size:s="md",disabled:I,defaultExpanded:M=!1,expanded:A,onToggle:y},u){const n=K(),p=a.useRef(new Map),T=a.useCallback((l,h)=>{p.current.set(l,h)},[]),c=a.useCallback(l=>{p.current.delete(l)},[]),q=a.useCallback((l,h)=>{const o=Array.from(p.current.keys()),m=o.indexOf(l);if(m===-1)return;let f;h==="next"?f=m===o.length-1?0:m+1:f=m===0?o.length-1:m-1;const L=o[f];p.current.get(L)?.focus()},[]),N={variant:v??"default",size:s??"md",disabled:I,defaultExpanded:M,expanded:A,onToggle:y,reducedMotion:n,registerItem:T,unregisterItem:c,onFocusChange:q};return e.jsx(W.Provider,{value:N,children:e.jsx("div",{ref:u,className:x("w-full",g),"data-reduced-motion":n,children:t})})}const d=a.forwardRef($);r.__docgenInfo={description:"",methods:[],displayName:"AccordionItem",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""}},composes:["VariantProps"]};d.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const X={title:"Components/Accordion",tags:["autodocs"],parameters:{layout:"padded"},component:d,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the accordion items",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable all accordion items",control:"boolean"},defaultExpanded:{type:"boolean",description:"Default expanded state for uncontrolled accordion",control:"boolean"}}},S={args:{variant:"default",size:"md",disabled:!1,defaultExpanded:!1},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"What is React?",children:"React is a JavaScript library for building user interfaces, maintained by Meta."}),e.jsx(r,{title:"What is TypeScript?",children:"TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."}),e.jsx(r,{title:"What is Tailwind CSS?",children:"Tailwind CSS is a utility-first CSS framework for rapidly building custom designs."})]})},w={args:{variant:"muted",size:"md"},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"First Item",children:"This is the content of the first muted accordion item."}),e.jsx(r,{title:"Second Item",children:"This is the content of the second muted accordion item."}),e.jsx(r,{title:"Third Item",children:"This is the content of the third muted accordion item."})]})},j={args:{variant:"ghost",size:"md"},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Ghost Item One",children:"This accordion uses the ghost variant styling."}),e.jsx(r,{title:"Ghost Item Two",children:"The ghost variant has transparent backgrounds."})]})},z={args:{variant:"default",size:"sm"},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Small Item",children:"This is a small-sized accordion item."}),e.jsx(r,{title:"Another Small Item",children:"Another small accordion item with compact padding."})]})},C={args:{variant:"default",size:"md"},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Medium Item",children:"This is a medium-sized accordion item."}),e.jsx(r,{title:"Another Medium Item",children:"Another medium accordion item."})]})},E={args:{variant:"default",size:"lg"},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Large Item",children:"This is a large-sized accordion item with more padding."}),e.jsx(r,{title:"Another Large Item",children:"Another large accordion item."})]})},D={args:{variant:"default",size:"md",disabled:!0},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Disabled Item One",children:"This item is disabled and cannot be expanded."}),e.jsx(r,{title:"Disabled Item Two",children:"This item is also disabled."})]})},k={name:"Controlled",parameters:{docs:{description:{story:"An accordion with controlled expanded state using `expanded` and `onToggle` props."}}},render:()=>{const[t,g]=a.useState(null),v=[{title:"First Controlled",content:"This is controlled via React state."},{title:"Second Controlled",content:"Click to expand a different item."},{title:"Third Controlled",content:"Only one item can be expanded at a time."}];return e.jsx(d,{variant:"default",size:"md",expanded:t!==null,onToggle:s=>g(s?0:null),children:v.map((s,I)=>e.jsx(r,{title:s.title,defaultExpanded:I===t,children:s.content},s.title))})}},R={name:"Default Expanded",args:{variant:"default",size:"md",defaultExpanded:!0},render:t=>e.jsxs(d,{...t,children:[e.jsx(r,{title:"Expanded by Default",children:"This item is expanded when the accordion first renders."}),e.jsx(r,{title:"Collapsed by Default",children:"This item is collapsed when the accordion first renders."})]})};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    defaultExpanded: false
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="What is React?">
        React is a JavaScript library for building user interfaces, maintained by Meta.
      </AccordionItem>
      <AccordionItem title="What is TypeScript?">
        TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
      </AccordionItem>
      <AccordionItem title="What is Tailwind CSS?">
        Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.
      </AccordionItem>
    </Accordion>
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md'
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="First Item">
        This is the content of the first muted accordion item.
      </AccordionItem>
      <AccordionItem title="Second Item">
        This is the content of the second muted accordion item.
      </AccordionItem>
      <AccordionItem title="Third Item">
        This is the content of the third muted accordion item.
      </AccordionItem>
    </Accordion>
}`,...w.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Ghost Item One">
        This accordion uses the ghost variant styling.
      </AccordionItem>
      <AccordionItem title="Ghost Item Two">
        The ghost variant has transparent backgrounds.
      </AccordionItem>
    </Accordion>
}`,...j.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm'
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Small Item">
        This is a small-sized accordion item.
      </AccordionItem>
      <AccordionItem title="Another Small Item">
        Another small accordion item with compact padding.
      </AccordionItem>
    </Accordion>
}`,...z.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md'
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Medium Item">
        This is a medium-sized accordion item.
      </AccordionItem>
      <AccordionItem title="Another Medium Item">
        Another medium accordion item.
      </AccordionItem>
    </Accordion>
}`,...C.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg'
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Large Item">
        This is a large-sized accordion item with more padding.
      </AccordionItem>
      <AccordionItem title="Another Large Item">
        Another large accordion item.
      </AccordionItem>
    </Accordion>
}`,...E.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: true
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Disabled Item One">
        This item is disabled and cannot be expanded.
      </AccordionItem>
      <AccordionItem title="Disabled Item Two">
        This item is also disabled.
      </AccordionItem>
    </Accordion>
}`,...D.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'An accordion with controlled expanded state using \`expanded\` and \`onToggle\` props.'
      }
    }
  },
  render: () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const items = [{
      title: 'First Controlled',
      content: 'This is controlled via React state.'
    }, {
      title: 'Second Controlled',
      content: 'Click to expand a different item.'
    }, {
      title: 'Third Controlled',
      content: 'Only one item can be expanded at a time.'
    }];
    return <Accordion variant="default" size="md" expanded={expandedIndex !== null} onToggle={expanded => setExpandedIndex(expanded ? 0 : null)}>
        {items.map((item, index) => <AccordionItem key={item.title} title={item.title} defaultExpanded={index === expandedIndex}>
            {item.content}
          </AccordionItem>)}
      </Accordion>;
  }
}`,...k.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Default Expanded',
  args: {
    variant: 'default',
    size: 'md',
    defaultExpanded: true
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="Expanded by Default">
        This item is expanded when the accordion first renders.
      </AccordionItem>
      <AccordionItem title="Collapsed by Default">
        This item is collapsed when the accordion first renders.
      </AccordionItem>
    </Accordion>
}`,...R.parameters?.docs?.source}}};const Y=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","Disabled","Controlled","DefaultExpanded"];export{k as Controlled,S as Default,R as DefaultExpanded,D as Disabled,j as Ghost,w as Muted,E as SizeLg,C as SizeMd,z as SizeSm,Y as __namedExportsOrder,X as default};
