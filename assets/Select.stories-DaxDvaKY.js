import{r as s,j as t}from"./iframe-DaEtHhqH.js";import{a as p}from"./utils-H4fX6pm_.js";import{c as M}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const H=M("w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"bg-bg-default border border-border-default text-text-default",muted:"bg-bg-muted border border-border-muted text-text-muted",ghost:"bg-bg-ghost border border-border-ghost text-text-ghost"},size:{sm:"text-sm py-2 px-3 min-h-9 rounded-md",md:"text-base py-3 px-4 min-h-11 rounded-lg",lg:"text-lg py-4 px-5 min-h-14 rounded-xl"}},defaultVariants:{variant:"default",size:"md"}}),Q=M("w-full overflow-hidden border border-border-default",{variants:{variant:{default:"bg-bg-default shadow-shadow-lg rounded-lg",muted:"bg-bg-muted shadow-shadow-md rounded-lg",ghost:"bg-bg-ghost shadow-shadow-md rounded-lg"}},defaultVariants:{variant:"default"}}),X=M("cursor-pointer px-4 py-3 text-base transition-colors duration-100",{variants:{variant:{default:"text-text-default hover:bg-bg-secondary/60",muted:"text-text-muted hover:bg-bg-secondary/60",ghost:"text-text-ghost hover:bg-bg-secondary/60"}},defaultVariants:{variant:"default"}});function Y(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Z({options:d=[],placeholder:m="Select an option",variant:V="default",size:R="md",disabled:n,error:u,value:T,defaultValue:W,onChange:f,className:A,children:$},G){const E=`select-listbox-${s.useId()}`,[a,l]=s.useState(!1),[i,L]=s.useState(0),[P,_]=s.useState(W??""),N=s.useRef(null),D=T!==void 0,g=D?T:P,c=$?[]:d,q=c.find(e=>e.value===g),I=Y(),J=s.useCallback(()=>{n||l(e=>!e)},[n]),B=s.useCallback(e=>{if(!n)switch(e.key){case"ArrowDown":e.preventDefault(),a?L(r=>Math.min(r+1,c.length-1)):l(!0);break;case"ArrowUp":e.preventDefault(),a&&L(r=>Math.max(r-1,0));break;case"Enter":if(e.preventDefault(),a&&c[i]){const r=c[i];r.disabled||(f?.(r.value),l(!1))}else l(!0);break;case"Escape":e.preventDefault(),l(!1);break;case"Tab":l(!1);break}},[n,a,c,i,f]),K=s.useCallback(e=>{e.disabled||(D||_(e.value),f?.(e.value),l(!1))},[D,f]),U=s.useCallback(e=>{L(e)},[]);s.useEffect(()=>{if(!a)return;const e=r=>{N.current&&!N.current.contains(r.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[a]),s.useEffect(()=>{if(!a)return;const e=()=>l(!1);return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[a]);const F=p(H({variant:V,size:R}),!n&&!u&&"hover:border-border-input-hover",!n&&!u&&!a&&"active:bg-bg-secondary/40",n&&"opacity-50 cursor-not-allowed",u&&"border-border-error ring-2 ring-ring-error/30",a&&"ring-2 ring-ring-focus",A);return t.jsxs("div",{ref:N,className:"relative w-full",children:[t.jsxs("button",{ref:G,type:"button",role:"combobox","aria-expanded":a,"aria-haspopup":"listbox","aria-disabled":n??void 0,"aria-errormessage":u?"select-error":void 0,"aria-activedescendant":a&&i>=0?`${E}-option-${i}`:void 0,disabled:n,onClick:J,onKeyDown:B,className:F,children:[t.jsx("span",{className:p(!q&&"text-text-muted"),children:q?.label??m}),t.jsx("span",{className:p("ml-2 inline-block transition-transform duration-200",a&&"rotate-180"),"aria-hidden":"true",children:t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M4 6L8 10L12 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),u&&t.jsx("span",{id:"select-error",className:"text-sm text-text-error mt-1",children:"Please select an option"}),a&&t.jsx("div",{id:E,role:"listbox","aria-label":m,className:p(Q({variant:V}),"absolute z-50 mt-1 max-h-60 overflow-y-auto border-t-2 border-t-border-accent",!I&&"animate-dropdown-in",I&&"opacity-100"),children:c.map((e,r)=>t.jsx("div",{id:`${E}-option-${r}`,role:"option","aria-selected":e.value===g,"aria-disabled":e.disabled??void 0,"data-active":r===i,onClick:()=>K(e),onMouseEnter:()=>U(r),className:p(X({variant:V}),e.value===g&&"bg-bg-accent/10 font-semibold text-text-accent",e.disabled&&"opacity-40 cursor-not-allowed",r===i&&!e.disabled&&"bg-bg-secondary/80",!e.disabled&&"hover:bg-bg-secondary/60"),children:t.jsxs("span",{className:"flex items-center justify-between",children:[t.jsx("span",{children:e.label}),e.value===g&&t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"text-text-accent shrink-0 ml-2",children:t.jsx("path",{d:"M2.5 7L5.5 10L11.5 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})},e.value))})]})}const C=s.forwardRef(Z);C.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:"",defaultValue:{value:"[]",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const ne={title:"Components/Select",tags:["autodocs"],parameters:{layout:"padded"},component:C,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the select",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the select",control:"boolean"},error:{type:"boolean",description:"Show error state",control:"boolean"},placeholder:{type:"string",description:"Placeholder text when no option is selected",control:"text"}}},o=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"},{value:"solid",label:"SolidJS"}],v={args:{variant:"default",size:"md",placeholder:"Select a framework",disabled:!1,error:!1,options:o}},h={args:{variant:"muted",size:"md",placeholder:"Select a framework",options:o}},b={args:{variant:"ghost",size:"md",placeholder:"Select a framework",options:o}},x={args:{variant:"default",size:"sm",placeholder:"Small select",options:o.slice(0,3)}},S={args:{variant:"default",size:"md",placeholder:"Medium select",options:o}},w={args:{variant:"default",size:"lg",placeholder:"Large select",options:o}},y={args:{variant:"default",size:"md",placeholder:"Choose your preferred language",options:[{value:"ts",label:"TypeScript"},{value:"js",label:"JavaScript"},{value:"rust",label:"Rust"},{value:"go",label:"Go"}]}},k={name:"With Selected Value",args:{variant:"default",size:"md",placeholder:"Select a framework",options:o},render:d=>t.jsx(C,{...d,defaultValue:"react"})},z={name:"Error State",args:{variant:"default",size:"md",placeholder:"Select an option",error:!0,options:o}},j={args:{variant:"default",size:"md",placeholder:"Disabled select",disabled:!0,options:o}},O={name:"Controlled",parameters:{docs:{description:{story:"A select with controlled `value` and `onChange` props."}}},render:()=>{const[d,m]=s.useState("");return t.jsxs("div",{className:"w-64 space-y-4",children:[t.jsx(C,{variant:"default",size:"md",placeholder:"Select a framework",value:d,onChange:m,options:o}),t.jsxs("p",{className:"text-sm text-text-muted",children:["Selected: ",d||"none"]})]})}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    options: sampleOptions
  }
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    placeholder: 'Select a framework',
    options: sampleOptions
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm',
    placeholder: 'Small select',
    options: sampleOptions.slice(0, 3)
  }
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Medium select',
    options: sampleOptions
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg',
    placeholder: 'Large select',
    options: sampleOptions
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Error State',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    error: true,
    options: sampleOptions
  }
}`,...z.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};const le=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","WithPlaceholder","WithSelectedValue","ErrorState","Disabled","Controlled"];export{O as Controlled,v as Default,j as Disabled,z as ErrorState,b as Ghost,h as Muted,w as SizeLg,S as SizeMd,x as SizeSm,y as WithPlaceholder,k as WithSelectedValue,le as __namedExportsOrder,ne as default};
