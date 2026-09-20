const nav=document.getElementById('mainNav');
const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);});

document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelector('.theme-toggle')?.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('pm-theme',document.body.classList.contains('dark')?'dark':'light');
});
if(localStorage.getItem('pm-theme')==='dark')document.body.classList.add('dark');

const filters=document.querySelectorAll('.filter');
const items=document.querySelectorAll('.gallery-item');
filters.forEach(filter=>filter.addEventListener('click',()=>{
  filters.forEach(f=>f.classList.remove('active'));
  filter.classList.add('active');
  const selected=filter.dataset.filter;
  items.forEach(item=>{
    item.style.display=(selected==='all'||item.dataset.category===selected)?'block':'none';
  });
}));

const lightbox=document.getElementById('lightbox');
const modalImage=document.getElementById('modalImage');
const modalCaption=document.getElementById('modalCaption');
function closeModal(el){el.classList.remove('open');el.setAttribute('aria-hidden','true');}
items.forEach(item=>item.addEventListener('click',()=>{
  modalImage.src=item.dataset.src;
  modalImage.alt=item.querySelector('img').alt;
  modalCaption.textContent=item.dataset.title;
  lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
}));
lightbox.querySelector('.modal-close').addEventListener('click',()=>closeModal(lightbox));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeModal(lightbox)});

const blogData={
  1:{date:'20 SEP 2026',title:'Listening to communities across Dabaso Ward',body:'The supplied photographs document recent small-group discussions and public engagements with residents. The conversations shown on this website are presented as part of the campaign’s community-engagement record and are not an independent verification of the issues discussed.'},
  2:{date:'13 AUG 2026',title:'Community conversations on livelihoods',body:'Recent engagements include conversations involving women, families, traders and local livelihood activities. The site groups these photographs under community outreach and livelihood engagement to make the archive easier to browse.'},
  3:{date:'31 JUL 2026',title:'Conservation and community livelihoods',body:'The supplied profile highlights collaboration around conservation and community interests near Arabuko-Sokoke. The proposed priorities section also describes conservation, fishing, quarrying and honey-related livelihood issues.'}
};
const blogModal=document.getElementById('blogModal');
document.querySelectorAll('.read-more').forEach(btn=>btn.addEventListener('click',()=>{
  const b=blogData[btn.dataset.blog];
  document.getElementById('blogModalDate').textContent=b.date;
  document.getElementById('blogModalTitle').textContent=b.title;
  document.getElementById('blogModalBody').textContent=b.body;
  blogModal.classList.add('open');blogModal.setAttribute('aria-hidden','false');
}));
blogModal.querySelector('.modal-close').addEventListener('click',()=>closeModal(blogModal));
blogModal.addEventListener('click',e=>{if(e.target===blogModal)closeModal(blogModal)});

const search=document.getElementById('blogSearch');
const noResults=document.getElementById('noResults');
search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();
  let visible=0;
  document.querySelectorAll('.blog-card').forEach(card=>{
    const ok=card.dataset.search.includes(q)||card.textContent.toLowerCase().includes(q);
    card.style.display=ok?'block':'none'; if(ok)visible++;
  });
  noResults.hidden=visible!==0;
});

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const subject=encodeURIComponent('Website contact — Peter Mwanza');
  const body=encodeURIComponent(
    `Name: ${data.get('name')}\nSublocation: ${data.get('sublocation')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`
  );
  document.getElementById('formMessage').textContent='Opening your email app with the message prepared…';
  window.location.href=`mailto:Dabadokwanza@gmail.com?subject=${subject}&body=${body}`;
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModal(lightbox);closeModal(blogModal);}
});
