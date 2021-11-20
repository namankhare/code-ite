import React, { useRef, useEffect, useState } from 'react'
import Output from '../components/Output'
import ResizeObserver from 'rc-resize-observer';
import '../assets/css/Wb.css'
import Pencil from "../assets/svg/Pencil.svg";
import Eraser from "../assets/svg/Eraser.svg";
import Clear from "../assets/svg/Clear.svg";



const Whiteboard = () => {
    const canvasRef = useRef(null);
    const canvasSize = useRef("");
    const colorsRef = useRef(null);
    // const socketRef = useRef();
    var isPencil = "pencil";

    // Clear Whiteboard
    const Clear = () => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    const clickPencil = () => {

        isPencil = "pencil";
        console.log(isPencil)
    }
    const clickEraser = () => {

        isPencil = "eraser"
        console.log(isPencil)
    }



    useEffect(() => {

        const canvas = canvasRef.current;
        const test = colorsRef.current;
        const context = canvas.getContext('2d');
        //Test eraser

        console.log()
        const colors = document.getElementsByClassName('color');
        console.log(colors, 'the colors');
        console.log(test);

        const current = {
            color: 'black',
        };


        const onColorUpdate = (e) => {
            current.color = e.target.className.split(' ')[1];
        };




        for (let i = 0; i < colors.length; i++) {
            colors[i].addEventListener('click', onColorUpdate, false);
        }
        let drawing = false;

        // ------------------------------- create the drawing ----------------------------

        const drawLine = (x0, y0, x1, y1, color, emit) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 2;
            context.stroke();
            context.closePath();

            if (!emit) { return; }
            // const w = canvas.width;
            // const h = canvas.height;

            // socketRef.current.emit('drawing', {
            //     x0: x0 / w,
            //     y0: y0 / h,
            //     x1: x1 / w,
            //     y1: y1 / h,
            //     color,
            // });
        };
        const eraseLine = (x0, y0, x1, y1, color, emit) => {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 10;
            context.stroke();
            context.closePath();

            if (!emit) { return; }
            // const w = canvas.width;
            // const h = canvas.height;

            // socketRef.current.emit('drawing', {
            //     x0: x0 / w,
            //     y0: y0 / h,
            //     x1: x1 / w,
            //     y1: y1 / h,
            //     color,
            // });
        };

        // ---------------- mouse movement --------------------------------------

        const onMouseDown = (e) => {
            console.log("onMouseDown", isPencil);
            e.preventDefault()
            const customLeft = canvasRef.current.offsetLeft
            const customTop = canvasRef.current.offsetTop
            const eClientX = parseInt((e.pageX) - (customLeft))
            const eClientY = parseInt((e.pageY) - (customTop))
            current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
            current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            if (isPencil === "pencil") {
                drawing = true;
                context.globalCompositeOperation = "source-over";

                //final
                drawLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);
            } else if (isPencil === "eraser") {
                context.globalCompositeOperation = "destination-out";
                eraseLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);

            }
        };

        const onMouseMove = (e) => {
            e.preventDefault()
            console.log("tysfsdfsdfsdf", isPencil);
            if (isPencil === "pencil") {
                context.globalCompositeOperation = "source-over";
                if (!drawing) { return; }
                // console.log("touch move", e.touches[0].pageX)
                //const
                const customLeft = canvasRef.current.offsetLeft
                const customTop = canvasRef.current.offsetTop
                const eClientX = parseInt((e.pageX) - (customLeft))
                const eClientY = parseInt((e.pageY) - (customTop))
                //final

                drawLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);


                current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
                current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            } else if (isPencil === "eraser") {
                const customLeft = canvasRef.current.offsetLeft
                const customTop = canvasRef.current.offsetTop
                const eClientX = parseInt((e.pageX) - (customLeft))
                const eClientY = parseInt((e.pageY) - (customTop))
                context.globalCompositeOperation = "destination-out";
                eraseLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);
                current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
                current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            }

        };

        const onMouseUp = (e) => {
            e.preventDefault()
            if (!drawing) { return; }
            drawing = false;
            // console.log("touch up", e.touches[0].pageX)

        };

        // ----------- limit the number of events per second -----------------------

        const throttle = (callback, delay) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();

                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        };

        // -----------------add event listeners to our canvas ----------------------

        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        // Touch support for mobile devices
        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);



        // ----------------------- socket.io connection ----------------------------
        // const onDrawingEvent = (data) => {
        //     const w = canvas.width;
        //     const h = canvas.height;
        //     drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
        // }

        // socketRef.current = io.connect('/');
        // socketRef.current.on('drawing', onDrawingEvent);

        // const clear = () => {
        //     context.clearRect(0, 0, canvas.width, canvas.height)
        // }

    }, [isPencil]);


    return (
        <>

            <div className="container-fluid d-flex-column" id="whiteboard" ref={canvasSize} style={{ "width": "100%", "height": "80vh" }} >
                <div className="d-flex justify-content-between my-2">
                    <div ref={colorsRef} className="colors">
                        <div className="color black" />
                        <div className="color red" />
                        <div className="color green" />
                        <div className="color blue" />
                        <div className="color yellow" />
                    </div>
                    <div className="mx-2">


                        <button type="button" className="btn btn-outline-dark px-3 py-1 text-nowrap mx-1" id="btnn" style={{ "border": "1px solid black", "fontSize": "10px", "boxShadow": "none" }}
                            onClick={() => (clickEraser())}>Eraser
                        </button>
                        <button className="btn btn-outline-dark px-3 py-1 text-nowrap mx-1" id="btnn" style={{ "border": "1px solid black", "fontSize": "10px", "boxShadow": "none" }}
                            onClick={() => (clickPencil())}> Pencil
                        </button>
                        <button className="btn btn-outline-dark px-3 py-1 text-nowrap mx-1" id="btnn" style={{ "border": "1px solid black", "fontSize": "10px", "boxShadow": "none" }}
                            onClick={() => (Clear())}>Clear
                        </button>

                        <img src={Pencil} alt="" style={{ "width": "3%" }} />
                        <img src={Eraser} alt="" style={{ "width": "3%" }} />
                        <img src={Clear} alt="" style={{ "width": "3%" }} />

                    </div>
                </div>
                {/* canvas */}
                <ResizeObserver onResize={() => {
                    const canvas = canvasRef.current;
                    canvas.width = canvasRef.current.offsetWidth;
                    canvas.height = canvasRef.current.offsetHeight;
                }}
                >
                    <canvas ref={canvasRef} className="whiteboard" />
                </ResizeObserver>

                <div className=""><Output /></div>


            </div>



        </>
    )
}

export default Whiteboard
