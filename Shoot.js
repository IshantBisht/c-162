AFRAME.registerComponent("bullets",{
    init:function(){
        this.shootBullet()
    },

    shootBullet:function(){
       window.addEventListener("keydown",(e)=>{
        if(e.key=="z"){
          var bullet=document.createElement("a-entity")
          bullet.setAttribute("geometry",{
            primitive:"sphere",
            radius:0.1
          })
          bullet.setAttribute("material","color","black")
          var camera=document.querySelector("#camera").object3D
          var cam=document.querySelector("#camera")
          var direction=new THREE.Vector3()
          camera.getWorldDirection(direction)
          bullet.setAttribute("velocity",direction.multiplyScalar(-10))
          var pos=cam.getAttribute("position")
          bullet.setAttribute("position",{
            x:pos.x,
            y:pos.y,
            z:pos.z
          })
          bullet.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:"0"
          })
          var scene=document.querySelector("#scene")
          bullet.addEventListener("collide",this.removeBullet)
          scene.appendChild(bullet)
        }
       })
    },

    removeBullet:function(e){
       //console.log(e.detail.target.el)
       //console.log(e.detail.body.el)
       var element=e.detail.target.el
       var element_hit=e.detail.body.el

       if(element_hit.id.includes("box")){
        element_hit.setAttribute("material",{
            opacity:1,
            transparent:true
        })
        var impulse=new CANNON.Vec3(-2,2,1)
        var WordPoint=new CANNON.Vec3().copy(element_hit.getAttribute("position"))
        element_hit.body.applyImpulse(impulse,WordPoint)
        element.removeEventListener("collide",this.shoot)
        var scene=document.querySelector("#scene")
        scene.removeChild(element)
       }
    }

})