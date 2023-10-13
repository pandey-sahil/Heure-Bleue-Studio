function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco();

function loadingAnime() {
    var crsr = document.querySelector('#cursor');
    var main = document.querySelector("#main")

    main.addEventListener("mousemove", function(dets){
        // console.log(dets.x)
        gsap.to(crsr,{
            top: dets.y,
            left: dets.x 
        })
    })


    var tl = gsap.timeline();

    tl.to("#text h1:nth-child(1)", {
        x: -190,
    }, 'a').to("#text h1:nth-child(3)", {
        x: 170,
    }, 'a').to("#text", {
        backgroundColor: "#0149c60c",
        duration: 2
    }, 'b').to("#text h3", {
        // display:"initial"
        opacity: 1
    }, 'b').to("#nav", {
        opacity: 1,
        delay: 1
    }, 'b')
}
loadingAnime();

function page2Anime(){

    var tl = gsap.timeline({
        scrollTrigger:{
            start: "top 0%",
            end:"top -80%",
            scroller: "#main",
            trigger:"#page2",
            scrub: 1.5,
            markers:true
        }
    })

    tl.to("#line1",{
        clipPath: 'inset(100% 0 0 0)'
    },"ab")
    .to("#nav h3, #nav svg",{
        filter:"invert(0)",
        color: 'black'
    },'ab')
    .to("#page2",{
        backgroundColor:"#0148C6"
    },"aa")
    .to("#center svg",{
        fill: '#000'
    },"aa")
    .from("#line2",{    
        clipPath: 'inset(0 0 100% 0)'
    })

}
page2Anime();