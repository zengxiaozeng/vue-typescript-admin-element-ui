<template>
     
    <div id="loginBgMain">
           
        <div id="bg-main">
                 
            <canvas id="loginBg"></canvas>
               
        </div>
         
    </div>
</template>
​
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

let tick = 0,
    options = {
        len: 20,
        count: 50,
        baseTime: 10,
        addedTime: 10,
        dieChance: .01,
        spawnChance: .5,
        sparkChance: .1,
        sparkDist: 10,
        sparkSize: 2,
        color: `hsl(tone, 100%, light%)`,
        baseLight: 50,
        addedLight: 10,
        shadowToTimePropMult: 6,
        baseLightInputMultiplier: .01,
        addedLightInputMultiplier: .02,
        ox: 0,
        oy: 0,
        repaintAlpha: .04,
        toneChange: .1
    },
    lines = new Array(),
    dieX: number = 0,
    dieY: number = 0,
    clientHeight: number = 0,
    clientWidth: number = 0,
    baseRadius = Math.PI * 2 / 6
​
@Component
export default class Main extends Vue {
    name = "ContentMain"

    mounted() {
        const bg = document.getElementById('loginBg') as HTMLCanvasElement,
              bgMain = document.getElementById('bg-main') as HTMLDivElement
        let ctx = bg.getContext('2d') as CanvasRenderingContext2D
        clientWidth = bg.width = bgMain.clientWidth
        clientHeight = bg.height = bgMain.clientHeight
        options.ox = clientWidth / 2
        options.oy = clientHeight / 2
        dieX = clientWidth / 2 / options.len
        dieY = clientHeight / 2 / options.len
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, clientWidth, clientHeight)
​
        function loop() {
            // setTimeout(()=>requestAnimationFrame(loop),  50)
            requestAnimationFrame(loop)
            ++tick;
            ctx.globalCompositeOperation = "source-over"
            ctx.shadowBlur = 0
            ctx.fillStyle = "rgba(0, 0, 0, alp)".replace('alp', options.repaintAlpha.toString())
            ctx.fillRect(0, 0, clientWidth, clientHeight)
            ctx.globalCompositeOperation = "lighter"
            if (lines.length < options.count && Math.random() < options.spawnChance)
                lines.push(new Line(ctx))
            lines.map(line => line.step())
        }
    ​
        window.addEventListener('resize', (e: Event) => {
            clientWidth = bg.width = bgMain.clientWidth
            clientHeight = bg.height = bgMain.clientHeight
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, clientWidth, clientHeight)
            options.ox = clientWidth / 2
            options.oy = clientHeight / 2
            dieX = clientWidth / 2 / options.len
            dieY = clientHeight / 2 / options.len
        })
    ​
        loop()
    }
}
​
interface Option {
    readonly len: number;
    readonly count: number;
    readonly baseTime: number;
    readonly addedTime: number;
    readonly dieChance: number;
    readonly spawnChance: number;
    readonly sparkChance: number;
    readonly sparkDist: number;
    readonly sparkSize: number;
    readonly color: string;
    readonly baseLight: number;
    readonly addedLight: number;
    readonly shadowToTimePropMult: number;
    readonly baseLightInputMultiplier: number;
    readonly addedLightInputMultiplier: number;
    ox: number;
    oy: number;
    readonly repaintAlpha: number;
    readonly toneChange: number;
}

class Line {
    private x = 0;
    private y = 0;
    private addedX = 0;
    private addedY = 0;
    private radius = 0;
    private lightInputMultiplier = 0;
    private color = "";
    private cumulativeTime = 0;
    private time = 0;
    private targetTime = 0;
    private ctx: CanvasRenderingContext2D
​

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.reset()
    }

​

    reset() {
        this.x = 0;
        this.y = 0;
        this.addedX = 0;
        this.addedY = 0;
        this.radius = 0;
        this.lightInputMultiplier =
            options.baseLightInputMultiplier +
            options.addedLightInputMultiplier * Math.random();
        this.color = options.color.replace(
            "tone",
            (options.toneChange * tick).toString()
        );
        this.cumulativeTime = 0;
        this.beginPhase();
    }

​

    beginPhase() {
        this.x += this.addedX;
        this.y += this.addedY;
        this.time = 0;
        this.targetTime = (options.baseTime + options.addedTime * Math.random()) | 0;
        this.radius += baseRadius * (Math.random() < 0.5 ? 1 : -1);
        this.addedX = Math.cos(this.radius);
        this.addedY = Math.sin(this.radius);
​
        if (Math.random() < options.dieChance ||
            this.x > dieX || this.x < -dieX ||
            dieY > dieY || this.y < -dieY)
            this.reset()
    }

​

    step() {
        ++this.time
        ++this.cumulativeTime
        if (this.time >= this.targetTime) this.beginPhase();
        let prop = this.time / this.targetTime,
            wave = Math.sin(prop * Math.PI / 2),
            x = this.addedX * wave,
            y = this.addedY * wave;
        this.ctx.shadowBlur = prop * options.shadowToTimePropMult;
        this.ctx.fillStyle = this.ctx.shadowColor = this.color.replace(
            "light",
            (options.baseLight +
                options.addedLight *
                Math.sin(this.cumulativeTime * this.lightInputMultiplier)).toString()
        );
        this.ctx.fillRect(
            options.ox + (this.x + x) * options.len,
            options.oy + (this.y + y) * options.len,
            2, 2);
        if (Math.random() < options.sparkChance)
            this.ctx.fillRect(
                options.ox +
                (this.x + x) * options.len +
                Math.random() * options.sparkDist * (Math.random() < 0.5 ? 1 : -1) - options.sparkSize / 2,
                options.oy +
                (this.y + y) * options.len +
                Math.random() * options.sparkDist * (Math.random() < 0.5 ? 1 : -1) - options.sparkSize / 2,
                options.sparkSize,
                options.sparkSize
            );
    }
}
</script>
​
<style lang="scss">
    #loginBgMain {
        position: relative;
        top: 0;
        left: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        margin-top: 0;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        #bg-main {
            margin: 0;
            width: 100%;
            height: 100%;
            padding: 0;
            z-index: 0;
        }
    }
</style>
