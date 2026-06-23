import{r as s,j as t}from"./iframe-BphfQdtb.js";import{r as Q}from"./index-BeB3Tvsy.js";import{a as p}from"./utils-H4fX6pm_.js";import{c as T}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";import"./index-C8t6l0qO.js";const X=T("relative flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"bg-bg-default border border-border-default text-text-default",muted:"bg-bg-muted border border-border-muted text-text-muted",ghost:"bg-bg-ghost border border-border-ghost text-text-ghost"},size:{sm:"text-sm py-2 px-3 min-h-9 rounded-md",md:"text-base py-3 px-4 min-h-11 rounded-lg",lg:"text-lg py-4 px-5 min-h-14 rounded-xl"}},defaultVariants:{variant:"default",size:"md"}}),Y=T("absolute z-50 w-full overflow-hidden border border-border-default",{variants:{variant:{default:"bg-bg-default shadow-shadow-lg rounded-lg",muted:"bg-bg-muted shadow-shadow-md rounded-lg",ghost:"bg-bg-ghost shadow-shadow-md rounded-lg"}},defaultVariants:{variant:"default"}}),Z=T("cursor-pointer px-4 py-3 text-base transition-all duration-150",{variants:{variant:{default:"text-text-default hover:bg-bg-secondary/60",muted:"text-text-muted hover:bg-bg-secondary/60",ghost:"text-text-ghost hover:bg-bg-secondary/60"}},defaultVariants:{variant:"default"}});function ee(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function te({options:c=[],placeholder:f="Select an option",variant:D="default",size:I="md",disabled:n,error:m,value:L,defaultValue:W,onChange:g,className:A,children:B},P){const N=`select-listbox-${s.useId()}`,[a,i]=s.useState(!1),[d,E]=s.useState(0),[$,G]=s.useState(W??""),l=s.useRef(null),M=L!==void 0,v=M?L:$,u=B?[]:c,R=u.find(e=>e.value===v),q=ee(),_=s.useCallback(()=>{n||i(e=>!e)},[n]),J=s.useCallback(e=>{if(!n)switch(e.key){case"ArrowDown":e.preventDefault(),a?E(r=>Math.min(r+1,u.length-1)):i(!0);break;case"ArrowUp":e.preventDefault(),a&&E(r=>Math.max(r-1,0));break;case"Enter":if(e.preventDefault(),a&&u[d]){const r=u[d];r.disabled||(g?.(r.value),i(!1))}else i(!0);break;case"Escape":e.preventDefault(),i(!1);break;case"Tab":i(!1);break}},[n,a,u,d,g]),K=s.useCallback(e=>{e.disabled||(M||G(e.value),g?.(e.value),i(!1))},[M,g]),U=s.useCallback(e=>{E(e)},[]);s.useEffect(()=>{if(!a)return;const e=r=>{l.current&&!l.current.contains(r.target)&&i(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[a]);const F=p(X({variant:D,size:I}),!n&&!m&&"hover:border-border-input-hover",!n&&!m&&!a&&"active:bg-bg-secondary/40",n&&"opacity-50 cursor-not-allowed",m&&"border-border-error ring-2 ring-ring-error/30",a&&"ring-2 ring-ring-focus",A),H=p(Y({variant:D}),!q&&"transition-all duration-200 ease-out",q?"":a?"opacity-100 scale-100 translate-y-0":"opacity-0 scale-95 -translate-y-1 pointer-events-none");return t.jsxs("div",{ref:l,className:"relative w-full",children:[t.jsxs("button",{ref:P,type:"button",role:"combobox","aria-expanded":a,"aria-haspopup":"listbox","aria-disabled":n??void 0,"aria-errormessage":m?"select-error":void 0,"aria-activedescendant":a&&d>=0?`${N}-option-${d}`:void 0,disabled:n,onClick:_,onKeyDown:J,className:F,children:[t.jsx("span",{className:p(!R&&"text-text-muted"),children:R?.label??f}),t.jsx("span",{className:p("ml-2 inline-block transition-transform duration-200",a&&"rotate-180"),"aria-hidden":"true",children:t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M4 6L8 10L12 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),m&&t.jsx("span",{id:"select-error",className:"text-sm text-text-error mt-1",children:"Please select an option"}),a&&Q.createPortal(t.jsx("div",{id:N,role:"listbox","aria-label":f,className:p(H,"max-h-60 overflow-y-auto border-t-2 border-t-border-accent"),style:{position:"fixed",top:l.current?l.current.getBoundingClientRect().bottom+4:0,left:l.current?l.current.getBoundingClientRect().left:0,width:l.current?l.current.getBoundingClientRect().width:"100%"},children:u.map((e,r)=>t.jsx("div",{id:`${N}-option-${r}`,role:"option","aria-selected":e.value===v,"aria-disabled":e.disabled??void 0,"data-active":r===d,onClick:()=>K(e),onMouseEnter:()=>U(r),className:p(Z({variant:D}),e.value===v&&"bg-bg-accent/10 font-semibold text-text-accent",e.disabled&&"opacity-40 cursor-not-allowed",r===d&&!e.disabled&&"bg-bg-secondary/80",!e.disabled&&"hover:bg-bg-secondary/60"),children:t.jsxs("span",{className:"flex items-center justify-between",children:[t.jsx("span",{children:e.label}),e.value===v&&t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"text-text-accent shrink-0 ml-2",children:t.jsx("path",{d:"M2.5 7L5.5 10L11.5 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})},e.value))}),document.body)]})}const V=s.forwardRef(te);V.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:"",defaultValue:{value:"[]",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const ce={title:"Components/Select",tags:["autodocs"],parameters:{layout:"padded"},component:V,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the select",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the select",control:"boolean"},error:{type:"boolean",description:"Show error state",control:"boolean"},placeholder:{type:"string",description:"Placeholder text when no option is selected",control:"text"}}},o=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"},{value:"solid",label:"SolidJS"}],h={args:{variant:"default",size:"md",placeholder:"Select a framework",disabled:!1,error:!1,options:o}},b={args:{variant:"muted",size:"md",placeholder:"Select a framework",options:o}},x={args:{variant:"ghost",size:"md",placeholder:"Select a framework",options:o}},S={args:{variant:"default",size:"sm",placeholder:"Small select",options:o.slice(0,3)}},w={args:{variant:"default",size:"md",placeholder:"Medium select",options:o}},y={args:{variant:"default",size:"lg",placeholder:"Large select",options:o}},k={args:{variant:"default",size:"md",placeholder:"Choose your preferred language",options:[{value:"ts",label:"TypeScript"},{value:"js",label:"JavaScript"},{value:"rust",label:"Rust"},{value:"go",label:"Go"}]}},z={name:"With Selected Value",args:{variant:"default",size:"md",placeholder:"Select a framework",options:o},render:c=>t.jsx(V,{...c,defaultValue:"react"})},C={name:"Error State",args:{variant:"default",size:"md",placeholder:"Select an option",error:!0,options:o}},j={args:{variant:"default",size:"md",placeholder:"Disabled select",disabled:!0,options:o}},O={name:"Controlled",parameters:{docs:{description:{story:"A select with controlled `value` and `onChange` props."}}},render:()=>{const[c,f]=s.useState("");return t.jsxs("div",{className:"w-64 space-y-4",children:[t.jsx(V,{variant:"default",size:"md",placeholder:"Select a framework",value:c,onChange:f,options:o}),t.jsxs("p",{className:"text-sm text-text-muted",children:["Selected: ",c||"none"]})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    options: sampleOptions
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'Small select',
    options: sampleOptions.slice(0, 3)
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Medium select',
    options: sampleOptions
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg',
    placeholder: 'Large select',
    options: sampleOptions
  }
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Error State',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    error: true,
    options: sampleOptions
  }
}`,...C.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Disabled select',
    disabled: true,
    options: sampleOptions
  }
}`,...j.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};const ue=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","WithPlaceholder","WithSelectedValue","ErrorState","Disabled","Controlled"];export{O as Controlled,h as Default,j as Disabled,C as ErrorState,x as Ghost,b as Muted,y as SizeLg,w as SizeMd,S as SizeSm,k as WithPlaceholder,z as WithSelectedValue,ue as __namedExportsOrder,ce as default};
