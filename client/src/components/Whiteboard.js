import React, { useRef, useEffect, useState } from 'react'
import Output from '../components/Output'
import ResizeObserver from 'rc-resize-observer';
import '../assets/css/Wb.css'
import Pencil from "../assets/svg/Pencil.svg";
import Eraser from "../assets/svg/Eraser.svg";
import ClearImg from "../assets/svg/Clear.svg";


const Whiteboard = () => {
    const canvasRef = useRef(null);
    const canvasSize = useRef("");
    const colorsRef = useRef(null);

    const [isPencilCursor, setIsPencilCursor] = useState(true)


    // const socketRef = useRef();

    // Clear Whiteboard
    const Clear = () => {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    const clickPencil = () => {
        setIsPencilCursor(true)
    }
    const clickEraser = () => {
        setIsPencilCursor(false)
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const colors = document.getElementsByClassName('color');

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
        let useEraser = false;

        // ------------------------------- create the drawing ----------------------------

        const drawLine = (x0, y0, x1, y1, color, emit) => {
            context.globalCompositeOperation = "source-over";
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
        const eraseLine = (x0, y0, x1, y1, color) => {
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.strokeStyle = color;
            context.lineWidth = 16;
            context.stroke();
            context.closePath();

        };

        // ---------------- mouse movement --------------------------------------

        const onMouseDown = (e) => {
            // console.log("onMouseDown", canvasRef.current.classList[1]);
            e.preventDefault()
            const customLeft = canvasRef.current.offsetLeft
            const customTop = canvasRef.current.offsetTop
            const eClientX = parseInt((e.pageX) - (customLeft))
            const eClientY = parseInt((e.pageY) - (customTop))
            current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
            current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            if (canvas.classList[1] === "pencilCursor") {
                drawing = true;
                useEraser = false;

                //final
                drawLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);
            } else if (canvas.classList[1] === "eraserCursor") {

                useEraser = true;
                drawing = false;

                eraseLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color);

            }
        };

        const onMouseMove = (e) => {
            e.preventDefault()
            // console.log("onMouseMove", canvas.classList[1]);
            if (canvas.classList[1] === "pencilCursor") {
                if (!drawing) { return; }

                //const
                const customLeft = canvasRef.current.offsetLeft
                const customTop = canvasRef.current.offsetTop
                const eClientX = parseInt((e.pageX) - (customLeft))
                const eClientY = parseInt((e.pageY) - (customTop))
                //final

                drawLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color, true);


                current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
                current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            } else if (canvas.classList[1] === "eraserCursor") {
                if (!useEraser) { return; }

                // if (!drawing) { return; }
                const customLeft = canvasRef.current.offsetLeft
                const customTop = canvasRef.current.offsetTop
                const eClientX = parseInt((e.pageX) - (customLeft))
                const eClientY = parseInt((e.pageY) - (customTop))
                eraseLine(current.x, current.y, eClientX || parseInt(e.touches[0].pageX - (customLeft)), eClientY || parseInt((e.touches[0].pageY) - (customTop)), current.color);
                current.x = eClientX || parseInt(e.touches[0].pageX - (customLeft));
                current.y = eClientY || parseInt((e.touches[0].pageY) - (customTop));
            }

        };

        const onMouseUp = (e) => {
            e.preventDefault()
            if (!drawing && !useEraser) { return; }
            drawing = false;
            useEraser = false;


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
    }, []);


    return (
        <>

            <div className="container-fluid d-flex-column" id="whiteboard" ref={canvasSize} style={{ "width": "100%", "height": "80vh" }} >
                <div className="d-flex justify-content-between my-2">
                    <div ref={colorsRef} className="colors d-flex">
                        <div className="color black" />
                        <div className="color red" />
                        <div className="color green" />
                        <div className="color blue" />
                        <div className="color yellow" />
                    </div>
                    <div className="d-flex justify-content-end mx-2">

                        <img src={Pencil} alt="" height="22px" width="22px" className="mx-2" onClick={() => (clickPencil())} />
                        <img src={Eraser} alt="" height="22px" width="22px" className="mx-2 customCursor" onClick={() => (clickEraser())} />
                        <img src={ClearImg} alt="" height="22px" width="22px" className="mx-2" onClick={() => (Clear())} />

                    </div>
                </div>
                {/* canvas */}
                <ResizeObserver onResize={() => {
                    const canvas = canvasRef.current;
                    canvas.width = canvasRef.current.offsetWidth;
                    canvas.height = canvasRef.current.offsetHeight;
                }}
                >
                    <canvas ref={canvasRef} className={`${isPencilCursor ? "whiteboard pencilCursor" : "whiteboard eraserCursor"}`} />
                </ResizeObserver>

                <div className=""><Output /></div>
            </div>
        </>
    )
}

export default Whiteboard
