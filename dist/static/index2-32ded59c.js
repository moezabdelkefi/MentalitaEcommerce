import{b as f,bl as j,j as a,at as P,bq as g,af as L,br as w,r as m,o as B,bs as k,av as T,bt as A,a1 as C,bn as S,au as _,bo as D,ar as H,ai as W,bp as E}from"./sanity-962ea7a1.js";const G=f.hr`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`;function F(l){const{childItemId:n,items:t,isActive:o,layout:i,showIcons:d,title:r}=l,{collapsed:u}=L(),c=w(t==null?void 0:t.filter(e=>e.type!=="divider")),x=m.useCallback(e=>{var s;return((s=t==null?void 0:t.find((h,b)=>b===e))==null?void 0:s.type)==="divider"},[t]),p=m.useCallback(e=>{var h;const s=(h=e.displayOptions)==null?void 0:h.showIcon;return typeof s<"u"?s!==!1:d!==!1},[d]),I=m.useCallback((e,s)=>{const{virtualIndex:h}=s;if(e.type==="divider")return a.jsx(B,{marginBottom:1,children:a.jsx(G,{})},`divider-${h}`);const b=!o&&n===e.id,v=o&&n===e.id,y=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return a.jsx(k,{icon:p(e)?e.icon:!1,id:e.id,layout:i,marginBottom:1,pressed:b,schemaType:e.schemaType,selected:v,title:c(e).title,value:y},e.id)},[n,c,o,i,p]);return a.jsx(T,{overflow:u?"hidden":"auto",children:t&&t.length>0&&a.jsx(A,{activeItemDataAttr:"data-hovered",ariaLabel:r,canReceiveFocus:!0,getItemDisabled:x,itemHeight:51,items:t,onlyShowSelectionWhenActive:!0,paddingBottom:1,paddingX:3,renderItem:I,wrapAround:!1})})}const R=({index:l,menuItems:n,menuItemGroups:t,title:o})=>{const{features:i}=C(),{collapsed:d,isLast:r}=S(),u=r&&!d?-1:0;return a.jsx(_,{actions:a.jsx(D,{menuItems:n,menuItemGroups:t}),backButton:i.backButton&&l>0&&a.jsx(H,{as:W,"data-as":"a",icon:E,mode:"bleed",tooltipProps:{content:"Back"}}),tabIndex:u,title:o})};function q(l){const{childItemId:n,index:t,isActive:o,isSelected:i,pane:d,paneKey:r}=l,{defaultLayout:u,displayOptions:c,items:x,menuItems:p,menuItemGroups:I}=d,e=(c==null?void 0:c.showIcons)!==!1,{title:s}=j(d);return a.jsxs(P,{currentMaxWidth:350,"data-testid":"structure-tool-list-pane","data-ui":"ListPane",id:r,maxWidth:640,minWidth:320,selected:i,children:[g,a.jsx(R,{index:t,menuItems:p,menuItemGroups:I,title:s}),a.jsx(F,{childItemId:n,isActive:o,items:x,layout:u,showIcons:e,title:s},r)]})}export{q as default};
