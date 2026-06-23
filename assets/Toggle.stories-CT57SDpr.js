import{r as s,j as t}from"./iframe-BKjetbkf.js";import{a as N}from"./utils-H4fX6pm_.js";import{c as R}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const W=R("relative inline-flex shrink-0 cursor-pointer items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default",{variants:{variant:{default:"bg-bg-secondary border border-border-secondary",muted:"bg-bg-muted border border-border-muted"},size:{sm:"h-5 w-9 rounded-full",md:"h-6 w-11 rounded-full",lg:"h-7 w-14 rounded-full"}},defaultVariants:{variant:"default",size:"md"}}),K=R("pointer-events-none inline-block rounded-full bg-white transition-transform duration-200",{variants:{size:{sm:"h-3 w-3 shadow-[0_1px_2px_rgba(0,0,0,0.25)]",md:"h-4 w-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]",lg:"h-5 w-5 shadow-[0_1px_4px_rgba(0,0,0,0.35)]"}},defaultVariants:{size:"md"}});function $(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function B({variant:n="default",size:e="md",checked:S,defaultChecked:_=!1,disabled:r,readonly:o,onChange:i,className:j,children:w},q){const I=`toggle-track-${s.useId()}`,c=S!==void 0,[M,O]=s.useState(_),a=c?S:M,T=$(),A=s.useCallback(()=>{if(r||o)return;const d=!a;c||O(d),i?.(d)},[r,o,a,c,i]),E=s.useCallback(d=>{if(!(r||o)&&(d.key==="Enter"||d.key===" ")){d.preventDefault();const D=!a;c||O(D),i?.(D)}},[r,o,a,c,i]),L=N(W({variant:n,size:e}),a&&"bg-bg-success border-border-success",(r||o)&&"opacity-50 cursor-not-allowed",j),V=N(K({size:e}),T?"":"transition-transform duration-200",a?e==="sm"?"translate-x-[20px]":e==="lg"?"translate-x-[32px]":"translate-x-[24px]":"translate-x-1");return t.jsxs("button",{ref:q,id:I,type:"button",role:"switch","aria-checked":a,"aria-disabled":r??o??void 0,disabled:r,onClick:A,onKeyDown:E,className:L,"data-checked":a,"data-reduced-motion":T,children:[t.jsx("span",{className:V,"aria-hidden":"true"}),w&&t.jsx("span",{className:"ml-2 text-sm text-text-default",children:w})]})}const z=s.forwardRef(B);z.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{checked:{required:!1,tsType:{name:"boolean"},description:""},defaultChecked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},readonly:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const Q={title:"Components/Toggle",tags:["autodocs"],parameters:{layout:"centered"},component:z,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted"],control:"select"},size:{type:"string",description:"Size of the toggle",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the toggle",control:"boolean"},readonly:{type:"boolean",description:"Make the toggle read-only",control:"boolean"},checked:{type:"boolean",description:"Controlled checked state",control:"boolean"},defaultChecked:{type:"boolean",description:"Default checked state for uncontrolled toggle",control:"boolean"}}},l={args:{variant:"default",size:"md",disabled:!1,readonly:!1,defaultChecked:!1}},u={name:"On State",args:{variant:"default",size:"md",defaultChecked:!0}},m={name:"Off State",args:{variant:"default",size:"md",defaultChecked:!1}},p={args:{variant:"muted",size:"md"}},f={args:{variant:"default",size:"sm"}},g={args:{variant:"default",size:"md"}},h={args:{variant:"default",size:"lg"}},b={args:{variant:"default",size:"md",disabled:!0}},v={name:"Disabled (On)",args:{variant:"default",size:"md",disabled:!0,defaultChecked:!0}},k={args:{variant:"default",size:"md",readonly:!0}},x={name:"Readonly (On)",args:{variant:"default",size:"md",readonly:!0,defaultChecked:!0}},y={name:"Controlled",parameters:{docs:{description:{story:"A toggle with controlled `checked` and `onChange` props."}}},render:()=>{const[n,e]=s.useState(!1);return t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx(z,{variant:"default",size:"md",checked:n,onChange:e}),t.jsx("span",{className:"text-sm text-text-muted",children:n?"Enabled":"Disabled"})]})}},C={name:"With Label",parameters:{docs:{description:{story:"A toggle with a label using the children prop."}}},render:()=>{const[n,e]=s.useState(!1);return t.jsx("div",{className:"flex items-center gap-3",children:t.jsx(z,{variant:"default",size:"md",checked:n,onChange:e,children:"Accept terms and conditions"})})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    readonly: false,
    defaultChecked: false
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'On State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: true
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Off State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: false
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md'
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm'
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: true
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Disabled (On)',
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
    defaultChecked: true
  }
}`,...v.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    readonly: true
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Readonly (On)',
  args: {
    variant: 'default',
    size: 'md',
    readonly: true,
    defaultChecked: true
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  parameters: {
    docs: {
      description: {
        story: 'A toggle with controlled \`checked\` and \`onChange\` props.'
      }
    }
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return <div className="flex items-center gap-3">
        <Toggle variant="default" size="md" checked={checked} onChange={setChecked} />
        <span className="text-sm text-text-muted">
          {checked ? 'Enabled' : 'Disabled'}
        </span>
      </div>;
  }
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'With Label',
  parameters: {
    docs: {
      description: {
        story: 'A toggle with a label using the children prop.'
      }
    }
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return <div className="flex items-center gap-3">
        <Toggle variant="default" size="md" checked={checked} onChange={setChecked}>
          Accept terms and conditions
        </Toggle>
      </div>;
  }
}`,...C.parameters?.docs?.source}}};const U=["Default","On","Off","Muted","SizeSm","SizeMd","SizeLg","Disabled","DisabledOn","Readonly","ReadonlyOn","Controlled","WithLabel"];export{y as Controlled,l as Default,b as Disabled,v as DisabledOn,p as Muted,m as Off,u as On,k as Readonly,x as ReadonlyOn,h as SizeLg,g as SizeMd,f as SizeSm,C as WithLabel,U as __namedExportsOrder,Q as default};
