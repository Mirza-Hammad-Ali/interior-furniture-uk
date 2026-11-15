import {useState,useEffect} from 'react';
import {Routes,Route,Link,NavLink,useParams,useSearchParams,useNavigate,useLocation} from 'react-router-dom';
import {useApp,api,gbp} from './store.jsx';
const CATS=[{slug:'beds',name:'Beds'},{slug:'wardrobes',name:'Wardrobes'},{slug:'dining-tables',name:'Dining Tables'},{slug:'mattresses',name:'Mattresses'}];
const catName=s=>CATS.find(c=>c.slug===s)?.name||s;
const useProducts=()=>{const[p,setP]=useState(null),[err,setErr]=useState('');useEffect(()=>{api('/products').then(setP).catch(e=>setErr(e.message))},[]);return[p,err]};

function Art({cat,color,image,className=''}){
 if(image)return <img src={image} alt="" className={'object-cover aspect-[10/7] '+className}/>;
 const sh={beds:<g fill={color}><rect x="34" y="26" width="132" height="48" rx="4"/><rect x="26" y="74" width="148" height="34" rx="4" opacity=".85"/><rect x="38" y="58" width="124" height="20" rx="9" fill="#fff" opacity=".85"/><rect x="30" y="108" width="8" height="10"/><rect x="162" y="108" width="8" height="10"/></g>,
 wardrobes:<g fill={color}><rect x="50" y="14" width="100" height="104" rx="3"/><path d="M100 14v104" stroke="#fff" strokeOpacity=".5" strokeWidth="2"/><circle cx="94" cy="68" r="2.5" fill="#fff"/><circle cx="106" cy="68" r="2.5" fill="#fff"/><rect x="56" y="118" width="8" height="8"/><rect x="136" y="118" width="8" height="8"/></g>,
 'dining-tables':<g fill={color}><ellipse cx="100" cy="52" rx="78" ry="18"/><rect x="40" y="58" width="8" height="58"/><rect x="152" y="58" width="8" height="58"/><rect x="62" y="64" width="6" height="46" opacity=".6"/><rect x="132" y="64" width="6" height="46" opacity=".6"/></g>,
 mattresses:<g><rect x="24" y="48" width="152" height="46" rx="10" fill={color} stroke="#0002"/><path d="M40 60h120M40 72h120M40 84h120" stroke="#0002" strokeWidth="2"/></g>};
 return <svg viewBox="0 0 200 140" className={'aspect-[10/7] '+className}><rect width="200" height="140" fill="#e3e8e4"/><rect y="118" width="200" height="22" fill="#d3d9d4"/>{sh[cat]}</svg>}

const Card=({p})=><Link to={'/product/'+p.id} className="group block"><div className="overflow-hidden rounded-lg"><Art cat={p.cat} color={p.colours[0].hex} image={p.image} className="w-full transition duration-500 group-hover:scale-105"/></div>
 <p className="mt-3 text-xs text-ink/60">{p.type}</p><h3 className="font-display text-xl leading-tight">{p.name}</h3><p className="text-sm">From {gbp(p.price)}</p>
 <div className="flex gap-1 mt-2">{p.colours.map(c=><span key={c.name} title={c.name} className="w-3.5 h-3.5 rounded-full border border-ink/20" style={{background:c.hex}}/>)}</div></Link>;
const Status=({p,err})=>err?<p className="py-20 text-center text-red-700">{err}</p>:!p?<p className="py-20 text-center text-ink/50">Loading…</p>:null;

function Nav(){const{user,cart,logout}=useApp(),n=cart.reduce((a,b)=>a+b.qty,0);
 return <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-ink/10"><div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-6">
 <Link to="/" className="font-display text-2xl font-bold text-moss whitespace-nowrap">Interior Furniture UK</Link>
 <nav className="hidden md:flex gap-6 text-sm ml-auto">{CATS.map(c=><NavLink key={c.slug} to={'/shop/'+c.slug} className={({isActive})=>isActive?'text-moss font-bold':'hover:text-moss'}>{c.name}</NavLink>)}</nav>
 <div className="flex gap-4 text-sm items-center ml-auto md:ml-0">{user?<><Link to="/orders">Orders</Link><button onClick={logout}>Sign out</button></>:<Link to="/login">Sign in</Link>}<Link to="/cart" className="bg-moss text-white rounded-full px-4 py-1.5">Bag ({n})</Link></div></div>
 <nav className="md:hidden flex gap-4 overflow-x-auto px-5 pb-2 text-sm">{CATS.map(c=><Link key={c.slug} to={'/shop/'+c.slug} className="whitespace-nowrap">{c.name}</Link>)}</nav></header>}

function Home(){const[ps,err]=useProducts();
 return <><section className="bg-mist"><div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">
 <div><h1 className="font-display text-5xl md:text-7xl font-semibold leading-[.95]">Rooms you’ll want to come home to.</h1><p className="mt-6 max-w-md text-ink/70">Beds, wardrobes, dining tables and mattresses, made for British homes. Pick your colour and size, and we deliver free over £500.</p><Link to="/shop" className="btn inline-block mt-8">Shop all furniture</Link></div>
 <div className="grid grid-cols-2 gap-3">{CATS.map((c,i)=><Link key={c.slug} to={'/shop/'+c.slug} className="rounded-lg overflow-hidden bg-white relative"><Art cat={c.slug} color={['#3b3f42','#b98a56','#6b4a35','#a9adb0'][i]} className="w-full"/><span className="absolute left-3 bottom-3 bg-white/90 px-3 py-1 rounded-full text-sm">{c.name}</span></Link>)}</div></div></section>
 <section className="max-w-6xl mx-auto px-5 py-14"><h2 className="font-display text-3xl mb-6">Shop by type</h2><div className="grid md:grid-cols-4 gap-8">{CATS.map(c=><div key={c.slug}><Link to={'/shop/'+c.slug} className="font-display text-2xl text-moss">{c.name}</Link>
 <ul className="mt-2 space-y-1 text-sm">{[...new Set((ps||[]).filter(p=>p.cat===c.slug).map(p=>p.type))].map(t=><li key={t}><Link className="hover:underline" to={`/shop/${c.slug}?type=${encodeURIComponent(t)}`}>{t}</Link></li>)}</ul></div>)}</div></section>
 <section className="max-w-6xl mx-auto px-5 pb-16"><h2 className="font-display text-3xl mb-6">Popular right now</h2><Status p={ps} err={err}/><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{(ps||[]).filter((_,i)=>i%5===0).slice(0,4).map(p=><Card key={p.id} p={p}/>)}</div></section></>}

function Shop(){const{cat}=useParams(),[q,setQ]=useSearchParams(),type=q.get('type'),[ps,err]=useProducts();
 const all=(ps||[]).filter(p=>!cat||p.cat===cat),types=[...new Set(all.map(p=>p.type))],list=all.filter(p=>!type||p.type===type);
 return <div className="max-w-6xl mx-auto px-5 py-10"><h1 className="font-display text-5xl">{cat?catName(cat):'All furniture'}</h1>
 <div className="flex flex-wrap gap-2 my-6">{[null,...types].map(t=><button key={t||'all'} onClick={()=>setQ(t?{type:t}:{})} className={'px-4 py-1.5 rounded-full border text-sm '+((type||null)===t?'bg-moss text-white border-moss':'border-ink/20')}>{t||'All'}</button>)}</div>
 <Status p={ps} err={err}/><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{list.map(p=><Card key={p.id} p={p}/>)}</div></div>}

function Product(){const{id}=useParams(),{add}=useApp(),[p,setP]=useState(null),[err,setErr]=useState(''),[ci,setCi]=useState(0),[si,setSi]=useState(0),[qty,setQty]=useState(1),[done,setDone]=useState(false);
 useEffect(()=>{api('/products/'+id).then(setP).catch(e=>setErr(e.message))},[id]);
 if(!p)return <Status p={p} err={err}/>;const c=p.colours[ci],z=p.sizes[si],price=p.price+z.add;
 return <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-10"><div className="rounded-lg overflow-hidden"><Art cat={p.cat} color={c.hex} image={p.image} className="w-full"/></div>
 <div><Link to={'/shop/'+p.cat} className="text-sm text-moss">{catName(p.cat)} / {p.type}</Link><h1 className="font-display text-5xl mt-1">{p.name}</h1><p className="text-2xl mt-3">{gbp(price)}</p><p className="mt-4 text-ink/70">{p.desc}</p>
 <p className="mt-6 text-sm font-bold">Colour: <span className="font-normal">{c.name}</span></p><div className="flex gap-2 mt-2">{p.colours.map((x,i)=><button key={x.name} onClick={()=>setCi(i)} aria-label={x.name} className={'w-9 h-9 rounded-full border-2 '+(i===ci?'border-moss ring-2 ring-moss/30':'border-ink/20')} style={{background:x.hex}}/>)}</div>
 <p className="mt-6 text-sm font-bold">Size</p><div className="flex flex-wrap gap-2 mt-2">{p.sizes.map((x,i)=><button key={x.label} onClick={()=>setSi(i)} className={'px-3 py-2 rounded-md border text-sm '+(i===si?'bg-moss text-white border-moss':'border-ink/25')}>{x.label}<span className="block text-xs opacity-70">{gbp(p.price+x.add)}</span></button>)}</div>
 <div className="flex gap-3 mt-8 items-center"><div className="flex items-center border border-ink/25 rounded-full"><button className="px-4 py-2" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span className="w-6 text-center">{qty}</span><button className="px-4 py-2" onClick={()=>setQty(Math.min(20,qty+1))}>+</button></div>
 <button className="btn flex-1" onClick={()=>{add({id:p.id,name:p.name,cat:p.cat,image:p.image,colour:c.name,hex:c.hex,size:z.label,price,qty});setDone(true);setTimeout(()=>setDone(false),2000)}}>{done?'Added to bag ✓':'Add to bag'}</button></div>
 <p className="mt-4 text-xs text-ink/60">Free delivery over £500, otherwise £49.</p></div></div>}

function Cart(){const{cart,setQty,subtotal,delivery,total}=useApp();
 if(!cart.length)return <div className="py-24 text-center"><h1 className="font-display text-4xl">Your bag is empty</h1><Link to="/shop" className="btn inline-block mt-6">Start shopping</Link></div>;
 return <div className="max-w-4xl mx-auto px-5 py-10"><h1 className="font-display text-5xl mb-6">Your bag</h1>
 {cart.map((l,i)=><div key={i} className="flex gap-4 items-center py-4 border-t border-ink/10"><div className="w-28 shrink-0 rounded overflow-hidden"><Art cat={l.cat} color={l.hex} image={l.image} className="w-full"/></div>
 <div className="flex-1"><Link to={'/product/'+l.id} className="font-display text-xl">{l.name}</Link><p className="text-sm text-ink/60">{l.colour} · {l.size}</p><p className="text-sm">{gbp(l.price)}</p></div>
 <div className="flex items-center border border-ink/25 rounded-full"><button className="px-3 py-1" onClick={()=>setQty(i,l.qty-1)}>−</button><span className="w-5 text-center">{l.qty}</span><button className="px-3 py-1" onClick={()=>setQty(i,l.qty+1)}>+</button></div>
 <p className="w-24 text-right">{gbp(l.price*l.qty)}</p></div>)}
 <div className="border-t border-ink/10 pt-4 ml-auto max-w-xs space-y-1 text-sm"><p className="flex justify-between"><span>Subtotal</span>{gbp(subtotal)}</p><p className="flex justify-between"><span>Delivery</span>{delivery?gbp(delivery):'Free'}</p><p className="flex justify-between text-lg font-bold"><span>Total</span>{gbp(total)}</p>
 <Link to="/checkout" className="btn block text-center mt-4">Checkout</Link></div></div>}

function Login(){const{setUser}=useApp(),nav=useNavigate(),loc=useLocation(),[reg,setReg]=useState(false),[f,setF]=useState({name:'',email:'',password:''}),[err,setErr]=useState(''),[busy,setBusy]=useState(false);
 const go=async e=>{e.preventDefault();setBusy(true);setErr('');try{setUser(await api(reg?'/auth/register':'/auth/login',{method:'POST',body:f}));nav(loc.state?.from||'/')}catch(x){setErr(x.message)}setBusy(false)};
 const set=k=>e=>setF({...f,[k]:e.target.value});
 return <form onSubmit={go} className="max-w-sm mx-auto px-5 py-16 space-y-3"><h1 className="font-display text-4xl">{reg?'Create your account':'Sign in'}</h1>
 {reg&&<input placeholder="Full name" value={f.name} onChange={set('name')} required/>}<input type="email" placeholder="Email" value={f.email} onChange={set('email')} required/><input type="password" placeholder="Password (6+ characters)" value={f.password} onChange={set('password')} required/>
 {err&&<p className="text-sm text-red-700" role="alert">{err}</p>}<button className="btn w-full" disabled={busy}>{reg?'Create account':'Sign in'}</button>
 <button type="button" className="text-sm text-moss underline" onClick={()=>setReg(!reg)}>{reg?'I already have an account':'New here? Create an account'}</button></form>}

function Checkout(){const{user,cart,subtotal,delivery,total,clear}=useApp(),nav=useNavigate(),[f,setF]=useState({name:user?.name||'',address:'',city:'',postcode:'',phone:''}),[err,setErr]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{if(!user)nav('/login',{state:{from:'/checkout'}})},[user]);
 if(!cart.length)return <div className="py-24 text-center"><p>Your bag is empty.</p></div>;
 const go=async e=>{e.preventDefault();setBusy(true);setErr('');try{await api('/orders',{method:'POST',body:{items:cart.map(({id,colour,size,qty})=>({id,colour,size,qty})),shipping:f}},user.token);clear();nav('/orders')}catch(x){setErr(x.message)}setBusy(false)};
 return <form onSubmit={go} className="max-w-4xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-10"><div className="space-y-3"><h1 className="font-display text-4xl">Delivery details</h1>
 {[['name','Full name'],['address','Address'],['city','Town / city'],['postcode','Postcode'],['phone','Phone number']].map(([k,l])=><input key={k} placeholder={l} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} required/>)}</div>
 <div className="bg-mist rounded-lg p-6 h-fit"><h2 className="font-display text-2xl mb-3">Order summary</h2>{cart.map((l,i)=><p key={i} className="flex justify-between text-sm py-1"><span>{l.qty} × {l.name} ({l.colour}, {l.size})</span>{gbp(l.price*l.qty)}</p>)}
 <p className="flex justify-between text-sm mt-3"><span>Delivery</span>{delivery?gbp(delivery):'Free'}</p><p className="flex justify-between font-bold text-lg mt-1"><span>Total</span>{gbp(total)}</p><p className="text-xs text-ink/60 mt-2">Pay on delivery. Online payment can be added later.</p>
 {err&&<p className="text-sm text-red-700 mt-2" role="alert">{err}</p>}<button className="btn w-full mt-4" disabled={busy}>{busy?'Placing order…':'Place order'}</button></div></form>}

function Orders(){const{user}=useApp(),nav=useNavigate(),[o,setO]=useState(null),[err,setErr]=useState('');
 useEffect(()=>{if(!user)return nav('/login',{state:{from:'/orders'}});api('/orders',{},user.token).then(setO).catch(e=>setErr(e.message))},[user]);
 return <div className="max-w-3xl mx-auto px-5 py-10"><h1 className="font-display text-5xl mb-6">Your orders</h1><Status p={o} err={err}/>{o&&!o.length&&<p>No orders yet. <Link className="underline text-moss" to="/shop">Start shopping</Link></p>}
 {(o||[]).map(x=><div key={x.id} className="border border-ink/15 rounded-lg p-5 mb-4"><p className="flex justify-between"><b>Order {x.id}</b><span className="text-sm text-ink/60">{new Date(x.date).toLocaleDateString('en-GB')}</span></p>
 {x.lines.map((l,i)=><p key={i} className="text-sm mt-1">{l.qty} × {l.name} · {l.colour} · {l.size} · {gbp(l.price*l.qty)}</p>)}<p className="mt-2 font-bold">Total {gbp(x.total)}</p><p className="text-xs text-moss">{x.status}</p><p className="text-xs text-ink/60">Delivering to {x.shipping.address}, {x.shipping.city} {x.shipping.postcode}</p></div>)}</div>}

export default function App(){return <><Nav/><main className="min-h-[70vh]"><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop/>}/><Route path="/shop/:cat" element={<Shop/>}/><Route path="/product/:id" element={<Product/>}/><Route path="/cart" element={<Cart/>}/><Route path="/login" element={<Login/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/orders" element={<Orders/>}/></Routes></main>
 <footer className="bg-ink text-white/80 mt-16"><div className="max-w-6xl mx-auto px-5 py-10 text-sm flex flex-wrap justify-between gap-4"><span className="font-display text-xl text-white">Interior Furniture UK</span><span>Free delivery over £500 · Secure sign in · Easy returns</span></div></footer></>}
