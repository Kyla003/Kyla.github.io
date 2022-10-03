var canvas;
var gl;

var positions;

var numTimesToSubdivide = 0;

var bufferId;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");


    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three positions.


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

        document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};

function triangle(a, b)
{
    positions.push(a, b);
}

function divideTriangle(a, b, count)
{

    // check for end of recursion

    if (count == 0) {
        triangle(a, b);
    }
    else {

        //bisect the sides
        //find lines 

        var ab = mix(a, b, 0.33);
        var bc = mix(a, c, 0.66);
        // find top of the triange
        var len = bc[0] - ab[0];
        var c_x = ab[0] + len;
        var c_y = len * (Math.sqrt(3)/2);
        var c = vec2(c_x,c_y);
        --count;

        /* Points:
        a = Start of line 
        b = End of line
        ab = 1/3 of line
        bc = 2/3 of line
        c = Top of triangle (mid)
        */

        // three new triangles

        divideTriangle(a, ab, count);
        divideTriangle(ab, c, count);
        divideTriangle(c, bc, count);
        divideTriangle(bc, b, count);
    }
}

function render()
{
    var vertices = [
        vec2(-1, 0),
        vec2(1,  0)
    ];
    positions = vertices;
    //divideTriangle( vertices[0], vertices[1], vertices[2],
                    //numTimesToSubdivide);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINE_STRIP, 0, positions.length );
    positions = [];
}
