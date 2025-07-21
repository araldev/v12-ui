import{j as $}from"./jsx-runtime-D_zvdyIk.js";import{r as J}from"./iframe-CDgvuNHM.js";import{c as Q,a as X}from"./utils-H4fX6pm_.js";const K=s=>typeof s=="boolean"?`${s}`:s===0?"0":s,H=Q,Y=(s,o)=>r=>{var u;if(o?.variants==null)return H(s,r?.class,r?.className);const{variants:l,defaultVariants:d}=o,_=Object.keys(l).map(e=>{const a=r?.[e],n=d?.[e];if(a===null)return null;const t=K(a)||K(n);return l[e][t]}),m=r&&Object.entries(r).reduce((e,a)=>{let[n,t]=a;return t===void 0||(e[n]=t),e},{}),q=o==null||(u=o.compoundVariants)===null||u===void 0?void 0:u.reduce((e,a)=>{let{class:n,className:t,...F}=a;return Object.entries(F).every(c=>{let[i,G]=c;return Array.isArray(G)?G.includes({...d,...m}[i]):{...d,...m}[i]===G})?[...e,n,t]:e},[]);return H(s,_,q,r?.class,r?.className)},Z=Y("size-text-button font-weight-button flex justify-center items-center hover:cursor-pointer disabled:opacity-50 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-inherit active:ring-active",{variants:{variant:{primary:"text-text-primary bg-bg-primary hover:bg-bg-primary-hover focus-visible:ring-border-primary",secondary:"text-text-secondary bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:ring-border-secondary",muted:"text-text-muted bg-bg-muted hover:bg-bg-muted-hover focus-visible:ring-border-muted",accent:"text-text-accent bg-bg-accent hover:bg-bg-accent-hover focus-visible:ring-border-accent",success:"text-text-success bg-bg-success hover:bg-bg-success-hover focus-visible:ring-border-success",warning:"text-text-warning bg-bg-warning hover:bg-bg-warning-hover focus-visible:ring-border-warning",error:"text-text-error bg-bg-error hover:bg-bg-error-hover focus-visible:ring-border-error",info:"text-text-info bg-bg-info hover:bg-bg-info-hover focus-visible:ring-border-info",ghost:"text-text-ghost bg-bg-ghost hover:bg-bg-ghost-hover focus-visible:ring-border-ghost"},border:{true:"border-1"},shadow:{default:"shadow-custom-lg",success:"shadow-shadow-success",warning:"shadow-shadow-warning",error:"shadow-shadow-error",info:"shadow-shadow-info"},rounded:{none:"rounded-none",sm:"rounded-sm",md:"rounded-md",lg:"rounded-lg",pill:"rounded-4xl",circle:"rounded-full aspect-square"},size:{sm:"px-3 py-1 w-20 h-9",md:"px-6 py-2 w-30 h-11",lg:"px-10 py-3 w-35 h-14",fit:"px-8 py-3 w-fit h-fit",full:"px-10 py-3 w-full h-14"}},compoundVariants:[{variant:"primary",border:!0,className:"border-border-primary hover:border-primary-hover"},{variant:"secondary",border:!0,className:"border-border-secondary hover:border-secondary-hover"},{variant:"muted",border:!0,className:"border-border-muted"},{variant:"accent",border:!0,className:"border-border-accent hover:border-accent-hover"},{variant:"success",border:!0,className:"border-border-success hover:border-success-hover"},{variant:"warning",border:!0,className:"border-border-warning hover:border-warning-hover"},{variant:"error",border:!0,className:"border-border-error hover:border-error-hover"},{variant:"info",border:!0,className:"border-border-info hover:border-info-hover"},{variant:"ghost",border:!0,className:"border-border-ghost hover:border-ghost-hover"}],defaultVariants:{variant:"primary",border:!0,shadow:"default",rounded:"pill",size:"fit"}});function rr({as:s,disabled:o,children:r,variant:u,border:l,shadow:d,rounded:_,size:m,className:q,...e},a){const n=s||"button",t=n==="button";function F(c){const i=c.currentTarget;!i||i.tagName==="BUTTON"||(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),i.click())}return $.jsx(n,{role:t?void 0:"button",tabIndex:o?-1:0,onKeyDown:F,ref:a,"aria-disabled":o,className:X(Z({variant:u,border:l,shadow:d,rounded:_,size:m}),o&&"bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled",q),...e,children:r})}const U=J.forwardRef(rr);U.__docgenInfo={description:"",methods:[],displayName:"Button",props:{as:{required:!1,tsType:{name:"T"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const ar={title:"Components/Button",tags:["autodocs"],parameters:{layout:"centered"},component:U,argTypes:{as:{type:"string",description:"HTMLButtonElement / HTMLAnchorElement",options:["button","a"],control:"select"},children:{description:"The button label",control:"text"},variant:{type:"string",options:["primary","secondary","muted","accent","success","warning","error","info","ghost"],control:"select",description:"Colors variants"},border:{type:"boolean",description:"Button border",control:"boolean"},shadow:{type:"string",description:"box-shadow",options:["default","success","warning","error","info"],control:"select"},rounded:{type:"string",description:"border-radius",options:["none","sm","md","lg","pill","circle"],control:"select"},size:{type:"string",description:"Button size",options:["sm","md","lg","fit","full"],control:"select"},disabled:{type:"boolean",description:"To disable the button",control:"boolean"},className:{type:"string",description:"Add your own styles",control:"text"}}},g={args:{as:"button",children:"Button",variant:"primary",border:!0,shadow:"default",rounded:"pill",size:"fit",disabled:!1,className:""}},p={args:{children:"Primary",variant:"primary"}},h={args:{children:"Secondary",variant:"secondary"}},b={args:{children:"Muted",variant:"muted"}},v={args:{children:"Accent",variant:"accent"}},f={args:{children:"Success",variant:"success"}},S={args:{children:"Warning",variant:"warning"}},w={args:{children:"Error",variant:"error"}},y={args:{children:"Info",variant:"info"}},x={args:{children:"Ghost",variant:"ghost"}},z={args:{children:"Border",border:!0}},N={args:{children:"Shadow Default",shadow:"default"}},R={args:{children:"Shadow Success",shadow:"success"}},B={args:{children:"Shadow Warning",shadow:"warning"}},E={args:{children:"Shadow Error",shadow:"error"}},T={args:{children:"Shadow Info",shadow:"info"}},D={args:{children:"Size sm",size:"sm"}},I={args:{children:"Size md",size:"md"}},C={args:{children:"Size lg",size:"lg"}},M={args:{children:"Size fit",size:"fit"}},V={args:{children:"Size full",size:"full"}},W={args:{children:"Button disabled",disabled:!0}},A={args:{children:"Rounded none",rounded:"none"}},P={args:{children:"Rounded sm",rounded:"sm"}},j={args:{children:"Rounded md",rounded:"md"}},k={args:{children:"Rounded lg",rounded:"lg"}},L={args:{children:"Rounded pill",rounded:"pill"}},O={args:{children:"Rounded circle",rounded:"circle"}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'button',
    children: 'Button',
    variant: 'primary',
    border: true,
    shadow: 'default',
    rounded: 'pill',
    size: 'fit',
    disabled: false,
    className: ''
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Primary',
    variant: 'primary'
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Muted',
    variant: 'muted'
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Accent',
    variant: 'accent'
  }
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Success',
    variant: 'success'
  }
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    variant: 'warning'
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Error',
    variant: 'error'
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    variant: 'info'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}`,...x.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Border',
    border: true
  }
}`,...z.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Default',
    shadow: 'default'
  }
}`,...N.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Success',
    shadow: 'success'
  }
}`,...R.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Warning',
    shadow: 'warning'
  }
}`,...B.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Error',
    shadow: 'error'
  }
}`,...E.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Info',
    shadow: 'info'
  }
}`,...T.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size sm',
    size: 'sm'
  }
}`,...D.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size md',
    size: 'md'
  }
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size lg',
    size: 'lg'
  }
}`,...C.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size fit',
    size: 'fit'
  }
}`,...M.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size full',
    size: 'full'
  }
}`,...V.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button disabled',
    disabled: true
  }
}`,...W.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded none',
    rounded: 'none'
  }
}`,...A.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded sm',
    rounded: 'sm'
  }
}`,...P.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded md',
    rounded: 'md'
  }
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded lg',
    rounded: 'lg'
  }
}`,...k.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded pill',
    rounded: 'pill'
  }
}`,...L.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded circle',
    rounded: 'circle'
  }
}`,...O.parameters?.docs?.source}}};const nr=["Default","Primary","Secondary","Muted","Accent","Success","Warning","Error","Info","Ghost","Border","ShadowDefault","ShadowSuccess","ShadowWarning","ShadowError","ShadowInfo","SizeSm","SizeMd","SizeLg","SizeFit","SizeFull","Disabled","RoundedNone","RoundedSm","RoundedMd","RoundedLg","RoundedPill","RoundedCircle"];export{v as Accent,z as Border,g as Default,W as Disabled,w as Error,x as Ghost,y as Info,b as Muted,p as Primary,O as RoundedCircle,k as RoundedLg,j as RoundedMd,A as RoundedNone,L as RoundedPill,P as RoundedSm,h as Secondary,N as ShadowDefault,E as ShadowError,T as ShadowInfo,R as ShadowSuccess,B as ShadowWarning,M as SizeFit,V as SizeFull,C as SizeLg,I as SizeMd,D as SizeSm,f as Success,S as Warning,nr as __namedExportsOrder,ar as default};
