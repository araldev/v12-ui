import{r as s,j as t}from"./iframe-BsOeIXpe.js";import{a as p}from"./utils-H4fX6pm_.js";import{c as L}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const Q=L("w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default transition-colors duration-200",{variants:{variant:{default:"bg-bg-default border border-border-default text-text-default",muted:"bg-bg-muted border border-border-muted text-text-muted",ghost:"bg-bg-ghost border border-border-ghost text-text-ghost"},size:{sm:"text-sm py-2 px-3 min-h-9 rounded-md",md:"text-base py-3 px-4 min-h-11 rounded-lg",lg:"text-lg py-4 px-5 min-h-14 rounded-xl"}},defaultVariants:{variant:"default",size:"md"}}),X=L("w-full border border-border-default",{variants:{variant:{default:"bg-bg-default shadow-shadow-lg rounded-lg",muted:"bg-bg-muted shadow-shadow-md rounded-lg",ghost:"bg-bg-ghost shadow-shadow-md rounded-lg"}},defaultVariants:{variant:"default"}}),Y=L("cursor-pointer px-4 py-3 text-base transition-colors duration-100",{variants:{variant:{default:"text-text-default hover:bg-bg-secondary/60",muted:"text-text-muted hover:bg-bg-secondary/60",ghost:"text-text-ghost hover:bg-bg-secondary/60"}},defaultVariants:{variant:"default"}});function Z(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ee({options:n=[],placeholder:f="Select an option",variant:V="default",size:W="md",disabled:l,error:u,value:q,defaultValue:A,onChange:g,className:$,children:G},P){const D=`select-listbox-${s.useId()}`,[r,i]=s.useState(!1),[d,T]=s.useState(0),[_,J]=s.useState(A??""),M=s.useRef(null),E=q!==void 0,h=E?q:_,c=G?[]:n,I=c.find(e=>e.value===h),R=Z(),B=s.useCallback(()=>{l||i(e=>!e)},[l]),K=s.useCallback(e=>{if(!l)switch(e.key){case"ArrowDown":e.preventDefault(),r?T(a=>Math.min(a+1,c.length-1)):i(!0);break;case"ArrowUp":e.preventDefault(),r&&T(a=>Math.max(a-1,0));break;case"Enter":if(e.preventDefault(),r&&c[d]){const a=c[d];a.disabled||(g?.(a.value),i(!1))}else i(!0);break;case"Escape":e.preventDefault(),i(!1);break;case"Tab":i(!1);break}},[l,r,c,d,g]),U=s.useCallback(e=>{e.disabled||(E||J(e.value),g?.(e.value),i(!1))},[E,g]),F=s.useCallback(e=>{T(e)},[]);s.useEffect(()=>{if(!r)return;const e=a=>{M.current&&!M.current.contains(a.target)&&i(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[r]);const H=p(Q({variant:V,size:W}),!l&&!u&&"hover:border-border-input-hover",!l&&!u&&!r&&"active:bg-bg-secondary/40",l&&"opacity-50 cursor-not-allowed",u&&"border-border-error ring-2 ring-ring-error/30",r&&"ring-2 ring-ring-focus",$);return t.jsxs("div",{ref:M,className:"relative w-full",children:[t.jsxs("button",{ref:P,type:"button",role:"combobox","aria-expanded":r,"aria-haspopup":"listbox","aria-disabled":l??void 0,"aria-errormessage":u?"select-error":void 0,"aria-activedescendant":r&&d>=0?`${D}-option-${d}`:void 0,disabled:l,onClick:B,onKeyDown:K,className:H,children:[t.jsx("span",{className:p(!I&&"text-text-muted"),children:I?.label??f}),t.jsx("span",{className:p("ml-2 inline-block transition-transform duration-200",r&&"rotate-180"),"aria-hidden":"true",children:t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{d:"M4 6L8 10L12 6",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),u&&t.jsx("span",{id:"select-error",className:"text-sm text-text-error mt-1",children:"Please select an option"}),r&&t.jsx("div",{id:D,role:"listbox","aria-label":f,className:p(X({variant:V}),"absolute z-50 mt-1 max-h-60 overflow-y-auto border-t-2 border-t-border-accent",!R&&"animate-dropdown-in",R&&"opacity-100"),children:c.map((e,a)=>t.jsx("div",{id:`${D}-option-${a}`,role:"option","aria-selected":e.value===h,"aria-disabled":e.disabled??void 0,"data-active":a===d,onClick:()=>U(e),onMouseEnter:()=>F(a),className:p(Y({variant:V}),e.value===h&&"bg-bg-accent/10 font-semibold text-text-accent",e.disabled&&"opacity-40 cursor-not-allowed",a===d&&!e.disabled&&"bg-bg-secondary/80",!e.disabled&&"hover:bg-bg-secondary/60"),children:t.jsxs("span",{className:"flex items-center justify-between",children:[t.jsx("span",{children:e.label}),e.value===h&&t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"text-text-accent shrink-0 ml-2",children:t.jsx("path",{d:"M2.5 7L5.5 10L11.5 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})},e.value))})]})}const m=s.forwardRef(ee);m.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!1,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:"",defaultValue:{value:"[]",computed:!1}},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},error:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const le={title:"Components/Select",tags:["autodocs"],parameters:{layout:"padded",chromatic:{viewports:[1280]}},component:m,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted","ghost"],control:"select"},size:{type:"string",description:"Size of the select",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the select",control:"boolean"},error:{type:"boolean",description:"Show error state",control:"boolean"},placeholder:{type:"string",description:"Placeholder text when no option is selected",control:"text"}}},o=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"},{value:"solid",label:"SolidJS"}],v={args:{variant:"default",size:"md",placeholder:"Select a framework",disabled:!1,error:!1,options:o},decorators:[n=>t.jsx("div",{className:"min-h-48",children:t.jsx(n,{})})]},b={args:{variant:"muted",size:"md",placeholder:"Select a framework",options:o}},x={args:{variant:"ghost",size:"md",placeholder:"Select a framework",options:o}},S={args:{variant:"default",size:"sm",placeholder:"Small select",options:o.slice(0,3)}},w={args:{variant:"default",size:"md",placeholder:"Medium select",options:o}},y={args:{variant:"default",size:"lg",placeholder:"Large select",options:o}},k={args:{variant:"default",size:"md",placeholder:"Choose your preferred language",options:[{value:"ts",label:"TypeScript"},{value:"js",label:"JavaScript"},{value:"rust",label:"Rust"},{value:"go",label:"Go"}]}},z={name:"With Selected Value",args:{variant:"default",size:"md",placeholder:"Select a framework",options:o},render:n=>t.jsx(m,{...n,defaultValue:"react"})},j={name:"Error State",args:{variant:"default",size:"md",placeholder:"Select an option",error:!0,options:o}},O={args:{variant:"default",size:"md",placeholder:"Disabled select",disabled:!0,options:o}},C={name:"Open Dropdown (for animation test)",parameters:{layout:"padded",docs:{description:{story:"This story renders the select in a tall container (min-h-96) so the dropdown has room to open and the animation is visible. Click the trigger to open."}}},decorators:[n=>t.jsxs("div",{className:"min-h-96 pt-8",children:[t.jsx("p",{className:"mb-4 text-sm text-text-muted",children:"Scroll the canvas to test the dropdown stays anchored while scrolling."}),t.jsx("div",{className:"w-72",children:t.jsx(n,{})})]})],render:()=>t.jsx(m,{variant:"default",size:"md",placeholder:"Select a framework",options:o})},N={name:"Controlled",parameters:{docs:{description:{story:"A select with controlled `value` and `onChange` props."}}},render:()=>{const[n,f]=s.useState("");return t.jsxs("div",{className:"w-64 space-y-4",children:[t.jsx(m,{variant:"default",size:"md",placeholder:"Select a framework",value:n,onChange:f,options:o}),t.jsxs("p",{className:"text-sm text-text-muted",children:["Selected: ",n||"none"]})]})}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select a framework',
    disabled: false,
    error: false,
    options: sampleOptions
  },
  decorators: [Story => <div className="min-h-48">
        <Story />
      </div>]
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Error State',
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Select an option',
    error: true,
    options: sampleOptions
  }
}`,...j.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Disabled select',
    disabled: true,
    options: sampleOptions
  }
}`,...O.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Open Dropdown (for animation test)',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'This story renders the select in a tall container (min-h-96) so the dropdown has room to open and the animation is visible. Click the trigger to open.'
      }
    }
  },
  decorators: [Story => <div className="min-h-96 pt-8">
        <p className="mb-4 text-sm text-text-muted">
          Scroll the canvas to test the dropdown stays anchored while scrolling.
        </p>
        <div className="w-72">
          <Story />
        </div>
      </div>],
  render: () => <Select variant="default" size="md" placeholder="Select a framework" options={sampleOptions} />
}`,...C.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};const ie=["Default","Muted","Ghost","SizeSm","SizeMd","SizeLg","WithPlaceholder","WithSelectedValue","ErrorState","Disabled","OpenDropdown","Controlled"];export{N as Controlled,v as Default,O as Disabled,j as ErrorState,x as Ghost,b as Muted,C as OpenDropdown,y as SizeLg,w as SizeMd,S as SizeSm,k as WithPlaceholder,z as WithSelectedValue,ie as __namedExportsOrder,le as default};
