let can;
let canw = 1000;
let canh = 1000;

class Triangle {
    constructor(A, B, C, speed, parent, lerpDist, color) {
        this.A = A
        this.B = B
        this.C = C
        this.speed = speed
        this.parent = parent
        this.lerpDist = lerpDist
        this.color = color
    }
}

let parent; 
let child;  
let child2; 
let arr = [];
let totalTri = 18;

let starth = Math.sqrt((3*canh)*(3*canh) - (1.5*canw)*(1.5*canw))
let start = [
    [-1.5*canw, canh],
    [0, canh-starth],
    [1.5*canw, canh]
]

let bgcol;
function setup() {
    can = createCanvas(canh, canw)
    frameRate(60)
    parent = new Triangle(start[0].slice(), start[1].slice(), start[2].slice(), 0.005, null, 0, pickColor())
    bgcol = color(pickColor());
    arr.push(parent)
    for(let i = 0; i < totalTri; i++) {
        let prev = arr[arr.length-1]
        arr.push(new Triangle(prev.A.slice(), prev.B.slice(), prev.C.slice(), pickSpeed(), prev, pickLerpDist(), pickColor()))
    }
}

let base = r = 300;
function draw() {
    background(bgcol)
    let t = frameCount/30;
    // let t = 1;
    translate(canw/2, canh/2)

    // lets make the parent rotate around a fixed triangle called start
    let a1 = lerp(start[0][0], start[1][0], arr[0].lerpDist)
    let a2 = lerp(start[0][1], start[1][1], arr[0].lerpDist)
    let b1 = lerp(start[1][0], start[2][0], arr[0].lerpDist)
    let b2 = lerp(start[1][1], start[2][1], arr[0].lerpDist)
    let c1 = lerp(start[2][0], start[0][0], arr[0].lerpDist)
    let c2 = lerp(start[2][1], start[0][1], arr[0].lerpDist)
    arr[0].A = [a1, a2]
    arr[0].B = [b1, b2]
    arr[0].C = [c1, c2]
    arr[0].lerpDist += arr[0].speed
    arr[0].lerpDist = arr[0].lerpDist % 1;
    if(arr[0].lerpDist < 0) arr[0].lerpDist += 1;
    drawTriangle(arr[0])
    for(let i=1; i<arr.length; i++){
        moveTriangle(arr[i])
        drawTriangle(arr[i])
    }
    let midpoint = [lerp(arr[0].A[0], arr[0].B[0], 0.5), lerp(arr[0].A[1], arr[0].B[1], 0.5)]
    let startMidpoint = [lerp(start[0][0], start[1][0], 0.5), lerp(start[0][1], start[1][1], 0.5)]
    if (getDistToOrigin(midpoint) >= getDistToOrigin(startMidpoint)-10) {  // todo: remove bandage
        bgcol = arr[0].color;
        replaceLargest();
        appendSmallest();
        // delete largest here from
    }
    
}

function pickColor() {
    let r = random(100, 255)
    let g = random(100, 255)
    let b = random(100, 255)
    return color(r, g, b)
}

function pickLerpDist() {
    return random(0, 1);
}

function pickSpeed() {
    let sign = Math.round(Math.random()) * 2 - 1 ;
    print(sign)
    let speed = random(0.004, 0.0055) * sign;
    return speed;
}

function getDistToOrigin(pair) {
    return dist(0, 0, pair[0], pair[1])  // Origin is 0,0 because we translate when drawing
}

function replaceLargest() {
    arr.shift();
    r = getDistToOrigin(arr[0].A)  // adjust the radius
}

function appendSmallest(lerpDist = 0) {
    let p = arr[arr.length-1]
    arr.push(new Triangle(p.A.slice(), p.B.slice(), p.C.slice(), pickSpeed(), p, lerpDist, pickColor()))
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
    fill(tri.color)
    noStroke()
    vertex(tri.A[0], tri.A[1])
    vertex(tri.B[0], tri.B[1])
    vertex(tri.C[0], tri.C[1])
    endShape(CLOSE)
}
