let skills = document.querySelectorAll(".on");
const observer = new IntersectionObserver( entries => {
    entries[0].target.classList.remove('off');
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

let hamburger = document.getElementById('hamburger');
document.addEventListener('scroll', function(e) {
    if (window.scrollY > 0) {
        hamburger.classList.add('min')
    } 
    else {
        hamburger.classList.remove('min')
    }
});