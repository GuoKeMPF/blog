"use strict";(self.webpackChunknote=self.webpackChunknote||[]).push([[2519],{61446:function(f,n,e){var o=e(5574),P=e.n(o),R=e(73847),m=e(67294),O=e(16165),B=e(2096),j=e(31714),U=e(42075),l=e(85893),Z=function(){return(0,l.jsx)("svg",{width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 16 16",children:(0,l.jsx)("path",{d:"M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z"})})},w=function(){return(0,l.jsx)("svg",{width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 16 16",children:(0,l.jsx)("path",{d:"M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"})})},K=function(){return(0,l.jsx)("svg",{width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 16 16",children:(0,l.jsx)("path",{d:"M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z"})})},G=function(){var M=(0,R.YB)(),a=(0,R.OI)(),p=P()(a,3),y=p[1],b=p[2],S=(0,m.useMemo)(function(){return[{label:M.formatMessage({id:"header.color.mode.auto"}),value:"auto",icon:(0,l.jsx)("span",{role:"img",children:(0,l.jsx)(O.Z,{component:K})}),desc:M.formatMessage({id:"header.color.mode.auto"})},{label:M.formatMessage({id:"header.color.mode.light"}),value:"light",icon:(0,l.jsx)("span",{role:"img",children:(0,l.jsx)(O.Z,{component:w})}),desc:M.formatMessage({id:"header.color.mode.light"})},{label:M.formatMessage({id:"header.color.mode.dark"}),value:"dark",icon:(0,l.jsx)("span",{role:"img",children:(0,l.jsx)(O.Z,{component:Z})}),desc:M.formatMessage({id:"header.color.mode.dark"})}]},[]),I=function(g){b(g)};return(0,l.jsx)(B.Z,{title:M.formatMessage({id:"header.color.mode.".concat(y||"auto")}),children:(0,l.jsx)(j.Z,{value:y,onChange:function(g,N){I(g)},style:{width:"auto"},suffixIcon:null,bordered:!1,popupMatchSelectWidth:!1,options:S,optionLabelProp:"icon",optionRender:function(g){return(0,l.jsxs)(U.Z,{children:[g.data.icon,g.data.desc]})}})})};n.Z=G},43326:function(f,n,e){e.d(n,{Z:function(){return Le}});var o=e(73847),P=e(67294),R=e(23578),m=e(85893),O=R.Z.Title,B=function(_){var s=_.children;return(0,m.jsx)(O,{children:s})},j=B,U=e(5574),l=e.n(U),Z=e(96012),w=e(97857),K=e.n(w),G=e(19632),T=e.n(G),M=e(9783),a=e.n(M),p=e(75426),y="precision highp float;uniform vec2 t,x;uniform vec3 R,S,y;uniform vec4 z[64];uniform float A,B,l,C,D,E,F,G,H,I;uniform sampler2D J;float K=1./l;mat3 L(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 w(vec3 c,out float v){c=c.xzy;float p=max(2.,floor(log2(2.236068*l*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1.,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*l+1.),-e.x*f.x+d.x*(f.y*l+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 s=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+s);if(j>l)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float k=fract(b)*6.283185,i=1.-2.*j*K,m=sqrt(1.-i*i);vec3 o=vec3(cos(k)*m,sin(k)*m,i);float u=length(c-o);if(u<n)n=u,r=o;}v=n;return r.xzy;}void main(){vec2 b=(gl_FragCoord.xy/t*2.-1.)/C-x*vec2(1.,-1.)/t;b.x*=t.x/t.y;float c=dot(b,b);vec4 M=vec4(0.);float m=0.;if(c<=.64){for(int d=0;d<2;d++){vec4 e=vec4(0.);float a;vec3 u=vec3(0.,0.,1.),f=normalize(vec3(b,sqrt(.64-c)));f.z*=d>0?-1.:1.,u.z*=d>0?-1.:1.;vec3 g=f*L(B,A),h=w(g,a);float n=asin(h.y),i=acos(-h.x/cos(n));i=h.z<0.?-i:i;float N=max(texture2D(J,vec2(i*.5/3.141593,-(n/3.141593+.5))).x,I),O=smoothstep(8e-3,0.,a),j=dot(f,u),v=pow(j,F)*E,o=N*O*v,T=mix((1.-o)*pow(j,.4),o,G)+.1;e+=vec4(R*T,1.);int U=int(D);float p=0.;for(int k=0;k<64;k++){if(k>=U)break;vec4 q=z[k];vec3 r=q.xyz,P=r-g;float s=q.w;if(dot(P,P)>s*s*4.)continue;vec3 V=w(r,a);a=length(V-g),a<s?p+=smoothstep(s*.5,0.,a):0.;}p=min(1.,p*v),e.xyz=mix(e.xyz,S,p),e.xyz+=pow(1.-j,4.)*y,M+=e*(1.+(d>0?-H:H))/2.;}m=pow(dot(normalize(vec3(-b,sqrt(1.-c))),vec3(0.,0.,1.)),4.)*smoothstep(0.,1.,.2/(c-.64));}else{float Q=sqrt(.2/(c-.64));m=smoothstep(.5,1.,Q/(Q+1.));}gl_FragColor=M+vec4(m*y,m);}",b="l",S="t",I="x",C="y",g="z",N="A",z="B",W="C",H="D",Q="E",Y="F",V="G",J="H",k="I",xe="J",$="R",q="S",Me="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==",v,ee="phi",oe="theta",te="mapSamples",ne="mapBrightness",ae="baseColor",re="markerColor",_e="glowColor",L="markers",ie="diffuse",se="devicePixelRatio",de="dark",ue="offset",le="scale",ce="opacity",fe="mapBaseBrightness",ve=(v={},a()(v,ee,N),a()(v,oe,z),a()(v,te,b),a()(v,ne,Q),a()(v,ae,$),a()(v,re,q),a()(v,_e,C),a()(v,ie,Y),a()(v,de,V),a()(v,ue,I),a()(v,le,W),a()(v,ce,J),a()(v,fe,k),v),X=Math.PI,me=Math.sin,he=Math.cos,Ee=function(_){var s;return(s=[]).concat.apply(s,T()(_.map(function(r){var i=l()(r.location,2),A=i[0],x=i[1];A=A*X/180,x=x*X/180-X;var h=he(A);return[-h*he(x),me(A),h*me(x),r.size]})).concat([[0,0,0,0]]))},ge=function(c,_){var s,r,i=function(t,d,u){return{type:t,value:typeof _[d]=="undefined"?u:_[d]}},A=c.getContext("webgl2")?"webgl2":c.getContext("webgl")?"webgl":"experimental-webgl",x=new p.Z({canvas:c,contextType:A,context:K()({alpha:!0,stencil:!1,antialias:!0,depth:!1,preserveDrawingBuffer:!1},_.context),settings:(s={},a()(s,se,_[se]||1),a()(s,"onSetup",function(t){var d=t.RGB,u=t.UNSIGNED_BYTE,E=t.TEXTURE_2D,D=t.createTexture();t.bindTexture(E,D),t.texImage2D(E,0,d,1,1,0,d,u,new Uint8Array([0,0,0,0]));var F=new Image;F.onload=function(){t.bindTexture(E,D),t.texImage2D(E,0,d,d,u,F),t.generateMipmap(E);var Re=t.getParameter(t.CURRENT_PROGRAM),pe=t.getUniformLocation(Re,xe);t.texParameteri(E,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(E,t.TEXTURE_MAG_FILTER,t.NEAREST),t.uniform1i(pe,0)},F.src=Me}),s)});return x.add("",{vertex:"attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}",fragment:y,uniforms:(r={},a()(r,S,{type:"vec2",value:[_.width,_.height]}),a()(r,N,i("float",ee)),a()(r,z,i("float",oe)),a()(r,b,i("float",te)),a()(r,Q,i("float",ne)),a()(r,k,i("float",fe)),a()(r,$,i("vec3",ae)),a()(r,q,i("vec3",re)),a()(r,Y,i("float",ie)),a()(r,C,i("vec3",_e)),a()(r,V,i("float",de)),a()(r,g,{type:"vec4",value:Ee(_[L])}),a()(r,H,{type:"float",value:_[L].length}),a()(r,I,i("vec2",ue,[0,0])),a()(r,W,i("float",le,1)),a()(r,J,i("float",ce,1)),r),mode:4,geometry:{vertices:[{x:-100,y:100,z:0},{x:-100,y:-100,z:0},{x:100,y:100,z:0},{x:100,y:-100,z:0},{x:-100,y:-100,z:0},{x:100,y:100,z:0}]},onRender:function(t){var d=t.uniforms,u={};if(_.onRender){u=_.onRender(u)||u;for(var E in ve)u[E]!==void 0&&(d[ve[E]].value=u[E]);u[L]!==void 0&&(d[g].value=Ee(u[L]),d[H].value=u[L].length),u.width&&u.height&&(d[S].value=[u.width,u.height])}}}),x};function Pe(){var c=(0,P.useRef)(),_=(0,P.useRef)(null),s=(0,P.useRef)(0),r=(0,Z.q_)(function(){return{r:0,config:{mass:1,tension:280,friction:40,precision:.001}}}),i=l()(r,2),A=i[0].r,x=i[1];return(0,P.useEffect)(function(){var h=0,t=0,d=function(){return c.current&&(t=c.current.offsetWidth)};window.addEventListener("resize",d),d();var u=ge(c.current,{devicePixelRatio:2,width:t*2,height:t*2,phi:0,theta:.3,dark:1,diffuse:3,mapSamples:16e3,mapBrightness:1.2,baseColor:[1,1,1],markerColor:[251/255,100/255,21/255],glowColor:[1.2,1.2,1.2],markers:[],onRender:function(D){_.current||(h+=.005),D.phi=h+A.get(),D.width=t*2,D.height=t*2}});return setTimeout(function(){return c.current.style.opacity="1"}),function(){return u.destroy()}},[]),(0,m.jsx)("div",{style:{width:"100%",maxWidth:600,aspectRatio:1,margin:"auto",position:"relative"},children:(0,m.jsx)("canvas",{ref:c,onPointerDown:function(t){_.current=t.clientX-s.current,c.current.style.cursor="grabbing"},onPointerUp:function(){_.current=null,c.current.style.cursor="grab"},onPointerOut:function(){_.current=null,c.current.style.cursor="grab"},onMouseMove:function(t){if(_.current!==null){var d=t.clientX-_.current;s.current=d,x.start({r:d/200})}},onTouchMove:function(t){if(_.current!==null&&t.touches[0]){var d=t.touches[0].clientX-_.current;s.current=d,x.start({r:d/100})}},style:{width:"100%",height:"100%",cursor:"grab",contain:"layout paint size",opacity:0,transition:"opacity 1s ease"}})})}var De=Pe,Oe=e(86250),Te=e(42075),Ae=e(15867);function Ce(){var c,_=(0,o.eL)(),s=_.frontmatter;return"hero"in s&&(0,m.jsxs)("div",{className:"custom-hore-container",children:[(0,m.jsx)(De,{}),(0,m.jsxs)(Oe.Z,{gap:"middle",align:"center",justify:"center",vertical:!0,children:[s.hero.title&&(0,m.jsx)(j,{children:s.hero.title}),s.hero.description&&(0,m.jsx)("p",{dangerouslySetInnerHTML:{__html:s.hero.description}}),!!(!((c=s.hero.actions)===null||c===void 0)&&c.length)&&(0,m.jsx)(Te.Z,{children:s.hero.actions.map(function(r){var i=r.text,A=r.link;return/^(\w+:)\/\/|^(mailto|tel):/.test(A)?(0,m.jsx)(Ae.ZP,{type:"primary",href:A,target:"_blank",rel:"noreferrer",children:i},i):(0,m.jsx)(o.rU,{to:A,children:(0,m.jsx)(Ae.ZP,{type:"primary",children:i})},i)})})]})]})}var Le=Ce},21266:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(76772)},45356:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(86013)},95044:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(3933)},23240:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(51969)},45898:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(60974)},21209:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(34814)},26871:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(76777)},63721:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(55212)},78406:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(71482)},42515:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(40123)},983:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(47332)},96157:function(f,n,e){e.d(n,{ZP:function(){return o.ZP}});var o=e(78181)},47727:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(27191)},38569:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(11136)},24733:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(42198)},26687:function(f,n,e){e.d(n,{Z:function(){return o.Z}});var o=e(28737)}}]);
