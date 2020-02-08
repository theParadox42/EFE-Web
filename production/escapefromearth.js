/**
 -=o= ESCAPE FROM EARTH =o=-
    Creators:
        theParadox42
        tannerderp
    All code is licenced under the GNU, see https://github.com/theParadox42/escape-from-earth/blob/master/LICENSE
    Or go to https://escapefromearth.tk/LICENSE for a download
*/
var game = {
    /** Keep this this **/
    currentScene: "load",
    // Current scene, should stay on "load"
    previousScene: "home",
    sceneIndex: 0,
    // Scene index, should start on 0
    sceneOrder: [ "load", "home", "wakeup", "run", "launchpad", "build", "rocketbuilt", "fly-moon", "moon", "fly-mars", "marslanding", "fight", "leavemars", "fly-venus", "seeufo", "ufo", "landonvenus", "won" ],
    canSave: {
        run: true,
        launchpad: true,
        build: true,
        rocketbuilt: true,
        "fly-moon": true,
        moon: true,
        "fly-mars": true,
        marslanding: true,
        fight: true,
        leavemars: true,
        "fly-venus": true,
        seeufo: true,
        ufo: true,
        landonvenus: true
    },
    hasPause: {
        // What scenes need a pause button
        wakeup: true,
        run: true,
        launchpad: true,
        build: true,
        rocketbuilt: true,
        "fly-moon": true,
        moon: true,
        "fly-mars": true,
        marslanding: true,
        fight: true,
        leavemars: true,
        "fly-venus": true,
        seeufo: true,
        ufo: true,
        playlevel: true,
        landonvenus: true
    },
    reqControls: {
        // What scenes require key controls
        run: true,
        build: true,
        "fly-moon": true,
        "fly-mars": true,
        fight: true,
        "fly-venus": true,
        seeufo: true,
        ufo: true,
        playlevel: true
    },
    paused: false,
    loadFirstOnPlay: false,
    continue: function() {
        this.previousScene = this.currentScene;
        if (this.sceneOrder[this.sceneIndex + 1]) {
            if (typeof this.getFunc().reset == "function") this.getFunc().reset();
            this.sceneIndex++;
            this.currentScene = this.sceneOrder[this.sceneIndex];
            if (typeof this.getFunc().init == "function") this.getFunc().init();
        } else console.log("End of scenes");
    },
    setScene: function(newScene, error) {
        if (!error) {
            this.previousScene = this.currentScene;
            if (typeof this.getFunc().reset == "function") this.getFunc().reset();
        }
        if (typeof newScene == "number") {
            this.currentScene = this.sceneOrder[newScene];
        } else if (typeof newScene == "string") {
            this.currentScene = newScene;
        }
        if (typeof this.getFunc().init == "function") this.getFunc().init();
        if (typeof newScene == "number") {
            this.sceneIndex = newScene;
        } else {
            var newIndex = this.sceneOrder.findIndex(function(a) {
                return a == game.currentScene;
            });
            this.sceneIndex = newIndex >= 1 ? newIndex : 0;
        }
    },
    getFunc: function() {
        let sceneFunctions = {
            wait: waitingForFileCount,
            load: loadFiles,
            home: Home,
            choose: ChooseUseSave,
            wakeup: wakeUpScene,
            run: runToRocket,
            launchpad: AtLaunchPad,
            build: buildRocket,
            rocketbuilt: RocketBuilt,
            "fly-moon": flyToMoon,
            moon: moon,
            "fly-mars": flyToMars,
            marslanding: marsLanding,
            fight: fightMartians,
            leavemars: leaveMars,
            "fly-venus": flyToVenus,
            seeufo: UfoCutscene,
            ufo: ufoBossFight,
            landonvenus: LandOnVenus,
            won: Won,
            loadsaves: LoadSaves,
            levelbuilder: levelBuilder,
            communitylevels: communityLevels,
            playlevel: playLevel
        };
        if (sceneFunctions[this.currentScene]) {
            return sceneFunctions[this.currentScene];
        } else {
            console.warn("Unknown scene: " + this.currentScene);
            this.setScene("home", true);
            return this.getFunc();
        }
    },
    pause: function() {
        push();
        this.paused = true;
        fill(0, 0, 0, 180);
        noStroke();
        rect(0, 0, width, height);
        this.minSide = this.minSide || min(min(width, height), imgs.playbtn.width * 2) / 2;
        noStroke();
        fill(255);
        ellipse(width / 2, height / 2 - this.minSide * .3, this.minSide * 1.1, this.minSide * 1.1);
        rectMode(CENTER);
        stroke(0);
        strokeWeight(5);
        rect(width / 2, height / 2 + this.minSide * .5, width / 2, this.minSide * .2);
        if (this.canSave[this.currentScene]) {
            rect(width / 2, height / 2 + this.minSide * .8, width / 2, this.minSide * .2);
        }
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textFont(fonts.londrina);
        textSize(this.minSide * .15);
        text(this.currentScene == "playlevel" ? "Back" : "Home", width / 2, height / 2 + this.minSide * .5);
        if (this.canSave[this.currentScene]) {
            text("Save", width / 2, height / 2 + this.minSide * .8);
            textSize(this.minSide * .05);
            fill(255);
            text("Going home also saves your progress", width / 2, height - this.minSide * .05);
        }
        imageMode(CENTER);
        image(imgs.playbtn, width / 2, height / 2 - this.minSide * .3, this.minSide, this.minSide);
        pop();
        if (!isMobile) {
            this.pausedImage = get();
        }
    },
    displayPaused: function() {
        if (this.paused && this.pausedImage) {
            image(this.pausedImage, 0, 0, width, height);
        } else if (!this.paused) {
            push();
            fill(255);
            noStroke();
            ellipse(25, 25, 45, 45);
            image(imgs.pausebtn, 5, 5, 40, 40);
            pop();
        } else {
            console.log("Paused image not loaded...");
        }
    },
    updatePaused: function() {
        if (this.paused) {
            if (dist(mouseX, mouseY, width / 2, height / 2 - this.minSide * .3) < this.minSide * .55) {
                cursor(HAND);
                if (clicked) {
                    this.paused = false;
                }
            } else if (mouseX > width / 4 && mouseX < width * 3 / 4 && mouseY > height / 2 + this.minSide * .4 && mouseY < height / 2 + this.minSide * .6) {
                cursor(HAND);
                if (clicked) {
                    if (this.currentScene != "playlevel") this.saveCurrentProgress();
                    this.setScene(this.currentScene == "playlevel" ? this.previousScene : "home");
                }
            } else if (this.canSave[this.currentScene] && mouseX > width / 4 && mouseX < width * 3 / 4 && mouseY > height / 2 + this.minSide * .7 && mouseY < height / 2 + this.minSide * .9) {
                cursor(HAND);
                if (clicked) {
                    this.saveProgress();
                }
            }
        } else {
            if (mouseX < 50 && mouseY < 50) {
                cursor(HAND);
                if (clicked) {
                    this.pause();
                    clicked = false;
                } else if (pressed) {
                    pressed = false;
                }
            }
        }
    },
    alreadyLoaded: false,
    saveCurrentProgress: function() {
        if (!this.canSave[this.currentScene]) return;
        var progress = this.saveProgress(null, true);
        localStorage.currentSave = JSON.stringify(progress);
    },
    saveProgress: function(scene, returnObj) {
        if (!this.canSave[this.currentScene]) return console.log("Not a valid scene to save from");
        var saveObject = {};
        saveObject.scene = scene || this.currentScene;
        var data = 0;
        switch (saveObject.scene) {
          case "run":
            data = loadRun.level;
            break;

          case "build":
            data = bGame.level;
            break;
        }
        var currentDate = new Date();
        saveObject.date = {
            year: currentDate.getYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes()
        };
        if (typeof data != "undefined") saveObject.data = data;
        if (returnObj) return saveObject;
        var saves = JSON.parse(localStorage.saves || "[]");
        saves.unshift(saveObject);
        localStorage.saves = JSON.stringify(saves);
    },
    retrieveCurrentProgress: function() {
        if (!localStorage.currentSave) return console.log("No saves found");
        var savedObject;
        try {
            savedObject = JSON.parse(localStorage.currentSave);
        } catch (e) {
            return console.warn("Unparsable data type");
        }
        if (typeof savedObject != "object") return console.warn("Not an object");
        return savedObject;
    },
    retrieveProgress: function(i, arr) {
        i = i || 0;
        if (!localStorage.saves) return console.log("No saves found");
        var savedData;
        try {
            savedData = JSON.parse(localStorage.saves);
        } catch (e) {
            return console.warn("Unparsable data type");
        }
        if (typeof savedData != "object" || !savedData.length) return console.warn("Not an array");
        if (arr) return savedData;
        var savedObject = savedData[i];
        if (typeof savedObject != "object") return console.warn("Not an object");
        return savedObject;
    },
    loadProgress: function(obj) {
        var savedObject = obj ? obj : this.retrieveCurrentProgress();
        if (savedObject.data) {
            switch (savedObject.scene) {
              case "run":
                loadRun.level = savedObject.data;
                break;

              case "build":
                bGame.level = savedObject.data;
                break;
            }
        }
        this.setScene(savedObject.scene);
    },
    run: function() {
        // Pause stuff
        if (this.hasPause[this.currentScene]) {
            // Update pause status
            this.updatePaused();
            if (this.paused) {
                // Display stuff
                this.displayPaused();
                // Reset if paused
                                resetInput();
                return;
            }
        } else this.paused = false;
        // Mobile here
                if (isMobile && this.reqControls[this.currentScene]) updateMobile();
        // Main program
                this.getFunc()();
        // And here
                if (isMobile && this.reqControls[this.currentScene]) displayMobile();
        // Reset controls
                resetInput();
        // Display pause Button
                if (this.hasPause[this.currentScene]) this.displayPaused();
    },
    init: function() {
        let currentIndex = this.sceneOrder.indexOf(function(a) {
            return a == this.currentScene;
        });
        this.sceneIndex = currentIndex >= 0 ? currentIndex : this.sceneIndex;
        if (isMobile) {
            createMobileControls();
        }
        if (typeof this.getFunc().init == "function") {
            this.getFunc().init();
        }
    },
    resize: function() {
        if (typeof this.getFunc().resize == "function") {
            this.getFunc().resize();
        }
    }
};

let keys = {}, keysReleased = {};

var clicked = false, pressed = false, canPress = true;

function keyPressed() {
    keys[key] = true;
    keys[keyCode] = true;
}

function keyReleased() {
    keys[key] = false;
    keys[keyCode] = false;
    keysReleased[key] = true;
    keysReleased[keyCode] = true;
}

function mousePressed() {
    if (canPress) {
        pressed = true;
        canPress = false;
    }
}

function mouseReleased() {
    canPress = true;
    clicked = true;
}

function resetInput() {
    keysReleased = {};
    clicked = false;
    pressed = false;
}

var theEpicCanvas;

function setup() {
    windowHeight -= 30;
    theEpicCanvas = createCanvas(windowWidth, windowHeight);
    background(255);
    angleMode(DEGREES);
    game.init();
}

function draw() {
    cursor("default");
    game.run();
}

function mobileControl(x, y, w, h, keysKey, txt) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.key = keysKey;
    this.txt = txt;
}

mobileControl.prototype.update = function() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        if (mouseIsPressed) {
            mouseIsPressed = false;
        }
        if (pressed) {
            keysReleased[this.key] = true;
            pressed = false;
        }
        if (clicked) {
            clicked = false;
        }
    }
    keys[this.key] = false;
    for (var i = 0; i < touches.length; i++) {
        let tx = touches[i].x;
        let ty = touches[i].y;
        if (tx > this.x && tx < this.x + this.w && ty > this.y && ty < this.y + this.h) {
            keys[this.key] = true;
            break;
        }
    }
};

mobileControl.prototype.display = function() {
    push();
    translate(this.x, this.y);
    fill(0, 0, 0, 128);
    stroke(0, 0, 0, 200);
    strokeWeight(5);
    rect(0, 0, this.w, this.h);
    fill(255, 255, 255, 128);
    textAlign(CENTER, CENTER);
    textFont(fonts.pixel);
    textSize(20);
    text(this.txt, this.w / 2, this.h / 2);
    pop();
};

let mobileControls = [];

function createMobileControls() {
    let cw = 80;
    let ch = cw;
    let p = 10;
    let p2 = 2 * p;
    let p3 = 3 * p;
    function cmc(x, y, k, t, x2) {
        let nw = cw;
        if (x2) {
            nw = abs(x2 - x);
        }
        mobileControls.push(new mobileControl(x, y, nw, ch, k, t));
    }
    cmc(p, height - ch - p, LEFT_ARROW, "<");
    cmc(p2 + cw, height - ch - p, DOWN_ARROW, "v");
    cmc(p2 + cw, height - ch * 2 - p2, UP_ARROW, "^");
    cmc(p3 + cw * 2, height - ch - p, RIGHT_ARROW, ">");
    cmc(width - cw - p, height - ch - p, "x", "X");
    cmc(width - cw * 2 - p2, height - ch - p, "z", "Z");
    cmc(p2 * 2 + cw * 3, height - ch - p, 32, "Space", width - cw * 2 - p3);
}

function updateMobile() {
    for (var i = 0; i < mobileControls.length; i++) {
        mobileControls[i].update();
    }
}

function displayMobile() {
    for (var i = 0; i < mobileControls.length; i++) {
        mobileControls[i].display();
    }
}

var isMobile = function() {
    return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
}();

// I had to put all of these in the same file, because they couldn't use inheritance if they loaded at different times
// Collision Blocks
{
    // Block
    {
        function BBlock(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.img = imgs.garbage;
        }
        BBlock.prototype.collide = function(p) {
            let vx = abs(p.vx), vy = abs(p.vy);
            if (p.x + p.w + vx + 1 > this.x && p.x - vx - 1 < this.x + this.w && p.y + p.h + vy >= this.y && p.y - vy <= this.y + this.h) {
                if (p.x + p.w - vx * 2 - 1 > this.x && p.x + vx * 2 + 1 < this.x + this.w) {
                    if (p.y + p.h / 2 > this.y + this.h / 2) {
                        p.y = max(p.y, this.y + this.h);
                        if (p.y <= this.y + this.h) {
                            p.vy = max(p.vy, 0);
                        }
                    } else {
                        p.y = min(p.y, this.y - p.h);
                        if (p.y + p.h >= this.y) {
                            p.vy = min(p.vy, 0);
                            // if(p.vy >= 0){
                                                        p.grounded = true;
                            // }
                                                }
                    }
                } else if (p.y + p.h - vy - 1 > this.y && p.y + vy + 1 < this.y + this.h) {
                    if (p.x + p.w / 2 > this.x + this.w / 2) {
                        p.x = max(p.x, this.x + this.w);
                        if (p.x <= this.x + this.w) {
                            p.vx = max(p.vx, 0);
                        }
                    } else {
                        p.x = min(p.x, this.x - p.w);
                        if (p.x + p.w >= this.x) {
                            p.vx = min(p.vx, 0);
                        }
                    }
                }
            }
        };
        BBlock.prototype.display = function() {
            image(this.img, this.x, this.y, this.w, this.h);
        };
        BBlock.prototype.run = function(p) {
            if (p) this.collide(p);
            this.display();
        };
    }
    // Asphalt
        {
        function BAsphalt(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.asphalt;
        }
        BAsphalt.prototype = Object.create(BBlock.prototype);
    }
    // Spikes
        {
        // Up Spike
        function BSpike(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.spike;
            this.m = this.x + this.w / 2;
        }
        BSpike.prototype = Object.create(BBlock.prototype);
        BSpike.prototype.collide = function(p) {
            var vx = abs(p.vx), vy = abs(p.vy);
            if (p.x + p.w - 1 - vx > this.x && p.x + 1 + vx < this.x + this.w && p.y + p.h - 1 > this.y && p.y + 1 < this.y + this.h) {
                if (p.x + p.w < this.x + this.w / 2) {
                    if (p.y + p.h > map(p.x + p.w, this.x, this.m, this.y + this.h, this.y)) {
                        p.kill();
                    }
                } else if (p.x > this.x + this.w / 2) {
                    if (p.y + p.h > map(p.x, this.m, this.x + this.w, this.y, this.y + this.h)) {
                        p.kill();
                    }
                } else {
                    p.kill();
                }
            }
        }
        // Down Spike
        ;
        function BDSpike(x, y, w, h) {
            BSpike.call(this, x, y, w, h);
        }
        BDSpike.prototype = Object.create(BSpike.prototype);
        BDSpike.prototype.collide = function(p) {
            var vx = abs(p.vx), vy = abs(p.vy);
            if (p.x + p.w - 1 - vx > this.x && p.x + 1 + vx < this.x + this.w && p.y + p.h - 1 > this.y && p.y + 1 < this.y + this.h) {
                if (p.x + p.w < this.x + this.w / 2) {
                    if (p.y < map(p.x + p.w, this.x, this.m, this.y, this.y + this.h)) {
                        p.kill();
                    }
                } else if (p.x > this.x + this.w / 2) {
                    if (p.y + p.h < map(p.x, this.m, this.x + this.w, this.y + this.h, this.y)) {
                        p.kill();
                    }
                } else {
                    p.kill();
                }
            }
        };
        BDSpike.prototype.display = function() {
            push();
            translate(this.x, this.y + this.h / 2);
            scale(1, -1);
            image(this.img, 0, -this.h / 2, this.w, this.h);
            pop();
        };
    }
    // Platform
        {
        function BPlatform(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.platform;
        }
        BPlatform.prototype = Object.create(BBlock.prototype);
        BPlatform.prototype.collide = function(p) {
            let vx = abs(p.vx), vy = abs(p.vy);
            if (p.x + p.w + vx + 1 > this.x && p.x - vx - 1 < this.x + this.w && p.y + p.h + vy > this.y && p.y - vy < this.y + this.h) {
                if (p.x + p.w - vx * 2 - 1 > this.x && p.x + vx * 2 + 1 < this.x + this.w) {
                    if (p.y + p.h - vy - 1 < this.y && !(keys[DOWN_ARROW] || keys.s) && p.vy > 0) {
                        p.y = min(p.y, this.y - p.h);
                        if (p.y + p.h >= this.y) {
                            p.vy = min(p.vy, 0);
                            if (p.vy >= 0) {
                                p.grounded = true;
                            }
                        }
                    }
                }
            }
        };
    }
    // Toxic Waste
        {
        function BToxic(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.toxic.clone();
        }
        BToxic.prototype = Object.create(BBlock.prototype);
        BToxic.prototype.collide = function(p) {
            var vx = abs(p.vx), vy = abs(p.vy);
            if (p.x + p.w - 1 - vx > this.x && p.x + 1 + vx < this.x + this.w && p.y + p.h - 1 - vy > this.y && p.y + 1 + vy < this.y + this.h) {
                p.health -= 5;
                p.vx *= .5;
                p.vy *= .7;
                p.tint.r -= 40;
                p.tint.b -= 40;
            }
        };
        BToxic.prototype.display = function() {
            push();
            translate(this.x + this.w / 2, this.y + this.h / 2);
            drawAnimation(this.img, 0, 0, this.w, this.h);
            pop();
        };
    }
    // Fire
        {
        function BFire(x, y, w, h) {
            BToxic.call(this, x, y, w, h);
            this.img = imgs.fire.clone();
        }
        BFire.prototype = Object.create(BToxic.prototype);
        BFire.prototype.collide = function(p) {
            if (p.x + p.w - 1 > this.x && p.x + 1 < this.x + this.w && p.y + p.h - 1 > this.y && p.y + 1 < this.y + this.h) {
                p.health -= 6;
                p.tint.g -= 18;
                p.tint.b -= 25;
            }
        };
    }
    // Refinery
        {
        function BRefinery(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.refinery;
        }
        BRefinery.prototype = Object.create(BBlock.prototype);
    }
    // Smoke
        {
        function BSmoke(x, y, w, h) {
            BToxic.call(this, x, y, w, h);
            this.img = imgs.smoke.clone();
        }
        BSmoke.prototype = Object.create(BToxic.prototype);
        BSmoke.prototype.collide = function(p) {
            if (p.affectedBy.air) return;
            if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h > this.y && p.y < this.y + this.h) {
                p.affectedBy.air = true;
                p.vy -= .6;
            }
        };
    }
    // Water
        {
        function BWater(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.water;
        }
        BWater.prototype = Object.create(BBlock.prototype);
        BWater.prototype.collide = function(p) {
            if (p.affectedBy.water) return;
            if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h > this.y && p.y < this.y + this.h) {
                p.tint.r -= 10.5;
                p.tint.g -= 10.2;
                if (p.tint.r <= 0) {
                    p.health--;
                }
                p.vx *= .75;
                p.vy *= .75;
                if ((keys[32] || keys[" "] || keys[UP_ARROW] || keys.w) && p.vy > 1.4) {
                    p.vy -= 20;
                }
                p.affectedBy.water = true;
            }
        };
    }
    // Proton
        {
        function BProton(x, y, w, h) {
            BToxic.call(this, x, y, w, h);
            this.img = imgs.proton.clone();
            this.field = 300;
            this.strength = 1;
        }
        BProton.prototype = Object.create(BToxic.prototype);
        BProton.prototype.collide = function(p) {
            let d = dist(p.x + p.w / 2, p.y + p.h / 2, this.x + this.w / 2, this.y + this.h / 2);
            if (d < this.field) {
                let force = map(d, 0, this.field, 2, 0);
                let dx = p.x + p.w / 2 - (this.x + this.w / 2);
                let dy = p.y + p.h / 2 - (this.y + this.h / 2);
                let m = mag(dx, dy);
                dx *= force / m;
                dy *= force / m;
                if (dx) {
                    p.vx += dx * this.strength;
                }
                if (dy) {
                    p.vy += dy * this.strength;
                }
                if (typeof this.collide2 == "function") this.collide2(p, d);
            }
        };
    }
    // Black Hole
        {
        function BBlackHole(x, y, w, h) {
            BProton.call(this, x, y, w, h);
            this.img = imgs.blackhole.clone();
            this.field = 300;
            this.strength = -2;
        }
        BBlackHole.prototype = Object.create(BProton.prototype);
        BBlackHole.prototype.collide2 = function(p, d) {
            if (d < this.w / 2 + p.w / 2) {
                for (var i in p.tint) {
                    p.tint[i] -= 20;
                    p.health -= 1;
                    p.w *= .99, p.h *= .99;
                }
            }
        };
    }
}

// Event Blocks
{
    // BPortal
    {
        function BPortal(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            this.img = imgs.portal;
            this.w *= 2;
            this.h *= 2;
        }
        BPortal.prototype = Object.create(BBlock.prototype);
        BPortal.prototype.display = function() {
            push();
            imageMode(CENTER);
            translate(this.x + this.w / 2, this.y + this.h / 2);
            rotate(frameCount);
            image(this.img, 0, 0, this.w, this.h);
            pop();
        };
        BPortal.prototype.collide = function(p) {
            if (p.x > this.x && p.x + p.w < this.x + this.w && p.y + p.h / 2 > this.y && p.y < this.y + this.h) {
                if (bGame.canPass) {
                    let speed = .05;
                    p.hasControl = false;
                    p.w = lerp(p.w, 0, speed);
                    p.h = lerp(p.h, 0, speed);
                    p.vx = 0;
                    p.vy = 0;
                    p.x = lerp(p.x, this.x + this.w / 2 - p.w / 2, speed);
                    p.y = lerp(p.y, this.y + this.h / 2 - p.h / 2, speed);
                    p.r += 5;
                } else {
                    push();
                    textAlign(CENTER, BOTTOM);
                    textFont(fonts.pixel);
                    textSize(30);
                    fill(0, 0, 0);
                    text("Collect all the parts!", p.x + p.w / 2 + 2, p.y - 3);
                    fill(255, 0, 0);
                    text("Collect all the parts!", p.x + p.w / 2, p.y - 5);
                    pop();
                }
            }
        };
    }
    // BSpawn
        {
        function BSpawn(x, y, w, h) {
            BBlock.call(this, x, y, w, h);
            // this.img = imgs.spawn
                }
        BSpawn.prototype = Object.create(BBlock.prototype);
        BSpawn.prototype.collide = function() {
            // This doesn't need a collide function
        };
        BSpawn.prototype.display = function() {
            ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
            // image(this.img, this.x, this.y, this.w, this.h);
                };
    }
    // BParts
        {
        var BPart = [];
        BPart[0] = function(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.collectIndex = 0;
            if (!this.img) {
                this.img = imgs.rocketfin;
            }
            this.imgw = this.imgw || this.img.width;
            this.imgh = this.imgh || this.img.height;
            if (max(this.imgw, this.imgh) == this.imgw) {
                this.dw = this.w;
                this.dh = this.w * this.imgh / this.imgw;
            } else {
                this.dh = this.h;
                this.dw = this.h * this.imgw / this.imgh;
            }
            this.collected = false;
        };
        BPart[0].prototype = Object.create(BBlock.prototype);
        BPart[0].prototype.display = function() {
            push();
            imageMode(CENTER);
            translate(this.x + this.w / 2, this.y + this.h / 2 + sin(frameCount) * 10 - 5);
            scale(cos(frameCount * 5), 1);
            image(this.img, 0, 0, this.dw, this.dh);
            pop();
        };
        BPart[0].prototype.collide = function(p) {
            let vx = abs(p.vx) * 2, vy = abs(p.vy) * 2;
            if (p.x + p.w - vx > this.x && p.x + vx < this.x + this.w && p.y + p.h - vy > this.y && p.y + vy < this.y + this.h) {
                this.collected = true;
                p.collected.push(this.collectIndex);
            }
        };
        BPart[1] = function(x, y, w, h) {
            this.img = imgs.rockettail;
            BPart[0].call(this, x, y, w, h);
            this.collectIndex = 1;
        };
        BPart[1].prototype = Object.create(BPart[0].prototype);
        BPart[2] = function(x, y, w, h) {
            this.img = this.img || imgs.rocketengine;
            this.imgw = this.img.getWidth();
            this.imgh = this.img.getHeight();
            BPart[0].call(this, x, y, w, h);
            this.collectIndex = 2;
        };
        BPart[2].prototype = Object.create(BPart[0].prototype);
        BPart[2].prototype.display = function() {
            push();
            translate(this.x + this.w / 2, this.y + this.h / 2 + sin(frameCount) * 10 - 5);
            scale(cos(frameCount * 5), 1);
            drawAnimation(this.img, 0, 0, this.dw, this.dh);
            pop();
        };
        BPart[3] = function(x, y, w, h) {
            this.img = imgs.rocketflame;
            BPart[2].call(this, x, y, w, h);
        };
        BPart[3].prototype = Object.create(BPart[2].prototype);
    }
}

// Level Builder Only
{
    function BAir(x, y, w, h) {
        BBlock.call(this, x, y, w, h);
        this.img = imgs.x;
    }
    BAir.prototype = Object.create(BBlock.prototype);
    BAir.prototype.display = function(actually) {
        if (actually) image(this.img, this.x, this.y, this.w, this.h);
    };
    BAir.prototype.collide = function() {};
}

let bGame = {
    maps: [],
    map: [],
    current: {},
    blocks: [],
    buildings: [],
    player: null,
    level: 0,
    bw: 100,
    bh: 100,
    h: 0,
    w: 0,
    sw: 0,
    sh: 0,
    key: {},
    scaleFactor: 0,
    canPass: true,
    mode: "story",
    run: function() {
        var noPlayer = !this.player || !(this.player instanceof BPlayer);
        for (var i = 0; i < this.buildings.length; i++) {
            this.buildings[i].run(this.player);
        }
        push();
        noStroke();
        fill(255, 50);
        rect(0, 0, width, height);
        pop();
        push();
        scale(this.scaleFactor);
        if (!noPlayer) {
            translate(this.player.getTransX(), 0);
            this.player.update();
        }
        for (var i = this.blocks.length - 1; i > -1; i--) {
            var dx = noPlayer ? 0 : (this.blocks[i].x + this.player.transX) * this.scaleFactor;
            if (dx + this.blocks[i].w * this.scaleFactor > -1 && dx < width + 1) {
                this.blocks[i].run(this.player);
                if (this.blocks[i].collected) {
                    this.blocks.splice(i, 1);
                    this.canPass = true;
                }
            }
        }
        if (!noPlayer) this.player.display();
        pop();
        // Health Bar
                if (!noPlayer) {
            push();
            noStroke();
            fill(lerpColor(color(255, 0, 0), color(0, 255, 0), constrain(this.player.health / 100, 0, 1)));
            rect(width - 210, 10, max(this.player.health, 0) * 2, 50);
            noFill();
            stroke(0);
            //strokeCap(SQUARE);
                        strokeWeight(10);
            rect(width - 210, 10, 200, 50);
            pop();
        }
    },
    getConst: function(char) {
        switch (char) {
          case "a":
            return BAsphalt;
            break;

          case "#":
            return BBlock;
            break;

          case "r":
            return BRefinery;
            break;

          case "-":
            return BPlatform;
            break;

          case "'":
            return BSmoke;
            break;

          case "^":
            return BSpike;
            break;

          case "v":
            return BDSpike;
            break;

          case "~":
            return BWater;
            break;

          case "x":
            return BToxic;
            break;

          case "o":
            return BProton;
            break;

          case "0":
            return BBlackHole;
            break;

          case "f":
            return BFire;
            break;

          case "%":
            return BPortal;
            break;

          case "*0":
            return BPart[0];
            break;

          case "*1":
            return BPart[1];
            break;

          case "*2":
            return BPart[2];
            break;

          case "*3":
            return BPart[3];
            break;

          case "_":
            return BAir;
            break;

          default:
            return null;
            break;
        }
    },
    init: function() {
        this.load();
    },
    next: function() {
        if (this.mode != "story") {
            game.setScene(this.gobackto);
            if (this.rawLevelObject.levelBuilderLevel) {
                this.rawLevelObject.verified = true;
                levelBuilder.save();
            }
            return;
        }
        this.level++;
        if (this.maps[this.level]) {
            this.load();
        } else {
            game.continue();
        }
    },
    load: function() {
        this.mode = game.currentScene == "build" ? "story" : "freeplay";
        if (!this.maps[this.level] && this.mode == "story") return;
        if (this.mode == "story") {
            this.map = this.maps[this.level].map;
        } else if (!this.map) return;
        this.scaleFactor = height / this.map.length / this.bh;
        this.h = this.map.length * this.bh;
        this.w = this.map[0].length * this.bw;
        this.sw = 1 / this.scaleFactor * width;
        this.sh = 1 / this.scaleFactor * height;
        this.buildings = [];
        for (var i = 0; i < 20; i++) {
            this.buildings.push(new BuildBuilding(random(width), random(2, 6), random(height * 3 / 4, height / 2), ~~random(imgs.buildings.length)));
        }
        this.buildings.sort(function(a, b) {
            return b.z - a.z;
        });
        this.reload();
    },
    reload: function() {
        this.blocks = [];
        this.player = null;
        this.canPass = true;
        for (var i = 0; i < this.map.length; i++) {
            for (var j = 0; j < this.map[i].length; j++) {
                let k = this.map[i][j];
                if (k == "*") {
                    k += this.maps[this.level].item;
                    this.canPass = false;
                }
                let x = j * this.bw;
                let y = i * this.bh;
                if (this.getConst(k)) {
                    this.blocks.push(new (this.getConst(k))(x, y, this.bw, this.bh));
                }
                if (k == "@") {
                    this.player = new BPlayer(x, y + this.bh, this.bh * .75);
                }
            }
        }
    },
    reset: function() {
        this.level = 0;
    }
};

$.getJSON("/scripts/buildrocket/levels.json", function(data) {
    bGame.maps = data.levels;
});

function buildRocket() {
    background(200, 225, 255);
    bGame.run();
}

buildRocket.init = function() {
    bGame.init();
};

buildRocket.reset = function() {
    bGame.reset();
};

function BPlayer(x, by, w) {
    // Basic x, y, speed, width, height
    this.vx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.x = x;
    this.y = by - this.h;
    // Status
        this.grounded = false;
    this.hasControl = true;
    this.r = 0;
    this.health = 100;
    this.affectedBy = {};
    this.collected = [];
    this.tint = {
        r: 255,
        g: 255,
        b: 255
    };
    // Translate
        this.transX = 0;
    this.ptransX = this.transX;
    // Running animation stuff
        this.walkingFrame = 0;
    this.isRunning = false;
}

BPlayer.prototype.control = function() {
    if (keys[RIGHT_ARROW] || keys.d) {
        this.vx += 5;
    }
    if (keys[LEFT_ARROW] || keys.a) {
        this.vx -= 5;
    }
    if ((keys[UP_ARROW] || keys.w || keys[" "] || keys[32]) && this.grounded) {
        this.vy -= 17;
    } else if ((keys[DOWN_ARROW] || keys.s) && !this.grounded) {
        this.vy += .2;
    }
};

BPlayer.prototype.updateAnimation = function() {
    if (frameCount % 8 == 0) {
        if (this.grounded && abs(this.vx) > .1) {
            this.walkingFrame = (this.walkingFrame + 1) % imgs.players.length;
            this.img = imgs.players[this.walkingFrame];
        } else {
            this.img = imgs.player;
        }
    }
};

BPlayer.prototype.update = function() {
    this.updateAnimation();
    this.tint.r = constrain(this.tint.r + 10, 0, 255);
    this.tint.g = constrain(this.tint.g + 10, 0, 255);
    this.tint.b = constrain(this.tint.b + 10, 0, 255);
    if (this.hasControl) {
        this.control();
    }
    if (!this.grounded) {
        this.vy += .5;
    }
    this.vx *= .7;
    this.vy *= .99;
    this.vx = constrain(this.vx, -15, 15);
    this.vy = constrain(this.vy, -25, 25);
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) {
        this.x = 0;
        this.vx = max(this.vx, 0);
    } else if (this.x + this.w > bGame.w) {
        this.x = bGame.w - this.w;
        this.vx = min(this.vx, 0);
    }
    if (this.y > bGame.h || this.health < 0) this.kill();
    if (this.w < .5) {
        bGame.next();
    }
    this.grounded = false;
    this.affectedBy = {};
};

BPlayer.prototype.display = function() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(this.r);
    if (this.vx >= 0) scale(-1, 1);
    if (!isMobile) tint(this.tint.r, this.tint.g, this.tint.b);
    image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    noTint();
    pop();
};

BPlayer.prototype.kill = function() {
    bGame.reload();
};

BPlayer.prototype.getTransX = function(buildOnly, replaceW, replaceSW) {
    this.ptransX = this.transX;
    var viewSpace = buildOnly ? 0 : bGame.sw / 3;
    var fw = (buildOnly ? replaceW : 0) || bGame.w;
    var fsw = (buildOnly ? replaceSW : 0) || bGame.sw;
    if (this.x < viewSpace) {
        this.transX = 0;
    } else if (this.x < fw - viewSpace * 2) {
        this.transX = -this.x + viewSpace;
    } else if (fsw > fw) {
        this.transX = 0;
    } else {
        this.transX = -fw + fsw;
    }
    return this.transX || 0;
};

function LandOnVenus() {
    LandOnVenus.draw();
}

LandOnVenus.init = function() {
    this.background = {
        img: imgs.stars,
        x: 0,
        y: 0,
        w: width,
        h: height
    };
    this.venus = {
        img: imgs.venus,
        x: height * 3 / 4,
        y: height * 3 / 4,
        w: height / 2,
        h: height / 2
    };
    this.rocket = {
        img: imgs.rocketOn,
        x: 0,
        y: 0,
        r: 135,
        w: 150,
        init: function() {
            this.h = this.w * this.img.getHeight() / this.img.getWidth();
            this.x -= this.h * 2;
            this.y -= this.h * 2;
        }
    };
    this.rocket.init();
};

LandOnVenus.update = function() {
    let rs = .01;
    this.rocket.x = lerp(this.rocket.x, this.venus.x + this.venus.w / 2, rs);
    this.rocket.y = lerp(this.rocket.y, height + this.venus.h / 4, rs);
    var ss = .99;
    this.rocket.w *= ss;
    this.rocket.h *= ss;
    if (this.rocket.y > height) {
        game.continue();
    }
};

LandOnVenus.displayObject = function(obj) {
    push();
    translate(obj.x + obj.w / 2, obj.y + obj.h / 2);
    if (typeof obj.r == "number") rotate(obj.r);
    if (typeof obj.img.getHeight == "function") {
        drawAnimation(obj.img, 0, 0, obj.w, obj.h);
    } else {
        image(obj.img, -obj.w / 2, -obj.h / 2, obj.w, obj.h);
    }
    pop();
};

LandOnVenus.display = function() {
    this.displayObject(this.background);
    this.displayObject(this.venus);
    this.displayObject(this.rocket);
};

LandOnVenus.draw = function() {
    background(0);
    this.update();
    this.display();
};

function AtLaunchPad() {
    AtLaunchPad.draw();
}

AtLaunchPad.draw = function() {
    this.update();
    background(100, 200, 255);
    push();
    noStroke();
    fill(100, 120, 120, 100);
    for (var i = 0; i < this.buildings.length; i++) {
        var b = this.buildings[i];
        if (i / 5 == round(i / 5)) {
            rect(0, 0, width, height);
        }
        image(b.img, b.x, b.y, b.w, b.h);
    }
    pop();
    push();
    translate(width / 2, 0);
    push();
    noStroke();
    fill(0, 150, 20);
    // this just makes it more responsive
        rect(-width / 2 - 1, height - this.gh, width + 2, this.gh + 1);
    fill(0, 50);
    //shadow radius
        var sr = this.rocket.w * ((this.rocket.y + 700) / (this.rocket.oy + 700));
    sr = max(sr, 0);
    ellipse(this.rocket.x, this.rocket.oy - this.rocket.h / 50, sr, sr / 5);
    ellipse(this.player.x + this.player.w / 2, this.player.y + this.player.h, this.player.w, this.player.w / 5);
    pop();
    if (this.rocket.on) {
        var flameW = this.rocket.w / 2;
        drawAnimation(imgs.rocketflame, this.rocket.x, this.rocket.y - this.rocket.h / 6, flameW, flameW * imgs.rocketflame.getHeight() / imgs.rocketflame.getWidth());
    }
    image(imgs.largerocket, this.rocket.x - this.rocket.w / 2, this.rocket.y - this.rocket.h, this.rocket.w, this.rocket.h);
    push();
    translate(this.player.x, this.player.y);
    scale(-1, 1);
    image(imgs.player, -this.player.w, 0, this.player.w, this.player.h);
    pop();
    if (this.player.talking) {
        push();
        fill(255);
        stroke(230);
        strokeWeight(5);
        textSize(30);
        textFont(fonts.pixel);
        var tw = textWidth(this.player.text) + 15, th = 50;
        rect(this.player.x + this.player.w / 2 - tw / 2, this.player.y - th - 15, tw, th);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(this.player.text, this.player.x + this.player.w / 2, this.player.y - th / 2 - 15);
        pop();
    }
    pop();
};

AtLaunchPad.update = function() {
    if (this.rocket.on) {
        this.rocket.y -= 20;
    }
    switch (this.stage) {
      case "runin":
        if (this.player.x < -width / 6) {
            this.player.x += 5;
            this.timedelay = 0;
        } else if (this.timedelay < 50) {
            this.timedelay++;
            this.rocket.x = noise(frameCount / 12.7) * 50 - 25;
        } else {
            this.timedelay = 0;
            this.stage = "takeoff";
            this.rocket.on = true;
        }
        break;

      case "takeoff":
        this.rocket.x = noise(frameCount / 12.7) * 50 - 25;
        if (this.rocket.y < -1e3) {
            this.stage = "idea";
            this.rocket.on = false;
            this.player.talking = true;
            this.timeDelay = 0;
        }
        break;

      case "idea":
        if (this.timeDelay < 80) {
            this.timeDelay++;
        } else {
            this.player.ti++;
            this.timeDelay = 0;
            if (this.player.ti >= this.player.texts.length) {
                this.stage = "runout";
                this.player.talking = false;
            } else {
                this.player.text = this.player.texts[this.player.ti];
            }
        }
        break;

      case "runout":
        this.player.x += 8;
        if (this.player.x > width * 1.1) {
            game.continue();
        }
        break;
    }
};

AtLaunchPad.init = function() {
    // Basic
    this.stage = "runin";
    this.timeDelay = 0;
    this.gh = 50 + height / 5.7;
 // grass height
    // Rocket
        this.rocket = {
        x: 0,
        y: height - 100,
        w: height / 4,
        h: height / 1.3,
        on: false
    };
    this.rocket.oy = this.rocket.y;
    this.rocket.w = this.rocket.h * imgs.largerocket.width / imgs.largerocket.height;
    // Player
        this.player = {
        x: -width / 2 - 100,
        y: height - 150,
        h: 100,
        texts: [ "Oh @!%#!", "They just left!", "But wait...", "I bet they left enough stuff to build...", "I bet they left enough stuff to build...", // So it lasts longer
        "My own rocket!", "I must go collect the parts" ],
        text: "Oh @!%#!",
        ti: 0
    };
    this.player.w = this.player.h * imgs.player.width / imgs.player.height;
    // Scenery
        this.buildings = [];
    for (var i = -100; i < width + 100; i += 90) {
        var h = random(height / 2, height * 3 / 4);
        var img = imgs.buildings[~~random(imgs.buildings.length)];
        var newBuilding = {
            img: img,
            x: i + random(50),
            y: height - this.gh - h,
            h: h,
            w: h * img.width / img.height
        };
        this.buildings.push(newBuilding);
    }
    this.buildings.sort(function(a, b) {
        return a.h - b.h;
    });
}
//
;

function leaveMars() {
    leaveMars.draw();
}

leaveMars.init = function() {
    // Arranging the background
    this.background = {
        img: imgs.marsbackground,
        x: 0,
        y: 0
    };
    this.background.aspect = this.background.img.width / this.background.img.height;
    let canvasAspect = width / height;
    if (this.background.aspect > canvasAspect) {
        this.background.h = height;
        this.background.w = this.background.h * this.background.aspect;
    } else {
        this.background.w = width;
        this.background.h = this.background.w * (1 / this.background.aspect);
    }
    // Ground
        this.ground = {
        img: imgs.marsarena,
        x: width / 4,
        y: height * 2 / 3,
        w: width,
        h: 10
    };
    this.ground.h = this.ground.w * this.ground.img.height / this.ground.img.width;
    // Letter
        this.letter = {
        img: imgs.letter,
        x: this.ground.x + this.ground.w / 2,
        y: this.ground.y - 5,
        w: 100,
        h: 100
    };
    this.letter.h = this.letter.w;
    this.letter.y -= this.letter.h;
    // Rock
        this.rock = {
        img: imgs.marsrock,
        x: this.letter.x - 20,
        y: this.ground.y,
        w: this.letter.w + 80,
        h: 1
    };
    this.rock.h = this.rock.w * this.rock.img.height / this.rock.img.width;
    this.rock.y -= this.rock.h;
    // Rocket
        this.rocket = {
        img: imgs.rocketOff,
        x: this.ground.x + 30,
        y: this.ground.y,
        w: 150,
        h: 1
    };
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth();
    this.rocket.ch = this.rocket.h * 23 / 24;
    this.rocket.y -= this.rocket.ch;
    // Player
        this.player = {
        img: imgs.player,
        x: width * 1.1,
        y: this.ground.y,
        w: this.rocket.w / 2,
        h: 1,
        display: true,
        s: 1
    };
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;
    // Fuel
        this.fuels = [];
    // stage
        this.stage = "walkin";
};

leaveMars.draw = function() {
    this.update();
    this.display();
};

leaveMars.update = function() {
    switch (this.stage) {
      case "walkin":
        this.player.x -= 5;
        var goToX = this.rocket.x + this.rocket.w * 2;
        if (this.player.x <= goToX) {
            this.player.x = goToX;
            this.stage = "throwfuel";
            this.fuelThrown = 0;
        }
        break;

      case "throwfuel":
        if (frameCount % 20 == 0 && this.fuelThrown < 10) {
            // Create a fuel
            var newFuel = {
                img: imgs.fueltank,
                x: this.player.x + this.player.w / 2,
                y: this.player.y + this.player.h / 2,
                w: this.player.w * .8,
                vy: -this.player.h / 20,
                vx: -this.player.w / 20
            };
            newFuel.h = newFuel.w * newFuel.img.height / newFuel.img.width;
            newFuel.y -= newFuel.h / 2;
            newFuel.x -= newFuel.w / 2;
            this.fuels.push(newFuel);
            this.fuelThrown++;
        } else if (this.fuelThrown == 10 && this.fuels.length == 0) {
            // Change scene
            this.stage = "goinrocket";
        }
        // Update fuel
                for (var i = this.fuels.length - 1; i > -1; i--) {
            var fuel = this.fuels[i];
            fuel.vy += .39;
            fuel.x += fuel.vx;
            fuel.y += fuel.vy;
            if (fuel.x + fuel.w / 2 < this.rocket.x + this.rocket.w / 2) {
                this.fuels.splice(i, 1);
            }
        }
        break;

      case "goinrocket":
        this.player.x -= 5;
        if (this.player.x + this.player.w / 2 < this.rocket.x + this.rocket.w / 2) {
            this.player.display = false;
            this.stage = "launch";
            this.rocket.img = imgs.rocketOn;
        }
        break;

      case "launch":
        this.rocket.y -= 20;
        if (this.rocket.y < -this.rocket.h * 2) {
            game.continue();
        }
        break;
    }
};

leaveMars.displayObject = function(obj) {
    if (typeof obj.img.getHeight == "function") {
        drawAnimation(obj.img, obj.x + obj.w / 2, obj.y + obj.h / 2, obj.w, obj.h);
    } else {
        image(obj.img, obj.x, obj.y, obj.w, obj.h);
    }
};

leaveMars.display = function() {
    this.displayObject(this.background);
    this.displayObject(this.rock);
    this.displayObject(this.letter);
    for (var i = 0; i < this.fuels.length; i++) {
        this.displayObject(this.fuels[i]);
    }
    if (this.player.display) {
        push();
        translate(this.player.x + this.player.w / 2, this.player.y);
        scale(this.player.s, 1);
        image(this.player.img, -this.player.w / 2, 0, this.player.w, this.player.h);
        pop();
    }
    this.displayObject(this.rocket);
    this.displayObject(this.ground);
};

function marsLanding() {
    marsLanding.draw();
}

marsLanding.init = function() {
    // Arranging the background
    this.background = {
        img: imgs.marsbackground,
        x: 0,
        y: 0
    };
    this.background.aspect = this.background.img.width / this.background.img.height;
    let canvasAspect = width / height;
    if (this.background.aspect > canvasAspect) {
        this.background.h = height;
        this.background.w = this.background.h * this.background.aspect;
    } else {
        this.background.w = width;
        this.background.h = this.background.w * (1 / this.background.aspect);
    }
    // Ground
        this.ground = {
        img: imgs.marsarena,
        x: width / 4,
        y: height * 2 / 3,
        w: width,
        h: 10
    };
    this.ground.h = this.ground.w * this.ground.img.height / this.ground.img.width;
    // Letter
        this.letter = {
        img: imgs.letter,
        x: this.ground.x + this.ground.w / 2,
        y: this.ground.y - 5,
        w: 100,
        h: 100
    };
    this.letter.h = this.letter.w;
    this.letter.y -= this.letter.h;
    // Large letter
        this.largeletter = {
        img: imgs.largeletter,
        x: 0,
        y: 0,
        w: min(width, height) - 50,
        h: 1,
        display: false
    };
    this.largeletter.h = this.largeletter.w;
    this.largeletter.x = width / 2 - this.largeletter.w / 2;
    this.largeletter.y = height / 2 - this.largeletter.h / 2;
    // Rock
        this.rock = {
        img: imgs.marsrock,
        x: this.letter.x - 20,
        y: this.ground.y,
        w: this.letter.w + 80,
        h: 1
    };
    this.rock.h = this.rock.w * this.rock.img.height / this.rock.img.width;
    this.rock.y -= this.rock.h;
    // Rocket
        this.rocket = {
        img: imgs.rocketOn,
        x: this.ground.x + 30,
        y: -300,
        w: 150,
        h: 1
    };
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth();
    this.rocket.collideH = this.rocket.h * 23 / 24;
    // rocket stutter
        this.working = 1;
    this.stutterIndex = 0;
    this.stutterTimer = 5;
    this.stutterPath = [ 1, 1, 1, 1, .3, 1, 1, 1, .3, 1, .3, .3, 1, .3, .3, .3, 0 ];
    // Player
        this.player = {
        img: imgs.player,
        x: this.rocket.x + this.rocket.w / 4,
        y: this.ground.y,
        w: this.rocket.w / 2,
        h: 1,
        display: false,
        s: -1
    };
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;
    // Martian
        this.martian = {
        img: imgs.martian,
        x: width / 2,
        y: -5,
        w: 150,
        h: 1
    };
    this.martian.h = this.martian.w * this.martian.img.height / this.martian.img.width;
    this.martian.y -= this.martian.h;
    // Text
        this.text = [ "Oh &@#$!", "I'm out of fuel!", "I better go find some..." ];
    this.textIndex = 0;
    this.textTime = 100;
    this.textTimer = this.textTime;
    this.playertext = this.text[0];
    this.displaytext = false;
    // stage
        this.stage = "landing";
};

marsLanding.draw = function() {
    this.update();
    this.display();
};

marsLanding.update = function() {
    switch (this.stage) {
      case "landing":
        this.rocket.y += 15;
        if (this.rocket.y + this.rocket.collideH >= this.ground.y) {
            this.rocket.y = this.ground.y - this.rocket.collideH;
            this.stage = "player";
            this.rocket.img = imgs.rocketOff;
            this.player.display = true;
        }
        break;

      case "player":
        this.player.x += 5;
        if (this.player.x >= this.rock.x) {
            this.player.x = this.rock.x + 5;
            this.stage = "letter";
            this.letterdelay = 15;
            this.letter.y -= this.player.h / 3;
        }
        break;

      case "letter":
        if (this.letterdelay > 0) {
            this.letterdelay--;
        } else if (!this.largeletter.display) {
            this.largeletter.display = true;
        } else if (clicked || keys[32] || keys[" "]) {
            this.largeletter.display = false;
            this.stage = "gotorocket";
            this.player.s = 1;
            this.letter.y += this.player.h / 3;
        }
        break;

      case "gotorocket":
        this.player.x -= 5;
        if (this.player.x <= this.rocket.x) {
            this.player.display = false;
            this.player.x = this.rocket.x + this.rocket.w / 2 - this.player.w / 2;
            this.stage = "checkfuel";
        }
        break;

      case "checkfuel":
        this.stutterTimer--;
        if (this.stutterTimer <= 0) {
            this.stutterTimer += 5;
            this.stutterIndex++;
            this.working = this.stutterPath[this.stutterIndex];
        }
        if (this.working > .5) {
            this.rocket.img = imgs.rocketOn;
        } else if (this.working < .1) {
            this.stage = "nofuel";
            this.player.display = true;
            this.player.s = -1;
        } else {
            this.rocket.img = imgs.rocketOff;
        }
        break;

      case "nofuel":
        if (this.player.x < this.rocket.x + this.rocket.w + 15) {
            this.player.x += 5;
        } else {
            this.displaytext = true;
            this.textTimer--;
            if (this.textTimer <= 0) {
                this.textTimer = this.textTime;
                this.textIndex++;
                if (this.textIndex >= this.text.length) {
                    this.stage = "leave";
                    this.displaytext = false;
                } else {
                    this.playertext = this.text[this.textIndex];
                }
            }
        }
        break;

      case "leave":
        this.player.x += 5;
        if (this.player.x > width * 1.1) {
            this.stage = "martian";
        }
        break;

      case "martian":
        if (this.martian.y + this.martian.h < this.ground.y) {
            this.martian.y += 15;
            this.martian.y = min(this.martian.y, this.ground.y - this.martian.h);
        } else {
            this.martian.x += 5;
            if (this.martian.x > width * 1.1) {
                game.continue();
            }
        }
        break;
    }
};

marsLanding.displayObject = function(obj) {
    image(obj.img, obj.x, obj.y, obj.w, obj.h);
};

marsLanding.display = function() {
    this.displayObject(this.background);
    this.displayObject(this.ground);
    this.displayObject(this.rock);
    this.displayObject(this.letter);
    this.displayObject(this.martian);
    if (this.player.display) {
        push();
        translate(this.player.x + this.player.w / 2, this.player.y);
        scale(this.player.s, 1);
        image(this.player.img, -this.player.w / 2, 0, this.player.w, this.player.h);
        pop();
    }
    drawAnimation(this.rocket.img, this.rocket.x + this.rocket.w / 2, this.rocket.y + this.rocket.h / 2, this.rocket.w, this.rocket.h);
    if (this.displaytext) {
        push();
        fill(255);
        stroke(232);
        strokeWeight(2);
        textSize(25);
        textFont(fonts.pixel);
        var ty = textAscent() + textDescent();
        textAlign(LEFT, TOP);
        rect(this.player.x - 5, this.player.y - ty - 20, textWidth(this.playertext) + 10, ty + 15);
        noStroke();
        fill(0);
        text(this.playertext, this.player.x, this.player.y - ty - 10);
        pop();
    }
    if (this.largeletter.display) {
        push();
        noStroke();
        fill(0, 80);
        rect(0, 0, width, height);
        pop();
        this.displayObject(this.largeletter);
    }
};

let moonGun = {
    appear: false,
    x: 0,
    y: 0,
    run: function() {
        if (this.appear) {
            this.display();
            let p = moonPlayer;
            if (this.x > p.x + p.w / 4) {
                this.x -= 3;
            }
            if (this.y < p.y + p.h / 2) {
                this.y += 3;
            }
        }
    },
    display: function() {
        push();
        translate(this.x, this.y);
        scale(.025);
        image(imgs.moonGun, 0, 0);
        pop();
    },
    init: function() {
        this.appear = false;
        this.x = manOnTheMoon.x;
        this.y = height / 2;
    }
};

function moon() {
    for (var i = 0; i < width; i += height) {
        image(imgs.stars, i, 0, height, height);
    }
    manOnTheMoon.run();
    image(imgs.moon, 0, 0, width, height);
    moonShip.run();
    moonPlayer.run();
    moonGun.run();
    moonTextBox.run();
}

moon.init = function() {
    manOnTheMoon.init();
    moonShip.init();
    moonPlayer.init();
    moonTextBox.init();
    moonGun.init();
};

let manOnTheMoon = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    img: 0,
    appear: false,
    run: function() {
        this.display();
        if (this.appear && this.y > height * .67 - this.h / 2) {
            this.y -= 3;
        } else if (this.appear && moonTextBox.line < 20) {
            moonTextBox.show = true;
        }
    },
    display: function() {
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        image(this.img, 0, 0, this.w, this.h);
        pop();
    },
    init: function() {
        this.appear = false;
        this.img = imgs.momdefault;
        this.w = max(width / 3, height / 2);
        this.h = this.w * this.img.height / this.img.width;
        this.x = width / 2;
        //this.y = height*0.67-this.h/2;
                this.y = height + this.w * this.img.height / this.img.width - 50;
    }
};

let moonPlayer = {
    x: 0,
    y: 0,
    w: 40,
    h: 0,
    direction: "right",
    wait: 0,
    runAway: false,
    run: function() {
        this.display();
        if (this.appeared) {
            this.wait++;
            if (this.wait > 30) {
                this.direction = "left";
            }
            if (this.wait > 60) {
                this.direction = "right";
            }
            if (this.wait > 65) {
                manOnTheMoon.appear = true;
            }
            if (this.runAway && moonGun.x < this.x + this.w / 2 && moonGun.y > this.y - this.h / 2) {
                this.direction = "left";
                this.x -= 3;
                if (this.x < -this.w / 2) {
                    game.continue();
                }
            }
        }
    },
    display: function() {
        push();
        translate(this.x + this.w / 2, this.y);
        if (this.direction === "right") scale(-1, 1);
        image(this.img, -this.w / 2, 0, this.w, this.h);
        pop();
    },
    appear: function() {
        this.x = moonShip.x;
        this.y = moonShip.y - 30;
        this.appeared = true;
    },
    init: function() {
        this.direction = "right";
        this.x = -500;
        this.y = -500;
        this.img = imgs.player;
        this.h = this.w * this.img.height / this.img.width;
    }
};

let moonShip = {
    x: 0,
    y: 0,
    w: 100,
    h: 40,
    moving: true,
    offImgs: {},
    onImg: {},
    playerWait: 0,
    run: function() {
        if (this.y < height / 2 + 150) {
            this.y += 3;
        } else {
            this.moving = false;
            this.playerWait++;
            if (this.playerWait > 40 && this.playerWait < 100) {
                moonPlayer.appear();
            }
        }
        this.display();
    },
    init: function() {
        this.x = width / 2 - 350;
        this.y = -50;
        this.offImg = imgs.rocketOff;
        this.onImg = imgs.rocketOn;
        this.h = this.w * this.onImg.getHeight() / this.onImg.getWidth();
    },
    display: function() {
        push();
        imageMode(CENTER);
 //rotate from center
                translate(this.x, this.y);
        if (this.moving) {
            drawAnimation(this.onImg, 0, 0, this.w, this.h);
        } else {
            drawAnimation(this.offImg, 0, 0, this.w, this.h);
        }
        pop();
    }
};

let moonConversation = [ "Fee fi fo fum! It is I, the man on the moon!", "Wait, your the guy from dream works!", "Yes that was me. However, my looks haven't quite stayed the same since I got space Diabetes.", "Wow, you've aged so much since then.", "How dare you! I'll have you know that I'm at the young age of 4.53 billion years. I'm in my prime! I'm practically fresh out of the womb!", "But your hair is gray!", "Shut up, space diabetes has some unspeakable effects.", "I'm sorry, I shouldn't have mentioned your incredibly miserable space Diabetes.", "You're right, you should have! Listen, why did you come to my neck of the woods?", "There are no trees here.", "Yeah, but there are necks.", "You said 'neck' singular.", "It's a figure of speech!", "Ok sure. In response to your earlier inquiry, I'm here to refuel. The human race abandoned me yesterday and I am heading to Mars. Any advice?", "Yeah, don't let the Martians bite you, if you do the tip of the side of your left ring finger will hurt for two weeks, four days, three hours, fourteen minutes, and seventy two seconds", "There are martians?", "yeah, and I'm warning you, their bites are more painful than you would believe! Don't let them bite you. Here, I want you to have this.", "", "This gun is incredibly important to me. Take care of it. It has been passed down through my family for generations. My father gave it to me shortly before he passed away, along with a very important message, to uphold the family honor. In his last breath, he requested that--", "Ok thanks!" ];

let moonTextBox = {
    x: 0,
    y: 0,
    w: 400,
    h: 200,
    padding: 10,
    text: "",
    textShowing: 0,
    line: 0,
    show: false,
    run: function() {
        if (this.show === true) {
            if (this.textShowing >= this.text.length && (keysReleased[" "] || keysReleased[32] || clicked)) {
                this.line++;
                if (this.line === 17) {
                    this.line++;
 //trying to keep the speakers right without having to do other things
                                        moonGun.appear = true;
                }
                if (this.line < 20) {
                    this.text = moonConversation[this.line];
                    this.textShowing = 0;
                } else {
                    this.show = false;
                    this.text = "";
                    moonPlayer.runAway = true;
                }
            } else if (keysReleased[" "] || keysReleased[32] || clicked) {
                this.textShowing = this.text.length;
            }
            this.display();
            this.textShowing += .5;
        }
    },
    display: function() {
        if (this.line % 2 == 0) this.speaker = "Man On The Moon"; else this.speaker = "Tom";
        push();
        fill(232);
        stroke(240);
        strokeWeight(5);
        rect(this.x, this.y, this.w, this.h);
        fill(0, 0, 0);
        textSize(15);
        stroke(255);
        strokeWeight(1);
        textFont(fonts.pixel);
        if (this.line < 20) {
            text(this.speaker + ": " + this.text.substr(0, this.textShowing), this.x + this.padding, this.y + this.padding, this.w - this.padding * 2, this.h - this.padding * 2);
        }
        if (this.line === 0 && this.textShowing >= this.text.length) {
            text("Press space to continue", this.x + this.padding, this.y + this.h - 20 - this.padding * 2);
        }
        pop();
    },
    init: function() {
        this.x = width / 2 - this.w / 2;
        this.y = height - this.h - 20;
        this.line = 0;
        this.show = false;
        this.text = moonConversation[this.line];
        this.textShowing = 0;
    }
};

function RocketBuilt() {
    RocketBuilt.draw();
}

RocketBuilt.init = function() {
    // Ground
    this.ground = {
        y: height * 5 / 6
    };
    // Scenery
        this.buildings = [];
    for (var i = -100; i < width + 100; i += 90) {
        var h = random(height / 2, height * 3 / 4);
        var img = imgs.buildings[~~random(imgs.buildings.length)];
        var newBuilding = {
            img: img,
            x: i + random(50),
            y: this.ground.y - h,
            h: h,
            w: h * img.width / img.height
        };
        this.buildings.push(newBuilding);
    }
    this.buildings.sort(function(a, b) {
        return a.h - b.h;
    });
    // player
        this.player = {
        x: -100,
        y: this.ground.y + 30,
        w: 80,
        h: 0,
        img: imgs.player,
        showing: true
    };
    this.player.h = this.player.w * this.player.img.height / this.player.img.width;
    this.player.y -= this.player.h;
    // Pieces
        this.pieces = [ {
        x: width / 2 - 15,
        y: -100,
        w: 100,
        img: imgs.rocketfin,
        falling: true,
        landY: this.ground.y + 10
    }, {
        x: width / 2 + 30,
        y: -500,
        w: 100,
        img: imgs.rocketengine.images[0],
        falling: true,
        landY: this.ground.y + 25
    }, {
        x: width / 2 + 15,
        y: -200,
        w: 100,
        img: imgs.rockettail,
        falling: true,
        landY: this.ground.y + 50
    } ];
    for (var i = 0; i < this.pieces.length; i++) {
        var piece = this.pieces[i];
        piece.h = piece.w * piece.img.height / piece.img.width;
    }
    // light
        this.light = {
        x: width / 2,
        y: height / 2,
        w: width / 100,
        h: height / 100,
        a: 255,
        on: false
    };
    // rocket
        this.rocket = {
        img: imgs.rocketOff,
        built: false,
        x: width / 2,
        y: this.ground.y + 70,
        w: 250,
        countdown: 20
    };
    this.rocket.h = this.rocket.w * this.rocket.img.getHeight() / this.rocket.img.getWidth();
    this.rocket.y -= this.rocket.h;
    // stage
        this.stage = "enter";
};

RocketBuilt.draw = function() {
    this.update();
    this.display();
};

RocketBuilt.update = function() {
    switch (this.stage) {
      case "enter":
        this.player.x += 5;
        if (this.player.x > width / 3) {
            this.stage = "pieces";
        }
        break;

      case "pieces":
        var onGround = true;
        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            if (piece.falling) {
                piece.y += 15;
                if (piece.y + piece.h > piece.landY) {
                    piece.falling = false;
                    piece.y = piece.landY - piece.h;
                }
                onGround = false;
            }
        }
        if (onGround) {
            this.stage = "light";
            this.light.on = true;
        }
        break;

      case "light":
        if (this.light.w > width * 4) {
            this.light.w = width * 3;
            this.light.h = height * 3;
            this.light.a = 254;
            this.pieces = [];
            this.rocket.built = true;
        } else if (this.light.a == 255) {
            this.light.w *= 1.1;
            this.light.h *= 1.1;
        } else if (this.light.a <= 0) {
            this.stage = "board";
        } else {
            this.light.a -= 5;
        }
        break;

      case "board":
        if (this.player.x + this.player.w / 2 < this.rocket.x + this.rocket.w / 2) {
            this.player.x += 5;
        } else {
            this.stage = "takeoff";
            this.rocket.img = imgs.rocketOn;
            2;
            this.player.showing = false;
        }
        break;

      case "takeoff":
        if (this.rocket.countdown > 0) {
            this.rocket.countdown--;
        } else if (this.rocket.y < -height) {
            game.continue();
        } else {
            this.rocket.y -= 20;
        }
        break;
    }
};

RocketBuilt.display = function() {
    background(100, 200, 255);
    push();
    noStroke();
    fill(100, 120, 120, 100);
    for (var i = 0; i < this.buildings.length; i++) {
        var b = this.buildings[i];
        if (i / 5 == round(i / 5)) {
            rect(0, 0, width, height);
        }
        image(b.img, b.x, b.y, b.w, b.h);
    }
    rect(0, 0, width, height);
    fill(0, 80, 0);
    rect(0, this.ground.y, width, height - this.ground.y);
    pop();
    if (this.player.showing) {
        push();
        translate(this.player.x + this.player.w / 2, this.player.y);
        scale(-1, 1);
        image(this.player.img, -this.player.w, 0, this.player.w, this.player.h);
        pop();
    }
    for (var i = 0; i < this.pieces.length; i++) {
        var piece = this.pieces[i];
        image(piece.img, piece.x, piece.y, piece.w, piece.h);
    }
    if (this.rocket.built) {
        drawAnimation(this.rocket.img, this.rocket.x + this.rocket.w / 2, this.rocket.y + this.rocket.h / 2, this.rocket.w, this.rocket.h);
    }
    if (this.light.on) {
        push();
        noStroke();
        fill(255, this.light.a);
        ellipse(this.light.x, this.light.y, this.light.w, this.light.h);
        pop();
    }
};

function UfoCutscene() {
    UfoCutscene.draw();
}

UfoCutscene.init = function() {
    // Numbers & crap
    this.n = width / 1e3;
    this.t = 0;
 //t = time
    // Object imgs & positions
        this.background = {
        img: imgs.stars,
        x: 0,
        y: 0,
        w: width,
        h: height
    };
    this.venus = {
        img: imgs.venus,
        x: width * 2 / 3,
        y: height * 2 / 3,
        w: width / 4,
        h: width / 4
    };
    this.ufo = {
        img: imgs.ufoboss,
        x: width / 3 + this.n * 25,
        y: 0,
        w: width / 3,
        init: function() {
            this.h = this.w * this.img.height / this.img.width;
            this.y -= this.h;
            this.x -= this.w / 2;
        }
    };
    this.ufo.init();
    this.rocket = {
        img: imgs.rocketOn,
        r: 120,
        x: 0,
        y: 0,
        w: 100,
        init: function() {
            this.h = this.w * this.img.getHeight() / this.img.getWidth();
            this.y -= this.h / 2;
            this.x -= this.h * 1.5;
        }
    };
    this.rocket.init();
    // Stage
        this.stage = "flyin-rocket";
};

UfoCutscene.update = function() {
    this.t++;
    var r = this.rocket;
    var u = this.ufo;
    var updateRocket = _ => {
        var vx = sin(r.r) * this.n * 5;
        var vy = -cos(r.r) * this.n * 5;
        r.x += vx;
        r.y += vy;
    };
    switch (this.stage) {
      case "flyin-rocket":
        updateRocket();
        if (r.x + r.w / 2 > width / 3) {
            this.stage = "flyin-ufo";
        }
        break;

      case "flyin-ufo":
        updateRocket();
        var gY = height + u.h, gX = width / 2 - this.n * 25;
        var yT = u.y - gY, xT = u.x - gX;
        var dT = mag(yT, xT);
        var vx = xT, vy = yT;
        yT /= dT, xT /= dT;
        var mult = this.n * 10 / xT / dT;
        vx *= mult;
        vy *= mult;
        u.x += vx;
        u.y += vy;
        if (u.y > height / 3) {
            r.r = lerp(r.r, -90, .1);
        }
        if (u.y > gY) {
            this.stage = "flyout-rocket";
        }
        break;

      case "flyout-rocket":
        updateRocket();
        if (r.x < -r.h * 1.5) {
            game.continue();
        }
        break;
    }
};

UfoCutscene.displayObject = function(obj) {
    push();
    translate(obj.x + obj.w / 2, obj.y + obj.h / 2);
    if (typeof obj.r == "number") rotate(obj.r);
    if (typeof obj.img.getHeight == "function") {
        drawAnimation(obj.img, 0, 0, obj.w, obj.h);
    } else {
        image(obj.img, -obj.w / 2, -obj.h / 2, obj.w, obj.h);
    }
    pop();
};

UfoCutscene.display = function() {
    this.displayObject(this.background);
    this.displayObject(this.venus);
    this.displayObject(this.ufo);
    this.displayObject(this.rocket);
};

UfoCutscene.draw = function() {
    background(0);
    this.update();
    this.display();
};

function wakeUpScene() {
    wakeUpScene.draw();
}

wakeUpScene.draw = function() {
    background(255);
    this.update();
    push();
    // c is for camera
        scale(1 / this.c.s);
    translate(-this.c.tx, -this.c.ty);
    image(this.roomimg, 0, 0, this.rw, this.rh);
    image(imgs[this.openMouth ? "newsclosed" : "newsopen"], this.tv.x, this.tv.y, this.tv.w, this.tv.h);
    if (this.player.isSleeping) {
        push();
        translate(this.player.tx, this.player.y);
        scale(-1, 1);
        rotate(90);
        var w = this.rw / 5;
        image(imgs.player, 0, 0, this.player.w, this.player.h);
        pop();
    } else {
        push();
        translate(this.player.tx, this.player.y);
        scale(-1, 1);
        var w = this.rw / 5;
        image(imgs.player, this.player.x, 0, this.player.w, this.player.h);
        fill(0, 50);
        noStroke();
        ellipse(this.player.x + this.player.w * .45, this.player.h * .99, this.player.w, this.player.w / 4);
        pop();
    }
    this.textBox.run();
    pop();
};

wakeUpScene.update = function() {
    this.time++;
    this.mouthDelay--;
    if (this.mouthDelay <= 0) {
        this.openMouth = !this.openMouth;
        this.mouthDelay += random(30, 80);
    }
    if (this.time > 30 && this.stage == "sleep") {
        this.stage = "zoom";
        this.c.t = 0;
    }
    if (this.player.runAway) {
        this.player.x -= 8;
        if (this.player.x < -width) game.continue();
    }
    switch (this.stage) {
      case "zoom":
        var cameraSpeed = .05;
        var go = {
            x: this.tv.x - width * .1,
            y: this.tv.y - width * .05,
            s: 3
        };
        go.s = 1 / go.s;
        this.c.t++;
        if (this.c.t < 100) {
            this.c.tx = lerp(this.c.tx, go.x, cameraSpeed);
            this.c.ty = lerp(this.c.ty, go.y, cameraSpeed);
            this.c.s = lerp(this.c.s, go.s, cameraSpeed);
        } else {
            this.stage = "subtitles";
        }
        break;

      case "subtitles":
        this.textBox.show = true;
        this.c.t = 0;
        break;

      case "zoomout":
        this.textBox.show = false;
        this.c.t++;
        if (this.c.t < 100) {
            var cameraSpeed = .05;
            this.c.tx = lerp(this.c.tx, 0, cameraSpeed);
            this.c.ty = lerp(this.c.ty, 0, cameraSpeed);
            this.c.s = lerp(this.c.s, 1, cameraSpeed);
        } else {
            this.stage = "###";
            this.textBox.show = true;
            this.player.isSleeping = false;
            this.player.y = this.rh * .52;
            this.player.x -= this.player.w;
        }
        break;

      case "###":
        if (!this.textBox.show) {
            this.stage = "player";
        }
        break;

      case "player":
        this.textBox.show = false;
        this.player.runAway = true;
        break;
    }
};

wakeUpScene.init = function() {
    this.time = 0;
    this.stage = "sleep";
    this.roomimg = imgs.homeroom;
    var ri = this.roomimg;
    var ia = ri.width / ri.height;
 // image aspect
        var ca = width / height;
 // canvas aspect
        if (ia < ca) {
        this.rw = width;
        this.rh = width / ia;
    } else {
        this.rh = height;
        this.rw = this.rh * ia;
    }
    var rp = {
        // Room Pixels
        w: 170,
        h: 100,
        tv: {
            x: 74,
            y: 44,
            w: 22,
            h: 12
        }
    };
    var ptp = this.rw / rp.w;
 // pixel to pixel
        this.tv = {
        x: ptp * rp.tv.x,
        y: ptp * rp.tv.y,
        w: ptp * rp.tv.w,
        h: ptp * rp.tv.h
    };
    this.player = {
        tx: this.rw * .38,
        x: 0,
        y: this.rh * .58,
        w: this.rw / 15,
        isSleeping: true
    };
    this.player.h = this.player.w * imgs.player.height / imgs.player.width;
    this.openMouth = false;
    this.mouthDelay = 50;
    this.c = {
        // camera
        tx: 0,
        ty: 0,
        s: 1
    };
    this.textBox.init();
    this.textBox.x = width / 2 - this.textBox.w / 2;
    this.textBox.y = 25;
    this.player.x = 0;
};

wakeUpScene.textBox = {
    x: 0,
    y: 0,
    w: 400,
    h: 200,
    padding: 10,
    text: "",
    textShowing: 0,
    line: 0,
    show: false,
    run: function() {
        if (this.show === true) {
            if (this.textShowing >= this.text.length && (keysReleased[" "] || keysReleased[32] || clicked)) {
                this.line++;
                if (this.line == 7) {
                    this.parent.stage = "zoomout";
                }
                if (this.line < 8) {
                    this.text = this.conversation[this.line];
                    this.textShowing = 0;
                } else if (this.parent.stage == "###") {
                    this.show = false;
                    this.text = "";
                }
            } else if (keysReleased[" "] || keysReleased[32] || clicked) {
                this.textShowing = this.text.length;
            }
            this.adjust();
            this.display();
            this.textShowing += .5;
        }
    },
    adjust: function() {
        var parent = this.parent;
        if (parent.stage == "subtitles") {
            this.x = parent.tv.x - 1;
            this.y = parent.tv.y - 1;
            this.w = parent.tv.w + 2;
            this.h = parent.tv.h + 2;
            this.ts = 8;
            this.bg = color(0, 200);
            this.st = color(0, 0);
            this.tc = color(255, 200);
            this.tst = color(0, 0);
        } else if (parent.stage == "###") {
            this.w = 300;
            this.h = 50;
            this.x = parent.player.tx - parent.player.x - this.w / 2 - parent.player.w / 2;
            this.y = parent.player.y - this.h - this.padding;
            this.ts = 20;
            this.bg = null;
            this.st = null;
            this.tc = null;
            this.tst = null;
        }
    },
    display: function() {
        push();
        fill(this.bg || 232);
        stroke(this.st || 255);
        strokeWeight(5);
        rect(this.x, this.y, this.w, this.h);
        fill(this.tc || 0);
        stroke(this.tst || 255);
        strokeWeight(1);
        textFont(fonts.pixel);
        textSize(this.ts || 15);
        if (this.line < 9) {
            text(this.text.substr(0, this.textShowing), this.x + this.padding, this.y + this.padding, this.w - this.padding * 2, this.h - this.padding * 2);
        }
        if (this.line === 0 && this.textShowing >= this.text.length) {
            text("Press space to continue", this.x + this.padding, this.y + this.h - this.padding);
        }
        pop();
    },
    init: function() {
        this.parent = wakeUpScene;
        this.x = width / 2 - this.w / 2;
        this.y = height - this.h - 20;
        this.line = 0;
        this.text = this.conversation[this.line];
        this.show = false;
        this.textShowing = 0;
    }
};

wakeUpScene.textBox.conversation = [ "Clint Stinkwood: Good afternoon ladies and gentlemen, I'm Clint Stinkwood and I'm here in Los Angeles, at The News Show studio, a few miles away from the launch site of the Savior space shuttle.", "Clint Stinkwood: We're just minutes away from the \"All aboard\" time, at which point the Savior will close all it's doors and prepare for launch.", "Clint Stinkwood: It's been a long and hard journey to get to this point, the human race is no longer capable of remaining here on earth with all of the toxic waste that has filled our streets and cities.", "Clint Stinkwood: After many years of trying to study and inventions, we are finally ready for the human race to make the epic journey to Mars on the Savior, where we will rebuild our civilization.", "Clint Stinkwood: It's time to say goodbye to our once beautiful and colorful planet earth, and make way for a new era of cleanliness and save living once again!", "Clint Stinkwood: I'm Clint Stinkwood on channel 953.673B, The News Show, and I'll see you next time on the planet Mars.", "PLEASE NOTE THAT ANYONE NOT ON THE SAVIOR BY THE ALL ABOARD TIME WILL BE LEFT BEHIND. IF YOU HAVE NOT YET ENTERED THE SHUTTLE, PLEASE GET YOU AND YOUR FAMILY MEMBERS ONTO IT AS SOON AS POSSIBLE.", "Tom: Oh @!%#! I gotta go!" ];

function MBullet(x, y, vx) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 10;
    this.vx = vx;
}

MBullet.prototype.collide = function(p) {
    let vx = abs(this.vx);
    if (this.x + vx > p.x && this.x - vx < p.x + p.w && this.y + this.h / 2 > p.y && this.y - this.h / 2 < p.y + p.h) {
        p.kvx += this.vx > 0 ? 15 : -15;
        if (typeof p.jump == "function") p.jump();
        p.health--;
        this.dead = true;
    }
};

MBullet.prototype.update = function() {
    this.x += this.vx;
};

MBullet.prototype.display = function() {
    noStroke();
    push();
    fill(200, 225, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
};

MBullet.prototype.run = function(ents) {
    for (var i = 0; i < ents.length; i++) {
        this.collide(ents[i]);
    }
    this.update();
    this.display();
};

function MFuel(x, y, w) {
    this.x = x;
    this.y = y;
    this.img = imgs.fueltank;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.collected = false;
}

MFuel.prototype.collide = function(p) {
    if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h > this.y && p.y < this.y + this.h) {
        this.collected = true;
        p.fuel++;
    }
};

MFuel.prototype.display = function() {
    push();
    translate(this.x + this.w / 2, this.y);
    scale(cos(frameCount * 3), 1);
    image(this.img, -this.w / 2, 0, this.w, this.h);
    pop();
};

MFuel.prototype.run = function(p) {
    this.collide(p);
    this.display();
};

let mGame = {
    player: null,
    martians: [],
    bullets: [],
    fuels: [],
    rocks: [],
    ground: {
        y: 0,
        w: 5e3,
        h: 0,
        display: function() {
            push();
            imageMode(CENTER);
            image(this.img, 0, this.y + this.h / 2, this.w, this.h);
            pop();
        },
        collide: function(ents) {
            for (var i = 0; i < ents.length; i++) {
                let p = ents[i];
                let vy = abs(p.vy) * 2;
                if (p.x + p.w > -this.w / 2 && p.x < this.w / 2 && p.y + p.h + vy / 2 > this.y && p.y + p.h * .9 - vy < this.y) {
                    p.y = this.y - p.h;
                    p.vy = min(p.vy, 0);
                    p.grounded = true;
                }
            }
        }
    },
    background: {
        w: 0,
        h: 0,
        img: {}
    },
    transX: 0,
    transY: 0,
    timePassed: 0,
    init: function(rocks) {
        // Player
        this.player = new MPlayer(-30, -200, 60);
        // Ground
                this.ground.img = imgs.marsarena;
        this.ground.h = this.ground.w * this.ground.img.height / this.ground.img.width;
        // Arranging the background
                this.background = {
            img: imgs.marsbackground,
            x: 0,
            y: 0
        };
        this.background.aspect = this.background.img.width / this.background.img.height;
        let canvasAspect = width / height;
        if (this.background.aspect > canvasAspect) {
            this.background.h = height + 200 * (1 / this.background.aspect);
            this.background.w = this.background.h * this.background.aspect;
        } else {
            this.background.w = width + 200 * this.background.aspect;
            this.background.h = this.background.w * (1 / this.background.aspect);
        }
        // Blocks
                this.bw = this.ground.w / 40;
        if (typeof rocks == "object") {
            this.rocks = [];
            for (var i = 0; i < rocks.length; i++) {
                let d = rocks[i];
                if (typeof d.x == "string") {
                    d.x = parseFloat(d.x);
                }
                if (typeof d.y == "string") {
                    d.y = parseFloat(d.y);
                }
                this.rocks.push(new MRock(map(d.x, -100, 100, -this.ground.w / 2, this.ground.w / 2 - this.bw), d.y, this.bw));
            }
        }
        // Everything else
                this.reload();
        this.freeplayLevel = null;
    },
    reload: function() {
        // Player
        this.player.reset();
        // Martian
                this.martians = [];
        this.martians.push(new Martian(-this.ground.w / 2 + 50, -200, 100));
        // Reset stuff
                this.bullets = [];
        this.fuels = [];
        this.timePassed = 0;
    },
    reset: function() {
        // Player
        this.player = new MPlayer(-30, -200, 60);
        // Everything else
                this.reload();
    },
    finish: function() {
        if (game.currentScene == "playlevel") {
            if (this.freeplayLevel && this.freeplayLevel.levelBuilderLevel) {
                this.freeplayLevel.verified = true;
                levelBuilder.save();
            }
            game.setScene(this.gobackto);
        } else {
            game.continue();
        }
    },
    run: function() {
        this.timePassed++;
        if (this.martians.length < constrain(map(this.timePassed, 50, 1e3, 1, 3), 1, 8) && frameCount % 180 == 0) {
            if (this.player.x > 0) {
                this.martians.push(new Martian(random(-this.ground.w / 2, -width / 2 - 110), -200, 100));
            } else {
                this.martians.push(new Martian(random(this.ground.w / 2 - 100, width / 2 + 110), -200, 100));
            }
        }
        push();
        translate(map(this.transX, -this.ground.w / 2, this.ground.w / 2, -50, 50) + width / 2, map(this.transY, -height, height, -50, 50) + height / 2);
        imageMode(CENTER);
        image(this.background.img, 0, 0, this.background.w, this.background.h);
        pop();
        push();
        this.player.update();
        translate(this.transX + width / 2, this.transY + height / 2);
        this.ground.display();
        this.ground.collide([ this.player ].concat(this.martians));
        for (var i = this.martians.length - 1; i > -1; i--) {
            this.martians[i].run(this.player);
            if (this.martians[i].dead) {
                this.martians.splice(i, 1);
            }
        }
        for (var i = 0; i < this.rocks.length; i++) {
            this.rocks[i].run([ this.player ].concat(this.martians));
        }
        this.player.display();
        for (var i = this.bullets.length - 1; i > -1; i--) {
            this.bullets[i].run(this.martians);
            if (this.bullets[i].dead) {
                this.bullets.splice(i, 1);
            }
        }
        for (var i = this.fuels.length - 1; i > -1; i--) {
            this.fuels[i].run(this.player);
            if (this.fuels[i].collected) {
                this.fuels.splice(i, 1);
            }
        }
        pop();
        this.player.displayStatus();
    }
};

function fightMartians() {
    background(0);
    mGame.run();
}

fightMartians.init = function(rocks) {
    mGame.init(rocks || mrocks);
};

function Martian(x, y, w) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.kvx = 0;
    this.vy = 0;
    this.img = imgs.martian;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.maxHealth = random(1.5, 2.5);
    this.health = this.maxHealth;
    this.dhealth = this.health;
    this.dead = false;
}

Martian.prototype.jump = function() {
    if (this.grounded && this.vy >= -.5) {
        this.vy -= 15;
        this.grounded = false;
    }
};

Martian.prototype.collide = function(p) {
    let vx = abs(this.vx) + abs(p.vx), vy = abs(this.vy) + abs(p.vy);
    if (this.x + this.w - vx > p.x && this.x + vx < p.x + p.w && this.y + this.h - vy > p.y && this.y + vy < p.y + p.h) {
        this.jump();
        p.damage();
        if (this.x + this.w / 2 > p.x + p.w / 2) {
            p.kvx -= 25;
            this.kvs -= 15;
        } else {
            p.kvx += 25;
            this.kvs += 15;
        }
    }
};

Martian.prototype.control = function(p) {
    if (this.x > p.x + p.w) {
        this.vx -= 2.5;
    } else if (this.x + this.w < p.x) {
        this.vx += 2.5;
    } else {
        this.jump();
    }
};

Martian.prototype.update = function(p) {
    this.control(p);
    if (this.collision) {
        this.jump();
        this.collision = false;
    }
    if (!this.grounded) {
        this.vy += .5;
    }
    this.vx *= .75;
    this.kvx *= .9;
    this.vy *= .99;
    this.x += this.vx + this.kvx;
    this.y += this.vy;
    this.grounded = false;
    if (this.health <= 0) {
        if (~~random(2)) {
            mGame.fuels.push(new MFuel(this.x + this.w / 8, this.y, this.w * 6 / 8));
        }
        this.dead = true;
    }
    if (this.y > height * 1.5) {
        this.dead = true;
    }
    this.dhealth = lerp(this.dhealth, this.health, .1);
    if (this.y > height * 3) {
        this.dead = true;
    }
};

Martian.prototype.display = function() {
    push();
    translate(this.x + this.w / 2, this.y);
    push();
    if (this.vx >= 0) scale(-1, 1);
    image(this.img, -this.w / 2, 0, this.w, this.h);
    pop();
    if (this.health != this.maxHealth) {
        push();
        fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.dhealth / this.maxHealth));
        noStroke();
        rect(-this.w / 2, -50, this.dhealth / this.maxHealth * this.w, 30);
        stroke(100);
        strokeWeight(2);
        strokeCap(SQUARE);
        noFill();
        rect(-this.w / 2, -50, this.w, 30);
        pop();
    }
    pop();
};

Martian.prototype.run = function(p) {
    this.collide(p);
    this.update(p);
    this.display();
};

function MPlayer(x, y, w) {
    this.x = x;
    this.y = y;
    this.ox = this.x;
    this.oy = this.y;
    this.vx = 0;
    this.kvx = 0;
    this.vy = 0;
    this.img = imgs.player;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.gun = imgs.moonGun;
    this.gun.w = this.w / 2;
    this.gun.h = this.gun.w;
    this.fuelIcon = imgs.fueltank;
    this.heartIcon = imgs.pixelheart;
    this.maxlifes = 3;
    this.lifes = this.maxlifes;
    this.maxHealth = 6;
    this.health = this.maxHealth;
    this.dhealth = this.health;
    this.neededFuel = 10;
    this.fuel = 0;
    this.dfuel = this.fuel;
    this.reload = 0;
    this.reloadTime = 36;
    this.cooldownTime = 30;
    this.cooldown = this.cooldownTime;
    this.direction = RIGHT;
}

MPlayer.prototype.damage = function() {
    if (this.cooldown == 0) {
        this.health--;
        this.cooldown = this.cooldownTime;
    }
};

MPlayer.prototype.control = function() {
    if (keys[RIGHT_ARROW] || keys.d) {
        this.vx += 5;
        this.direction = RIGHT;
    }
    if (keys[LEFT_ARROW] || keys.a) {
        this.direction = LEFT;
        this.vx -= 5;
    }
    if ((keys[UP_ARROW] || keys.w) && this.grounded && this.vy > -1) {
        this.vy -= 20;
        this.grounded = false;
    }
    if ((keys[32] || keys[" "]) && this.reload == 0) {
        this.reload = this.reloadTime;
        mGame.bullets.push(new MBullet(this.x + this.w / 2, this.y + this.h / 9 + this.h / 2, 20 * (this.direction == RIGHT ? 1 : -1) + this.vx));
    }
};

MPlayer.prototype.update = function() {
    this.control();
    if (this.reload > 0) {
        this.reload--;
    }
    if (this.cooldown > 0) {
        this.cooldown--;
    }
    this.vy += .5;
    this.vx *= .75;
    this.kvx *= .9;
    this.vy *= .99;
    this.x += this.vx + this.kvx;
    this.y += this.vy;
    var cameraSpeed = .2;
    mGame.transX = lerp(mGame.transX, constrain(-this.x, -mGame.ground.w, mGame.ground.w), cameraSpeed);
    mGame.transY = lerp(mGame.transY, max(-this.y - this.h / 2, -height), cameraSpeed);
    if (this.y > height * 1.5) this.health -= .2;
    if (this.health <= 0) {
        this.lifes--;
        if (this.lifes <= 0) {
            mGame.reset();
        } else {
            mGame.reload();
        }
    }
    this.grounded = false;
    if (this.fuel >= this.neededFuel) {
        mGame.finish();
    }
    this.dfuel = lerp(this.dfuel, this.fuel, .1);
    this.dhealth = lerp(this.dhealth, this.health, .1);
};

MPlayer.prototype.display = function() {
    if (this.cooldown == 0 || frameCount % 8 < 4) {
        push();
        translate(this.x + this.w / 2, this.y + this.h / 2);
        if (this.direction == RIGHT) scale(-1, 1);
        imageMode(CENTER);
        image(this.img, 0, 0, this.w, this.h);
        scale(-1, 1);
        image(this.gun, -this.w / 8, this.h / 9, this.gun.w, this.gun.h);
        pop();
    }
};

MPlayer.prototype.displayStatus = function() {
    push();
    translate(width, 0);
    push();
    noStroke();
    // Lifes
        for (var i = 0; i < this.lifes; i++) {
        let hw = 50;
        image(this.heartIcon, -(i + 1) * 200 / 3 + hw / 8 - 30, 10, hw, hw);
    }
    // Health
        fill(lerpColor(color(200, 0, 0), color(0, 200, 0), this.dhealth / this.maxHealth));
    rect(-230, 70, this.dhealth / this.maxHealth * 200, 50);
    // Fuel
        fill(200, 120, 0);
    rect(-230, 130, this.dfuel / this.neededFuel * 200, 50);
    imageMode(CENTER);
    image(this.fuelIcon, -130, 155, 40 * this.fuelIcon.width / this.fuelIcon.height, 40);
    pop();
    push();
    // Outlines
        stroke(100);
    strokeWeight(5);
    strokeCap(SQUARE);
    noFill();
    rect(-230, 70, 200, 50);
    rect(-230, 130, 200, 50);
    pop();
    pop();
};

MPlayer.prototype.reset = function() {
    this.x = this.ox;
    this.y = this.oy;
    this.vx = 0;
    this.vy = 0;
    // this.fuel = constrain(this.fuel-~~random(1, 3), 0, this.neededFuel);
        this.health = this.maxHealth;
};

function MRock(x, sy, w) {
    this.x = x;
    this.y = 0;
    this.img = imgs.marsrock;
    this.w = w;
    this.h = this.w * this.img.height / this.img.width;
    this.y -= this.h * (sy + 1);
}

MRock.prototype.collide = function(p) {
    let vx = abs(p.vx) + abs(p.kvx), vy = abs(p.vy);
    if (p.x + p.w + vx + 1 > this.x && p.x - vx - 1 < this.x + this.w && p.y + p.h + vy > this.y && p.y - vy < this.y + this.h) {
        if (p.x + p.w - vx * 2 - 1 > this.x && p.x + vx * 2 + 1 < this.x + this.w) {
            if (p.y + p.h / 2 > this.y + this.h / 2) {
                p.y = max(p.y, this.y + this.h);
                if (p.y <= this.y + this.h) {
                    p.vy = max(p.vy, 0);
                }
            } else {
                p.y = min(p.y, this.y - p.h);
                p.vy = min(p.vy, 0);
                if (p.vy >= 0) {
                    p.grounded = true;
                }
            }
        } else if (p.y + p.h - vy - 1 > this.y && p.y + vy + 1 < this.y + this.h) {
            if (p instanceof Martian) {
                p.collision = true;
            }
            if (p.x + p.w / 2 > this.x + this.w / 2) {
                p.x = max(p.x, this.x + this.w);
                if (p.x <= this.x + this.w) {
                    p.vx = max(p.vx, 0);
                    p.kvx = max(p.kvx, 0);
                }
            } else {
                p.x = min(p.x, this.x - p.w);
                if (p.x + p.w >= this.x) {
                    p.vx = min(p.vx, 0);
                    p.kvx = min(p.kvx, 0);
                }
            }
        }
    }
};

MRock.prototype.display = function() {
    push();
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
};

MRock.prototype.run = function(ents) {
    for (var i = 0; i < ents.length; i++) {
        this.collide(ents[i]);
    }
    this.display();
}
// The xs are %s and the ys are how many rock heights up
;

let mrocks = [ {
    x: -100,
    y: 0
}, {
    x: -99,
    y: .8
}, {
    x: -96,
    y: 0
}, {
    x: -50,
    y: 0
}, {
    x: -47,
    y: .2
}, {
    x: -44,
    y: 0
}, {
    x: 17,
    y: 0
}, {
    x: 20,
    y: 0
}, {
    x: 23,
    y: 0
}, {
    x: 22,
    y: .8
}, {
    x: 18,
    y: .8
}, {
    x: 20,
    y: 1.6
}, {
    x: 60,
    y: 0
}, {
    x: 62,
    y: .75
}, {
    x: 64,
    y: 1.5
}, {
    x: 64.5,
    y: .75
}, {
    x: 64.5,
    y: 0
}, {
    x: 80,
    y: 0
}, {
    x: 83,
    y: .5
} ];

function Asteroid(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.health = 3;
    this.dead = false;
    this.frame = 0;
}

Asteroid.prototype.run = function(p) {
    this.display();
    if (!this.dead) {
        if (p) this.collide(p);
    }
    if (this.health < 1) {
        this.dead = true;
    }
};

Asteroid.prototype.collide = function(p) {
    let distance = dist(this.x, this.y, p.x, p.y);
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        this.dead = true;
        p.health--;
    }
    for (var i in lasers) {
        let l = lasers[i];
        distance = dist(this.x, this.y, l.x, l.y);
        r = l.radius + this.radius;
        if (distance < r) {
            l.dead = true;
            this.health--;
        }
    }
};

Asteroid.prototype.display = function() {
    if (this.dead) {
        this.img = imgs.explosion[round(this.frame / 2)];
 //image only switches every other frame
                this.frame++;
    } else {
        this.img = imgs.asteroid;
    }
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
};

let asteroids = [];

function FlyFreeplay() {
    push();
    background(0, 0, 0);
    FlyFreeplay.transX = 0;
    var levelW = FlyFreeplay.level.w;
    var cameraView = width / 2;
    if (flyPlayer.x > cameraView && flyPlayer.x < levelW) {
        FlyFreeplay.transX = -flyPlayer.x + cameraView;
    } else if (flyPlayer.x > levelW) {
        FlyFreeplay.transX = -levelW + cameraView;
    }
    if (flyPlayer.x > levelW + cameraView) {
        game.setScene(FlyFreeplay.gobackto);
        if (FlyFreeplay.levelObject.levelBuilderLevel) {
            FlyFreeplay.levelObject.verified = true;
            levelBuilder.save();
        }
    }
    translate(FlyFreeplay.transX, 0);
    displayStars();
    for (var i = lasers.length - 1; i > -1; i--) {
        lasers[i].run();
        if (lasers[i].dead) {
            lasers.splice(i, 1);
        }
    }
    for (var i = ufos.length - 1; i > -1; i--) {
        ufos[i].run(flyPlayer);
        if (ufos[i].dead && ufos[i].frame > 20) {
            ufos.splice(i, 1);
        }
    }
    for (var i = asteroids.length - 1; i > -1; i--) {
        asteroids[i].run(flyPlayer);
        if (asteroids[i].dead && asteroids[i].frame > 20) {
            asteroids.splice(i, 1);
        }
    }
    for (var i = bosses.length - 1; i > -1; i--) {
        bosses[i].run(flyPlayer);
        if (bosses[i].dead && bosses[i].frame > 20) {
            bosses.splice(i, 1);
        }
    }
    flyPlayer.run();
    pop();
    flyPlayer.displayHealth();
}

FlyFreeplay.set = function(level, gobackto) {
    this.levelObject = level;
    this.level = this.levelObject.objects;
    this.gobackto = gobackto;
};

FlyFreeplay.init = function() {
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    this.level.w = this.level.width / 100 * height;
    loadDynamicLevel(this.level);
};

function Laser(x, y, r, speed, belongsTo) {
    this.x = x + sin(r) * 50;
    this.y = y - cos(r) * 50;
    this.r = r;
    this.radius = 10;
    this.speed = speed;
    this.dead = false;
    this.belongsTo = belongsTo || "player";
}

Laser.prototype.run = function() {
    this.display();
    this.update();
};

Laser.prototype.update = function() {
    this.x += this.speed * sin(this.r);
    this.y -= this.speed * cos(this.r);
};

Laser.prototype.display = function() {
    stroke(201, 34, 34);
    push();
    strokeWeight(this.radius);
    translate(this.x, this.y);
    rotate(this.r);
    line(0, 0, 0, this.radius);
    pop();
};

let lasers = [];

var bosses = [];

function loadLevel(level) {
    flySigns = [];
    asteroids = [];
    bosses = [];
    for (var i in level.boss) {
        bosses.push(new UfoBoss(level.boss[i][0], level.boss[i][1]));
    }
    for (var i in level.asteroids) {
        let a = level.asteroids[i];
        asteroids.push(new Asteroid(a[0], a[1], a[2]));
    }
    ufos = [];
    for (var i in level.ufos) {
        let u = level.ufos[i];
        ufos.push(new Ufo(u[0], u[1] * height / 100));
    }
}

// Takes in an x as a percent, which is multiplied by the height
// All this does is it doesn't use the height in the data, instead it takes in a percent of the height
// It also takes in a percent for the radius, which 100% is height/2
function loadDynamicLevel(level) {
    flySigns = [];
    asteroids = [];
    ufos = [];
    bosses = [];
    if (level.asteroids) {
        for (var i = 0; i < level.asteroids.length; i++) {
            let a = level.asteroids[i];
            for (var j = 0; j < a.length; j++) {
                if (typeof a[j] == "string") {
                    a[j] = parseFloat(a[j]);
                }
            }
            asteroids.push(new Asteroid(a[0] / 100 * height, a[1] / 100 * height, a[2] / 200 * height));
        }
    }
    if (level.ufos) {
        for (var i = 0; i < level.ufos.length; i++) {
            let u = level.ufos[i];
            for (var j = 0; j < u.length; j++) {
                if (typeof u[j] == "string") {
                    u[j] = parseFloat(u[j]);
                }
            }
            ufos.push(new Ufo(u[0] / 100 * height, u[1] / 100 * height, u[2] / 200 * height));
        }
    }
    if (level.boss) {
        for (var i = 0; i < level.boss.length; i++) {
            var b = level.boss[i];
            for (var j = 0; j < b.length; j++) {
                if (typeof b[j] == "string") {
                    b[j] = parseFloat(b[j]);
                }
            }
            bosses.push(new UfoBoss(b[0] / 100 * height, b[1] / 100 * height, b[2] / 200 * height));
        }
    }
}

function flyToMars() {
    background(0);
    push();
    if (flyPlayer.x > width / 2) {
        if (flyPlayer.x < 6750) {
            translate(-flyPlayer.x + width / 2, 0);
        } else if (flyPlayer.x > 6750 + width / 2) {
            game.continue();
        } else {
            translate(-6750 + width / 2, 0);
        }
    }
    displayStars();
    // planets
        image(imgs.moonsphere, -height / 5, height * 3 / 4, height / 3, height / 3);
    image(imgs.mars, 6750 + width / 2 - height / 7, height / 4, height / 5, height / 5);
    for (var i in lasers) {
        lasers[i].run();
        if (lasers[i].dead) {
            lasers.splice(i, 1);
        }
    }
    for (var i = ufos.length - 1; i > -1; i--) {
        ufos[i].run(flyPlayer);
        if (ufos[i].dead && ufos[i].frame > 20) {
            ufos.splice(i, 1);
        }
    }
    flyPlayer.run();
    for (var i = asteroids.length - 1; i > -1; i--) {
        asteroids[i].run(flyPlayer);
        if (asteroids[i].dead && asteroids[i].frame > 20) {
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}

flyToMars.init = function() {
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    this.level = {
        asteroids: [ [ 1200, height / 2, 100 ], [ 1800, 150, 95 ], [ 2e3, height - 100, 95 ], [ 2400, height - 125, 80 ], [ 2900, height / 2, 125 ], [ 4500, 100, 100 ], [ 4500, height - 100, 100 ], [ 4700, height / 2 + 150, 100 ], [ 4700, height / 2 - 150, 100 ] ],
        //x, y, size
        ufos: [ [ 1800, height / 2 ], [ 3400, 200 ], [ 4e3, 100 ], [ 4e3, height - 100 ], [ 6500, height / 2 ], [ 6500, 100 ], [ 6500, height - 100 ] ]
    };
    loadLevel(this.level);
};

function flyToMoon() {
    push();
    background(0, 0, 0);
    if (flyPlayer.x > width / 2 && flyPlayer.x < 5500) {
        translate(-flyPlayer.x + width / 2, 0);
    } else if (flyPlayer.x > 5500) {
        translate(-5500 + width / 2, 0);
    }
    if (flyPlayer.x > 5500 + width / 2) {
        game.continue();
    }
    displayStars();
    // moon
        image(imgs.moonsphere, 5500 + width / 2 - height / 7, height / 4, height / 5, height / 5);
    for (var i in flySigns) {
        flySigns[i].display(flyPlayer);
    }
    for (var i in lasers) {
        lasers[i].run();
        if (lasers[i].dead) {
            lasers.splice(i, 1);
        }
    }
    flyPlayer.run();
    for (var i in asteroids) {
        asteroids[i].run(flyPlayer);
        if (asteroids[i].dead && asteroids[i].frame > 20) {
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}

flyToMoon.init = function() {
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    flySigns = [];
    flySigns.push(new FlySign(200, "Press space to accelerate, use the left and right arrow keys or a and d to steer"));
 //This is very inefficient It will be a lot more efficient when it's not a tutorial level
        asteroids = [];
    flySigns.push(new FlySign(2900, "Look out for asteroids!"));
    for (var i = -300; i < height + 300; i += 300) {
        asteroids.push(new Asteroid(5200, i, 150));
    }
    flySigns.push(new FlySign(4400, "Press Z to shoot, try blowing up an asteroid"));
    asteroids.push(new Asteroid(3500, height / 2, 125));
};

function FlyPlayer(x, y) {
    this.x = x;
    this.y = y;
    //Having actual x and y velocities make it more realistic
        this.vx = 0;
    this.vy = 0;
    this.maxv = 14;
    this.r = 90;
 //rotation
        this.health = 3;
    this.w = 100;
    this.h = 40;
    this.speed = 5;
    this.rvel = 0;
    // Same thing until I change them
        this.offImg = {};
    this.onImg = {};
    this.shootCooldown = 0;
    this.thrustCooldown = 30;
}

FlyPlayer.prototype.init = function() {
    this.offImg = imgs.rocketOff;
    this.onImg = imgs.rocketOn;
    this.h = this.w * this.onImg.getHeight() / this.onImg.getWidth();
};

FlyPlayer.prototype.run = function(cx) {
    this.display();
    this.control();
    this.update(cx);
    this.collide();
    if (this.health < 1) {
        game.getFunc().init();
    }
};

FlyPlayer.prototype.displayHealth = function() {
    push();
    stroke(94, 94, 94);
    strokeWeight(10);
    fill(0, 0, 0);
    rect(width - 200, 50, 150, 50);
    fill(39, 183, 20);
    noStroke();
    rect(width - 200 + 5, 55, map(this.health, 0, 3, 0, 140), 40);
    pop();
};

FlyPlayer.prototype.update = function(cx) {
    this.shootCooldown++;
    this.thrustCooldown++;
    this.r += this.rvel;
    this.rvel *= .9;
    this.x += this.vx;
    this.y += this.vy;
    var m = mag(this.vx, this.vy);
    if (m > this.maxv) {
        this.vx *= this.maxv / m;
        this.vy *= this.maxv / m;
    }
    this.speed *= .9;
    this.speed = constrain(this.speed, -5, 5);
    if (this.y - this.h / 1.7 > height) {
        this.y -= height + this.h / 1.8 + this.h / 1.7;
    } else if (this.y + this.h / 1.7 < 0) {
        this.y += height + this.h / 1.8 + this.h / 1.7;
    }
    if (typeof cx == "number") {
        this.x = constrain(this.x, 0, abs(cx));
    } else {
        this.x = max(this.x, 0);
    }
};

FlyPlayer.prototype.collide = function() {
    for (var i in lasers) {
        var l = lasers[i];
        if (l.belongsTo !== "player") {
            let distance = dist(this.x, this.y, l.x, l.y);
            let r = l.radius + (this.w + this.h) / 4;
            if (distance < r) {
                l.dead = true;
                this.health--;
            }
        }
    }
};

FlyPlayer.prototype.control = function() {
    if ((keys[" "] || keys[32]) && this.thrustCooldown > 30) {
        this.speed += .3;
        this.vx *= .8;
        this.vy *= .8;
        this.vx += this.speed * sin(this.r);
        this.vy -= this.speed * cos(this.r);
    } else {
        this.vx *= .99;
        this.vy *= .99;
    }
    if (keys.z && this.shootCooldown > 15) {
        lasers.push(new Laser(this.x, this.y, this.r, 20));
        this.shootCooldown = 0;
    }
    if (keys[RIGHT_ARROW] || keys.d) {
        this.rvel += .5;
    }
    if (keys[LEFT_ARROW] || keys.a) {
        this.rvel -= .5;
    }
    if (keys.x) {
        this.speed *= .8;
        this.vx *= .8;
        this.vy *= .8;
    }
};

FlyPlayer.prototype.display = function() {
    push();
    imageMode(CENTER);
 //rotate from center
        translate(this.x, this.y);
    rotate(this.r);
    // scale(this.w/this.imgT.width, this.h/this.imgT.height)
        if (keys[" "] || keys[32]) {
        drawAnimation(this.onImg, 0, 0, this.w, this.h);
    } else {
        drawAnimation(this.offImg, 0, 0, this.w, this.h);
    }
    pop();
};

let flyPlayer = new FlyPlayer(100, 100);

//general scenery for both flying scenes
let stars = [];

function displayStars() {
    for (var i = 0; i < 7e3; i += imgs.stars.width * (height / imgs.stars.height)) {
        push();
        translate(i, 0);
        scale(height / imgs.stars.height);
        image(imgs.stars, 0, 0);
        pop();
    }
}

function drawStars() {
    push();
    noStroke();
    for (var i in stars) {
        var s = stars[i];
        fill(255, 255, 255, s.a);
        ellipse(s.x, s.y, s.d, s.d);
    }
    pop();
}

function FlySign(x, txt) {
    this.x = x;
    this.w = 600;
    this.h = 350;
    this.y = height / 2 - this.h / 2;
    this.txt = txt;
    this.padding = 100;
    this.img = imgs.spacesign.clone();
}

FlySign.prototype.display = function(p) {
    push();
    drawAnimation(this.img, this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
    fill(0);
    noStroke();
    textSize(35);
    textFont(fonts.pixel);
    text(this.txt, this.x + this.padding, this.y + this.padding, this.w - this.padding * 2, this.h - this.padding * 2);
    pop();
};

let flySigns = [];

function Ufo(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r || 100;
    this.img = imgs.ufo.clone();
    this.w = this.radius * 2;
    this.h = this.w * this.img.getHeight() / this.img.getWidth();
    this.radius = (this.w + this.h) / 4;
    this.speed = 5;
    this.health = 2;
    this.frame = 0;
}

Ufo.prototype.run = function(p) {
    this.display();
    if (!this.dead) {
        if (p) {
            this.collide(p);
            if (dist(this.x, this.y, p.x, p.y) < 1e3) this.update(p);
        }
    }
    if (this.health < 1) {
        this.dead = true;
    }
};

Ufo.prototype.update = function(p) {
    if (this.x < p.x) this.x += this.speed;
    if (this.x > p.x) this.x -= this.speed;
    if (this.y < p.y) this.y += this.speed;
    if (this.y > p.y) this.y -= this.speed;
};

Ufo.prototype.collide = function(p) {
    let distance = dist(this.x, this.y, p.x, p.y);
    let r = this.radius + (p.w + p.h) / 4;
    if (distance < r) {
        this.dead = true;
        p.health--;
    }
    for (var i in lasers) {
        let l = lasers[i];
        distance = dist(this.x, this.y, l.x, l.y);
        r = l.radius + this.radius;
        if (distance < r) {
            l.dead = true;
            this.health--;
        }
    }
};

Ufo.prototype.display = function() {
    push();
    translate(this.x, this.y);
    if (this.dead) {
        let explosionImg = imgs.explosion[~~(this.frame / 2)];
 //image only switches every other frame
                this.frame++;
        imageMode(CENTER);
        image(explosionImg, 0, 0, this.radius * 2, this.radius * 2);
    } else {
        drawAnimation(this.img, 0, 0, this.w, this.h);
    }
    pop();
};

let ufos = [];

function UfoBoss(x, y, r) {
    this.x = x;
    this.y = y;
    this.img = imgs.ufoboss;
    this.r = r || 300;
    this.w = this.r * 2;
    this.h = this.w * this.img.height / this.img.width;
    this.r = (this.w + this.h) / 4;
    this.health = 100;
    this.radius = this.w / 2;
    this.frame = 0;
    this.shootWait = 120;
}

UfoBoss.prototype.run = function(p) {
    this.display();
    this.collide(p);
    this.update(p);
};

UfoBoss.prototype.update = function(p) {
    if (this.health < 1) {
        this.dead = true;
        this.img = imgs.explosion[round(this.frame / 2)];
 //image only switches every other frame
                this.frame++;
    }
    if (frameCount % this.shootWait === 0) {
        lasers.push(new Laser(this.x, this.y, -atan2(this.x - p.x, this.y - p.y), 4, "boss"));
        this.shootWait = round(random(80, 140));
    }
};

UfoBoss.prototype.collide = function(p) {
    let distance = dist(this.x, this.y, p.x, p.y);
    let r = this.r + (p.w + p.h) / 4;
    if (distance < r) {
        p.x -= p.vx;
        p.y -= p.vy;
        p.thrustCooldown = 0;
        var pm = mag(p.vx, p.vy) * 2;
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        var dm = mag(dx, dy);
        var mm = pm / dm;
        dx *= mm;
        dy *= mm;
        p.vx += dx;
        p.vy += dy;
        p.health--;
    }
    for (var i in lasers) {
        let l = lasers[i];
        if (l.belongsTo !== "boss") {
            distance = dist(this.x, this.y, l.x, l.y);
            r = l.radius + this.radius;
            if (distance < r) {
                l.dead = true;
                this.health--;
            }
        }
    }
};

UfoBoss.prototype.display = function() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.w, this.h);
    pop();
    this.displayHealth();
};

UfoBoss.prototype.displayHealth = function() {
    push();
    noStroke();
    fill(204, 14, 14);
    rect(this.x - this.w / 3, this.y - this.h * .8, this.w * 2 / 3 * this.health / 100, this.h * .2);
    stroke(94, 94, 94);
    strokeWeight(10);
    noFill();
    rect(this.x - this.w / 3, this.y - this.h * .8, this.w * 2 / 3, this.h * .2);
    pop();
};

function ufoBossFight() {
    background(0, 0, 0);
    push();
    if (flyPlayer.x > 3e3 - width / 2) {
        translate(-3e3 + width, 0);
    } else if (flyPlayer.x > width / 2) {
        translate(-flyPlayer.x + width / 2, 0);
    }
    displayStars();
    for (var i in lasers) {
        lasers[i].run();
        if (lasers[i].dead) {
            lasers.splice(i, 1);
        }
    }
    for (var i = ufos.length - 1; i > -1; i--) {
        ufos[i].run(flyPlayer);
        if (ufos[i].dead && ufos[i].frame > 20) {
            ufos.splice(i, 1);
        }
    }
    for (var i in bosses) {
        bosses[i].run(flyPlayer);
        if (bosses[i].dead && bosses[i].frame > 20) {
            bosses.splice(i, 1);
            if (bosses.length === 0) {
                game.continue();
            }
        }
    }
    flyPlayer.run(3e3);
    for (var i = asteroids.length - 1; i > -1; i--) {
        asteroids[i].run(flyPlayer);
        if (asteroids[i].dead && asteroids[i].frame > 20) {
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}

ufoBossFight.level = {
    boss: [ [ 1500, window.innerHeight / 2 ] ]
};

ufoBossFight.init = function() {
    lasers = [];
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    loadLevel(this.level);
};

function flyToVenus() {
    background(0, 0, 0);
    push();
    if (flyPlayer.x > width / 2) {
        if (flyPlayer.x < 4e3) {
            translate(-flyPlayer.x + width / 2, 0);
        } else if (flyPlayer.x > 4e3 + width / 2) {
            game.continue();
        } else {
            translate(-4e3 + width / 2, 0);
        }
    }
    displayStars();
    // planets
        image(imgs.mars, -height / 5, -height / 12, height / 3, height / 3);
    image(imgs.venus, 4e3 + width / 2 - height / 6, height * 3 / 4, height / 5, height / 5);
    for (var i in lasers) {
        lasers[i].run();
        if (lasers[i].dead) {
            lasers.splice(i, 1);
        }
    }
    for (var i = ufos.length - 1; i > -1; i--) {
        ufos[i].run(flyPlayer);
        if (ufos[i].dead && ufos[i].frame > 20) {
            ufos.splice(i, 1);
        }
    }
    flyPlayer.run();
    for (var i = asteroids.length - 1; i > -1; i--) {
        asteroids[i].run(flyPlayer);
        if (asteroids[i].dead && asteroids[i].frame > 20) {
            asteroids.splice(i, 1);
        }
    }
    pop();
    flyPlayer.displayHealth();
}

flyToVenus.init = function() {
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    this.level = {
        asteroids: [ [ 1200, height / 2, height / 2 ], [ 3e3, height / 2, 100 ], [ 3e3, height / 2 - 200, 100 ], [ 3e3, height - 200, 100 ] ],
        ufos: [ [ 1600, height / 2 ], [ 2e3, 100 ], [ 2400, height - 100 ], [ 2800, height / 2 ], [ 3500, height / 2 ], [ 3500, height ] ]
    };
    loadLevel(this.level);
};

function buildPlatformer() {
    background(200, 225, 250);
    push();
    translate(0, buildPlatformer.itemBarHeight);
    scale(buildPlatformer.scaleFactor);
    if (buildPlatformer.player) translate(buildPlatformer.player.getTransX(true, buildPlatformer.w), 0);
    buildPlatformer.displayGrid();
    for (var i in buildPlatformer.blocks) {
        buildPlatformer.blocks[i].display();
    }
    pop();
    buildPlatformer.itemBar();
    if (mouseY > buildPlatformer.itemBarHeight) {
        buildPlatformer.displayItem();
    }
    if (mouseIsPressed && buildPlatformer.placing) {
        buildPlatformer.placeItem();
        buildPlatformer.reload();
    }
}

buildPlatformer.init = function() {
    this.bw = 100;
    this.bh = 100;
    this.itemsKey = [ "_", "a", "#", "r", "-", "'", "^", "v", "~", "x", "o", "0", "f", "%", "player", "pause", "edit", "left", "right" ];
    this.items = Array(this.itemsKey.length);
    this.itemPadding = width / 100;
 //padding
        this.iw = width / this.items.length - this.itemPadding * 2;
    for (var i in this.itemsKey) {
        var constr = bGame.getConst(this.itemsKey[i]);
        if (constr) {
            this.items[i] = new constr(0, 0);
        } else {
            this.items[i] = new BuildMenuButton(this.itemsKey[i]);
        }
        this.items[i].w = this.iw;
        this.items[i].h = this.iw;
        this.items[i].keyValue = this.itemsKey[i];
    }
    this.itemSpace = this.items.length * 100;
    this.itemBarHeight = width / this.items.length;
    this.load();
    this.player = new BPlayer(0, 0);
};

buildPlatformer.load = function() {
    var map = currentBuildingLevel.level;
    this.scaleFactor = (height - this.itemBarHeight) / (map.length * this.bh);
    this.h = map.length * this.bh;
    this.w = map[0].length * this.bw;
    this.sw = 1 / this.scaleFactor * width;
    this.sh = 1 / this.scaleFactor * height;
    this.reload();
};

buildPlatformer.reload = function() {
    this.blocks = [];
    var map = currentBuildingLevel.level;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            let k = map[i][j];
            let x = j * this.bw;
            let y = i * this.bh;
            if (bGame.getConst(k)) {
                this.blocks.push(new (bGame.getConst(k))(x, y, this.bw, this.bh));
            }
            if (k == "@") {
                // this.player = new BPlayer(x, y+this.bh, this.bh*0.75);
                this.blocks.push(new BuildMenuButton("@", x, y, this.bw * .75, this.bw));
            }
        }
    }
};

buildPlatformer.placeItem = function() {
    var map = currentBuildingLevel.level;
    var my = (mouseY - this.itemBarHeight) / this.scaleFactor;
    var mx = mouseX / this.scaleFactor - this.player.transX;
    if (mouseY < this.itemBarHeight) return;
    var x = floor(mx / this.bw);
    var y = floor(my / this.bh);
    if (this.placingItem == "@") {
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] == "@") {
                    currentBuildingLevel.level[i] = currentBuildingLevel.level[i].replaceAt(j, "_");
                }
            }
        }
    }
    currentBuildingLevel.level[y] = currentBuildingLevel.level[y].replaceAt(x, this.placingItem);
    currentBuildingLevel.verified = false;
};

buildPlatformer.itemBar = function() {
    push();
    fill(41, 41, 41, 100);
    noStroke();
    rect(0, 0, width, this.itemBarHeight);
    var x = 0;
    for (var i in this.items) {
        var o = this.items[i];
        var x = map(i, 0, this.items.length, 0, width);
        o.x = x + this.itemPadding;
        o.y = this.itemPadding;
        o.display(true);
        if (mouseX > o.x && mouseX < o.x + o.w && mouseY > o.y && mouseY < o.y + o.h) {
            cursor(HAND);
            if (clicked) {
                if (o.notBlock) {
                    switch (o.type) {
                      case "pause":
                        levelBuilder.pause();
                        break;

                      case "edit":
                        levelBuilder.editStats();
                        break;

                      case "player":
                        this.placing = true;
                        this.placingItem = "@";
                        break;
                    }
                } else {
                    this.placing = true;
                    this.placingItem = this.itemsKey[i];
                }
                clicked = false;
            } else if (mouseIsPressed) {
                if (o.notBlock) {
                    if (o.type == "left") {
                        this.player.x -= 10;
                    } else if (o.type == "right") {
                        this.player.x += 10;
                    }
                }
            }
        }
    }
    pop();
    if (keys[LEFT_ARROW] || keys.a) {
        this.player.x -= 10;
    } else if (keys[RIGHT_ARROW] || keys.d) {
        this.player.x += 10;
    }
    this.player.x = constrain(this.player.x, 0, this.w - this.sw);
};

buildPlatformer.displayGrid = function() {
    var map = currentBuildingLevel.level;
    for (var i in map) {
        for (var j in map[i]) {
            var x = j * this.bw;
            var y = i * this.bh;
            push();
            stroke(255, 64);
            strokeWeight(2);
            noFill();
            rectMode(LEFT);
            rect(x, y, this.bw, this.bh);
            pop();
        }
    }
};

buildPlatformer.displayItem = function() {
    if (this.placing) {
        var o = this.items.find(function(a) {
            return a.keyValue == buildPlatformer.placingItem || a.keyValue == "player" && buildPlatformer.placingItem == "@";
        });
        if (!o) return console.warn("No item to display");
        var old = {
            x: o.x,
            y: o.y,
            w: o.w,
            h: o.h
        };
        var d = this.bh * 1.2 / o.h;
        o.w *= d;
        o.h *= d;
        o.x = mouseX - o.w / 2;
        o.y = mouseY - o.h / 2;
        o.display(true);
        for (var i in old) {
            o[i] = old[i];
        }
    }
};

String.prototype.replaceAt = function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
};

function BuildMenuButton(type, x, y, w, bw) {
    this.notBlock = true;
    this.x = x || 0;
    this.y = y || 0;
    this.type = type;
    this.img = {};
    switch (type) {
      case "pause":
        this.img = imgs.pausebtn;
        break;

      case "edit":
        this.img = imgs.editicon;
        break;

      case "player":
        this.img = imgs.player;
        break;

      case "@":
        this.img = imgs.player;
        break;

      case "left":
        this.img = imgs.leftarrow;
        break;

      case "right":
        this.img = imgs.rightarrow;
        break;

      default:
        this.img = imgs.x;
        break;
    }
    if (type == "@" && typeof w == "number") {
        this.w = w;
        this.h = this.img.height / this.img.width * this.w;
        this.bw = bw;
    } else {
        this.w = w || 100;
        this.h = this.w;
    }
}

BuildMenuButton.prototype.display = function() {
    push();
    var tx = this.x + (this.w || this.bw) / 2;
    translate(tx, 0);
    if (this.type == "@" || this.type == "player") scale(-1, 1);
    translate(-tx, 0);
    imageMode(CORNER);
    let img = this.img;
    if (this.type == "@") {
        image(img, this.x, this.y + this.bw - this.h, this.w, this.h);
    } else if (this.type == "player") {
        var w = this.w * img.width / img.height;
        image(img, this.x + this.w / 2 - w / 2, this.y, w, this.h);
    } else {
        image(img, this.x, this.y, this.w, this.h);
    }
    pop();
};

function communityLevels() {
    background(225);
    communityLevels.home.check();
    if (!communityLevels.hasLoaded) {
        if (cLevels.length > 0) {
            communityLevels.hasLoaded = true;
            communityLevels.init();
        }
        push();
        textAlign(CENTER);
        fill(0);
        textFont(fonts.londrina);
        textSize(40);
        let dots = "";
        let fc = frameCount % 100;
        dots += fc > 25 ? fc > 50 ? fc > 75 ? "..." : ".." : "." : "";
        text("Loading." + dots, width / 2, height / 2);
        pop();
    } else {
        push();
        translate(0, 100);
        scroller.update();
        let p = 20;
        var x = p;
        var y = p;
        let w = communityDisplays[0].w;
        let h = communityDisplays[0].h;
        var across = floor(width / (w + p));
        var going = 0;
        var my = 0;
        for (var i = 0; i < communityDisplays.length; i++) {
            communityDisplays[i].draw(x, y);
            going++;
            x += p + w;
            if (going >= across) {
                x = p;
                going = 0;
                if (i != communityDisplays.length - 1) {
                    y += h + p;
                    if (y + h > height - 150) {
                        my = y + h - height + 150 + p;
                    }
                }
            }
        }
        scroller.maxY = -my;
        pop();
    }
    push();
    noStroke();
    fill(0, 0, 0, 10);
    rect(0, 95, width, 10);
    fill(255);
    rect(0, 0, width, 100);
    textAlign(CENTER, BOTTOM);
    fill(0);
    textFont(fonts.arcade);
    textSize(50);
    stroke(200);
    strokeWeight(3);
    text("Community Levels", width / 2, 75);
    pop();
    push();
    fill(255);
    stroke(0);
    strokeWeight(5);
    textFont(fonts.bladerunner);
    textSize(25);
    communityLevels.home.display(color(0));
    pop();
}

communityLevels.hasLoaded = false;

communityLevels.init = function() {
    communityLevels.home = new Button("Home", 10, height - 60, 100, 50, function() {
        game.setScene("home");
    });
    if (cLevels.length <= 0 || communityDisplays.length > 0) return;
    var arr1 = cLevels.filter(function(a) {
        return a.featured;
    });
    var arr2 = cLevels.filter(function(a) {
        return !a.featured;
    });
    cLevels = arr1.concat(arr2);
    communityLevels.hasLoaded = true;
    for (var i = 0; i < cLevels.length; i++) {
        communityDisplays.push(new LevelDisplay(cLevels[i], 200, 250));
    }
    scroller.reset();
};

let scroller = {
    x: 0,
    y: 0,
    ax: 0,
    ay: 0,
    update: function() {
        if (mouseY < 200 && mouseY > 100) {
            this.y = min(this.y + map(mouseY, 100, 200, 15, 5), 0);
        } else if (mouseY > height - 100) {
            this.y = max(this.y - map(mouseY, height, height - 100, 15, 5), this.maxY || 0);
        }
        if (keys[DOWN_ARROW] || keys.s) {
            this.y = max(this.y - 10, this.maxY || 0);
        }
        if (keys[UP_ARROW] || keys.w) {
            this.y = min(this.y + 10, 0);
        }
        this.ax = this.x;
        this.ay = this.y + 100;
        translate(this.x, this.y);
    },
    reset: function() {
        this.x = 0;
        this.y = 0;
        this.ax = 0;
        this.ay = 0;
    }
};

let cLevels = [];

// JSON loading
function getCommunityLevels() {
    var communityLevelsPath = "https://escape-from-earth.herokuapp.com/levels";
    $.getJSON(communityLevelsPath, function(data) {
        cLevels = data;
    }).catch(function() {
        communityLevelsPath = "/scripts/levelbuilder/stashedcommunitylevels.json";
        $.getJSON(communityLevelsPath, function(data) {
            console.log("Failed to load external resource, stuck with local");
            communityLevels.level = data;
        }).catch(function() {
            console.log("Failed to load any community levels");
        });
    });
}

getCommunityLevels();

setInterval(getCommunityLevels, 1e4);

function postLevel(newLevel) {
    newLevel.waitingForUpdate = true;
    // Change this maybe if developing
    var hostname = "https://escape-from-earth.herokuapp.com";
    $.post(hostname + "/v1/levels/new", newLevel, function(data) {
        getCommunityLevels();
        for (var i = 0; i < levelsBuilt.length; i++) {
            var l = levelsBuilt[i];
            if (l.waitingForUpdate) {
                if (l.title == data.title && l.creator == data.creator || l._id == data._id) {
                    levelsBuilt[i] = data;
                    var l = levelsBuilt[i];
                    l.waitingForUpdate = false;
                    l.uploaded = true;
                    levelBuilder.save();
                }
            }
        }
    }).catch(function(e, t, n) {
        console.log("Error posting new level");
        console.log(t);
        console.log(n);
    });
}

function LevelBuilderLevel(title, creator, type, difficulty) {
    this.title = title || "New Level";
    this.creator = creator || "Anonymous";
    this.type = type || "";
    this.difficulty = difficulty || 1;
    this.verified = false;
    this.uploaded = false;
    this.waitingForUpdate = false;
    this.levelBuilderLevel = true;
    switch (this.type) {
      case "run":
        this.map = "_______________%";
        break;

      case "build":
        this.level = [ "________________________", "________________________", "________________________", "________________________", "________________________", "________________________", "________________________" ];
        break;

      case "space":
        this.objects = {
            width: 200,
            asteroids: [],
            ufos: [],
            boss: []
        };
        break;

      case "mars":
        this.objects = {
            blocks: []
        };
        break;
    }
}

LevelBuilderLevel.updateLevel = function(level, title, creator, w, h) {
    level.title = title || level.title;
    level.creator = creator || level.creator;
    if (w) {
        switch (level.type) {
          case "run":
            var sMap = level.map.split("");
            while (sMap.length > w) {
                sMap.pop();
                sMap[sMap.length - 1] = "%";
            }
            while (sMap.length < w) {
                sMap.push("%");
                sMap[sMap.length - 2] = "_";
            }
            level.map = sMap.join("");
            break;

          case "build":
            if (h) {
                while (level.level.length > h) {
                    level.level.pop();
                }
                while (level.level.length < h) {
                    var newFloor = new Array(level.level[0].length);
                    newFloor.fill("_");
                    level.level.push(newFloor.join(""));
                }
            }
            if (w) {
                while (level.level[0].length > w) {
                    for (var i = 0; i < level.level.length; i++) {
                        level.level[i] = level.level[i].replaceAt(level.level[i].length - 1, "");
                    }
                }
                while (level.level[0].length < w) {
                    for (var i = 0; i < level.level.length; i++) {
                        level.level[i] += "_";
                    }
                }
            }
            break;

          case "space":
            level.objects.width = w;
            break;
        }
    }
};

function LevelDisplay(level, w, h, editable) {
    this.level = level;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.editable = editable;
}

LevelDisplay.prototype.go = function() {
    playLevel.setup(this.level, game.currentScene);
    console.log(this.level);
    game.setScene("playlevel");
};

LevelDisplay.prototype.check = function() {
    if (this.editable) {
        if (mouseX > this.x + 10 && mouseX < this.x + this.w - 10) {
            if (mouseY > max(this.y + this.w + 50 + scroller.ay, 100) && mouseY < this.y + this.w + 90 + scroller.ay) {
                cursor(HAND);
                if (clicked) {
                    if (mouseX < this.x + this.w / 2) {
                        this.go();
                    } else {
                        levelBuilder.openLevel(this.level.index);
                    }
                }
                pressed = false, clicked = false;
            } else if (this.level.verified) {
                if (mouseY > max(this.y + this.w + 100 + scroller.ay, 100) && mouseY < this.y + this.w + 140 + scroller.ay && mouseX > this.x + this.w / 2 + 5) {
                    cursor(HAND);
                    if (clicked) {
                        postLevel(this.level);
                    }
                    pressed = false, clicked = false;
                }
            }
        }
        return;
    }
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > max(100, this.y + scroller.ay) && mouseY < this.y + scroller.ay + this.h) {
        cursor(HAND);
        if (pressed) {
            this.go();
            pressed = false;
        } else if (clicked) {
            clicked = false;
        }
    }
};

LevelDisplay.prototype.display = function() {
    push();
    var img;
    switch (this.level.type) {
      case "run":
        img = imgs.runthumb;
        break;

      case "build":
        img = imgs.buildthumb;
        break;

      case "space":
        img = imgs.spacethumb;
        break;

      case "mars":
        img = imgs.marsthumb;
        break;

      default:
        img = imgs.x;
        break;
    }
    image(img, this.x, this.y, this.w, this.w);
    fill(this.level.featured ? color(200, 150, 0) : 0);
    textAlign(LEFT, TOP);
    textFont(fonts.londrina);
    textSize(15);
    var ty = textAscent() + textDescent();
    text(this.level.title, this.x + 5, this.y + this.w + 5, this.w - 10, ty);
    text(this.level.creator, this.x + 5, this.y + this.w + 5 + ty, this.w - 10, ty);
    if (this.editable) {
        push();
        fill(245);
        strokeWeight(5);
        stroke(10);
        rect(this.x + 10, this.y + this.w + 50, this.w / 2 - 15, 40, 5);
        rect(this.x + this.w / 2 + 5, this.y + this.w + 50, this.w / 2 - 15, 40, 5);
        if (this.level.verified) {
            rect(this.x + this.w / 2 + 5, this.y + this.w + 100, this.w / 2 - 15, 40, 5);
        }
        fill(10);
        noStroke();
        textFont(fonts.londrina);
        textSize(12);
        textAlign(CENTER, CENTER);
        text("Play", this.x + 5 + this.w / 4, this.y + this.w + 70);
        text("Edit", this.x - 5 + this.w * 3 / 4, this.y + this.w + 70);
        if (this.level.verified) {
            text("Upload", this.x - 5 + this.w * 3 / 4, this.y + this.w + 120);
        }
        fill(this.level.verified ? color(0, 200, 0) : color(200, 0, 0));
        textAlign(LEFT, CENTER);
        textSize(20);
        text(this.level.verified ? "Verified" : "Unverified", this.x + 10, this.y + this.w + 120);
        pop();
    }
    strokeWeight(5);
    noFill();
    stroke(0);
    rect(this.x, this.y, this.w, this.h, 8);
    pop();
};

LevelDisplay.prototype.draw = function(x, y) {
    this.x = x;
    this.y = y;
    this.check();
    this.display();
};

var communityDisplays = [], levelBuildDisplays = [];

// Level data
var levelsBuilt = JSON.parse(localStorage.myLevels || "[]");

var currentBuildingLevel = null;

// Level Builder Function
function levelBuilder() {
    if (levelBuilder.isPaused) return levelBuilder.paused();
    if (levelBuilder.isEditingStats) return levelBuilder.editingStats();
    levelBuilder.getFunc()();
}

levelBuilder.getFunc = function() {
    switch (levelBuilder.building) {
      case "run":
        return buildRunMap;
        break;

      case "build":
        return buildPlatformer;
        break;

      case "space":
        return buildSpaceLevel;
        break;

      case "mars":
        return buildArena;
        break;

      case "new":
        return createNewLevel;
        break;

      case "none":
        return levelBuilderMenu;
        break;

      default:
        levelBuilder.building = "none";
        return levelBuilderMenu;
        break;
    }
};

levelBuilder.setType = function(type) {
    levelBuilder.building = type;
    if (typeof this.getFunc().init == "function") this.getFunc().init();
    this.save();
};

levelBuilder.addLevel = function(level) {
    levelsBuilt.unshift(level);
    this.save();
    console.log("added a level");
};

levelBuilder.removeLevel = function(i) {
    levelsBuilt.splice(i, 1);
    this.save();
};

levelBuilder.openLevel = function(i) {
    currentBuildingLevel = levelsBuilt[i];
    this.setType(currentBuildingLevel.type);
    currentBuildingLevel.levelBuilderLevel = true;
};

levelBuilder.save = function() {
    for (var i = 0; i < levelsBuilt.length; i++) {
        levelsBuilt[i].index = i;
    }
    localStorage.myLevels = JSON.stringify(levelsBuilt || "[]");
};

levelBuilder.pause = function() {
    this.isPaused = true;
    this.isEditingStats = false;
    push();
    resetMatrix();
    noStroke();
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    pop();
    if (!isMobile) {
        this.pausedImg = get();
    }
};

levelBuilder.paused = function() {
    // Display
    push();
    resetMatrix();
    if (isMobile) {
        background(80, 80, 80);
    } else {
        image(this.pausedImg, 0, 0, width, height);
    }
    // Title
        fill(255);
    textFont(fonts.londrina);
    textSize(80);
    textAlign(CENTER, TOP);
    text(currentBuildingLevel.name, width / 2, 10);
    // Buttons
        fill(245);
    stroke(10);
    strokeWeight(3);
    rect(width / 4, 100, width / 2, 80, 20);
    rect(width / 4, 200, width / 4 - 10, 80, 20);
    rect(width / 2 + 10, 200, width / 4 - 10, 80, 20);
    rect(width / 4, 300, width / 4 - 10, 60, 20);
    rect(width / 2 + 10, 300, width / 4 - 10, 60, 20);
    noStroke();
    fill(10);
    textFont(fonts.londrina);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Resume", width / 2, 140);
    textSize(30);
    text("Save", width / 4, 240, width / 4);
    text("Save & Quit", width / 2 + 10, 240, width / 4 - 10);
    textSize(25);
    text("Delete Level", width / 4, 330, width / 4);
    text("Play", width / 2 + 10, 330, width / 4 - 10);
    pop();
    // Logic
        if (mouseX > width / 4 && mouseX < width * 3 / 4) {
        if (mouseY > 100 && mouseY < 180) {
            cursor(HAND);
            if (clicked) {
                this.isPaused = false;
            }
        }
        if (mouseX < width / 2 - 10) {
            if (mouseY > 200 && mouseY < 280) {
                cursor(HAND);
                if (clicked) {
                    this.save();
                }
            } else if (mouseY > 300 && mouseY < 360) {
                cursor(HAND);
                if (clicked) {
                    this.removeLevel(currentBuildingLevel.index);
                    this.setType("none");
                    this.isPaused = false;
                }
            }
        } else if (mouseX > width / 2 + 10) {
            if (mouseY > 200 && mouseY < 280) {
                cursor(HAND);
                if (clicked) {
                    this.save();
                    this.setType("none");
                    this.isPaused = false;
                }
            } else if (mouseY > 300 && mouseY < 360) {
                cursor(HAND);
                if (clicked) {
                    playLevel.setup(currentBuildingLevel, game.currentScene);
                    game.setScene("playlevel");
                    this.isPaused = false;
                }
            }
        }
    }
    clicked = false;
};

levelBuilder.editStats = function() {
    this.isEditingStats = true;
    this.isPaused = false;
    this.ei = {};
 //edit inputs
        var ei = this.ei;
    ei.title = createInput(currentBuildingLevel.title, "text");
    ei.title.attribute("placeholder", "Title");
    ei.title.position(width / 4, 50);
    ei.title.style("width", width / 2 + "px");
    ei.title.addClass("big-text");
    ei.creator = createInput(currentBuildingLevel.creator, "text");
    ei.creator.attribute("placeholder", "Creator");
    ei.creator.position(width / 4, 150);
    ei.creator.style("width", width / 2 + "px");
    ei.creator.addClass("big-text");
    var doWidth, minWidth, currentWidth, doHeight, minHeight, currentHeight;
    switch (currentBuildingLevel.type) {
      case "run":
        doWidth = true;
        minWidth = 10;
        currentWidth = currentBuildingLevel.map.length;
        break;

      case "build":
        doWidth = true;
        minWidth = 15;
        currentWidth = currentBuildingLevel.level[0].length;
        doHeight = true;
        minHeight = 6;
        currentHeight = currentBuildingLevel.level.length;
        break;

      case "space":
        doWidth = true;
        minWidth = 200;
        currentWidth = currentBuildingLevel.objects.width;
        break;
    }
    var by = 250;
    if (doWidth) {
        ei.width = createInput(currentWidth, "number");
        ei.width.attribute("placeholder", "Width");
        ei.width.position(width / 4, 250);
        ei.width.style("width", width / 2 + "px");
        ei.minWidth = minWidth;
        by += 80;
    }
    if (doHeight) {
        ei.height = createInput(currentHeight, "number");
        ei.height.attribute("placeholder", "Height");
        ei.height.position(width / 4, 330);
        ei.height.style("width", width / 2 + "px");
        ei.minHeight = minHeight;
        by += 80;
    }
    ei.submit = createButton("Save");
    ei.submit.position(width / 4, by);
    ei.submit.style("width", width / 4 - 10 + "px");
    ei.submit.mouseReleased(function() {
        ei.waitFor.submit = true;
    });
    ei.cancel = createButton("Cancel");
    ei.cancel.position(width / 2 + 10, by);
    ei.cancel.style("width", width / 4 - 10 + "px");
    ei.cancel.mouseReleased(function() {
        ei.waitFor.cancel = true;
    });
    ei.waitFor = {};
    ei.destroyInputs = function() {
        for (var i in ei) {
            if (typeof ei[i] == "object") {
                if (typeof ei[i].remove == "function") ei[i].remove();
            }
        }
    };
};

levelBuilder.editingStats = function() {
    background(245);
    var ei = this.ei;
    if (ei.width) {
        if (ei.width.value() < ei.minWidth) {
            ei.width.style("color", "#ff0000");
        } else {
            ei.width.style("color", "#000000");
        }
    }
    if (ei.height) {
        if (ei.height.value() < ei.minHeight) {
            ei.height.style("color", "#ff0000");
        } else {
            ei.height.style("color", "#000000");
        }
    }
    if (clicked) {
        if (ei.waitFor.submit) {
            if (ei.width) {
                ei.width.value(max(ei.minWidth, ei.width.value()));
            }
            if (ei.height) {
                ei.height.value(max(ei.minHeight, ei.height.value()));
            }
            LevelBuilderLevel.updateLevel(currentBuildingLevel, ei.title.value(), ei.creator.value(), ei.width ? ei.width.value() : null, ei.height ? ei.height.value() : null);
            this.isEditingStats = false;
            ei.destroyInputs();
            this.save();
            if (typeof this.getFunc().init == "function") this.getFunc().init();
        } else if (ei.waitFor.cancel) {
            this.isEditingStats = false;
            ei.destroyInputs();
        }
    }
};

levelBuilder.init = function() {
    this.isPaused = false;
    this.isEditingStats = false;
    this.setType(levelBuilder.building || "none");
    levelBuilderMenu.init();
};

levelBuilder.createNew = function() {
    levelBuilder.building = "new";
};

function buildArena() {
    buildArena.run();
}

buildArena.init = function() {
    // Dock
    this.dock = {
        w: 100,
        h: 100,
        p: 10,
        items: [ "pause", "edit", "switch" ]
    };
    this.dock.w *= this.dock.items.length;
    // Arranging the background
        this.background = {
        img: imgs.marsbackground,
        x: 0,
        y: 0
    };
    this.background.aspect = this.background.img.width / this.background.img.height;
    let canvasAspect = width / height;
    if (this.background.aspect > canvasAspect) {
        this.background.h = height;
        this.background.w = this.background.h * this.background.aspect;
    } else {
        this.background.w = width;
        this.background.h = this.background.w * (1 / this.background.aspect);
    }
    // Ground
        this.ground = {
        img: imgs.marsarena,
        x: width / 2,
        y: height * 3 / 4,
        w: width * 7 / 8
    };
    // Block size
        buildArena.updateBlocks();
    this.bw = mGame.bw;
    var sb = new MRock(0, 0, this.bw);
    this.bh = sb.h;
    // Multiplyers (big/small)
        this.bm = this.ground.w / mGame.ground.w;
    this.sm = 1 / this.bm;
    // Placing
        this.mode = "rock";
    // Constrants
        this.constraints = {
        x: {
            min: -100,
            max: 100
        },
        y: {
            min: 0,
            max: 15
        }
    };
};

buildArena.updateBlocks = function() {
    mGame.init(currentBuildingLevel.objects.blocks);
    this.rocks = mGame.rocks;
};

buildArena.run = function() {
    this.display();
    this.displayObjects();
    this.runDock();
    if (clicked) {
        this.placeObject();
    }
};

buildArena.placeObject = function() {
    currentBuildingLevel.verified = false;
    if (this.mode == "rock") {
        var x = constrain(map(mouseX, this.ground.x - this.ground.w / 2 + this.bw * this.bm / 2, this.ground.x + this.ground.w / 2 - this.bw * this.bm / 2, -100, 100), this.constraints.x.min, this.constraints.x.max);
        var y = constrain(map(mouseY + this.bh * this.bm / 2, this.ground.y, this.ground.y - this.bh * this.bm, 0, 1), this.constraints.y.min, this.constraints.y.max);
        currentBuildingLevel.objects.blocks.push({
            x: x,
            y: y
        });
    } else {
        for (var i = this.rocks.length - 1; i > -1; i--) {
            var rx = this.rocks[i].x;
            var ry = this.rocks[i].y;
            var rx2 = rx + this.rocks[i].w;
            var ry2 = ry + this.rocks[i].h;
            rx *= this.bm;
            ry *= this.bm;
            rx2 *= this.bm;
            ry2 *= this.bm;
            rx += this.ground.x;
            ry += this.ground.y;
            rx2 += this.ground.x;
            ry2 += this.ground.y;
            if (mouseX > rx && mouseX < rx2 && mouseY > ry && mouseY < ry2) {
                currentBuildingLevel.objects.blocks.splice(i, 1);
            }
        }
    }
    this.updateBlocks();
};

buildArena.display = function() {
    image(this.background.img, 0, 0, this.background.w, this.background.h);
    image(this.ground.img, this.ground.x - this.ground.w / 2, this.ground.y, this.ground.w, this.ground.w * this.ground.img.height / this.ground.img.width);
    var my = map(this.constraints.y.max + 1, 0, 1, this.ground.y, this.ground.y - this.bh * this.bm);
    push();
    fill(0, 100);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(width, 0);
    vertex(width, height);
    vertex(0, height);
    vertex(0, 0);
    vertex(this.ground.x - this.ground.w / 2, my);
    vertex(this.ground.x - this.ground.w / 2, this.ground.y);
    vertex(this.ground.x + this.ground.w / 2, this.ground.y);
    vertex(this.ground.x + this.ground.w / 2, my);
    vertex(this.ground.x - this.ground.w / 2, my);
    endShape();
    pop();
};

buildArena.displayObjects = function() {
    push();
    translate(this.ground.x, this.ground.y);
    scale(this.bm);
    for (var i = 0; i < this.rocks.length; i++) {
        this.rocks[i].display();
    }
    pop();
};

buildArena.runDock = function() {
    push();
    noStroke();
    fill(200, 150);
    rect(0, 0, this.dock.w, this.dock.h, this.dock.p);
    var ix = this.dock.p, iy = this.dock.p, iw = this.dock.w / this.dock.items.length - this.dock.p * 2, ih = this.dock.h - this.dock.p * 2;
    for (var i = 0; i < this.dock.items.length; i++) {
        var di = this.dock.items[i];
        var imgKey = {
            pause: "pausebtn",
            edit: "editicon",
            switch: this.mode == "rock" ? "marsrock" : "x"
        };
        if (typeof imgs[imgKey[di]] == "object") {
            image(imgs[imgKey[di]], ix, iy, iw, ih);
        }
        if (mouseX > ix && mouseX < ix + iw && mouseY > iy && mouseY < iy + ih) {
            cursor(HAND);
            if (clicked) {
                if (di == "switch") {
                    this.mode = this.mode == "rock" ? "x" : "rock";
                } else {
                    var funcKey = {
                        pause: "pause",
                        edit: "editStats"
                    };
                    if (typeof levelBuilder[funcKey[di]] == "function") {
                        levelBuilder[funcKey[di]]();
                    }
                }
            }
        }
        ix += this.dock.w / this.dock.items.length;
    }
    if (mouseX < this.dock.w && mouseY < this.dock.h) {
        pressed = false, clicked = false;
    }
    pop();
};

function levelBuilderMenu() {
    background(225);
    levelBuilderMenu.home.check();
    if (levelsBuilt.length <= 0) {
        push();
        textAlign(CENTER, BOTTOM);
        fill(0);
        textFont(fonts.londrina);
        textSize(40);
        text("You don't have any levels", width / 2, height / 2 - 60);
        pop();
        push();
        fill(255);
        stroke(0);
        strokeWeight(5);
        textFont(fonts.londrina);
        textSize(25);
        levelBuilderMenu.newLevel.draw(color(0));
        pop();
    } else if (levelBuildDisplays.length > 0) {
        push();
        translate(0, 100);
        scroller.update();
        let p = 20;
        var x = p;
        var y = p;
        let w = levelBuildDisplays[0].w;
        let h = levelBuildDisplays[0].h;
        var across = floor(width / (w + p));
        var going = 0;
        var my = 0;
        for (var i = -1; i < levelBuildDisplays.length; i++) {
            if (i == -1) {
                push();
                fill(240);
                strokeWeight(5);
                stroke(10);
                rect(x, y, w, h, p);
                push();
                strokeWeight(10);
                // strokeCap(SQUARE);
                                var lr = min(w, h / 2) / 4;
                line(x + w / 2 - lr, y + h / 4, x + w / 2 + lr, y + h / 4);
                line(x + w / 2, y + h / 4 - lr, x + w / 2, y + h / 4 + lr);
                pop();
                textFont(fonts.londrina);
                textSize(25);
                noStroke();
                fill(10);
                textAlign(CENTER, CENTER);
                text("New Level", x, y + h / 4 + lr, w, h * 3 / 4 - lr);
                if (mouseX > x && mouseX < x + w && mouseY > max(100, scroller.ay + y) && mouseY < max(y + h + scroller.ay)) {
                    cursor(HAND);
                    if (clicked) {
                        clicked = false;
                        levelBuilderMenu.newLevel.func();
                    }
                }
                pop();
            } else {
                levelBuildDisplays[i].draw(x, y);
            }
            going++;
            x += p + w;
            if (going >= across) {
                x = p;
                going = 0;
                if (i != communityDisplays.length - 1) {
                    y += h + p;
                    if (y + h > height - 150) {
                        my = y + h - height + 150 + p;
                    }
                }
            }
        }
        scroller.maxY = -my;
        pop();
    } else {
        levelBuilderMenu.createDisplays();
    }
    push();
    noStroke();
    fill(0, 0, 0, 10);
    rect(0, 95, width, 10);
    fill(255);
    rect(0, 0, width, 100);
    textAlign(CENTER, BOTTOM);
    fill(0);
    textFont(fonts.arcade);
    textSize(50);
    stroke(200);
    strokeWeight(3);
    text("Level Builder", width / 2, 75);
    pop();
    push();
    fill(255);
    stroke(0);
    strokeWeight(5);
    textFont(fonts.bladerunner);
    textSize(25);
    levelBuilderMenu.home.display(color(0));
    pop();
}

levelBuilderMenu.init = function() {
    this.home = new Button("Home", 10, height - 60, 100, 50, function() {
        game.setScene("home");
    });
    this.newLevel = new Button("New Level", width / 2 - 100, height / 2 - 30, 200, 60, function() {
        levelBuilder.building = "new";
        createNewLevel.init();
    });
    this.createDisplays();
    scroller.reset();
};

levelBuilderMenu.createDisplays = function() {
    levelBuildDisplays = [];
    for (var i = 0; i < levelsBuilt.length; i++) {
        levelBuildDisplays.push(new LevelDisplay(levelsBuilt[i], 200, 350, true));
    }
};

function createNewLevel() {
    background(255);
    localStorage.author = inputs.creator.value();
    if (createNewLevel.waitForRelease && clicked) {
        clicked = false;
        createLevel();
    }
}

createNewLevel.init = function() {
    this.waitForRelease = false;
    inputs.name = createInput("New Level", "text");
    inputs.name.position(width / 4, 50);
    inputs.name.addClass("big-text");
    inputs.name.attribute("placeholder", "Level Name");
    inputs.name.style("width", width / 2 + "px");
    inputs.creator = createInput(localStorage.author || "Anonymous", "text");
    inputs.creator.position(width / 4, 150);
    inputs.creator.addClass("big-text");
    inputs.creator.attribute("placeholder", "Creator");
    inputs.creator.style("width", width / 2 + "px");
    inputs.type = createSelect("run");
    inputs.type.position(width / 4, 250);
    inputs.type.style("width", width / 2 + "px");
    inputs.type.option("Run", "run");
    inputs.type.option("Platformer", "build");
 //.attribute("disabled");
        inputs.type.option("Space", "space");
    inputs.type.option("Mars", "mars");
    inputs.submit = createButton("Create!");
    inputs.submit.position(width / 4, 320);
    inputs.submit.style("width", width / 2 + 50 + "px");
    inputs.submit.mouseReleased(function() {
        createNewLevel.waitForRelease = true;
    });
};

function createLevel() {
    levelBuilder.addLevel(new LevelBuilderLevel(inputs.name.value(), inputs.creator.value(), inputs.type.value()));
    levelBuilder.openLevel(0);
    levelBuilder.setType(inputs.type.value());
    inputs.destroyAll();
    clicked = false;
}

var inputs = {};

inputs.destroyAll = function() {
    for (var i in inputs) {
        if (typeof inputs[i] != "function") {
            inputs[i].remove();
        }
    }
};

function playLevel() {
    let lvl = playLevel.level;
    switch (lvl.type) {
      case "run":
        runToRocket();
        break;

      case "build":
        buildRocket();
        break;

      case "space":
        FlyFreeplay();
        break;

      case "mars":
        fightMartians();
        break;

      default:
        game.setScene("home");
        break;
    }
}

playLevel.init = function() {
    let lvl = playLevel.level;
    switch (lvl.type) {
      case "run":
        loadRun.init();
        break;

      case "build":
        bGame.init();
        break;

      case "space":
        FlyFreeplay.init();
        break;

      case "mars":
        fightMartians.init(lvl.objects.blocks);
        mGame.freeplayLevel = lvl;
        break;

      default:
        game.setScene("home");
        break;
    }
};

playLevel.level = {};

playLevel.gobackto = "communitylevels";

playLevel.setup = function(level, gobackto) {
    playLevel.level = level;
    let lvl = playLevel.level;
    switch (lvl.type) {
      case "run":
        loadRun.current = lvl;
        loadRun.gobackto = gobackto;
        break;

      case "build":
        bGame.rawLevelObject = lvl;
        bGame.map = lvl.level;
        bGame.gobackto = gobackto;
        break;

      case "space":
        FlyFreeplay.set(lvl, gobackto);
        break;

      case "mars":
        mGame.gobackto = gobackto;
        break;

      default:
        game.setScene("communitylevels");
        break;
    }
};

function buildRunMap() {
    background(200, 225, 250);
    if (typeof currentBuildingLevel != "object") return levelBuilder.setType("none");
    if (typeof buildRunObjs.length != "number") buildRunMap.update();
    push();
    translate(runPlayer.transX, 0);
    runGround.display();
    for (var i = 0; i < buildRunObjs.length; i++) {
        var o = buildRunObjs[i];
        o.display();
    }
    push();
    stroke(0);
    strokeWeight(2);
    for (var i = 0; i < currentBuildingLevel.map.length + 1; i++) {
        line(i * runObstacleWidth, 0, i * runObstacleWidth, height);
    }
    pop();
    if (currentBuildingLevel.map.length >= 10) {
        push();
        fill(240);
        strokeWeight(5);
        stroke(10);
        var sx = (currentBuildingLevel.map.length - 1) * runObstacleWidth;
        var row = runObstacleWidth;
        var sy = 10;
        rect(sx + 5, sy, row - 10, row - 10);
        strokeWeight(7);
        line(sx + 15, sy + (row - 10) / 2, sx + row - 15, sy + (row - 10) / 2);
        mouseX -= runPlayer.transX;
        if (mouseX > sx + 5 && mouseX < sx + row - 10 && mouseY > sy && mouseY < sy + row - 10) {
            cursor(HAND);
            if (clicked) {
                clicked = false;
                buildRunMap.menu.popMap();
            }
        }
        mouseX += runPlayer.transX;
        pop();
    }
    pop();
    runPlayer.updateTranslate(true, currentBuildingLevel.map);
    buildRunMap.menu.runItems();
    if (clicked) {
        buildRunMap.menu.handleClick();
    }
}

var buildRunObjs = null;

buildRunMap.init = function() {
    this.carrying = "x";
    runPlayer.reset();
    runPlayer.x = 0;
    runGround.init();
    this.menu.init();
};

buildRunMap.menu = {
    carrying: "_",
    items: {},
    paused: false,
    pause: function() {
        resetMatrix();
        push();
        fill(0, 0, 0, 150);
        noStroke();
        rect(0, 0, width, height);
        pop();
        this.pausedImg = get();
        this.paused = true;
    },
    update: function() {
        buildRunObjs = [];
        var runmap = currentBuildingLevel.map;
        for (var i = 0; i < runmap.length; i++) {
            switch (runmap[i]) {
              case "x":
                buildRunObjs.push(new RunTrash(i * runObstacleWidth));
                break;

              case "c":
                buildRunObjs.push(new RunCar(i * runObstacleWidth));
                break;

              case "^":
                buildRunObjs.push(new RunSpike(i * runObstacleWidth));
                break;

              case "l":
                buildRunObjs.push(new RunStreetLight(i * runObstacleWidth));
                break;
            }
        }
    },
    getDockDimensions: function() {
        var dockWidth = this.items.length * this.iconSize + this.items.length * this.padding, dockHeight = this.padding * 2 + this.iconSize, dx = width / 2 - dockWidth / 2, dy = this.padding;
        return {
            x: dx,
            y: dy,
            w: dockWidth,
            h: dockHeight
        };
    },
    runItems: function() {
        var shouldPause, shouldEdit;
        // the Dock/Blocks
                push();
        fill(255, 200);
        noStroke();
        var d = this.getDockDimensions();
        rect(d.x, d.y, d.w, d.h, this.padding);
        var j = 0;
        for (var i in this.items) {
            if (i == "length") continue;
            var x = map(j, 0, this.items.length, d.x + this.padding, d.x + d.w - this.padding);
            image(this.items[i].img, x + (this.iconSize - this.items[i].w) / 2, d.y + this.padding + (this.iconSize - this.items[i].h) / 2, this.items[i].w, this.items[i].h);
            if (mouseX > x && mouseX < x + this.iconSize && mouseY > d.y + this.padding && mouseY < d.y + d.h - this.padding) {
                cursor(HAND);
                if (clicked) {
                    if (i == "pause") {
                        shouldPause = true;
                    } else if (i == "edit") {
                        shouldEdit = true;
                    } else {
                        this.carrying = i;
                    }
                    clicked = false;
                }
            }
            j++;
        }
        pop();
        // The left and right arrows
                var arrows = {
            cy: height / 2,
            w: 175,
            h: 175
        };
        push();
        // translate(-runPlayer.transX, 0);
                rectMode(CENTER);
        fill(255, 200);
        noStroke();
        rect(0, arrows.cy, arrows.w * 2, arrows.h, 20);
        rect(width, arrows.cy, arrows.w * 2, arrows.h, 20);
        pop();
        // player.controlTrans = true;
                var scrollXSpeed = 5;
        if (keys[RIGHT_ARROW] || keys.d) {
            runPlayer.x += scrollXSpeed;
        }
        if (keys[LEFT_ARROW] || keys.a) {
            runPlayer.x -= scrollXSpeed;
        }
        if (mouseIsPressed) {
            scrollXSpeed *= 3;
        }
        if (mouseY > arrows.cy - arrows.h / 2 && mouseY < arrows.cy + arrows.h / 2) {
            if (mouseX < arrows.w) {
                if (clicked) {
                    clicked = false;
                }
                runPlayer.x -= scrollXSpeed;
            } else if (mouseX > width - arrows.w) {
                runPlayer.x += scrollXSpeed;
                if (clicked) {
                    clicked = false;
                }
            }
        }
        //Pause
                if (shouldPause) return levelBuilder.pause();
        if (shouldEdit) return levelBuilder.editStats();
        // Handle clicks outside of buttons & stuff
                if (mouseX > d.x && mouseX < d.x + d.w && mouseY > d.y && mouseY < d.y + d.h) {
            clicked = false;
        } else {
            cursor("none");
            var itemCarrying = this.items[this.carrying];
            image(itemCarrying.img, mouseX - itemCarrying.w / 2, mouseY - itemCarrying.h / 2, itemCarrying.w, itemCarrying.h);
        }
    },
    popMap: function() {
        var mapArr = currentBuildingLevel.map.split("");
        mapArr.pop();
        if (mapArr[mapArr.length - 1] == "=") {
            mapArr[mapArr.length - 2] = "_";
        }
        mapArr[mapArr.length - 1] = "%";
        currentBuildingLevel.map = mapArr.join("");
        this.update();
    },
    handleClick: function() {
        this.placeBlock();
        this.verified = false;
    },
    placeBlock: function() {
        var i = floor((mouseX - runPlayer.transX) / runObstacleWidth);
        var mapArr = currentBuildingLevel.map.split("");
        if (mapArr[i] == "=") {
            mapArr[i - 1] = "_";
        } else if (mapArr[i] == "c") {
            mapArr[i + 1] = "_";
        }
        mapArr[i] = this.carrying;
        if (this.carrying == "c") {
            mapArr[i + 1] = "=";
        }
        currentBuildingLevel.map = mapArr.join("");
        if (currentBuildingLevel.map[currentBuildingLevel.map.length - 1] != "%") {
            currentBuildingLevel.map += "%";
        }
        this.update();
    },
    init: function() {
        this.padding = 20;
        this.iconSize = 80;
        this.update();
        // Image stuff
                var imgPairs = {
            x: "trash",
            "^": "spike",
            l: "streetlight",
            c: "brokenCar",
            _: "x",
            pause: "pausebtn",
            edit: "editicon"
        };
        this.items = {};
        this.items.length = 0;
        for (var i in imgPairs) {
            this.items[i] = {
                img: imgs[imgPairs[i]]
            };
            if (this.items[i].img.width > this.items[i].img.height) {
                this.items[i].w = this.iconSize;
                this.items[i].h = this.iconSize * this.items[i].img.height / this.items[i].img.width;
            } else {
                this.items[i].h = this.iconSize;
                this.items[i].w = this.iconSize * this.items[i].img.width / this.items[i].img.height;
            }
            this.items.length++;
        }
    }
};

function buildSpaceLevel() {
    buildSpaceLevel.run();
}

buildSpaceLevel.init = function() {
    this.objects = currentBuildingLevel.objects;
    this.dock = {
        w: 150,
        h: height,
        p: 10,
        items: [ "asteroids", "ufos", "boss", "x", "pause", "edit", "left", "right", "+", "-" ]
    };
    this.nm = height / 100;
    this.loadObjects();
    this.carrying = "asteroids";
    this.carryingsize = 25;
    this.tx = 0;
};

buildSpaceLevel.loadObjects = function() {
    flyPlayer = new FlyPlayer(50, height / 2);
    flyPlayer.init();
    this.w = this.objects.width * this.nm;
    loadDynamicLevel(this.objects);
};

buildSpaceLevel.runDock = function() {
    push();
    fill(50, 200);
    rect(0, 0, this.dock.w, this.dock.h);
    var y = this.dock.p;
    var ih = height / this.dock.items.length - this.dock.p * 2;
    var iw = this.dock.w - this.dock.p * 2;
    var ia = iw / ih;
    noStroke();
    for (var i = 0; i < this.dock.items.length; i++) {
        var img = null;
        switch (this.dock.items[i]) {
          case "asteroids":
            img = imgs.asteroid;
            break;

          case "ufos":
            img = imgs.ufo.images[0];
            break;

          case "boss":
            img = imgs.ufoboss;
            break;

          case "x":
            img = imgs.x;
            break;

          case "pause":
            img = imgs.pausebtn;
            break;

          case "edit":
            img = imgs.editicon;
            break;

          case "left":
            img = imgs.leftarrow;
            break;

          case "right":
            img = imgs.rightarrow;
            break;

          case "+":
            img = imgs.plussign;
            break;

          case "-":
            img = imgs.minussign;
            break;
        }
        if (img) {
            var imw = img.width;
            var imh = img.height;
            var ima = img.width / img.height;
            if (ima < ia) {
                imw *= ih / imh;
                imh = ih;
                image(img, this.dock.p + iw / 2 - imw / 2, y, imw, imh);
            } else {
                imh *= iw / imw;
                imw = iw;
                image(img, this.dock.p + iw / 2 - imw / 2, y, imw, imh);
            }
        }
        if (mouseX > this.dock.p && mouseX < this.dock.p + iw && mouseY > y && mouseY < y + ih) {
            cursor(HAND);
            if (clicked) {
                clicked = false;
                var di = this.dock.items[i];
                if (di == "asteroids" || di == "ufos" || di == "boss" || di == "x") {
                    this.carrying = di;
                } else {
                    switch (di) {
                      case "pause":
                        levelBuilder.pause();
                        break;

                      case "edit":
                        levelBuilder.editStats();
                        break;
                    }
                }
            } else if (mouseIsPressed) {
                switch (this.dock.items[i]) {
                  case "left":
                    this.tx -= 30;
                    break;

                  case "right":
                    this.tx += 30;
                    break;

                  case "+":
                    this.carryingsize++;
                    break;

                  case "-":
                    this.carryingsize--;
                    break;
                }
                this.carryingsize = constrain(this.carryingsize, 5, 80);
            }
        }
        y += ih + this.dock.p * 2;
    }
    pop();
    if (keys[LEFT_ARROW] || keys.a) {
        this.tx -= 30;
    }
    if (keys[RIGHT_ARROW] || keys.d) {
        this.tx += 30;
    }
    if (clicked) {
        if (mouseX < this.dock.w) {
            clicked = false;
        }
    }
};

buildSpaceLevel.displayObjects = function() {
    push();
    background(0, 0, 0);
    this.transX = 0;
    var levelW = this.w;
    if (flyPlayer.x > 0 && flyPlayer.x < levelW) {
        this.transX = -flyPlayer.x;
    } else if (flyPlayer.x > levelW) {
        this.transX = -levelW;
    }
    translate(this.transX, 0);
    displayStars();
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].display();
    }
    for (var i = 0; i < ufos.length; i++) {
        ufos[i].display();
    }
    for (var i = 0; i < bosses.length; i++) {
        bosses[i].display();
    }
    pop();
};

buildSpaceLevel.display = function() {
    push();
    translate(this.dock.w, 0);
    this.displayObjects();
    pop();
    this.displayHoldingObject();
};

buildSpaceLevel.displayHoldingObject = function() {
    var w = this.carryingsize * this.nm, i = null;
    switch (this.carrying) {
      case "asteroids":
        i = imgs.asteroid;
        break;

      case "ufos":
        i = imgs.ufo.images[0];
        break;

      case "boss":
        i = imgs.ufoboss;
        break;

      case "x":
        i = imgs.x;
        break;
    }
    if (mouseX > this.dock.w) {
        if (clicked) {
            this.placeObject();
        }
        if (i) {
            push();
            imageMode(CENTER);
            image(i, mouseX, mouseY, w, w * i.height / i.width);
            pop();
        }
    }
    if (i && !isMobile) {
        push();
        tint(255, 255, 255, 100);
        // imageMode(CENTER);
                image(i, width - w, 0, w, w * i.height / i.width);
        pop();
    }
};

buildSpaceLevel.run = function() {
    this.display();
    this.runDock();
    this.tx = constrain(this.tx, 0, this.w - width + this.dock.w);
    flyPlayer.x = this.tx;
};

buildSpaceLevel.placeObject = function() {
    var mx = mouseX - this.dock.w - this.transX;
    var my = mouseY;
    if (this.objects[this.carrying] && this.objects[this.carrying] instanceof Array) {
        var xv = mx / height * 100;
        var yv = my / height * 100;
        this.objects[this.carrying].push([ xv, yv, this.carryingsize ]);
    } else if (this.carrying == "x") {
        for (var i in this.objects) {
            if (typeof this.objects[i] == "object" && this.objects[i] instanceof Array) {
                for (var j = this.objects[i].length - 1; j > -1; j--) {
                    var o = this.objects[i][j];
                    var x = o[0] * this.nm;
                    var y = o[1] * this.nm;
                    var r = o[2] * this.nm || 100;
                    if (dist(mx, my, x, y) < r) {
                        this.objects[i].splice(j, 1);
                    }
                }
            }
        }
    }
    this.loadObjects();
    currentBuildingLevel.verified = false;
};

let imgs = {}, fonts = {};

function waitingForFileCount() {
    background(0);
    push();
    textAlign(CENTER);
    fill(255);
    textSize(50);
    text("Locating Images to Load...", width / 2, height / 2);
    pop();
    if (!waitingForFileCount.isWaiting) {
        fileLoader.loadAll();
        fileLoader.isWaiting = false;
    }
}

waitingForFileCount.isWaiting = true;

function loadFiles() {
    fileLoader.run();
}

let fileLoader = {
    loaded: 0,
    loadProgress: 0,
    needed: 0,
    neededTypes: 0,
    loadIndex: 0,
    loading: "animations",
    typeIndex: 0,
    counter: 0,
    timeNeeded: 0,
    order: [ "animations", "fonts", "images" ],
    paths: {
        fonts: [],
        images: [],
        animations: []
    },
    isWaiting: true,
    onLoad: function(stuff) {
        fileLoader.loaded++;
    },
    failed: function(e) {
        console.warn("File didn't load. Error was: " + e + "\nContinuing");
        fileLoader.onLoad();
    },
    loadOne: function() {
        if (this.loadIndex >= this.paths[this.loading].length) {
            this.loadIndex = 0;
            this.typeIndex++;
            if (this.typeIndex >= this.neededTypes) {
                return true;
            }
            this.loading = this.order[this.typeIndex];
        }
        let fileObject = this.loading == "fonts" ? fonts : imgs;
        let loaderFunction = this.loading == "animations" ? loadAnimation : this.loading == "images" ? loadImage : loadFont;
        let data, arg1, arg2, arg3, path;
        data = this.paths[this.loading][this.loadIndex];
        name = this.paths.names[this.loading][this.loadIndex];
        if (this.loading == "animations") {
            arg1 = data[1];
            arg2 = data[2];
        } else {
            arg1 = data;
            arg2 = fileLoader.onLoad;
            arg3 = fileLoader.failed;
        }
        if (arg3) {
            fileObject[name] = loaderFunction(arg1, arg2, arg3);
        } else {
            fileObject[name] = loaderFunction(arg1, arg2);
        }
        if (this.loading == "animations") {
            this.onLoad();
            fileObject[name].frameDelay = data[0] || 4;
        }
        this.loadIndex++;
        return false;
    },
    loadAll: function() {
        frameRate(30);
        loadSpecial();
        do {} while (!this.loadOne());
    },
    update: function() {
        this.loadProgress = min(this.loadProgress + .01, this.loaded / this.needed);
        if (this.loaded < this.needed) {
            this.loadProgress = this.loaded / this.needed;
            this.counter++;
        } else if (this.timeNeeded == 0) {
            this.timeNeeded = this.counter;
            this.counter = 0;
        } else {
            this.counter++;
            this.loadProgress = this.counter / this.timeNeeded;
        }
        if (this.loadProgress >= 1) {
            frameRate(60);
            game.continue(true);
        }
    },
    display: function() {
        background(0);
        push();
        textAlign(CENTER);
        fill(255);
        textSize(50);
        text("Loading " + this.loading + "...", width / 2, height / 2);
        stroke(255);
        strokeWeight(5);
        rect(width / 2 - 200, height / 2 + 50, this.loadProgress * 400, 50, 10);
        push();
        noFill();
        rect(width / 2 - 200, height / 2 + 50, 400, 50, 10);
        pop();
        pop();
    },
    run: function() {
        if (this.isWaiting) {
            waitingForFileCount();
        } else {
            this.update();
            this.display();
        }
    }
};

$.getJSON("/scripts/files.json", function(data) {
    fileLoader.paths = data;
    for (var i in data) {
        if (i != "names") {
            for (var j in data[i]) {
                fileLoader.needed++;
            }
        }
    }
    for (var i in data.names) {
        fileLoader.neededTypes++;
    }
    waitingForFileCount.isWaiting = false;
});

function loadSpecial() {
    loadAnimation();
    //Explosion
        imgs.explosion = Array(11);
    let addedZero = "0";
    for (var i = 0; i < imgs.explosion.length; i++) {
        if (i > 9) {
            addedZero = "";
        }
        imgs.explosion[i] = loadImage("/imgs/space/explosion/" + addedZero + i + ".png");
    }
    //buildings
        imgs.buildings = Array(7);
    for (var i = 0; i < imgs.buildings.length; i++) {
        imgs.buildings[i] = loadImage("/imgs/earth/buildings/0" + i + ".png");
    }
    // Player walking animation
        imgs.players = Array(5);
    for (var i = 0; i < imgs.players.length; i++) {
        var n = i;
        if (i == 0) {
            n = "";
        }
        imgs.players[i] = loadImage("/imgs/earth/player/player" + n + ".png");
    }
    // imgs.spacesign = loadAnimation("/imgs/space/sign/00.png", "/imgs/space/sign/01.png")
}

function drawAnimation(anim, x, y, w, h) {
    if (!anim) {
        return console.warn("No animation provided");
    }
    push();
    translate(x, y);
    scale(w / anim.getWidth(), h / anim.getHeight());
    animation(anim, 0, 0);
    pop();
}

function RunBuilding(x, z, h, type) {
    this.x = x;
    this.y = runGround.y - h;
    this.z = z;
    this.vx = 1 / this.z;
    this.img = imgs.buildings[type];
    this.w = h * this.img.width / this.img.height;
    this.h = h;
}

RunBuilding.prototype.update = function(p) {
    this.x -= this.vx * (p.ptransX - p.transX);
    if (this.x + this.w + 10 < 0) {
        this.x += width + this.w + 15;
    } else if (this.x - 10 > width) {
        this.x -= width + this.w + 15;
    }
};

RunBuilding.prototype.display = function() {
    push();
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
};

RunBuilding.prototype.run = function(p) {
    if (p) this.update(p);
    this.display();
};

function BuildBuilding(x, z, h, type) {
    RunBuilding.call(this, x, z, h, type);
    this.y = height - h;
    this.vx *= bGame.scaleFactor;
}

BuildBuilding.prototype = Object.create(RunBuilding.prototype);

function RunCar(x) {
    this.x = x;
    this.img = imgs.brokenCar;
    this.w = runObstacleWidth * 2;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
}

RunCar.prototype.display = function() {
    image(this.img, this.x, this.y, this.w, this.h);
};

RunCar.prototype.collide = function(p) {
    let vx = abs(p.vx), vy = abs(p.vy);
    if (p.x + p.w + vx > this.x && p.x - vx < this.x + this.w && p.y + p.h + vy > this.y) {
        if (p.y + p.h - vy * 2 - 1 < this.y) {
            p.y = min(p.y, this.y - p.h);
            p.vy = min(p.vy, 0);
            p.grounded = true;
        }
        if (p.x + p.w + vx > this.x && p.x + p.w <= this.x + vx) {
            p.vx = constrain(p.vx, -100, 0);
            p.x = this.x - p.w;
        }
    }
};

RunCar.prototype.run = function(p) {
    var dx = this.x + runPlayer.transX;
    if (dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width) {
        this.collide(p);
        this.display();
    }
};

function RunCloud(x) {
    this.x = x;
    this.y = random(60, 120);
    this.vx = random(-3, 3);
    this.z = random(1.5, 4);
    this.zvx = 1 / this.z;
    this.img = imgs.cloud.clone();
    this.w = random(230, 350);
    this.h = this.w * this.img.getHeight() / this.img.getWidth();
}

RunCloud.prototype.update = function(p) {
    this.x -= this.zvx * (p.ptransX - p.transX) + this.vx;
    if (this.x + this.w + 10 < 0) {
        this.x += width + this.w + 15;
    } else if (this.x - 10 > width) {
        this.x -= width + this.w + 15;
    }
};

RunCloud.prototype.display = function() {
    push();
    drawAnimation(this.img, this.x, this.y, this.w, this.h);
    pop();
};

RunCloud.prototype.run = function(p) {
    this.update(p);
    this.display();
};

function RunGround() {
    this.y = 0;
    this.h = 100;
    this.particles = [];
}

RunGround.prototype.init = function() {
    this.stroke = color(0, 160, 50);
    this.strokeWeight = 10;
    this.fill = color(80, 50, 0);
    this.y = height - this.h;
    this.reset();
};

RunGround.prototype.reset = function() {
    this.particles = [];
    for (var i = 0; i < width * this.h / 5e3; i++) {
        this.particles[i] = {
            x: random(width),
            y: random(this.h - this.strokeWeight) + this.y + this.strokeWeight,
            w: random(15, 30),
            sat: random(80, 100)
        };
    }
};

RunGround.prototype.display = function() {
    push();
    translate(-runPlayer.transX, 0);
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    fill(this.fill);
    rect(-25, this.y + this.strokeWeight / 2, width + 50, this.h + this.strokeWeight);
    pop();
    push();
    noStroke();
    for (var i = 0; i < this.particles.length; i++) {
        var par = this.particles[i];
        fill(par.sat, par.sat * .8, 0, 100);
        rect(par.x, par.y, par.w, par.w, 5);
        if (par.x + par.w < -runPlayer.transX) {
            par.x += par.w * 2 + width;
        }
    }
    pop();
};

let runGround = new RunGround();

function runToRocket() {
    background(200, 225, 255);
    for (var i = 0; i < runScenery.length; i++) {
        runScenery[i].run(runPlayer);
    }
    fill(255, 255, 255, 60);
    rect(0, 0, width, height);
    push();
    translate(runPlayer.transX, 0);
    for (var i = 0; i < runSigns.length; i++) {
        runSigns[i].display(runPlayer);
    }
    runPlayer.run();
    runGround.display();
    for (var i = 0; i < runObstacles.length; i++) {
        runObstacles[i].run(runPlayer);
    }
    // console.log(runObstacles.length);
        pop();
}

runToRocket.init = function() {
    loadRun.init();
};

runToRocket.reload = function() {
    loadRun.reload();
};

runToRocket.reset = function() {
    loadRun.reset();
};

function RunNext(x) {
    this.x = x;
}

RunNext.prototype.collide = function(p) {
    if (p.x > this.x) {
        p.controlTrans = false;
        if (p.x > this.x + width) {
            loadRun.next();
        }
    }
};

RunNext.prototype.run = function(p) {
    this.collide(p);
};

let runObstacles = [], runSigns = [], runScenery = [];

var loadRun = {
    level: 0,
    maps: [],
    current: {},
    map: "",
    key: {},
    buildings: 20,
    clouds: 3,
    hasLoaded: false,
    mode: "story",
    init: function() {
        this.mode = game.currentScene == "run" ? "story" : "freeplay";
        if (this.maps.length == 0 && this.mode == "story") {
            return null;
        }
        runGround.init();
        runPlayer.init();
        this.txtKey = {
            j: 'Click, Space, UP or "W" to jump!',
            f: "Use the arrow keys to move faster/slower",
            d: "S/DOWN to duck"
        };
        this.key = {
            c: RunCar,
            x: RunTrash,
            "^": RunSpike,
            l: RunStreetLight,
            "%": RunNext
        };
        this.load();
        this.hasLoaded = true;
    },
    load: function() {
        if (!this.maps[this.level] && this.maps.length != 0 && this.mode == "story") return game.continue();
        if (this.mode != "story" && !this.current) return false;
        if (this.mode == "story") {
            this.current = this.maps[this.level];
        }
        this.map = this.current.map;
        this.signs = this.current.txt;
        this.reload();
    },
    reload: function() {
        runPlayer.reset();
        runGround.reset();
        runScenery = [];
        runSigns = [];
        runObstacles = [];
        for (var i = 0; i < this.map.length; i++) {
            var x = i * runObstacleWidth;
            var constructor = this.key[this.map[i]];
            if (constructor) runObstacles.push(new constructor(x));
        }
        if (this.signs) {
            for (var i = 0; i < this.signs.length; i++) {
                var txt = this.txtKey[this.signs[i]];
                if (txt) runSigns.push(new RunSign(i * runObstacleWidth, txt));
            }
        }
        for (var i = 0; i < this.buildings; i++) {
            runScenery.push(new RunBuilding(random(-200, width + 200), random(2, 6), random(400, 500), ~~random(imgs.buildings.length)));
        }
        for (var i = 0; i < this.clouds; i++) {
            runScenery.push(new RunCloud(random(-200, width + 200)));
        }
        runScenery.sort(function(a, b) {
            return b.z - a.z;
        });
    },
    next: function() {
        if (this.mode == "story") {
            this.level++;
            this.load();
        } else {
            // Go back to homescreen here
            game.setScene(this.gobackto);
            if (this.current.levelBuilderLevel) {
                this.current.verified = true;
                levelBuilder.save();
            }
        }
    },
    reset: function() {
        this.level = 0;
    }
};

var runObstacleWidth = 100;

$.getJSON("/scripts/runtorocket/runmap.json", function(d) {
    loadRun.maps = d.levels;
});

function RunPlayer(x, y) {
    this.x = x;
    this.ox = x;
    this.y = y;
    this.w = 50;
    this.h = this.w;
    this.slowSpeed = 6;
    this.normalSpeed = 10;
    this.fastSpeed = 15;
    this.vx = this.normalSpeed;
    this.gvx = this.vx;
    this.vy = 0;
    this.mvx = 5;
    this.mvy = 20;
    this.transX = 0;
    this.ptransX = this.transX;
    this.controlTrans = true;
    this.grounded = false;
    this.ducking = false;
    this.walkingFrame = 0;
}

RunPlayer.prototype.init = function() {
    this.img = imgs.player;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
    this.oy = this.y;
    this.dh = this.h / 2.3;
    this.oh = this.h;
};

RunPlayer.prototype.collide = function() {
    if (this.y + this.h + this.vy > runGround.y) {
        this.grounded = true;
        this.y = runGround.y - this.h;
    }
};

RunPlayer.prototype.control = function() {
    var by = this.y + this.h;
    var xs = this.ducking ? .6 : 1;
    if (keys[RIGHT_ARROW] || keys.d) {
        this.gvx = this.fastSpeed * xs;
    } else if (keys[LEFT_ARROW] || keys.a) {
        this.gvx = this.slowSpeed * xs;
    } else {
        this.gvx = this.normalSpeed * xs;
    }
    if ((keys[UP_ARROW] || keys.w || keys[32] || keys[" "] || pressed) && this.grounded && this.vy >= 0) {
        this.vy -= 16;
        this.grounded = false;
    } else if (keys[DOWN_ARROW] || keys.s) {
        if (this.grounded && !this.ducking) {
            this.ducking = true;
        } else if (!this.grounded) {
            this.ducking = false;
            this.vy += .3;
        }
    } else {
        this.ducking = false;
    }
    this.h = this.ducking ? this.dh : this.oh;
    this.y = by - this.h + 1;
};

RunPlayer.prototype.update = function() {
    //Collisions
    this.collide();
    if (this.grounded) {
        this.vy = min(0, this.vy);
    }
    //Input
        this.control();
    // Walking animation
        if (!this.grounded) {
        this.img = imgs.player;
    } else if (frameCount % 10 == 0) {
        this.walkingFrame++;
        this.walkingFrame = this.walkingFrame % imgs.players.length;
        this.img = imgs.players[this.walkingFrame];
    }
    // Gravity
        this.vy += .5;
    // Friction
        this.vy *= .99;
    // Max velocities
        this.vy = constrain(this.vy, -this.mvy, this.mvy);
    // Smooth speed changes
        this.vx = lerp(this.vx, this.gvx, .1);
    // Position affected by speed
        this.x += this.vx;
    this.y += this.vy;
    this.y = min(this.y, runGround.y - this.h);
    // Resets grounded
        this.grounded = false;
    // Translate
        this.updateTranslate();
};

RunPlayer.prototype.updateTranslate = function(off, map) {
    this.ptransX = this.transX;
    this.viewSpace = off ? 0 : width / 3;
    if (this.x > this.viewSpace && this.controlTrans) {
        this.transX = -this.x + this.viewSpace;
    }
    if (off) {
        this.x = constrain(this.x, 0, map.length * runObstacleWidth - width);
        if (this.x + width >= map.length * runObstacleWidth) {
            this.transX = -map.length * runObstacleWidth + width;
        }
    }
};

RunPlayer.prototype.display = function() {
    push();
    translate(this.x + this.w / 2, this.y);
    if (this.vx >= 0) scale(-1, 1);
    image(this.img, -this.w / 2, 0, this.w, this.h);
    pop();
};

RunPlayer.prototype.run = function() {
    this.update();
    this.display();
};

RunPlayer.prototype.reset = function() {
    this.vx = 0;
    this.vy = 0;
    this.x = this.ox;
    this.y = this.oy;
    this.transX = 0;
    this.controlTrans = true;
};

let runPlayer = new RunPlayer(-100, 0);

function RunSign(x, txt) {
    this.x = x;
    this.y = 50;
    this.w = 500;
    this.h = 250;
    this.dx = this.x + 1e3;
    this.txt = txt;
    this.padding = 50;
}

RunSign.prototype.display = function(p) {
    if (p.x > this.x && this.x < this.dx) {
        this.x += p.vx;
    }
    push();
    image(imgs.woodsign, this.x, this.y, this.w, this.h);
    fill(0);
    noStroke();
    textSize(40);
    textFont(fonts.pixel);
    text(this.txt, this.x + this.padding, this.y + this.padding, this.w - this.padding * 2, this.h - this.padding * 2);
    pop();
};

function RunSpike(x) {
    this.x = x;
    this.img = imgs.spike;
    this.w = runObstacleWidth;
    this.h = round(this.w * this.img.height / this.img.width);
    this.y = runGround.y - this.h;
}

RunSpike.prototype.run = function(p) {
    var dx = this.x + runPlayer.transX;
    if (dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width) {
        this.display();
        this.collide(p);
    }
};

RunSpike.prototype.collide = function(p) {
    function death() {
        loadRun.reload();
    }
    if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h > this.y && p.y < this.y + this.h) {
        if (p.x + p.w < this.x + this.w / 2) {
            if (p.y + p.h > map(p.x + p.w, this.x, this.x + this.w / 2, this.y + this.h, this.y)) death();
        } else if (p.x > this.x + this.w / 2) {
            if (p.y + p.h > map(p.x, this.x + this.w / 2, this.x + this.w, this.y, this.y + this.h)) death();
        } else death();
    }
};

RunSpike.prototype.display = function() {
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, this.w, this.h);
    pop();
};

function RunStreetLight(x) {
    this.img = imgs.streetlight;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.x = x;
    this.y = runGround.y - this.h;
    this.ly = this.y + this.h * 12 / 22;
}

RunStreetLight.prototype.collide = function(p) {
    let vx = abs(p.vx);
    let vy = abs(p.vy);
    if (p.x + p.w > this.x && p.x < this.x + this.w && p.y + p.h + vy > this.y && p.y - vy < this.ly) {
        if (p.x > this.x + this.w / 2) {
            if (p.y + p.h > map(p.x, this.x + this.w / 2, this.x + this.w, this.y, this.ly - this.h / 10)) {
                loadRun.reload();
            }
        } else {
            loadRun.reload();
        }
    }
};

RunStreetLight.prototype.display = function() {
    image(this.img, this.x, this.y, this.w, this.h);
};

RunStreetLight.prototype.run = function(p) {
    this.collide(p);
    this.display();
};

function RunTrash(x) {
    this.x = x;
    this.img = imgs.trash;
    this.w = runObstacleWidth;
    this.h = this.w * this.img.height / this.img.width;
    this.y = runGround.y - this.h;
}

RunTrash.prototype.display = function() {
    image(this.img, this.x, this.y, this.w, this.h);
};

RunTrash.prototype.collide = function(p) {
    let vx = abs(p.vx), vy = abs(p.vy);
    if (p.x + p.w + vx > this.x && p.x - vx < this.x + this.w && p.y + p.h + vy > this.y) {
        if (p.y + p.h - vy * 2 - 1 < this.y) {
            p.y = min(p.y, this.y - p.h);
            p.vy = min(p.vy, 0);
            p.grounded = true;
        }
        if (p.x + p.w + vx > this.x && p.x + p.w <= this.x + vx) {
            p.vx = constrain(p.vx, -100, 0);
            p.x = this.x - p.w;
        }
    }
};

RunTrash.prototype.run = function(p) {
    var dx = this.x + runPlayer.transX;
    if (dx + runPlayer.vx + this.w > 0 && dx - runPlayer.vx < width) {
        this.collide(p);
        this.display();
    }
};

function Button(text, x, y, w, h, func) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.func = typeof func == "function" ? func : function() {
        console.log("Placeholder function for button with text " + this.text);
    };
}

Button.prototype.check = function() {
    if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.w && mouseY < this.y + this.h) {
        cursor(HAND);
        if (pressed) {
            pressed = false;
        }
        if (clicked) {
            clicked = false;
            this.func();
        }
    }
};

Button.prototype.display = function(textColor, textStroke) {
    push();
    //Rect
        rect(this.x, this.y, this.w, this.h, 5);
    //Text
        if (textStroke) {
        strokeWeight(2);
        stroke(textStroke);
    } else {
        noStroke();
    }
    if (textColor) {
        fill(textColor);
    } else {
        fill(255);
    }
    textAlign(CENTER, CENTER);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    pop();
};

Button.prototype.draw = function(textColor, textStroke) {
    this.check();
    this.display(textColor, textStroke);
};

function ChooseUseSave() {
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn, 0, 0, imgw, imgw * imgs.rocketOn.height / imgs.rocketOn.width);
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    // Text
        push();
    // Escape From
        noStroke();
    textSize(50);
    fill(255);
    textAlign(CENTER, TOP);
    textFont(fonts.londrina);
    text("Would you like to start over, or resume your current game?", 20, 50, width - 40, 300);
    pop();
    push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina);
    textSize(50);
    var cus = ChooseUseSave;
    cus.resume.draw();
    cus.restart.draw();
    textSize(25);
    cus.alwaysResume.draw();
    cus.alwaysRestart.draw();
    cus.back.draw();
    pop();
}

ChooseUseSave.init = function() {
    this.resume = new Button("Resume", width / 2 - 300, 320, 290, 100, function() {
        game.loadProgress();
    });
    this.alwaysResume = new Button("Always Resume", width / 2 - 300, 440, 290, 100, function() {
        game.loadFirstOnPlay = "always";
        game.loadProgress();
    });
    this.restart = new Button("Restart", width / 2 + 10, 320, 290, 100, function() {
        game.continue();
        game.continue();
    });
    this.alwaysRestart = new Button("Delete Save & Play", width / 2 + 10, 440, 290, 100, function() {
        delete localStorage.currentSave;
        game.setScene("home");
        game.continue();
    });
    this.back = new Button("Back", width / 2 - 100, 560, 200, 80, function() {
        game.setScene("home");
    });
};

function Home() {
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn, 0, 0, imgw, imgw * imgs.rocketOn.height / imgs.rocketOn.width);
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    // Text
        push();
    // Escape From
        noStroke();
    textSize(80);
    fill(200);
    textAlign(CENTER, BOTTOM);
    textFont(fonts.bladerunner);
    text("Escape From", width / 2, height / 2 - 150);
    // Earth
        fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(120);
    textFont(fonts.arcade);
    text("EARTH", width / 2, height / 2 - 150);
    pop();
    // Buttons
        push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina);
    textSize(50);
    Home.play.draw();
    textSize(25);
    Home.build.draw();
    Home.community.draw();
    if (localStorage.saves) {
        Home.load.draw();
    }
    pop();
}

Home.init = function() {
    Home.play = new Button("Play Story Mode", width / 2 - 200, height / 2 + 10, 400, 100, function() {
        if (game.loadFirstOnPlay == "always") {
            return game.loadProgress();
        } else if (game.loadFirstOnPlay == "never") {
            game.continue();
            return;
        } else if (localStorage.currentSave) {
            return game.setScene("choose");
        }
        game.continue();
    });
    Home.build = new Button("Build Levels", width / 2 - 200, height / 2 + 130, 190, 100, function() {
        game.setScene("levelbuilder");
    });
    Home.community = new Button("Play Community\nLevels", width / 2 + 10, height / 2 + 130, 190, 100, function() {
        game.setScene("communitylevels");
    });
    Home.load = new Button("Load Save", width / 2 - 150, height / 2 + 250, 300, 60, function() {
        game.setScene("loadsaves");
    });
};

let hasWon = localStorage.hasWon ? true : false;

function LoadSaves() {
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn, 0, 0, imgw, imgw * imgs.rocketOn.height / imgs.rocketOn.width);
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    push();
    // congratulations
        noStroke();
    textSize(80);
    fill(200);
    textAlign(CENTER, TOP);
    textFont(fonts.arcade);
    text("Load Saves", width / 2, 100);
    // Blah, blah, blah
        fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(50);
    textFont(fonts.londrina);
    var ds = LoadSaves.displaySave;
    textSize(20);
    fill(255, 255, 255, 200);
    stroke(0);
    strokeWeight(5);
    textAlign(CENTER, CENTER);
    var mx = 50, my = 50, px = 10, py = 10;
    var x = mx, y = 200 + my;
    const w = 200, h = 70;
    var saves = game.retrieveProgress(0, true);
    if (!saves) game.setScene("home"); else {
        for (var i = 0; i < saves.length; i++) {
            var save = saves[i];
            ds(save, x, y, w, h);
            x += w + px;
            if (x + w > width - mx) {
                x = mx;
                y += h + my;
            }
            if (y + h > height - my) {
                saves.pop();
            }
        }
    }
    pop();
    push();
    fill(0, 0, 0, 100);
    stroke(200);
    strokeWeight(5);
    textFont(fonts.londrina);
    textSize(25);
    LoadSaves.HomeBtn.draw();
    pop();
}

LoadSaves.displaySave = function(obj, x, y, w, h) {
    rect(x, y, w, h, 10);
    push();
    fill(0);
    stroke(100);
    strokeWeight(2);
    var textReplacements = {
        run: "Run to Rocket",
        launchpad: "Rocket Launchpad",
        build: "Collect Rocket Parts",
        rocektbuilt: "Build Rocket",
        "fly-moon": "Fly to the Moon",
        moon: "Moon",
        "fly-mars": "Fly to Mars",
        marslanding: "Mars Landing",
        fight: "Mars",
        leavemars: "Leave Mars",
        "fly-venus": "Fly to Venus",
        seeufo: "UFO Sighting",
        ufo: "UFO Fight",
        landonvenus: "Land on Venus"
    };
    var txt = textReplacements[obj.scene];
    if (typeof obj.data == "number") {
        txt += " - " + obj.data;
    }
    if (obj.date) {
        txt += "\n" + obj.date.month + "/" + obj.date.day + " - " + obj.date.hour + ":" + obj.date.minute;
    }
    text(txt, x + w / 2, y + h / 2);
    pop();
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        cursor(HAND);
        if (clicked) {
            game.loadProgress(obj);
        }
    }
};

LoadSaves.init = function() {
    this.HomeBtn = new Button("Home", 10, height - 60, 100, 50, function() {
        game.setScene("home");
    });
};

function Won() {
    // Starry background w/ rocket
    background(0);
    image(imgs.stars, 0, 0, width, height);
    push();
    translate(200, 200);
    rotate(-45);
    let imgw = 200;
    drawAnimation(imgs.rocketOn, 0, 0, imgw, imgw * imgs.rocketOn.height / imgs.rocketOn.width);
    pop();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    // Text
        push();
    // congratulations
        noStroke();
    textSize(80);
    fill(200);
    textAlign(CENTER, BOTTOM);
    textFont(fonts.arcade);
    text("Congratulations!", width / 2, height / 2 - 150);
    // Blah, blah, blah
        fill(255);
    strokeWeight(1);
    stroke(255);
    textAlign(CENTER, TOP);
    textSize(50);
    textFont(fonts.londrina);
    text("You made your own rocket, defeated martians, destroyed the UFO, and safely landed on Venus", 100, height / 2 - 150, width - 200, 200);
    // New stuff
    // I decided to not require winning the game
    /*
    textFont(fonts.pixel);
    textSize(40);
    fill(0, 120, 120);
    noStroke();
    let message = "You unlocked Community Levels!"
    let tw = textWidth(message);
    rect(width/2-tw/2-30, height-100, tw+50, 70, 10);
    fill(255);
    text(message, width/2, height-80);
    */    pop();
    // Buttons
        fill(0, 0, 0, 200);
    textSize(40);
    textFont(fonts.londrina);
    strokeWeight(5);
    stroke(240);
    Won.menu.draw();
}

Won.init = function() {
    Won.menu = new Button("Menu", width / 2 - 150, height / 2 + 50, 300, 60, function() {
        game.setScene("home");
    });
    localStorage.hasWon = "true";
    hasWon = localStorage.hasWon;
    game.loadFirstOnPlay = false;
    localStorage.currentSave = "";
};