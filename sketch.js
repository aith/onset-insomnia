let can;
let canw = 800;
let canh = 800;

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

let parent = new Triangle([200, 400], [600, 400], [400, 400-346.410161514], null, 0.05, 0, true)
let child = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, 0.01, 0, 0)
let child2 = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), child, -0.005, 0, 0)

function setup() {
    can = createCanvas(canh, canw)
    frameRate(30)
}

let base = r = 200;
function draw() {
    background("white")
    let t = frameCount/30;
    // let t = 1;
    translate(canw/2, canh/2)

    let A = [cos(t)*r, sin(t)*r]
    let B = [cos(t-2*Math.PI/3)*r, sin(t-2*Math.PI/3)*r]
    let C = [cos(t+2*Math.PI/3)*r, sin(t+2*Math.PI/3)*r]
    parent.A = A;
    parent.B = B;
    parent.C = C;
    r+=1;

    beginShape()
    fill("lightblue")
    vertex(A[0], A[1])
    vertex(B[0], B[1])
    vertex(C[0], C[1])
    endShape(CLOSE)

    fill("yellow")
    moveTriangle(child)
    drawTriangle(child)

    fill("green")
    moveTriangle(child2)
    drawTriangle(child2)
    // noLoop()
    
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
    if(tri.lerpDist < 0) tri.lerpDist += 1;
}


function drawTriangle(tri) {
    beginShape()
    vertex(tri.A[0], tri.A[1])
    vertex(tri.B[0], tri.B[1])
    vertex(tri.C[0], tri.C[1])
    endShape(CLOSE)
}
