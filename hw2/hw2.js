var canvas;
var gl;

var positions =[];

var numTimesToSubdivide = 0;

var bufferId;

init();

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    render();
    };

    function render()
    {
        var left  = vec2( -1.0 ,  0.0);
        var right = vec2(  1.0 ,  0.0);
        divFlake(left,right,numTimesToSubdivide);
        //divFlake(left,right,1);
        console.log(positions);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.LINES, 0, positions.length );
        positions = [];
    }
     
    


document.getElementById("slider").onchange = function(event) {
    numTimesToSubdivide = parseInt(event.target.value);
    render();
};



function divFlake(left, right, count) {

    const sqrt3d2 = 0.87; //constant value 

    var pos1 = mix(left,right,0.33); // left : (-1,0) | right: (1,0)
                                     // (1.0-0.33)*left + 0.33*right

    var pos2 = mix(left,right,0.67); // left : (-1,0) | right: (1,0)
                                     // (1.0-0.67)*left + 0.67*right

    //pos1 :-0.3399999999999999,0
    //pos2 :0.3400000000000001,0

    if (count==0) {
        positions.push(left);
        positions.push(pos1);
        positions.push(pos1);
        positions.push(pos2);
        positions.push(pos2);
        positions.push(right);

    } else {

       // calc top and make sure it is a vec2

       var len = pos2[0] - pos1[0]; // len = b - a | take x point from pos1 and pos2
       var top = vec2( pos1[0]+len/2 , len*sqrt3d2 ); // x = a + len/2 | divide 2 on length to get middle point of x 
        
       //this points draw triangle
       positions.push(pos1);
       positions.push(top);
       positions.push(top);
       positions.push(pos2);
       --count;

    
       divFlake(left,pos1,count);   //draw left 
       divFlake(pos2,right,count); //draw right 

       /**
        * USING recursive function to draw 
        * if count 4 
        * 
        * draw triangle in middle first 
        * 
        * draw left (get point of triangle pos1,pos2 from left to pos1)
        * draw left (get point of triangle pos1,pos2 from left to pos1) | at this point pos1 and pos2 value if different then upper step
        * draw left (get point of triangle pos1,pos2 from left to pos1)  
        * 
        * draw right(get point of triangle pos1,pos2 from pos2 to right)
        * draw right(get point of triangle pos1,pos2 from pos2 to right)
        * draw right(get point of triangle pos1,pos2 from pos2 to right)
        * 
        * recursive function will end when function hit count 0
        */

    }

}



