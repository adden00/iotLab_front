import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var mxGraph: any;
// declare var mxShape: any;
// declare var mxConnectionConstraint: any;
declare var mxPoint: any;
// declare var mxPolyline: any;
declare var mxCellState: any;
declare var mxRubberband: any;
declare var mxEvent: any;
declare var mxUtils: any;
declare var mxConnectionHandler: any;
declare var mxConstants: any;
declare var mxConstraintHandler: any;
declare var mxImage: any;
// declare var mxGraphHandler: any;
declare var mxGuide: any;
// declare var mxEdgeHandler: any;
declare var mxRectangle: any;
declare var mxUndoManager: any;
const ledIsOn = false;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'iotLab';
  constructor() { }
  @ViewChild('graphContainer') graphContainer: ElementRef;


  ngAfterViewInit() {


// настройки mxgraph

    mxConnectionHandler.prototype.movePreviewAway = false;
    mxConnectionHandler.prototype.waypointsEnabled = true;
    mxGraph.prototype.resetEdgesOnConnect = false;
    mxConstants.SHADOWCOLOR = '#C0C0C0';
    const joinNodeSize = 7;
    const strokeWidth = 2;
    const fillColor = '#FFFFFF';
    const fontColor = '#000000';
    const strokeColor = '#000000';
    // создаем граф
    const graph = new mxGraph(this.graphContainer.nativeElement);
    graph.setConnectable(true);
    graph.setConnectableEdges(true);
    graph.setDisconnectOnMove(false);
    graph.foldingEnabled = false;
    graph.maximumGraphBounds = new mxRectangle(0, 0, 1000, 600);
    new mxRubberband(graph);
    const parent = graph.getDefaultParent();

    // стили стрелок под провода
    const style = graph.getStylesheet().getDefaultEdgeStyle();
    delete style['endArrow'];
    style['strokeColor'] = '#000000';
    style['labelBackgroundColor'] = '#000000';
    style['edgeStyle'] = 'orthogonalEdgeStyle';
    style['fontColor'] = '#FFFFFF';
    style['fontSize'] = '9';
    style['movable'] = '0';
    style['strokeWidth'] = strokeWidth;
    style['rounded'] = '1';

    // Sets join node size
    style['startSize'] = joinNodeSize;
    style['endSize'] = joinNodeSize;




    // предпросмотр при перетаскивании

    const dragElt = document.createElement('div');
    dragElt.style.border = 'dashed black 1px';
    dragElt.style.width = '100px';
    dragElt.style.height = '100px';

    // добавление ESP на поле
    const imgESP = document.getElementById('esp_im');
    function dropESP(): void {
      try {
        graph.getModel().beginUpdate();
        const v1 = graph.insertVertex(parent, null, 'ESP8266', Math.random()*500, Math.random()*300, 200, 100,
          'verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=' + fillColor);
        v1.setConnectable(false);

        const v11 = graph.insertVertex(v1, null, '3.3V', 0, 0, 10, 16,
          'shape=line;align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;' +
          'spacingLeft=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor);
        v11.geometry.relative = true;
        v11.geometry.offset = new mxPoint(-v11.geometry.width, 2);
        const v12 = v11.clone();
        v12.value = 'GND';
        v12.geometry.offset = new mxPoint(-v11.geometry.width, 22);
        v1.insert(v12);
        const v13 = v11.clone();
        v13.value = 'Rx';
        v13.geometry.offset = new mxPoint(-v11.geometry.width, 42);
        v1.insert(v13);
        const v14 = v11.clone();
        v14.value = 'Tx';
        v14.geometry.offset = new mxPoint(-v11.geometry.width, 62);
        v1.insert(v14);

        const v15 = v11.clone();
        v15.value = 'D1';
        v15.geometry.x = 1;
        v15.style = 'shape=line;align=right;verticalAlign=middle;fontSize=10;routingCenterX=0.5;' +
          'spacingRight=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor;
        v15.geometry.offset = new mxPoint(0, 2);
        v1.insert(v15);
        const v16 = v15.clone();
        v16.value = 'D2';
        v16.geometry.offset = new mxPoint(0, 22);
        v1.insert(v16);
        const v17 = v15.clone();
        v17.value = 'D3';
        v17.geometry.offset = new mxPoint(0, 42);
        v1.insert(v17);
        const v18 = v15.clone();
        v18.value = 'D4';
        v18.geometry.offset = new mxPoint(0, 62);
        v1.insert(v18);

        const v19 = v15.clone();
        v19.value = 'RST';
        v19.geometry.x = 0.5;
        v19.geometry.y = 1;
        v19.geometry.width = 10;
        v19.geometry.height = 4;
        // NOTE: portConstraint is defined for east direction, so must be inverted here
        v19.style = 'shape=triangle;direction=north;spacingBottom=12;align=center;portConstraint=horizontal;' +
          'fontSize=8;strokeColor=' + strokeColor + ';routingCenterY=0.5;';
        v19.geometry.offset = new mxPoint(-4, -4);
        v1.insert(v19);


      } finally {

        graph.getModel().endUpdate();
      }
    }
    mxUtils.makeDraggable(imgESP, graph, dropESP, dragElt, 0, 0, true, true);



    // добавление LED на поле
    const imgLED = document.getElementById('led_im');
    function dropLED(): void {
      try {
        graph.getModel().beginUpdate();
        const v1 = graph.insertVertex(parent, null, 'LED', Math.random()*500, Math.random()*300, 35, 35,
          'shape=ellipse;verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=' + fillColor);
        v1.setConnectable(false);
        if (ledIsOn) {
          v1.style = 'shape=ellipse;verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=red';
        }

        const v11 = graph.insertVertex(v1, null, '', 0, 0, 10, 16,
          'shape=line;align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;' +
          'spacingLeft=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor);
        v11.geometry.relative = true;
        v11.geometry.offset = new mxPoint(-v11.geometry.width, 10);
        const v12 = v11.clone();
        v12.style = 'shape=line;align=right;verticalAlign=middle;fontSize=10;routingCenterX=0.5;' +
          'spacingRight=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor;
        v12.value = '';
        v12.geometry.offset = new mxPoint(35, 10);
        v1.insert(v12);


      } finally {

        graph.getModel().endUpdate();
      }
    }

    mxUtils.makeDraggable(imgLED, graph, dropLED, dragElt, 0, 0, true, true);


    // добавление резистора на поле
    const imgRes = document.getElementById('res_im');
    function dropResistor(): void {
      try {
        graph.getModel().beginUpdate();
        const v1 = graph.insertVertex(parent, null, 'R', Math.random()*500, Math.random()*300, 60, 15,
          'verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=' + fillColor);
        v1.setConnectable(false);
        if (ledIsOn) {
        }

        const v11 = graph.insertVertex(v1, null, '', 0, 0, 10, 16,
          'shape=line;align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;' +
          'spacingLeft=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor);
        v11.geometry.relative = true;
        v11.geometry.offset = new mxPoint(-v11.geometry.width, 0);
        const v12 = v11.clone();
        v12.style = 'shape=line;align=right;verticalAlign=middle;fontSize=10;routingCenterX=0.5;' +
          'spacingRight=12;fontColor=' + fontColor + ';strokeColor=' + strokeColor;
        v12.value = '';
        v12.geometry.offset = new mxPoint(60, 0);
        v1.insert(v12);


      } finally {

        graph.getModel().endUpdate();
      }
    }

    mxUtils.makeDraggable(imgRes, graph, dropResistor, dragElt, 0, 0, true, true);


    // добавление переключателя на поле
    const imgStick = document.getElementById('stick_im');
    function dropStick(): void {
      try {
        graph.getModel().beginUpdate();
        const v1 = graph.insertVertex(parent, null, 'switch', Math.random()*500, Math.random()*300, 60, 15,
          'verticalLabelPosition=top;verticalAlign=bottom;shadow=1;fillColor=' + fillColor);
        v1.setConnectable(false);
        if (ledIsOn) {
        }

        const v11 = graph.insertVertex(v1, null, '', 0, 0, 2,15,
          'align=left;verticalAlign=middle;fontSize=10;routingCenterX=-0.5;' +
          'spacingLeft=12;fillColor=#000000');
        v11.geometry.relative = true;
        v11.geometry.offset = new mxPoint(10, 17);
        const v12 = v11.clone();
        v12.value = '';
        v12.geometry.offset = new mxPoint(50, 17);
        v1.insert(v12);

        const v13 = v11.clone();
        v13.value = '';
        v13.geometry.offset = new mxPoint(30, 17);
        v1.insert(v13);


      } finally {

        graph.getModel().endUpdate();
      }
    }

    mxUtils.makeDraggable(imgStick, graph, dropStick, dragElt, 0, 0, true, true);


    // Undo, redo, delete
    const undoManager = new mxUndoManager();
    const listener = (sender, evt) =>
    {
      undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    const undoBtn = document.getElementById('undoBtn');
    undoBtn.onclick = function()
    {
      undoManager.undo();
    };

    const redoBtn = document.getElementById('redoBtn');
    redoBtn.onclick = function()
    {
      undoManager.redo();
    };

    const rmBtn = document.getElementById('rmBtn');
    rmBtn.onclick = function()
    {
      graph.removeCells();
    };






  }
}

