import{r as s,j as t}from"./iframe-DKAX0yl9.js";import{a as N}from"./utils-H4fX6pm_.js";import{c as R}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const _=R("relative inline-flex shrink-0 cursor-pointer items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default",{variants:{variant:{default:"bg-bg-secondary border border-border-secondary",muted:"bg-bg-muted border border-border-muted"},size:{sm:"h-5 w-9 rounded-full",md:"h-6 w-11 rounded-full",lg:"h-7 w-14 rounded-full"}},defaultVariants:{variant:"default",size:"md"}}),K=R("pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200",{variants:{size:{sm:"h-3 w-3 translate-x-1",md:"h-4 w-4 translate-x-1.5",lg:"h-5 w-5 translate-x-2"}},defaultVariants:{size:"md"}});function $(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function B({variant:n="default",size:e="md",checked:w,defaultChecked:j=!1,disabled:r,readonly:o,onChange:l,className:q,children:O},I){const M=`toggle-track-${s.useId()}`,c=w!==void 0,[A,T]=s.useState(j),a=c?w:A,i=$(),E=s.useCallback(()=>{if(r||o)return;const d=!a;c||T(d),l?.(d)},[r,o,a,c,l]),L=s.useCallback(d=>{if(!(r||o)&&(d.key==="Enter"||d.key===" ")){d.preventDefault();const D=!a;c||T(D),l?.(D)}},[r,o,a,c,l]),V=N(_({variant:n,size:e}),a&&"bg-bg-success border-border-success",(r||o)&&"opacity-50 cursor-not-allowed",q),W=N(K({size:e}),i?"":"transition-transform duration-200",!i&&a?e==="sm"?"translate-x-[calc(100%+8px)]":e==="lg"?"translate-x-[calc(100%+16px)]":"translate-x-[calc(100%+10px)]":"",i&&a?e==="sm"?"!translate-x-[calc(100%+8px)]":e==="lg"?"!translate-x-[calc(100%+16px)]":"!translate-x-[calc(100%+10px)]":"");return t.jsxs("button",{ref:I,id:M,type:"button",role:"switch","aria-checked":a,"aria-disabled":r??o??void 0,disabled:r,onClick:E,onKeyDown:L,className:V,"data-checked":a,"data-reduced-motion":i,children:[t.jsx("span",{className:W,"aria-hidden":"true"}),O&&t.jsx("span",{className:"ml-2 text-sm text-text-default",children:O})]})}const S=s.forwardRef(B);S.__docgenInfo={description:"",methods:[],displayName:"Toggle",props:{checked:{required:!1,tsType:{name:"boolean"},description:""},defaultChecked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},readonly:{required:!1,tsType:{name:"boolean"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},variant:{defaultValue:{value:"'default'",computed:!1},required:!1},size:{defaultValue:{value:"'md'",computed:!1},required:!1}}};const Q={title:"Components/Toggle",tags:["autodocs"],parameters:{layout:"centered"},component:S,argTypes:{variant:{type:"string",description:"Visual style variant",options:["default","muted"],control:"select"},size:{type:"string",description:"Size of the toggle",options:["sm","md","lg"],control:"select"},disabled:{type:"boolean",description:"Disable the toggle",control:"boolean"},readonly:{type:"boolean",description:"Make the toggle read-only",control:"boolean"},checked:{type:"boolean",description:"Controlled checked state",control:"boolean"},defaultChecked:{type:"boolean",description:"Default checked state for uncontrolled toggle",control:"boolean"}}},u={args:{variant:"default",size:"md",disabled:!1,readonly:!1,defaultChecked:!1}},m={name:"On State",args:{variant:"default",size:"md",defaultChecked:!0}},p={name:"Off State",args:{variant:"default",size:"md",defaultChecked:!1}},f={args:{variant:"muted",size:"md"}},g={args:{variant:"default",size:"sm"}},h={args:{variant:"default",size:"md"}},b={args:{variant:"default",size:"lg"}},v={args:{variant:"default",size:"md",disabled:!0}},k={name:"Disabled (On)",args:{variant:"default",size:"md",disabled:!0,defaultChecked:!0}},x={args:{variant:"default",size:"md",readonly:!0}},y={name:"Readonly (On)",args:{variant:"default",size:"md",readonly:!0,defaultChecked:!0}},C={name:"Controlled",parameters:{docs:{description:{story:"A toggle with controlled `checked` and `onChange` props."}}},render:()=>{const[n,e]=s.useState(!1);return t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx(S,{variant:"default",size:"md",checked:n,onChange:e}),t.jsx("span",{className:"text-sm text-text-muted",children:n?"Enabled":"Disabled"})]})}},z={name:"With Label",parameters:{docs:{description:{story:"A toggle with a label using the children prop."}}},render:()=>{const[n,e]=s.useState(!1);return t.jsx("div",{className:"flex items-center gap-3",children:t.jsx(S,{variant:"default",size:"md",checked:n,onChange:e,children:"Accept terms and conditions"})})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    readonly: false,
    defaultChecked: false
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'On State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: true
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Off State',
  args: {
    variant: 'default',
    size: 'md',
    defaultChecked: false
  }
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'muted',
    size: 'md'
  }
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'sm'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'lg'
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    disabled: true
  }
}`,...v.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Disabled (On)',
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
    defaultChecked: true
  }
}`,...k.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    size: 'md',
    readonly: true
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Readonly (On)',
  args: {
    variant: 'default',
    size: 'md',
    readonly: true,
    defaultChecked: true
  }
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}};const U=["Default","On","Off","Muted","SizeSm","SizeMd","SizeLg","Disabled","DisabledOn","Readonly","ReadonlyOn","Controlled","WithLabel"];export{C as Controlled,u as Default,v as Disabled,k as DisabledOn,f as Muted,p as Off,m as On,x as Readonly,y as ReadonlyOn,b as SizeLg,h as SizeMd,g as SizeSm,z as WithLabel,U as __namedExportsOrder,Q as default};
