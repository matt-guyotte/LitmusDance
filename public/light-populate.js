var lightValues = [
    {
        number: 1, 
        value: [-90, 90]
    },
    {
        number: 2, 
        value: [-45, 90]
    },
    {
        number: 3, 
        value: [0, 90]
    },
    {
        number: 4, 
        value: [45, 90]
    },
    {
        number: 5, 
        value: [90, 90]
    },
    {
        number: 6, 
        value: [-90, 45]
    },
    {
        number: 7, 
        value: [-45, 45]
    },
    {
        number: 8, 
        value: [0, 45]
    },
    {
        number: 9, 
        value: [45, 45]
    },
    {
        number: 10, 
        value: [90, 45]
    },
    {
        number: 11, 
        value: [-90, 0]
    },
    {
        number: 12, 
        value: [-45, 0]
    },
    {
        number: 13, 
        value: [0, 0]
    },
    {
        number: 14, 
        value: [45, 0]
    },
    {
        number: 15, 
        value: [90, 0]
    },
    {
        number: 16, 
        value: [-90, -45]
    },
    {
        number: 17, 
        value: [-45, -45]
    },
    {
        number: 18, 
        value: [0, -45]
    },
    {
        number: 19, 
        value: [45, -45]
    },
    {
        number: 20, 
        value: [90, -45]
    },
    {
        number: 21, 
        value: [-90, -90]
    },
    {
        number: 22, 
        value: [-45, -90]
    },
    {
        number: 23, 
        value: [0, -90]
    },
    {
        number: 24, 
        value: [-45, -90]
    },
    {
        number: 25, 
        value: [90, -90]
    }
]

async function getCurrent() {
    var pageFetch = await fetch('/checkpage');
    var pageFetchRes = await pageFetch.json();
}

function lightPopulate(number) {
    var amount = 9;
    if(number === 1) {
        var elements = document.getElementsByClassName("light");
        var lightSelect = document.getElementsByClassName("light-select")
        console.log('number 1 triggered')
        var lightGrid1 = document.getElementById('light-grid-1');
        if (lightGrid1.hasChildNodes()) {
            for(var k = 0; k < elements.length; k++) {
                lightGrid1.removeChild();
            }
        }
        for (var i = 0; i < amount; i++) {       
            var new_div = document.createElement("div");
            new_div.className = "light";
            new_div.setAttribute("value", i + 1)
            console.log("This is repeat " + i);
            lightGrid1.appendChild(new_div);
        }

        function myFunction () {
            async function getCurrent() {
                var pageFetch = await fetch('/checkpage');
                var pageFetchRes = await pageFetch.json();
                return pageFetchRes;
            }
            console.log("myfunction called")
            var attribute = this.outerHTML;
            var attSplit = attribute.split('value=')
            var attSplit2 = attSplit[1].split('></div>')
            var attSplit3 = attSplit2[0].replace(/"/g,"");
            console.log(attSplit3);
            if(lightSelect.length >= 1) {
                for(var i = 0; i < lightSelect.length; i++) {
                    lightSelect[i].className = "light"
                }
            }
            this.className = "light-select";
            if(attribute === undefined) {
                console.log("attribute is undefined")
            }
            async function callCurrent () {
                var getCurrentFunction = await getCurrent();
                console.log(getCurrentFunction);
                console.log(getCurrentFunction.number);
                if(attSplit3 == null || typeof attSplit3 === undefined) {
                    attSplit3 = "None"
                }
                if(getCurrentFunction.number == 1) {
                    console.log("get current called");
                    await fetch("/zykhetk344e42uds/?input=5&message=" + attSplit3);
                }
                if(getCurrentFunction.number == 2) {
                    console.log("get current2 called")
                    await fetch("/zykhetk344e42uds/?input=9&message=" + attSplit3);
                }
            }
            callCurrent();
            // for(var j = 0; j < elements.length; j++) {
            //     console.log(getComputedStyle(elements))
            //     if(elements[i].style.height = "50px") {
            //         console.log("true")
            //     }
            // }
            
            //var xValue = undefined;
            //var yValue = undefined;
            //for(var i = 0; i < lightValues.length; i++) {
            //    if (attSplit3 == lightValues[i].number) {
            //        xValue = lightValues[i].value[0];
            //        yValue = lightValues[i].value[1];
            //        console.log(xValue, yValue)
            //    }
            //}
        };
        
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', myFunction, false);
        }
    }
    if(number === 2) {
        console.log('number 2 triggered')
        var lightGrid2 = document.getElementById('light-grid-2');
        var elements2 = document.getElementsByClassName("light");
        var lightSelect2 = document.getElementsByClassName('light-select');
        if(lightGrid2.hasChildNodes()) {
            for(var k = 0; k < elements2.length; k++) {
                lightGrid2.removeChild();
            }
        }
        for (var i = 0; i < amount; i++) {       
            var new_div2 = document.createElement("div");
            new_div2.className = "light";
            new_div2.setAttribute("value", i + 1)
            console.log("This is repeat " + i);
            lightGrid2.appendChild(new_div2);
        }

        function myFunction2 () {
            async function getCurrent() {
                var pageFetch = await fetch('/checkpage');
                var pageFetchRes = await pageFetch.json();
                return pageFetchRes;
            }
            console.log("myfunction called")
            var attribute = this.outerHTML;
            console.log(attribute);
            var attSplit = attribute.split('value=')
            var attSplit2 = attSplit[1].split('></div>')
            var attSplit3 = attSplit2[0].replace(/"/g,"");
            console.log(attSplit3);
            if(lightSelect2.length >= 1) {
                for(var i = 0; i < lightSelect2.length; i++) {
                    lightSelect2[i].className = "light"
                }
            }
            this.className = "light-select";
            if(attribute === undefined) {
                console.log("attribute is undefined")
            }

            async function callCurrent () {
                var getCurrentFunction = await getCurrent();
                console.log(getCurrentFunction);
                console.log(getCurrentFunction.number);
                if(attSplit3 == null || typeof attSplit3 == undefined || attSplit3 == "") {
                    attSplit3 = "None"
                }
                if(getCurrentFunction.number == 1) {
                    console.log("get current called");
                    await fetch("/zykhetk344e42uds/?input=6&message=" + attSplit3);
                }
                if(getCurrentFunction.number == 2) {
                    console.log("get current2 called")
                    await fetch("/zykhetk344e42uds/?input=10&message=" + attSplit3);
                }
            }
            callCurrent();
            //var xValue = undefined;
            //var yValue = undefined;
            //for(var i = 0; i < lightValues.length; i++) {
            //    if (attSplit3 == lightValues[i].number) {
            //        xValue = lightValues[i].value[0];
            //        yValue = lightValues[i].value[1];
            //        console.log(xValue, yValue)
            //    }
            //}
        };
        
        for (var i = 0; i < elements2.length; i++) {
            elements2[i].addEventListener('click', myFunction2, false);
        }
    }
    //if(number === 2) {
    //    console.log("number 2 triggered")
    //    var lightGrid2 = document.getElementById('light-grid-2')  
    //    for (var k = 0; k < amount; k++){     
    //        var new_div2 = document.createElement("div");
    //        new_div2.className = "light";
    //        new_div2.innerHTML = k + 1
    //        console.log("This is repeat " + k);
    //        lightGrid2.appendChild(new_div2);
    //    }
    //    var elements2 = document.getElementsByClassName("light");
//
    //    function myFunction2 () {
    //        console.log("myfunction called")
    //        var attribute = this.innerHTML;
    //        alert(attribute);
    //        var pickedLight2 = document.getElementById("picked-light-2")
    //        var new_light_div2 = document.createElement("div");
    //        if(document.getElementById('picked-light-2-light') && attribute !== undefined) {
    //            document.getElementById('picked-light-2-light').remove();
    //            new_light_div2.id = "picked-light-2-light";
    //            new_light_div2.innerHTML = attribute;
    //            pickedLight2.appendChild(new_light_div2);
    //        }
    //        if(!document.getElementById('picked-light-2-light') && attribute !== undefined) {
    //            new_light_div2.id = "picked-light-2-light";
    //            new_light_div2.innerHTML = attribute;
    //            pickedLight2.appendChild(new_light_div2);
    //        }
    //        if(attribute === undefined) {
    //            console.log("attribute is undefined")
    //        }
    //    };
    //    
    //    for (var j = 0; j < elements2.length; j++) {
    //        elements2[j].addEventListener('click', myFunction2, false);
    //    }
    //}
}