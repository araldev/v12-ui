import{r as s,j as a}from"./iframe-DKAX0yl9.js";import{r as U}from"./index-B2sGmER9.js";import{a as p}from"./utils-H4fX6pm_.js";import{c as M}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";import"./index-C4wRVeLH.js";const F=M("relative flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"bg-bg-default border border-border-default text-text-default hover:border-border-input-hover",muted:"bg-bg-muted border border-border-muted text-text-muted hover:border-border-muted",ghost:"bg-bg-ghost border border-border-ghost text-text-ghost hover:border-border-ghost-hover"},size:{sm:"text-sm py-2 px-3 min-h-9",md:"text-base py-3 px-4 min-h-11",lg:"text-lg py-4 px-5 min-h-14"}},defaultVariants:{variant:"default",size:"md"}}),H=M("absolute z-50 w-full overflow-hidden border border-border-default shadow-shadow-md",{variants:{variant:{default:"bg-bg-default",muted:"bg-bg-muted",ghost:"bg-bg-ghost"}},defaultVariants:{variant:"default"}}),Q=M("cursor-pointer px-4 py-2 text-base transition-colors duration-100",{variants:{variant:{default:"text-text-default hover:bg-bg-secondary",muted:"text-text-muted hover:bg-bg-secondary",ghost:"text-text-ghost hover:bg-bg-secondary"}},defaultVariants:{variant:"default"}});function X(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Y({options:c=[],placeholder:m="Select an option",variant:V="default",size:I="md",disabled:i,error:j,value:N,defaultValue:L,onChange:f,className:A,children:W},P){const D=`select-listbox-${s.useId()}`,[r,l]=s.useState(!1),[d,E]=s.useState(0),n=s.useRef(null),T=N!==void 0?N:L??"",u=W?[]:c,R=u.find(e=>e.value===T),q=X(),$=s.useCallback(()=>{i||l(e=>!e)},[i]),B=s.useCallback(e=>{if(!i)switch(e.key){case"ArrowDown":e.preventDefault(),r?E(t=>Math.min(t+1,u.length-1)):l(!0);break;case"ArrowUp":e.preventDefault(),r&&E(t=>Math.max(t-1,0));break;case"Enter":if(e.preventDefault(),r&&u[d]){const t=u[d];t.disabled||(f?.(t.value),l(!1))}else l(!0);break;case"Escape":e.preventDefault(),l(!1);break;case"Tab":l(!1);break}},[i,r,u,d,f]),G=s.useCallback(e=>{e.disabled||(f?.(e.value),l(!1))},[f]),_=s.useCallback(e=>{E(e)},[]);s.useEffect(()=>{if(!r)return;const e=t=>{n.current&&!n.current.contains(t.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[r]);const J=p(F({variant:V,size:I}),i&&"opacity-50 cursor-not-allowed",j&&"border-border-error",r&&"ring-2 ring-ring-focus",A),K=p(H({variant:V}),!q&&"transition-all duration-150 ease-out",q?"":r?"opacity-100 scale-100":"opacity-0 scale-95 pointer-events-none");return a.jsxs("div",{ref:n,className:"relative w-full",children:[a.jsxs("button",{ref:P,type:"button",role:"combobox","aria-expanded":r,"aria-haspopup":"listbox","aria-disabled":i??void 0,"aria-errormessage":j?"select-error":void 0,"aria-activedescendant":r&&d>=0?`${D}-option-${d}`:void 0,disabled:i,onClick:$,onKeyDown:B,className:J,children:[a.jsx("span",{className:p(!R&&"text-text-muted"),children:R?.label??m}),a.jsx("span",{className:p("ml-2 inline-block transition-transform duration-200",r&&"rotate-180"),"aria-hidden":"true",children:a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M4 6L8 10L12 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),j&&a.jsx("span",{id:"select-error",className:"text-sm text-text-error mt-1",children:"Please select an option"}),r&&U.createPortal(a.jsx("div",{id:D,role:"listbox","aria-label":m,className:p(K,"max-h-60 overflow-y-auto"),style:{position:"fixed",top:n.current?n.current.getBoundingClientRect().bottom+4:0,left:n.current?n.current.getBoundingClientRect().left:0,width:n.current?n.current.getBoundingClientRect().width:"100%"},children:u.map((e,t)=>a.jsx("div",{id:`${D}-option-${t}`,role:"option","aria-selected":e.value===T,"aria-disabled":e.disabled??void 0,"data-active":t===d,onClick:()=>G(e),onMouseEnter:()=>_(t),className:p(Q({variant:V}),e.value===T&&"bg-bg-secondary font-medium",e.disabled&&"opacity-50 cursor-not-allowed",t===d&&!e.disabled&&"bg-bg-secondary"),children:e.label},e.value))}),document.body)]})}const O=s.forwardRef(Y);O.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:"",defaultValue:{value:"[]",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const ie={title:"Components/Select",tags:["autodocs"],parameters:{layout:"padded"},component:O,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the select",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the select",control:"boolean"},error:{type:"boolean",description:"Show error state",control:"boolean"},placeholder:{type:"string",description:"Placeholder text when no option is selected",control:"text"}}},o=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"},{value:"solid",label:"SolidJS"}],g={args:{variant:"default",size:"md",placeholder:"Select a framework",disabled:!1,error:!1,options:o}},v={args:{variant:"muted",size:"md",placeholder:"Select a framework",options:o}},b={args:{variant:"ghost",size:"md",placeholder:"Select a framework",options:o}},h={args:{variant:"default",size:"sm",placeholder:"Small select",options:o.slice(0,3)}},S={args:{variant:"default",size:"md",placeholder:"Medium select",options:o}},x={args:{variant:"default",size:"lg",placeholder:"Large select",options:o}},w={args:{variant:"default",size:"md",placeholder:"Choose your preferred language",options:[{value:"ts",label:"TypeScript"},{value:"js",label:"JavaScript"},{value:"rust",label:"Rust"},{value:"go",label:"Go"}]}},y={name:"With Selected Value",args:{variant:"default",size:"md",placeholder:"Select a framework",options:o},render:c=>a.jsx(O,{...c,defaultValue:"react"})},z={name:"Error State",args:{variant:"default",size:"md",placeholder:"Select an option",error:!0,options:o}},k={args:{variant:"default",size:"md",placeholder:"Disabled select",disabled:!0,options:o}},C={name:"Controlled",parameters:{docs:{description:{story:"A select with controlled `value` and `onChange` props."}}},render:()=>{const[c,m]=s.useState("");return a.jsxs("div",{className:"w-64 space-y-4",children:[a.jsx(O,{variant:"default",size:"md",placeholder:"Select a framework",value:c,onChange:m,options:o}),a.jsxs("p",{className:"text-sm text-text-muted",children:["Selected: ",c||"none"]})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    options: sampleOptions
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'Small select',
    options: sampleOptions.slice(0, 3)
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Medium select',
    options: sampleOptions
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg',
    placeholder: 'Large select',
    options: sampleOptions
  }
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Choose your preferred language',
    options: [{
      value: 'ts',
      label: 'TypeScript'
    }, {
      value: 'js',
      label: 'JavaScript'
    }, {
      value: 'rust',
      label: 'Rust'
    }, {
      value: 'go',
      label: 'Go'
    }]
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'With Selected Value',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  },
  render: args => {
    return <Select {...args} defaultValue="react" />;
  }
}`,...y.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Error State',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    error: true,
    options: sampleOptions
  }
}`,...z.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Disabled select',
    disabled: true,
    options: sampleOptions
  }
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'A select with controlled \`value\` and \`onChange\` props.'
      }
    }
  },
  render: () => {
    const [value, setValue] = useState('');
    return <div className="w-64 space-y-4">
        <Select variant="default" size="md" placeholder="Select a framework" value={value} onChange={setValue} options={sampleOptions} />
        <p className="text-sm text-text-muted">Selected: {value || 'none'}</p>
      </div>;
  }
}`,...C.parameters?.docs?.source}}};const de=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","WithPlaceholder","WithSelectedValue","ErrorState","Disabled","Controlled"];export{C as Controlled,g as Default,k as Disabled,z as ErrorState,b as Ghost,v as Muted,x as SizeLg,S as SizeMd,h as SizeSm,w as WithPlaceholder,y as WithSelectedValue,de as __namedExportsOrder,ie as default};
