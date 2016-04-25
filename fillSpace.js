function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function bucketFill(clickColor,newColor,pos,checked,c) {
    if (!checked.reverse().some(function(AE)
    {   count++;
        return pos.x === AE.x && pos.y === AE.y;})
        && pos.x >= 0 && pos.x < example.width && pos.y >= 0 && pos.y < example.height) 
    {
        checked.push({x:pos.x,y:pos.y});
        if (JSON.stringify(c.getImageData(pos.x,pos.y,1,1).data) === JSON.stringify(clickColor)) {
            c.fillStyle = newColor;
            c.fillRect(pos.x,pos.y,1,1);
            bucketFill(clickColor,newColor,{x:pos.x+1,y:pos.y},checked,c);
            bucketFill(clickColor,newColor,{x:pos.x-1,y:pos.y},checked,c);
            bucketFill(clickColor,newColor,{x:pos.x,y:pos.y+1},checked,c);
            bucketFill(clickColor,newColor,{x:pos.x,y:pos.y-1},checked,c);
        }
    }
}

// set up some squares
var example = document.getElementById('example');
var context = example.getContext('2d');
var count = 0;
context.fillStyle = 'black';
context.fillRect(example.width/2,10,2,example.height-20);


$('#example').click(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
    bucketFill(p,'yellow',{x:x,y:y},[],c);
    console.log(count);
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
});
