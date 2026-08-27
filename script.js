document.querySelectorAll('.obra').forEach((obra,index)=>{obra.addEventListener('click',()=>{obra.style.transform='scale(1.02)';setTimeout(()=>obra.style.transform='',180)})});
