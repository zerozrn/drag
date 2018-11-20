document.addEventListener("DOMContentLoaded", function(){
    var box = document.getElementById("box"),
        boxDragged = document.getElementById("boxDragged"),
        slider = document.getElementById("slider"),
        boxNoDragged = document.getElementById("boxNoDragged");
        distance = box.offsetWidth - slider.offsetWidth, // 滑块移动的距离
        flag = false;  // 是否成功的标志
    slider.onmousedown = function(e){
        slider.style.transition = "";
        boxDragged.style.transition ="";
        box.onmousemove = function(e){
            var e = e || window.event;
            var l = box.offsetLeft,
                dis = e.pageX - l;
                // 移动的距离大于(容器的宽度 - 滑块的宽度)
                if(dis > distance){
                    dis = distance;
                }
                // 移动到了容器的左侧.那么将滑块距离容器左侧的位置置0
                else if(dis < 0){
                    dis = 0;
                }
                slider.style.left = dis + "px";
                boxDragged.style.width = dis + "px";
            if(dis == distance){
                flag = true;
                slider.onmousedown = null;
                box.onmousemove = null;
                alert("验证成功");
                boxNoDragged.innerHTML = "验证通过!";
                slider.style.background = "#fff url('../imgs/duigou.png') no-repeat center center";
            }
        };
    };

    document.onmouseup = function(e){
        // 如果没有到容器的右侧边缘,则让滑块回到最初始位置
        // 如果到了容器最右侧边缘则验证成功
        if(flag){
            return;
        }else{
            slider.style.left = 0;
            boxDragged.style.width = 0;
            slider.style.transition = "left .8s ease";
            boxDragged.style.transition = "width .8s ease";
        }

        // 如果鼠标松开了就不需要再拖动滑块了,所以将事件处理程序删除
        box.onmousemove = null;
        document.mouseup = null;
    };
});


