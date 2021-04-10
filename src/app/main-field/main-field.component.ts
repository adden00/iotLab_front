import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var mxGraph: any;
// declare var mxShape: any;
// declare var mxConnectionConstraint: any;
// declare var mxPoint: any;
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
// declare var mxGuide: any;
// declare var mxEdgeHandler: any;
declare var mxRectangle: any;
declare var mxUndoManager: any;

@Component({
  selector: 'app-main-field',
  templateUrl: './main-field.component.html',
  styleUrls: ['./main-field.component.scss']
})
export class MainFieldComponent implements OnInit {

  constructor() { }
  @ViewChild('graphContainer') graphContainer: ElementRef;

  ngOnInit(): void {
  }
  ngAfterViewInit() {


    document.body.appendChild(mxUtils.button('Delete', function()
    {
      graph.removeCells();
    }));
    // TODO: mxutils.makeDraggable - драг н дроп
    mxConnectionHandler.prototype.movePreviewAway = false;
    mxConnectionHandler.prototype.waypointsEnabled = true;
    mxGraph.prototype.resetEdgesOnConnect = false;

    mxConstants.SHADOWCOLOR = '#C0C0C0';
    const joinNodeSize = 7;
    const strokeWidth = 2;
    mxConstraintHandler.prototype.pointImage = new mxImage('https://raw.githubusercontent.com/jgraph/mxgraph/master/javascript/examples/images/dot.gif', 10, 10);


    // mxGraphHandler.prototype.guidesEnabled = true;
    // mxGuide.prototype.isEnabledForEvent = function(evt)
    // {
    //   return !mxEvent.isAltDown(evt);
    // };
    //
    // mxEdgeHandler.prototype.snapToTerminals = true;
    //
    //
    // mxGraph.prototype.getAllConnectionConstraints = function(terminal, source)
    // {
    //   if (terminal != null && terminal.shape != null)
    //   {
    //     if (terminal.shape.stencil != null)
    //     {
    //       if (terminal.shape.stencil.constraints != null)
    //       {
    //         return terminal.shape.stencil.constraints;
    //       }
    //     }
    //     else if (terminal.shape.constraints != null)
    //     {
    //       return terminal.shape.constraints;
    //     }
    //   }
    //
    //   return null;
    // };
    //
    // // Defines the default constraints for all shapes
    // mxShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
    //   new mxConnectionConstraint(new mxPoint(0.5, 0), true),
    //   new mxConnectionConstraint(new mxPoint(0.75, 0), true),
    //   new mxConnectionConstraint(new mxPoint(0, 0.25), true),
    //   new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    //   new mxConnectionConstraint(new mxPoint(0, 0.75), true),
    //   new mxConnectionConstraint(new mxPoint(1, 0.25), true),
    //   new mxConnectionConstraint(new mxPoint(1, 0.5), true),
    //   new mxConnectionConstraint(new mxPoint(1, 0.75), true),
    //   new mxConnectionConstraint(new mxPoint(0.25, 1), true),
    //   new mxConnectionConstraint(new mxPoint(0.5, 1), true),
    //   new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
    //
    // Edges have no connection points
    // mxPolyline.prototype.constraints = null;
    //
    //
    const graph = new mxGraph(this.graphContainer.nativeElement);
    graph.setConnectable(true);
    // graph.setPanning(true);
    graph.setConnectableEdges(true);
    graph.setDisconnectOnMove(false);
    graph.foldingEnabled = false;
    graph.maximumGraphBounds = new mxRectangle(0, 0, 1220, 840);
    // graph.border = 50;
    // graph.panningHandler.isPopupTrigger = function() { return false; };
    // graph.setEnterStopsCellEditing(true);
    new mxRubberband(graph);

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






    graph.connectionHandler.createEdgeState = function(me): any
    {
      const edge = graph.createEdge(null, null, null, null, null);

      return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    };


    const parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
      const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80); // 'background:url("src/assets/images/components_library/resistir.png")');
      const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 120, 200, 80);
      // vertex2.
      graph.insertEdge(parent, '', '', vertex1, vertex2);
      graph.insertEdge(parent, '', '', vertex1, vertex2);
    }finally {

      graph.getModel().endUpdate(); }

    mxEvent.addListener(this.graphContainer.nativeElement, 'dragover', function(evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    });
    //
    //
    mxEvent.addListener(this.graphContainer.nativeElement, 'drop', function(evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation();
        evt.preventDefault();

        // Gets drop location point for vertex
        const pt = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
        const tr = graph.view.translate;
        const scale = graph.view.scale;
        const x = pt.x / scale - tr.x;
        const y = pt.y / scale - tr.y;

        // Converts local images to data urls
        const filesArray = evt.dataTransfer.files;
        for (let i = 0; i < filesArray.length; i++) {
          handleDrop(graph, filesArray[i], x + i * 10, y + i * 10);
        }
      }
    });





    const handleDrop = (curGraph, file, x, y) =>
    {
      if (file.type.substring(0, 5) === 'image')
      {
        const reader = new FileReader();

        reader.onload = function(e)
        {
          // Gets size of image for vertex
          let data = e.target.result;

          // // SVG needs special handling to add viewbox if missing and
          // // find initial size from SVG attributes (only for IE11)
          // if (file.type.substring(0, 9) === 'image/svg')
          // {
          //   const comma = (data as string).indexOf(',');
          //   const svgText = atob((data as string).substring(comma + 1));
          //   const root = mxUtils.parseXml(svgText);
          //
          //   // Parses SVG to find width and height
          //   if (root != null)
          //   {
          //     const svgs = root.getElementsByTagName('svg');
          //
          //     if (svgs.length > 0)
          //     {
          //       const svgRoot = svgs[0];
          //       let w = parseFloat(svgRoot.getAttribute('width'));
          //       let h = parseFloat(svgRoot.getAttribute('height'));
          //
          //       // Check if viewBox attribute already exists
          //       const vb = svgRoot.getAttribute('viewBox');
          //
          //       if (vb == null || vb.length === 0)
          //       {
          //         svgRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
          //       }
          //         // Uses width and height from viewbox for
          //       // missing width and height attributes
          //       else if (isNaN(w) || isNaN(h))
          //       {
          //         const tokens = vb.split(' ');
          //
          //         if (tokens.length > 3)
          //         {
          //           w = parseFloat(tokens[2]);
          //           h = parseFloat(tokens[3]);
          //         }
          //       }
          //
          //       w = Math.max(1, Math.round(w));
          //       h = Math.max(1, Math.round(h));
          //
          //       data = 'data:image/svg+xml,' + btoa(mxUtils.getXml(svgs[0], '\n'));
          //       curGraph.insertVertex(null, null, '', x, y, w, h, 'shape=image;image=' + data + ';');
          //     }
          //   }
          // }
          // else
          {
            const img = new Image();
            let sData = data as string;


            img.onload = function()
            {
              const w = Math.max(1, img.width);
              const h = Math.max(1, img.height);

              // Converts format of data url to cell style value for use in vertex
              const semi = sData.indexOf(';');

              if (semi > 0)
              {
                sData = sData.substring(0, semi) + sData.substring(sData.indexOf(',', semi + 1));
              }
              console.log('sData^ ');
              console.log(sData);

              curGraph.insertVertex(null, null, '', x, y, w, h, 'shape=image;image=' + sData + ';');
            };

            img.src = (sData);
          }
        };

        reader.readAsDataURL(file);
      }
    };

    // Undo/redo
    const undoManager = new mxUndoManager();
    const listener = function(sender, evt)
    {
      undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);

    document.body.appendChild(mxUtils.button('Undo', function()
    {
      undoManager.undo();
    }));

    document.body.appendChild(mxUtils.button('Redo', function()
    {
      undoManager.redo();
    }));







  }
}
