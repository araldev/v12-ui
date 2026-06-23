import{r as Y,j as _}from"./iframe-CBhECb85.js";import{a as K}from"./utils-H4fX6pm_.js";import{c as Z}from"./index-TF3_uIsJ.js";import"./preload-helper-D9Z9MdNV.js";const H=Z("size-text-button font-weight-button flex justify-center items-center hover:cursor-pointer disabled:opacity-50 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-inherit active:ring-active",{variants:{variant:{primary:"text-text-primary bg-bg-primary hover:bg-bg-primary-hover focus-visible:ring-border-primary",secondary:"text-text-secondary bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:ring-border-secondary",muted:"text-text-muted bg-bg-muted hover:bg-bg-muted-hover focus-visible:ring-border-muted",accent:"text-text-accent bg-bg-accent hover:bg-bg-accent-hover focus-visible:ring-border-accent",success:"text-text-success bg-bg-success hover:bg-bg-success-hover focus-visible:ring-border-success",warning:"text-text-warning bg-bg-warning hover:bg-bg-warning-hover focus-visible:ring-border-warning",error:"text-text-error bg-bg-error hover:bg-bg-error-hover focus-visible:ring-border-error",info:"text-text-info bg-bg-info hover:bg-bg-info-hover focus-visible:ring-border-info",ghost:"text-text-ghost bg-bg-ghost hover:bg-bg-ghost-hover focus-visible:ring-border-ghost"},border:{true:"border-1"},shadow:{none:"shadow-none",default:"shadow-shadow-primary",success:"shadow-shadow-success",warning:"shadow-shadow-warning",error:"shadow-shadow-error",info:"shadow-shadow-info"},rounded:{none:"rounded-none",sm:"rounded-sm",md:"rounded-md",lg:"rounded-lg",pill:"rounded-4xl",circle:"rounded-full aspect-square"},size:{sm:"px-3 py-1 min-w-20 h-9",md:"px-6 py-2 min-w-30 h-11",lg:"px-10 py-3 min-w-35 h-14",fit:"px-8 py-3 w-fit h-fit",full:"px-10 py-3 w-full h-14"}},compoundVariants:[{variant:"primary",border:!0,shadow:"default",className:"border-border-primary hover:border-border-primary-hover"},{variant:"secondary",border:!0,className:"border-border-secondary hover:border-border-secondary-hover"},{variant:"muted",border:!0,className:"border-border-muted"},{variant:"accent",border:!0,className:"border-border-accent hover:border-border-accent-hover"},{variant:"success",border:!0,shadow:"default",className:"border-border-success hover:border-border-success-hover"},{variant:"warning",border:!0,shadow:"default",className:"border-border-warning hover:border-border-warning-hover"},{variant:"error",border:!0,shadow:"default",className:"border-border-error hover:border-border-error-hover"},{variant:"info",border:!0,shadow:"default",className:"border-border-info hover:border-border-info-hover"},{variant:"ghost",border:!0,className:"border-border-ghost hover:border-border-ghost-hover"}],defaultVariants:{variant:"primary",border:!0,shadow:"none",rounded:"pill",size:"fit"}});function rr(V,L){const{as:U,disabled:r,children:M,variant:W,border:k,shadow:q,rounded:P,size:C,className:G,href:$,target:J,rel:Q,...j}=V,X=U==="a";function F(e){const A=e.currentTarget;!A||A.tagName==="BUTTON"||(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),A.click())}return X?_.jsx("a",{role:"button",href:$,target:J,rel:Q,tabIndex:r?-1:0,onKeyDown:F,ref:L,...j,className:K(H({variant:W,border:k,shadow:q,rounded:P,size:C}),r&&"bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled",G),children:M}):_.jsx("button",{disabled:r,"aria-disabled":r?!0:void 0,tabIndex:r?-1:0,onKeyDown:F,ref:L,...j,className:K(H({variant:W,border:k,shadow:q,rounded:P,size:C}),r&&"bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled",G),children:M})}const O=Y.forwardRef(rr);O.__docgenInfo={description:"",methods:[],displayName:"Button",props:{disabled:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const nr={title:"Components/Button",tags:["autodocs"],parameters:{layout:"centered"},component:O,argTypes:{as:{type:"string",description:"HTMLButtonElement / HTMLAnchorElement",options:["button","a"],control:"select"},children:{description:"The button label",control:"text"},variant:{type:"string",options:["primary","secondary","muted","accent","success","warning","error","info","ghost"],control:"select",description:"Colors variants"},border:{type:"boolean",description:"Button border",control:"boolean"},shadow:{type:"string",description:"box-shadow",options:["default","success","warning","error","info"],control:"select"},rounded:{type:"string",description:"border-radius",options:["none","sm","md","lg","pill","circle"],control:"select"},size:{type:"string",description:"Button size",options:["sm","md","lg","fit","full"],control:"select"},disabled:{type:"boolean",description:"To disable the button",control:"boolean"},className:{type:"string",description:"Add your own styles",control:"text"},href:{type:"string",description:'Required when as="a". Empty string for button variants.'}}},o={args:{as:"button",href:"",children:"Button",variant:"primary",border:!0,shadow:"default",rounded:"pill",size:"fit",disabled:!1,className:""}},s={args:{children:"Primary",variant:"primary"}},a={args:{children:"Secondary",variant:"secondary"}},n={args:{children:"Muted",variant:"muted"}},t={args:{children:"Accent",variant:"accent"}},d={args:{children:"Success",variant:"success"}},c={args:{children:"Warning",variant:"warning"}},i={args:{children:"Error",variant:"error"}},l={args:{children:"Info",variant:"info"}},u={args:{children:"Ghost",variant:"ghost"}},m={args:{children:"Border",border:!0}},p={args:{children:"Shadow Default",shadow:"default"}},g={args:{children:"Shadow Success",shadow:"success"}},h={args:{children:"Shadow Warning",shadow:"warning"}},b={args:{children:"Shadow Error",shadow:"error"}},f={args:{children:"Shadow Info",shadow:"info"}},v={args:{children:"Size sm",size:"sm"}},w={args:{children:"Size md",size:"md"}},S={args:{children:"Size lg",size:"lg"}},y={args:{children:"Size fit",size:"fit"}},x={args:{children:"Size full",size:"full"}},z={args:{children:"Button disabled",disabled:!0}},R={name:'As Link (as="a")',parameters:{docs:{description:{story:'When `as="a"` is set, the Button renders as an anchor (`<a>`) element and `href` becomes required. The Controls panel will dynamically show the `href` field when `as` is set to `a`.'}}},args:{as:"a",href:"https://example.com",children:"Go to Example",variant:"primary"}},N={args:{children:"Rounded none",rounded:"none"}},B={args:{children:"Rounded sm",rounded:"sm"}},E={args:{children:"Rounded md",rounded:"md"}},T={args:{children:"Rounded lg",rounded:"lg"}},D={args:{children:"Rounded pill",rounded:"pill"}},I={args:{children:"Rounded circle",rounded:"circle"}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'button',
    href: '',
    children: 'Button',
    variant: 'primary',
    border: true,
    shadow: 'default',
    rounded: 'pill',
    size: 'fit',
    disabled: false,
    className: ''
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Primary',
    variant: 'primary'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Muted',
    variant: 'muted'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Accent',
    variant: 'accent'
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Success',
    variant: 'success'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    variant: 'warning'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Error',
    variant: 'error'
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    variant: 'info'
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Border',
    border: true
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Default',
    shadow: 'default'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Success',
    shadow: 'success'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Warning',
    shadow: 'warning'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Error',
    shadow: 'error'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Info',
    shadow: 'info'
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size sm',
    size: 'sm'
  }
}`,...v.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size md',
    size: 'md'
  }
}`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size lg',
    size: 'lg'
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size fit',
    size: 'fit'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size full',
    size: 'full'
  }
}`,...x.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button disabled',
    disabled: true
  }
}`,...z.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'As Link (as="a")',
  parameters: {
    docs: {
      description: {
        story: 'When \`as="a"\` is set, the Button renders as an anchor (\`<a>\`) element and \`href\` becomes required. The Controls panel will dynamically show the \`href\` field when \`as\` is set to \`a\`.'
      }
    }
  },
  args: {
    as: 'a',
    href: 'https://example.com',
    children: 'Go to Example',
    variant: 'primary'
  }
}`,...R.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded none',
    rounded: 'none'
  }
}`,...N.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded sm',
    rounded: 'sm'
  }
}`,...B.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded md',
    rounded: 'md'
  }
}`,...E.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded lg',
    rounded: 'lg'
  }
}`,...T.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded pill',
    rounded: 'pill'
  }
}`,...D.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded circle',
    rounded: 'circle'
  }
}`,...I.parameters?.docs?.source}}};const tr=["Default","Primary","Secondary","Muted","Accent","Success","Warning","Error","Info","Ghost","Border","ShadowDefault","ShadowSuccess","ShadowWarning","ShadowError","ShadowInfo","SizeSm","SizeMd","SizeLg","SizeFit","SizeFull","Disabled","AsLink","RoundedNone","RoundedSm","RoundedMd","RoundedLg","RoundedPill","RoundedCircle"];export{t as Accent,R as AsLink,m as Border,o as Default,z as Disabled,i as Error,u as Ghost,l as Info,n as Muted,s as Primary,I as RoundedCircle,T as RoundedLg,E as RoundedMd,N as RoundedNone,D as RoundedPill,B as RoundedSm,a as Secondary,p as ShadowDefault,b as ShadowError,f as ShadowInfo,g as ShadowSuccess,h as ShadowWarning,y as SizeFit,x as SizeFull,S as SizeLg,w as SizeMd,v as SizeSm,d as Success,c as Warning,tr as __namedExportsOrder,nr as default};
