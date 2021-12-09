const blocks = ["blue", "red"];

for(const block of blocks){
    const element = document.getElementById(block);
    // create scroll snooper
    ScrollSnooper.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        markers: true,
        onEnter: (data) => {
            updateEvent(block, "onEnter");
        },
        onLeave: (data) => {
            updateEvent(block, "onLeave");
        },
        onScroll: (data) => {
            updateEvent(block, "onScroll");
            // isInViewport
            const input = parseFloat(
                document.getElementById(`${block}_input`).innerText
            );
            const isInViewport = ScrollSnooper.isInViewport(data.trigger, input)
                ? "true"
                : "false";
            document.getElementById(`${block}_line_1`).innerText = `${isInViewport}`;

            // progress
            const progress = data.progress.toFixed(2);
            document.getElementById(`${block}_line_2`).innerText = `${progress}`;

            // visibility
            const visibility = ScrollSnooper.visibility(data.trigger);
            document.getElementById(`${block}_line_3`).innerText = `${
                visibility.pixel
            }px / ${visibility.proportion.toFixed(2)}`;
        }
    });
}

// events
function updateEvent(block, event){
    document.getElementById(`${block}_${event}`).classList.add("on");
    setTimeout(() => {
        document.getElementById(`${block}_${event}`).classList.remove("on");
    }, 500);
}
