import React, { useRef, useEffect, useState } from "react";

import ResizeObserver from "rc-resize-observer";
import "../assets/css/Wb.css";
import Pencil from "../assets/svg/Pencil.svg";
import Eraser from "../assets/svg/Eraser.svg";
import ClearImg from "../assets/svg/Clear.svg";

const Whiteboard = ({ socket }) => {
  const canvasRef = useRef(null);
  const canvasSize = useRef("");
  const colorsRef = useRef(null);

  const [isPencilCursor, setIsPencilCursor] = useState(true);
  // list of all strokes drawn
  const drawings = useRef([]);
  const currentStroke = useRef([]);

  const clickPencil = () => {
    setIsPencilCursor(true);
  };
  const clickEraser = () => {
    setIsPencilCursor(false);
    canvasRef.current.style = "eraserCursor";
  };
  const offset = useRef({
    X: 0,
    Y: 0,
  }); //Refrence for offset

  function toScreenX(xTrue) {
    return xTrue + offset.current.X;
  }
  function toScreenY(yTrue) {
    return yTrue + offset.current.Y;
  }
  function toResizeX(xResize) {
    return xResize - canvasRef.current.offsetLeft;
  }
  function toResizeY(yResize) {
    return yResize - canvasRef.current.offsetTop;
  }
  function toTrueX(xScreen) {
    return xScreen - offset.current.X;
  }
  function toTrueY(yScreen) {
    return yScreen - offset.current.Y;
  }

  // Clear Whiteboard
  const Clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawings.current = [];
    redrawCanvas();
    emitStroke("clear");
  };

  //redraw Canvas
  function redrawCanvas() {
    // set the canvas to the size of the window

    canvasRef.current.getContext("2d").fillStyle = "#fff";
    canvasRef.current
      .getContext("2d")
      .fillRect(
        0,
        0,
        canvasRef.current.offsetWidth,
        canvasRef.current.offsetHeight
      );
    drawings.current.forEach((data) => {
      if (data.type === "draw") {
        drawStroke({ vectors: data.vectors, color: data.color });
      }
      if (data.type === "eraser") {
        eraseStroke({ vectors: data.vectors, color: data.color });
      }
    });
  }

  // ------------------------------- create the drawing ----------------------------
  function emitStroke(type, color) {
    socket.emit("whiteboard", {
      data: { vectors: currentStroke.current, type: type, color: color },
    });
  }
  function addToStroke(x0, y0) {
    currentStroke.current.push([x0, y0]);
  }
  function drawStroke({ vectors, color }) {
    const context = canvasRef.current.getContext("2d");
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.lineJoin = "round";
    context.lineCap = "round";
    if (!vectors[0]) return;
    context.moveTo(toScreenX(vectors[0][0]), toScreenY(vectors[0][1]));
    for (let i = 0; i < vectors.length; i++) {
      let x0 = toScreenX(vectors[i][0]);
      let y0 = toScreenY(vectors[i][1]);
      context.lineTo(x0, y0);
    }
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
  }
  function eraseStroke({ vectors, colour }) {
    const context = canvasRef.current.getContext("2d");
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.lineJoin = "round";
    context.lineCap = "round";
    if (!vectors[0]) return;
    context.moveTo(toScreenX(vectors[0][0]), toScreenY(vectors[0][1]));
    for (let i = 0; i < vectors.length; i++) {
      let x0 = toScreenX(vectors[i][0]);
      let y0 = toScreenY(vectors[i][1]);
      context.lineTo(x0, y0);
    }
    context.strokeStyle = colour;
    context.lineWidth = 20;
    context.stroke();
  }

  const drawLine = (x0, y0, x1, y1, color) => {
    const context = canvasRef.current.getContext("2d");
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
  };

  const eraseLine = (x0, y0, x1, y1, color) => {
    const context = canvasRef.current.getContext("2d");
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 20;
    context.stroke();
    context.closePath();
  };

  //---------------UseEffect START-------------//
  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };

    socket.on("whiteboard", function (data) {
      drawings.current.push(data.data);
      if (data.data.type === "draw") {
        drawStroke(data.data);
      } else if (data.data.type === "eraser") {
        eraseStroke(data.data);
      } else if (data.data.type === "clear") {
        drawings.current = [];
        redrawCanvas();
      }
    });
    const canvas = canvasRef.current;
    const colors = document.getElementsByClassName("color");
    // coordinates of our cursor
    let cursorX;
    let cursorY;
    let prevCursorX;
    let prevCursorY;
    //

    const current = {
      color: "black",
    };

    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
    };

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;
    let useEraser = false;

    // ---------------- mouse movement --------------------------------------
    // mouse functions
    let leftMouseDown = false;
    let rightMouseDown = false;

    const onMouseDown = (e) => {
      e.preventDefault();
      if (e.button === 0) {
        leftMouseDown = true;
        rightMouseDown = false;
      }
      // detect right clicks
      if (e.button === 2) {
        rightMouseDown = true;
        leftMouseDown = false;
      }

      if (canvas.classList[1] === "pencilCursor") {
        drawing = true;
        useEraser = false;
      } else if (canvas.classList[1] === "eraserCursor") {
        useEraser = true;
        drawing = false;
      }
      cursorX = toResizeX(e.pageX);
      cursorY = toResizeY(e.pageY);
      prevCursorX = toResizeX(e.pageX);
      prevCursorY = toResizeY(e.pageY);
    };

    const onMouseMove = (e) => {
      e.preventDefault();
      cursorX = toResizeX(e.pageX);
      cursorY = toResizeY(e.pageY);
      if (canvas.classList[1] === "pencilCursor") {
        if (!drawing) {
          return;
        }

        canvas.style.cursor = "crosshair";
        if (leftMouseDown) {
          addToStroke(toTrueX(cursorX), toTrueY(cursorY), current.color);
          //final
          drawLine(
            prevCursorX,
            prevCursorY,
            cursorX,
            cursorY,
            current.color,
            true
          );
        }
      } else if (canvas.classList[1] === "eraserCursor") {
        if (!useEraser) {
          return;
        }

        if (leftMouseDown) {
          eraseLine(prevCursorX, prevCursorY, cursorX, cursorY, current.color);
          addToStroke(toTrueX(cursorX), toTrueY(cursorY), current.color);
        }
      }
      //
      if (rightMouseDown) {
        // move the screen
        canvas.style.cursor = "grab";
        offset.current.X += cursorX - prevCursorX;
        offset.current.Y += cursorY - prevCursorY;
        redrawCanvas();
      }
      prevCursorX = cursorX;
      prevCursorY = cursorY;
    };

    const onMouseUp = (e) => {
      if (!drawing && !useEraser) {
        return;
      }
      function type() {
        if (drawing) {
          canvas.style.cursor = "crosshair";
          return "draw";
        }
        if (useEraser) {
          canvas.style = "eraserCursor";
          return "eraser";
        }
      }
      emitStroke(type(), current.color);
      drawings.current.push({
        vectors: currentStroke.current,
        color: current.color,
        type: type(),
      });
      currentStroke.current = [];
      redrawCanvas();

      leftMouseDown = false;
      rightMouseDown = false;
      drawing = false;
      useEraser = false;
    };
    //MOUSE END

    // touch functions --start
    const prevTouches = [null, null]; // up to 2 touches
    let singleTouch = false;
    let doubleTouch = false;
    function onTouchStart(e) {
      if (e.touches.length === 1) {
        singleTouch = true;
        doubleTouch = false;
      }
      if (e.touches.length >= 2) {
        singleTouch = false;
        doubleTouch = true;
      }
      if (canvas.classList[1] === "pencilCursor") {
        drawing = true;
        useEraser = false;
      } else if (canvas.classList[1] === "eraserCursor") {
        useEraser = true;
        drawing = false;
      }
      // store the last touches
      prevTouches[0] = e.touches[0];
      prevTouches[1] = e.touches[1];
    }
    //
    function onTouchMove(e) {
      e.preventDefault();
      // get first touch coordinates
      const touch0X = toResizeX(e.touches[0].pageX);
      const touch0Y = toResizeY(e.touches[0].pageY);
      const prevTouch0X = toResizeX(prevTouches[0].pageX);
      const prevTouch0Y = toResizeY(prevTouches[0].pageY);

      // const scaledX = toResizeX(touch0X);
      // const scaledY = toResizeY(touch0Y);
      // const prevScaledX = toResizeX(prevTouch0X);
      // const prevScaledY = toResizeY(prevTouch0Y);

      if (singleTouch) {
        if (canvas.classList[1] === "pencilCursor") {
          addToStroke(toTrueX(touch0X), toTrueY(touch0Y), current.color);
          // add to history
          drawings.current.push({
            x0: prevTouch0X,
            y0: prevTouch0Y,
            x1: touch0X,
            y1: touch0Y,
            color: current.color,
          });
          drawLine(prevTouch0X, prevTouch0Y, touch0X, touch0Y, current.color);
        } else if (canvas.classList[1] === "eraserCursor") {
          eraseLine(prevTouch0X, prevTouch0Y, touch0X, touch0Y, current.color);
          addToStroke(toTrueX(touch0X), toTrueY(touch0Y), current.color);
        }
      }

      if (doubleTouch) {
        // get second touch coordinates
        offset.current.X += touch0X - prevTouch0X;
        offset.current.Y += touch0Y - prevTouch0Y;
        //redraw canvas with offset
        redrawCanvas();
      }
      prevTouches[0] = e.touches[0];
      prevTouches[1] = e.touches[1];
    }
    function onTouchEnd(e) {
      function type() {
        if (drawing) {
          return "draw";
        }
        if (useEraser) {
          return "eraser";
        }
      }
      emitStroke(type(), current.color);
      drawings.current.push({
        vectors: currentStroke.current,
        color: current.color,
        type: type(),
      });
      currentStroke.current = [];
      redrawCanvas();
      singleTouch = false;
      doubleTouch = false;
    }

    // -----------------add e listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);

    // Touch e Handlers
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);
    canvas.addEventListener("touchmove", onTouchMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="container-fluid d-flex-column"
        id="whiteboard"
        ref={canvasSize}
        style={{ width: "100%", height: "80vh" }}
      >
        <div className="d-flex justify-content-between my-2">
          <div ref={colorsRef} className="colors d-flex">
            <div className="color black" />
            <div className="color red" />
            <div className="color green" />
            <div className="color blue" />
            <div className="color yellow" />
          </div>
          <div className="d-flex justify-content-end mx-2">
            <img
              src={Pencil}
              alt=""
              height="22px"
              width="22px"
              className="mx-2"
              onClick={() => clickPencil()}
            />
            <img
              src={Eraser}
              alt=""
              height="22px"
              width="22px"
              className="mx-2 customCursor"
              onClick={() => clickEraser()}
            />
            <img
              src={ClearImg}
              alt=""
              height="22px"
              width="22px"
              className="mx-2"
              onClick={() => Clear()}
            />
          </div>
        </div>
        {/* canvas */}
        <ResizeObserver
          onResize={() => {
            const canvas = canvasRef.current;
            canvas.width = canvasRef.current.offsetWidth;
            canvas.height = canvasRef.current.offsetHeight;
            redrawCanvas();
          }}
        >
          <canvas
            ref={canvasRef}
            className={`${
              isPencilCursor
                ? "whiteboard pencilCursor"
                : "whiteboard eraserCursor"
            }`}
          />
        </ResizeObserver>
      </div>
    </>
  );
};

export default Whiteboard;
