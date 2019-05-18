let moonConversation = ["Fee fi fo fum! It is I, the man on the moon!", "Wait, your the guy from dream works!", "Yes that was me. However, my looks haven't quite stayed the same since I got space Diabetes.", "Wow, you've aged so much since then.", "How dare you! I'll have you know that I'm at the young age of 4.53 billion years. I'm in my prime! I'm practically fresh out of the womb!", "But your hair is gray!", "Shut up, space diabetes has some unspeakable effects.", "I'm sorry, I shouldn't have mentioned your incredibly miserable space Diabetes.", "You're right, you should have! Listen, why did you come to my neck of the woods?", "There are no trees here.", "Yeah, but there are necks.", "You said 'neck' singular.", "It's a figure of speech!", "Ok sure. In response to your earlier inquiry, I'm here to refuel. The human race abandoned me yesterday and I am heading to Mars. Any advice?", "Yeah, don't let the Martians bite you, if you do the tip of the side of your left ring finger will hurt for two weeks, four days, three hours, fourteen minutes, and seventy two seconds", "There are martians?", "yeah, and I'm warning you, their bites are more painful than you would believe! Don't let them bite you. Here, I want you to have this.", "","This gun is incredibly important to me. Take care of it. It has been passed down through my family for generations. My father gave it to me shortly before he passed away, along with a very important message, to uphold the family honor. In his last breath, he requested that--", "Ok thanks!"];
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
    run: function(){
        if(this.show === true){
            if(this.textShowing>=this.text.length&&keysReleased[" "]){
                this.line ++;
                if(this.line === 17) this.line ++; //trying to keep the speakers right without having to do other things
                if(this.line<20){
                    this.text = moonConversation[this.line];
                    this.textShowing = 0;
                } else{
                    this.show = false;
                    this.text = "";
                    moonPlayer.runAway = true;
                }
            } else if(keysReleased[" "]){
                this.textShowing = this.text.length;
            }
            this.display();
            this.textShowing += 0.5;
        }
    },
    display: function(){
        if (this.line%2 == 0)
            this.speaker = "Man On The Moon";
        else
            this.speaker = "Tom";
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
        if(this.line<20){
            text(this.speaker+": "+this.text.substr(0, this.textShowing), this.x+this.padding, this.y+this.padding, this.w-this.padding*2, this.h-this.padding*2);
        }
        if(this.line === 0&&this.textShowing>=this.text.length){
            text("Press space to continue", this.x+this.padding, this.y+this.h-20-this.padding*2);
        }
        pop();
    },
    init: function(){
        this.x = width/2-this.w/2;
        this.y = height-this.h-20;
        this.text = moonConversation[this.line];
        this.textShowing = 0;
    }
}
