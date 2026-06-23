import{r as a,j as e}from"./iframe-0Is85jn1.js";import{a as g}from"./utils-H4fX6pm_.js";import{c as F}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const J=F("flex w-full items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"text-text-default hover:text-text-default-hover",muted:"text-text-muted hover:text-text-muted-hover",ghost:"text-text-ghost hover:text-text-ghost-hover"},size:{sm:"text-sm py-2.5 px-4",md:"text-base py-3 px-5",lg:"text-lg py-4 px-6"}},defaultVariants:{variant:"default",size:"md"}}),_=F("overflow-hidden",{variants:{variant:{default:"text-text-default",muted:"text-text-muted",ghost:"text-text-ghost"},size:{sm:"text-sm",md:"text-base",lg:"text-lg"}},defaultVariants:{variant:"default",size:"md"}}),W=a.createContext({variant:"default",size:"md",defaultExpanded:!1});function U(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function K({title:t,children:x,variant:v,size:s,disabled:I,defaultExpanded:M=!1,expanded:y,onToggle:A},u){const r=a.useContext(W),p=v??r.variant,T=s??r.size,c=I??r.disabled,N=M??r.defaultExpanded,q=r.reducedMotion??!1,l=a.useId(),h=`accordion-content-${l}`,i=`accordion-trigger-${l}`,m=a.useRef(null);a.useEffect(()=>(r.registerItem?.(i,m.current),()=>r.unregisterItem?.(i)),[r,i]);const f=y!==void 0||r.expanded!==void 0,[L,O]=a.useState(N),b=f?y??r.expanded:L,V=a.useCallback(()=>{if(c)return;const n=!b;f||O(n),A?.(n),r.onToggle?.(n)},[c,b,f,A,r]),G=a.useCallback(n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),V()),n.key==="ArrowDown"&&(n.preventDefault(),r.onFocusChange?.(i,"next")),n.key==="ArrowUp"&&(n.preventDefault(),r.onFocusChange?.(i,"prev"))},[V,r,i]);return e.jsxs("div",{"data-accordion-item":!0,className:g("border-b border-border-default last:border-b-0",c&&"opacity-50 cursor-not-allowed"),children:[e.jsxs("button",{ref:n=>{m.current=n,typeof u=="function"?u(n):u&&"current"in u&&(u.current=n)},id:i,type:"button",role:"button","aria-expanded":b,"aria-controls":h,"aria-disabled":c??void 0,disabled:c,onClick:V,onKeyDown:G,className:g(J({variant:p,size:T}),c&&"cursor-not-allowed hover:cursor-not-allowed"),children:[e.jsx("span",{className:"flex-1 font-medium",children:t}),e.jsx("span",{className:g("flex-shrink-0 transition-transform duration-200 ease-out",b?"rotate-180":"rotate-0"),"aria-hidden":"true",children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6.75L9 11.25L13.5 6.75",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.jsx("div",{id:h,role:"region","aria-labelledby":i,className:g("grid",!q&&"transition-[grid-template-rows] duration-200 ease-out"),style:b?{gridTemplateRows:"1fr"}:{gridTemplateRows:"0fr"},children:e.jsx("div",{className:"min-h-0 overflow-hidden",children:e.jsx("div",{className:g(_({variant:p,size:T}),"pl-5 py-3 border-l-2 border-border-accent/30"),children:x})})})]})}const o=a.forwardRef(K);function P({children:t,className:x,variant:v="default",size:s="md",disabled:I,defaultExpanded:M=!1,expanded:y,onToggle:A},u){const r=U(),p=a.useRef(new Map),T=a.useCallback((l,h)=>{p.current.set(l,h)},[]),c=a.useCallback(l=>{p.current.delete(l)},[]),N=a.useCallback((l,h)=>{const i=Array.from(p.current.keys()),m=i.indexOf(l);if(m===-1)return;let f;h==="next"?f=m===i.length-1?0:m+1:f=m===0?i.length-1:m-1;const L=i[f];p.current.get(L)?.focus()},[]),q={variant:v??"default",size:s??"md",disabled:I,defaultExpanded:M,expanded:y,onToggle:A,reducedMotion:r,registerItem:T,unregisterItem:c,onFocusChange:N};return e.jsx(W.Provider,{value:q,children:e.jsx("div",{ref:u,className:g("w-full",x),"data-reduced-motion":r,children:t})})}const d=a.forwardRef(P);o.__docgenInfo={description:"",methods:[],displayName:"AccordionItem",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""}},composes:["VariantProps"]};d.__docgenInfo={description:"",methods:[],displayName:"Accordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},expanded:{required:!1,tsType:{name:"boolean"},description:""},onToggle:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const X={title:"Components/Accordion",tags:["autodocs"],parameters:{layout:"padded"},component:d,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the accordion items",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable all accordion items",control:"boolean"},defaultExpanded:{type:"boolean",description:"Default expanded state for uncontrolled accordion",control:"boolean"}}},w={args:{variant:"default",size:"md",disabled:!1,defaultExpanded:!1},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"What is React?",children:"React is a JavaScript library for building user interfaces, maintained by Meta and a community of individual developers and companies. It lets you compose complex UIs from small, isolated pieces of code called components."}),e.jsx(o,{title:"What is TypeScript?",children:"TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language."}),e.jsx(o,{title:"What is Tailwind CSS?",children:"Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is low-level and gives you all the building blocks you need to build designs without opinionated styles."})]})},S={args:{variant:"muted",size:"md"},decorators:[t=>e.jsx("div",{className:"w-full max-w-md",children:e.jsx(t,{})})],render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"First Item",children:"This is the content of the first muted accordion item. It uses a softer background color."}),e.jsx(o,{title:"Second Item",children:"This is the content of the second muted accordion item."}),e.jsx(o,{title:"Third Item",children:"This is the content of the third muted accordion item."})]})},j={args:{variant:"ghost",size:"md"},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Ghost Item One",children:"This accordion uses the ghost variant styling."}),e.jsx(o,{title:"Ghost Item Two",children:"The ghost variant has transparent backgrounds."})]})},z={args:{variant:"default",size:"sm"},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Small Item",children:"This is a small-sized accordion item."}),e.jsx(o,{title:"Another Small Item",children:"Another small accordion item with compact padding."})]})},C={args:{variant:"default",size:"md"},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Medium Item",children:"This is a medium-sized accordion item."}),e.jsx(o,{title:"Another Medium Item",children:"Another medium accordion item."})]})},E={args:{variant:"default",size:"lg"},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Large Item",children:"This is a large-sized accordion item with more padding."}),e.jsx(o,{title:"Another Large Item",children:"Another large accordion item."})]})},k={args:{variant:"default",size:"md",disabled:!0},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Disabled Item One",children:"This item is disabled and cannot be expanded."}),e.jsx(o,{title:"Disabled Item Two",children:"This item is also disabled."})]})},D={name:"Controlled",parameters:{docs:{description:{story:"An accordion with controlled expanded state using `expanded` and `onToggle` props."}}},render:()=>{const[t,x]=a.useState(null),v=[{title:"First Controlled",content:"This is controlled via React state."},{title:"Second Controlled",content:"Click to expand a different item."},{title:"Third Controlled",content:"Only one item can be expanded at a time."}];return e.jsx(d,{variant:"default",size:"md",expanded:t!==null,onToggle:s=>x(s?0:null),children:v.map((s,I)=>e.jsx(o,{title:s.title,defaultExpanded:I===t,children:s.content},s.title))})}},R={name:"Default Expanded",args:{variant:"default",size:"md",defaultExpanded:!0},render:t=>e.jsxs(d,{...t,children:[e.jsx(o,{title:"Expanded by Default",children:"This item is expanded when the accordion first renders."}),e.jsx(o,{title:"Collapsed by Default",children:"This item is collapsed when the accordion first renders."})]})};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    defaultExpanded: false
  },
  render: args => <Accordion {...args}>
      <AccordionItem title="What is React?">
        React is a JavaScript library for building user interfaces, maintained by Meta and a community of individual developers and companies. It lets you compose complex UIs from small, isolated pieces of code called components.
      </AccordionItem>
      <AccordionItem title="What is TypeScript?">
        TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and class-based object-oriented programming to the language.
      </AccordionItem>
      <AccordionItem title="What is Tailwind CSS?">
        Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It is low-level and gives you all the building blocks you need to build designs without opinionated styles.
      </AccordionItem>
    </Accordion>
}`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md'
  },
  decorators: [Story => <div className="w-full max-w-md">
        <Story />
      </div>],
  render: args => <Accordion {...args}>
      <AccordionItem title="First Item">
        This is the content of the first muted accordion item. It uses a softer background color.
      </AccordionItem>
      <AccordionItem title="Second Item">
        This is the content of the second muted accordion item.
      </AccordionItem>
      <AccordionItem title="Third Item">
        This is the content of the third muted accordion item.
      </AccordionItem>
    </Accordion>
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};const Y=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","Disabled","Controlled","DefaultExpanded"];export{D as Controlled,w as Default,R as DefaultExpanded,k as Disabled,j as Ghost,S as Muted,E as SizeLg,C as SizeMd,z as SizeSm,Y as __namedExportsOrder,X as default};
