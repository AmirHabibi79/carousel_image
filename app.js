const images=document.querySelectorAll(".album img")
const main_image=document.querySelector(".main-image img")
const album=document.querySelector(".album")
const go=document.getElementById("go")
const back=document.getElementById("back")
let isdoing=false
const remove=(e)=>{
    e.target.style.animationName=""
    isdoing=false
}
const change=(elem)=>{
    let src=elem.getAttribute("src");
    let srcMain=main_image.getAttribute("src")
    main_image.setAttribute("src",src)
    elem.setAttribute("src",srcMain)
    document.querySelectorAll(".selected").forEach(sele=>{
        sele.classList.remove("selected")
    })
    elem.parentElement.classList.add("selected")
    main_image.style.animationName="animate"
    elem.style.animationName="animate"
    isdoing=true
}
images.forEach(image=>{
    image.addEventListener("click",(e)=>{
        if(isdoing){
            return
        }
        change(e.target)
    })
    image.onanimationend=remove
})
main_image.onanimationend=remove;
const clickHandler=(dir)=>{
    if(isdoing){
        return
    }
    const selected=document.querySelector(".selected");
    if(dir==="go"){
        if(selected===null){
            change(album.firstElementChild.firstChild)
            return
        }
        const next=selected.nextElementSibling;
        if(next===null){
            const first=album.firstElementChild.firstElementChild;
            change(first);
        }else{
            change(next.firstElementChild)
        }
    }else if(dir==="back"){
        if(selected===null){
            change(album.lastElementChild.firstChild)
            return
        }
        const pre=selected.previousElementSibling;
        if(pre===null){
            const last=album.lastElementChild.firstElementChild;
            change(last)
        }else{
            change(pre.firstElementChild)
        }
    }
    selected.classList.remove("selected");
}
go.addEventListener("click",()=>clickHandler("go"))
back.addEventListener("click",()=>clickHandler("back"))