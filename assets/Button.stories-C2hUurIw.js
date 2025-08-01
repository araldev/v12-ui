import{j as O}from"./jsx-runtime-DMOFQCl-.js";import{r as V}from"./iframe-D_ZT9CJH.js";import{c as U}from"./utils-BKj_NWD_.js";import{c as $}from"./index-8U3F9cw_.js";const J=$("size-text-button font-weight-button flex justify-center items-center hover:cursor-pointer disabled:opacity-50 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-inherit active:ring-active",{variants:{variant:{primary:"text-text-primary bg-bg-primary hover:bg-bg-primary-hover focus-visible:ring-border-primary",secondary:"text-text-secondary bg-bg-secondary hover:bg-bg-secondary-hover focus-visible:ring-border-secondary",muted:"text-text-muted bg-bg-muted hover:bg-bg-muted-hover focus-visible:ring-border-muted",accent:"text-text-accent bg-bg-accent hover:bg-bg-accent-hover focus-visible:ring-border-accent",success:"text-text-success bg-bg-success hover:bg-bg-success-hover focus-visible:ring-border-success",warning:"text-text-warning bg-bg-warning hover:bg-bg-warning-hover focus-visible:ring-border-warning",error:"text-text-error bg-bg-error hover:bg-bg-error-hover focus-visible:ring-border-error",info:"text-text-info bg-bg-info hover:bg-bg-info-hover focus-visible:ring-border-info",ghost:"text-text-ghost bg-bg-ghost hover:bg-bg-ghost-hover focus-visible:ring-border-ghost"},border:{true:"border-1"},shadow:{default:"shadow-custom-lg",success:"shadow-shadow-success",warning:"shadow-shadow-warning",error:"shadow-shadow-error",info:"shadow-shadow-info"},rounded:{none:"rounded-none",sm:"rounded-sm",md:"rounded-md",lg:"rounded-lg",pill:"rounded-4xl",circle:"rounded-full aspect-square"},size:{sm:"px-3 py-1 w-20 h-9",md:"px-6 py-2 w-30 h-11",lg:"px-10 py-3 w-35 h-14",fit:"px-8 py-3 w-fit h-fit",full:"px-10 py-3 w-full h-14"}},compoundVariants:[{variant:"primary",border:!0,className:"border-border-primary hover:border-primary-hover"},{variant:"secondary",border:!0,className:"border-border-secondary hover:border-secondary-hover"},{variant:"muted",border:!0,className:"border-border-muted"},{variant:"accent",border:!0,className:"border-border-accent hover:border-accent-hover"},{variant:"success",border:!0,className:"border-border-success hover:border-success-hover"},{variant:"warning",border:!0,className:"border-border-warning hover:border-warning-hover"},{variant:"error",border:!0,className:"border-border-error hover:border-error-hover"},{variant:"info",border:!0,className:"border-border-info hover:border-info-hover"},{variant:"ghost",border:!0,className:"border-border-ghost hover:border-ghost-hover"}],defaultVariants:{variant:"primary",border:!0,shadow:"default",rounded:"pill",size:"fit"}});function Q({as:A,disabled:D,children:L,variant:P,border:q,shadow:C,rounded:j,size:F,className:G,..._},k){const M=A||"button",H=M==="button";function K(r){const I=r.currentTarget;!I||I.tagName==="BUTTON"||(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),I.click())}return O.jsx(M,{role:H?void 0:"button",tabIndex:D?-1:0,onKeyDown:K,ref:k,"aria-disabled":D,..._,className:U(J({variant:P,border:q,shadow:C,rounded:j,size:F}),D&&"bg-bg-disabled hover:cursor-not-allowed hover:bg-bg-disabled border-border-disabled",G),children:L})}const W=V.forwardRef(Q);W.__docgenInfo={description:"",methods:[],displayName:"Button",props:{as:{required:!1,tsType:{name:"T"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const er={title:"Components/Button",tags:["autodocs"],parameters:{layout:"centered"},component:W,argTypes:{as:{type:"string",description:"HTMLButtonElement / HTMLAnchorElement",options:["button","a"],control:"select"},children:{description:"The button label",control:"text"},variant:{type:"string",options:["primary","secondary","muted","accent","success","warning","error","info","ghost"],control:"select",description:"Colors variants"},border:{type:"boolean",description:"Button border",control:"boolean"},shadow:{type:"string",description:"box-shadow",options:["default","success","warning","error","info"],control:"select"},rounded:{type:"string",description:"border-radius",options:["none","sm","md","lg","pill","circle"],control:"select"},size:{type:"string",description:"Button size",options:["sm","md","lg","fit","full"],control:"select"},disabled:{type:"boolean",description:"To disable the button",control:"boolean"},className:{type:"string",description:"Add your own styles",control:"text"}}},e={args:{as:"button",children:"Button",variant:"primary",border:!0,shadow:"default",rounded:"pill",size:"fit",disabled:!1,className:""}},o={args:{children:"Primary",variant:"primary"}},s={args:{children:"Secondary",variant:"secondary"}},a={args:{children:"Muted",variant:"muted"}},n={args:{children:"Accent",variant:"accent"}},t={args:{children:"Success",variant:"success"}},d={args:{children:"Warning",variant:"warning"}},c={args:{children:"Error",variant:"error"}},i={args:{children:"Info",variant:"info"}},u={args:{children:"Ghost",variant:"ghost"}},l={args:{children:"Border",border:!0}},m={args:{children:"Shadow Default",shadow:"default"}},g={args:{children:"Shadow Success",shadow:"success"}},p={args:{children:"Shadow Warning",shadow:"warning"}},h={args:{children:"Shadow Error",shadow:"error"}},b={args:{children:"Shadow Info",shadow:"info"}},f={args:{children:"Size sm",size:"sm"}},v={args:{children:"Size md",size:"md"}},S={args:{children:"Size lg",size:"lg"}},w={args:{children:"Size fit",size:"fit"}},y={args:{children:"Size full",size:"full"}},z={args:{children:"Button disabled",disabled:!0}},x={args:{children:"Rounded none",rounded:"none"}},R={args:{children:"Rounded sm",rounded:"sm"}},N={args:{children:"Rounded md",rounded:"md"}},B={args:{children:"Rounded lg",rounded:"lg"}},E={args:{children:"Rounded pill",rounded:"pill"}},T={args:{children:"Rounded circle",rounded:"circle"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Primary',
    variant: 'primary'
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Muted',
    variant: 'muted'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Accent',
    variant: 'accent'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Success',
    variant: 'success'
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    variant: 'warning'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Error',
    variant: 'error'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    variant: 'info'
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}`,...u.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Border',
    border: true
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Default',
    shadow: 'default'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Success',
    shadow: 'success'
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Warning',
    shadow: 'warning'
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Error',
    shadow: 'error'
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Shadow Info',
    shadow: 'info'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size sm',
    size: 'sm'
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size md',
    size: 'md'
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size lg',
    size: 'lg'
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size fit',
    size: 'fit'
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Size full',
    size: 'full'
  }
}`,...y.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button disabled',
    disabled: true
  }
}`,...z.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded none',
    rounded: 'none'
  }
}`,...x.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded sm',
    rounded: 'sm'
  }
}`,...R.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded md',
    rounded: 'md'
  }
}`,...N.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded lg',
    rounded: 'lg'
  }
}`,...B.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded pill',
    rounded: 'pill'
  }
}`,...E.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Rounded circle',
    rounded: 'circle'
  }
}`,...T.parameters?.docs?.source}}};const or=["Default","Primary","Secondary","Muted","Accent","Success","Warning","Error","Info","Ghost","Border","ShadowDefault","ShadowSuccess","ShadowWarning","ShadowError","ShadowInfo","SizeSm","SizeMd","SizeLg","SizeFit","SizeFull","Disabled","RoundedNone","RoundedSm","RoundedMd","RoundedLg","RoundedPill","RoundedCircle"];export{n as Accent,l as Border,e as Default,z as Disabled,c as Error,u as Ghost,i as Info,a as Muted,o as Primary,T as RoundedCircle,B as RoundedLg,N as RoundedMd,x as RoundedNone,E as RoundedPill,R as RoundedSm,s as Secondary,m as ShadowDefault,h as ShadowError,b as ShadowInfo,g as ShadowSuccess,p as ShadowWarning,w as SizeFit,y as SizeFull,S as SizeLg,v as SizeMd,f as SizeSm,t as Success,d as Warning,or as __namedExportsOrder,er as default};
