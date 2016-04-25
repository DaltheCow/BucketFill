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

//it will change the color to whatever context.fillStyle holds, call stack is always exceeded unless the object is small
function bucketFill(clickColor,pos,c) {
    if (pos.x >= 0 && pos.x < example.width && pos.y >= 0 && pos.y < example.height) 
    {
        if (JSON.stringify(c.getImageData(pos.x,pos.y,1,1).data) === JSON.stringify(clickColor)) {
            c.fillRect(pos.x,pos.y,1,1);
            bucketFill(clickColor,{x:pos.x+1,y:pos.y},c);
            bucketFill(clickColor,{x:pos.x,y:pos.y+1},c);
            bucketFill(clickColor,{x:pos.x-1,y:pos.y},c);
            bucketFill(clickColor,{x:pos.x,y:pos.y-1},c);
        }
    }
}

var example = document.getElementById('example');
var context = example.getContext('2d');
context.fillStyle = 'yellow';

$('#example').click(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
    if ('#' + rgbToHex(p[0], p[1], p[2]) != context.fillStyle)
    bucketFill(p,{x:x,y:y},c);
});
