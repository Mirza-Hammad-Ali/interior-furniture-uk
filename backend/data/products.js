const bed=[['Single (3ft)',0],['Small Double (4ft)',40],['Double (4ft6)',70],['King (5ft)',120],['Super King (6ft)',190]];
const ward=[['2 Door',0],['3 Door',120],['4 Door',240]];
const table=[['4 Seater',0],['6 Seater',150],['8 Seater',300]];
const HEX={Charcoal:'#3b3f42',Silver:'#a9adb0',Navy:'#233a5e',Grey:'#8a8d8f',White:'#f4f4f1',Oak:'#b98a56',Walnut:'#6b4a35',Black:'#1d1d1d',Cream:'#e8dfc8',Blush:'#d9a9a4',Emerald:'#1f6b52',Gold:'#b08d57',Marble:'#dcdcd8',Natural:'#e2d4b8'};
const rows=[
['beds','Divan Bed','Windsor Divan Bed',299,['Charcoal','Silver','Navy','Cream'],bed],
['beds','Divan Bed','Chester Divan Bed with Drawers',379,['Charcoal','Grey','Navy'],bed],
['beds','Panel Bed','Milan Panel Bed',349,['Grey','Cream','Charcoal'],bed],
['beds','Panel Bed','Oslo Wooden Panel Bed',329,['Oak','Walnut','White'],bed],
['beds','Luxury Bed','Royal Crushed Velvet Bed',549,['Silver','Blush','Emerald','Black'],bed],
['beds','Luxury Bed','Versailles Winged Bed',629,['Charcoal','Cream','Navy'],bed],
['beds','Ottoman Bed','Hudson Ottoman Storage Bed',499,['Grey','Charcoal','Cream'],bed],
['wardrobes','Alina','Alina Wardrobe',399,['White','Oak','Grey'],ward],
['wardrobes','Alina','Alina Mirrored Wardrobe',469,['White','Black','Walnut'],ward],
['wardrobes','Chicago','Chicago Wardrobe',449,['White','Black','Oak'],ward],
['wardrobes','Chicago','Chicago Hinged Wardrobe',429,['Walnut','Grey','White'],ward],
['wardrobes','Sliding Door','Berlin Sliding Wardrobe',549,['White','Grey','Black'],ward],
['wardrobes','Mirrored','Paris Mirrored Wardrobe',499,['Silver','Gold','White'],ward],
['dining-tables','Round','Aria Round Dining Table',379,['Oak','White','Walnut'],table],
['dining-tables','Extending','Oxford Extending Table',549,['Oak','Walnut','Grey'],table],
['dining-tables','Marble','Carrara Marble Dining Table',749,['Marble','Black'],table],
['dining-tables','Oak','Kensington Solid Oak Table',649,['Natural','Walnut'],table],
['mattresses','Orthopaedic','Spine Support Orthopaedic Mattress',249,['White'],bed],
['mattresses','Memory Foam','Cloud Memory Foam Mattress',299,['White','Grey'],bed],
['mattresses','Pocket Sprung','Windsor 1000 Pocket Sprung Mattress',349,['White','Cream'],bed],
['mattresses','Hybrid','Luxe Hybrid Mattress',449,['White','Charcoal'],bed]];
export const products=rows.map(([cat,type,name,price,cols,sz])=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),cat,type,name,price,
 desc:`${name}: made for everyday comfort, in a choice of colours and sizes. Price shown is for the smallest size.`,
 colours:cols.map(n=>({name:n,hex:HEX[n]})),sizes:sz.map(([label,add])=>({label,add}))}));
