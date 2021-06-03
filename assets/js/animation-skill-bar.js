let skills = document.querySelectorAll(".on");
const observer = new IntersectionObserver( entries => {
    console.log(entries);
    entries[0].target.classList.remove('off');
    // entries[1].target.classList.remove('off');
    // entries[2].target.classList.remove('off');
    setTimeout(function(){
        entries[1].target.classList.remove('off')
        setTimeout(function(){
            entries[2].target.classList.remove('off')
        }, 700);
    }, 700);
}, {
    threshold: 1
})
Array.from(skills).forEach( element => {
    observer.observe(element);
})