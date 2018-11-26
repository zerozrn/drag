## 这是两个基于原生JavaScript和jquery-ui draggable制作的拖动滑块进行验证的Demo

### demo1  
    文件名：index.html
    ```
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
    ```
    说明：纯js实现，无需依赖任何库，可能没有那么流畅~~~

### demo2 
    文件名：index1.html
    依赖：
    ```
    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="plug-ins/jquery-ui/jquery-ui.min.js"></script>
    ```
    代码片段
    ```
    $(function(){
        var box = $("#box"), 
            slider = $("#slider"),
            dragged = $("#boxDragged"), 
            nodragged = $("#boxNoDragged");
            w = box.width() - slider.width();
            slider.draggable({
                axis: "x",
                containment: "#box",
                revert: function(event, ui){
                    var left = slider.position().left;
                    if(left < (w - 2)){
                        dragged.animate({"width": 0});
                        return true;
                    }
                },
                drag: function(event, ui){
                    dragged.css("width" , ui.position.left + "px");
                },
                stop: function(event, ui){
                    if(ui.position.left == (w-2)){
                        alert("验证成功!");
                        // 移除拖拽
                        slider.draggable("disable").css("background", "#fff url('../imgs/duigou.png') no-repeat center center");
                        nodragged.text("验证通过！");
                    }
                }
            });
    });
    ```
    说明：依赖jquery库和jquery-ui darggable实现，算是比较完美的。