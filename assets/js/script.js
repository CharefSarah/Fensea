class App {

    constructor() {




        this.dom = document.querySelector('#main-wrapper');
        this.canvas = this.dom.querySelector('#my-canvas');
        this.fragment = document.querySelector('#fragment').textContent;
        this.vertex = document.querySelector('#vertex').textContent;
        this.width = this.dom.offsetWidth;
        this.height = this.dom.offsetHeight;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.001,
            1000
        );
        this.camera.position.set(0, 0, 1);
        this.scene = new THREE.Scene();
       
        this.halfWidth = window.innerWidth / 2;
        this.halfHeight = window.innerHeight / 2;
        this.imageAspect = 1900 / 1.5;

        this.guiSettings = {
            distortion: '1'
        };
  


        this.addObjects();
        this.render();
        this.initEvents();
        this.onResize();



    }

    addObjects = () => {

        console.group(this.img)
        // Plane Material
        this.planeMat = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                u_time: {
                    type: "f",
                    value: 0
                },
                u_resolution: {
                    type: "v4",
                    value: new THREE.Vector4()
                },
                u_strength: {
                    type: "f",
                    value: 0
                },
                u_speed: {
                    type: "f",
                    value: 5
                },
                u_texture: {
                    type: "t",
                    value: new THREE.TextureLoader().load('assets/images/téléchargement.png')
                },
                u_distortion: {
                    type: "i",
                    value: 1
                },
            },
            // wireframe: true,
            transparent: true,
            vertexShader: this.vertex,
            fragmentShader: this.fragment
        });


        // Plane Geometry
        this.planeGeo = new THREE.PlaneBufferGeometry(0.8, 1, 100, 100);

        // Plane Mesh
        this.plane = new THREE.Mesh(this.planeGeo, this.planeMat);

        // Add plane to scene
        this.scene.add(this.plane);

    }

    render = () => {

        // Update Uniforms
        this.planeMat.uniforms.u_time.value += 0.05;
        this.planeMat.uniforms.u_distortion.value = this.guiSettings.distortion;
        this.planeMat.uniforms.u_strength.value = 10.0;
        this.planeMat.uniforms.u_speed.value = 0.4;



        // Render
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera)
    }



    initEvents = () => {
        window.addEventListener('resize', this.onResize);
    }

    onResize = () => {

        this.width = this.dom.offsetWidth;
        this.height = this.dom.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;


        /* Image cover */
        let a1;
        let a2;
        if (this.height / this.width < this.imageAspect) {
            a2 = (1 / this.imageAspect) * this.height / this.width;
            a1 = 1;
        } else {
            a2 = 1;
            a1 = this.width / this.height * this.imageAspect;
        }


        // update uniforms

        this.planeMat.uniforms.u_resolution.value.x = this.width;
        this.planeMat.uniforms.u_resolution.value.y = this.height;
        this.planeMat.uniforms.u_resolution.value.z = a1;
        this.planeMat.uniforms.u_resolution.value.w = a2;





        this.camera.updateProjectionMatrix();

    }
}

new App();




const crystal = document.getElementById("crystal");
const mycanvas = document.getElementById("my-canvas");

document.onmousemove = ev => {
  const positionX = (window.innerWidth / -10 - ev.x) / -60;
  const positionY = -ev.y / 30;
  crystal.style.transform = `translate(${positionX}px, ${positionY}px)`;
  mycanvas.style.transform = `translate(${positionY}px, ${positionX}px)`;
  
};


