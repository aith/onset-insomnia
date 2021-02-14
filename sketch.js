let can;
let canw = 800;
let canh = 800;

class Triangle {
    constructor(A, B, C, parent, speed, lerpDist, color, child) {
        this.A = A
        this.B = B
        this.C = C
        this.parent = parent
        this.speed = speed
        this.lerpDist = lerpDist
        this.color = color
        this.child = child  // usually a triangle won't know its child in advance
    }
}

let parent; 
let child;  
let child2; 
let arr = [];
let killThresh = Math.sqrt((canw/2)*(canw/2)+(canh/2)*(canh/2))

let bgcol;
function setup() {
    can = createCanvas(canh, canw)
    frameRate(30)
    parent = new Triangle([200, 400], [600, 400], [400, 400-346.410161514], null, 0.05, 0, color("purple"))
    child = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), parent, 0.01, 0, 0)
    child2 = new Triangle(parent.A.slice(), parent.B.slice(), parent.C.slice(), child, -0.005, 0, 0)
    bgcol = color("lightblue");
    largest = { pointer:parent };  // largest triangle
    arr.push(parent)
}

let base = r = 300;
function draw() {
    background(bgcol)
    let t = frameCount/30;
    // let t = 1;
    translate(canw/2, canh/2)

    let A = [cos(t)*r, sin(t)*r]
    let B = [cos(t-2*Math.PI/3)*r, sin(t-2*Math.PI/3)*r]
    let C = [cos(t+2*Math.PI/3)*r, sin(t+2*Math.PI/3)*r]
    arr[0].A = A;
    arr[0].B = B;
    arr[0].C = C;
    r+=10;

    beginShape()
    fill(arr[0].color)
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
    let midpoint = [lerp(arr[0].A[0], arr[0].B[0], 0.5), lerp(arr[0].A[1], arr[0].B[1], 0.5)]
    print("midpoint is "+midpoint)
    // print(midpoint)
    print(arr[0])
    if (getDistToOrigin(midpoint) > killThresh) {
        print("dist is"+getDistToOrigin(midpoint))
        bgcol = arr[0].color;
        replaceLargest();
        // delete largest here from
    }
    
}

function getDistToOrigin(pair) {
    return dist(0, 0, pair[0], pair[1])  // Origin is 0,0 because we translate when drawing
}

function replaceLargest() {
    print("replaced")
    arr.shift();
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
