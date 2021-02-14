let can;
let canw = 700;
let canh = 700;

class Triangle {
    constructor(A, B, C, parent, speed, lerpDist, isLargest) {
        this.A = A
        this.B = B
        this.C = C
        this.parent = parent
        this.speed = speed
        this.lerpDist = lerpDist
        this.isLargest = isLargest
    }
}

let parent = new Triangle(
    [200, 400],
    [600, 400],
    [400, 400-346.410161514],
    null,
    0.05,
    0,
    true
)

let child = new Triangle(
    parent.A.slice(),  // these arent supposed to be referenced but they leave cool artifacts
    parent.B.slice(),
    parent.C.slice(),
    parent,
    0.05,
    0,
    0
)

function setup() {
    can = createCanvas(canh, canw)
    frameRate(5)
}



    // [200, 400],
    // [600, 400],
    // [400, 400-346.410161514],
let base = r = 0.1;
function draw() {
    background("white")
    let t = frameCount/3;
    translate(canw/2, canh/2)

    beginShape()
    fill("blue")
    ellipse(cos(t)*100, sin(t)*100, 10, 10)
    fill("red")
    ellipse(cos(t-2*Math.PI/3)*100, sin(t-2*Math.PI/3)*100, 10, 10)
    fill("green")
    ellipse(cos(t+2*Math.PI/3)*100, sin(t+2*Math.PI/3)*100, 10, 10)
    // vertex(cos(t)+200, sin(t)+400)
    // vertex(cos(t)+600, sin(t)+400)
    // vertex(cos(t)+400, sin(t)+53.589838486)
    endShape(CLOSE)
    // noLoop()
    
    r+=0.05;
}

function moveTriangle(tri) {
    tri.A[0] = lerp(tri.parent.A[0], tri.parent.B[0], tri.lerpDist)
    tri.A[1] = lerp(tri.parent.A[1], tri.parent.B[1], tri.lerpDist)
    tri.B[0] = lerp(tri.parent.B[0], tri.parent.C[0], tri.lerpDist)
    tri.B[1] = lerp(tri.parent.B[1], tri.parent.C[1], tri.lerpDist)
    tri.C[0] = lerp(tri.parent.C[0], tri.parent.A[0], tri.lerpDist)
    tri.C[1] = lerp(tri.parent.C[1], tri.parent.A[1], tri.lerpDist)
    tri.lerpDist += tri.speed
    tri.lerpDist = tri.lerpDist % 1;
}


function drawTriangle(tri) {
    beginShape()
    vertex(tri.A[0], tri.A[1])
    vertex(tri.B[0], tri.B[1])
    vertex(tri.C[0], tri.C[1])
    endShape(CLOSE)
}
