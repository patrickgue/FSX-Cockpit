const url = "http://192.168.1.120:8000/getall";
const testdata = {
    "Title":  "T210 CENTURION BLUE CLASSIC",
    "Plane_Latitude":  46.913940472010886,
    "Plane_Longitude":  7.4972170721048581,
    "Plane_Altitude":  1676.90584035726,
    "Plane_Pitch_Degrees":  -0.066377699375152588,
    "Plane_Bank_Degrees":  -0.0022763033986057568,
    "Airspeed_Indicated":  0.00075618678238242865,
    "Vertical_Speed":  768,//0.00012815040463465242,
    "Indicated_Altitude":  1676.905517578125,
    "Angle_of_Attack_Indicator":  231.53723074863353,
    "Heading_Indicator":  231.6654544822361,
    "Plane_Heading_Degrees_Magnetic":  232.61143856376893,
    "Plane_Heading_Degrees_True":  120.25,
    "Com_Active_Frequency_1":  127.8,
    "Com_Active_Frequency_2":  128.29999999999998,
    "Com_Standby_Frequency_1":  127.89999999999999,
    "Com_Standby_Frequency_2":  113.69999999999999,
    "Nav_Active_Frequency_1":  110.6,
    "Nav_Active_Frequency_2":  117.19999999999999,
    "Nav_Standby_Frequency_1":  116.8,
    "Nav_Standby_Frequency_2":  113.75,
    "Autopilot_Master":  0,
    "Autopilot_Approach_Hold":  0,
    "Autopilot_Heading_Lock":  0,
    "Autopilot_Heading_Lock_Dir":  0,
    "Autopilot_Altitude_Lock":  0,
    "Autopilot_Altitude_Lock_Var":  0,
    "Autopilot_Vertical_Hold_Var":  0,
    "Autopilot_Throttle_Arm":  0,
    "Autopilot_Airspeed_Hold":  0,
    "Autopilot_Airspeed_Hold_Var":  0,
    "Autopilot_Nav1_Lock":  1,
    "Gps_Drives_Nav1":  0,
    "Number_Of_Engines":  1064820736,
    "General_Eng_Throttle_Lever_Position_1":  0,
    "General_Eng_Throttle_Lever_Position_2":  0,
    "General_Eng_Throttle_Lever_Position_3":  0,
    "General_Eng_Throttle_Lever_Position_4":  1,
    "Flaps_Handle_Percent":  4.94065645841247E-324,
    "Gear_Handle_Position":  0,
    "Spoilers_Armed":  0,
    "Spoilers_Handle_Position":  0.054143927991390228,
    "Brake_Left_Position":  0.0697503536939621,
    "Brake_Right_Position":  0
};

const config = {
    speed : {
        maxdisp: 230,
        max:195,
        stall:40, 
    }
}; 

(function() {
    const colors = {
        background: "#111",
        border: "#333",
        foreground: "#eee",
        blue: "#588DBE",
        bluedarker: "#385d9e",
        orange: "#F7663c",
        green: "#66ff00",
        red: "#f73000"
    };

    const fontname = "Jost";

    const com1a = document.querySelector("#com1a");
    const com1s = document.querySelector("#com1s");

    const com2a = document.querySelector("#com2a");
    const com2s = document.querySelector("#com2s");

    const nav1a = document.querySelector("#nav1a");
    const nav1s = document.querySelector("#nav1s");

    const nav2a = document.querySelector("#nav2a");
    const nav2s = document.querySelector("#nav2s");

    const com1Dial = document.querySelector("#com1-dial");
    const com2Dial = document.querySelector("#com2-dial");
    const nav1Dial = document.querySelector("#nav1-dial");
    const nav2Dial = document.querySelector("#nav2-dial");

    const altitudeCanvas = document.querySelector("#altitude");
    const altCtx = altitudeCanvas.getContext('2d');

    const attitudeCanvas = document.querySelector("#attitude");
    const attCtx = attitudeCanvas.getContext('2d');

    const iasCanvas = document.querySelector("#ias");
    const iasCtx = iasCanvas.getContext('2d');

    const turnslipCanvas = document.querySelector("#turnslip");
    const tsCtx = turnslipCanvas.getContext('2d');


    const hdgCanvas = document.querySelector("#hdg");
    const hdgCtx = hdgCanvas.getContext('2d');

    const vspeedCanvas = document.querySelector("#vspeed");
    const vspeedCtx = vspeedCanvas.getContext('2d');
    

    iasCanvas.width = altitudeCanvas.width = attitudeCanvas.width =  vspeedCanvas.width = hdgCanvas.width = turnslipCanvas.width = 400;
    iasCanvas.height = altitudeCanvas.height = attitudeCanvas.height = vspeedCanvas.height = hdgCanvas.height = turnslipCanvas.height = 400;
    iasCanvas.style.width = altitudeCanvas.style.width = attitudeCanvas.style.width = vspeedCanvas.style.width = hdgCanvas.style.width = turnslipCanvas.style.width = "200px";
    iasCanvas.style.height = altitudeCanvas.style.height = attitudeCanvas.style.height = vspeedCanvas.style.height = hdgCanvas.style.height = turnslipCanvas.style.height = "200px";
    
    const radius = 190;

    function updateComNav(data) {
        com1a.innerHTML = data.Com_Active_Frequency_1.toFixed(2);
        com1s.innerHTML = data.Com_Standby_Frequency_1.toFixed(2);
        com2a.innerHTML = data.Com_Active_Frequency_2.toFixed(2);
        com2s.innerHTML = data.Com_Standby_Frequency_2.toFixed(2);
        nav1a.innerHTML = data.Nav_Active_Frequency_1.toFixed(2);
        nav1s.innerHTML = data.Nav_Standby_Frequency_1.toFixed(2);
        nav2a.innerHTML = data.Nav_Active_Frequency_2.toFixed(2);
        nav2s.innerHTML = data.Nav_Standby_Frequency_2.toFixed(2);
    }
    
    function renderAttitude(pitch,bank) {
        var centerX = attitudeCanvas.width / 2;
        var centerY = attitudeCanvas.height / 2;

        mainCircle(attCtx, centerX, centerY, radius);

        

        /* outer */
        attCtx.fillStyle = colors.blue;
        attCtx.beginPath()
        attCtx.arc(centerX, centerY, radius*0.94, bank,bank + Math.PI,true);
        attCtx.fill();

        /*inner*/
        
        attCtx.fillStyle = colors.bluedarker;
        attCtx.beginPath()
        attCtx.arc(centerX, centerY, radius*0.75, -2 * pitch+bank,(2*pitch)-Math.PI + bank,true);
        attCtx.fill();

        attCtx.fillStyle = colors.border;
        attCtx.beginPath()
        attCtx.arc(centerX, centerY, radius*0.75, -2 * pitch+bank,(2*pitch)-Math.PI + bank,false);
        attCtx.fill();

        attCtx.strokeStyle = colors.foreground;
        attCtx.lineWidth = 2;
        for(let i of [-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25]) {
            attCtx.save();
            attCtx.translate(centerX, centerY - (Math.sin(2*pitch) * 0.75 * radius));
            attCtx.rotate(bank);
            attCtx.beginPath();

            let a = Math.sin(i * (Math.PI / 180))
            if(i % 10 == 0) {
                attCtx.moveTo(radius*-((Math.abs(i)/80)+0.1), a * radius * 0.75);
                attCtx.lineTo(radius* ((Math.abs(i)/80)+0.1), a * radius * 0.75);
            }
            else {
                attCtx.moveTo(radius*-0.05, a * radius * 0.75);
                attCtx.lineTo(radius* 0.05, a * radius * 0.75);
            }
            attCtx.stroke();

            attCtx.restore();
        }

        /* markings */
        attCtx.strokeStyle = colors.orange;
        attCtx.lineWidth = 4;
        attCtx.beginPath()
        attCtx.moveTo(centerX-2, centerY);
        attCtx.lineTo(centerX+2, centerY);
        attCtx.stroke();

        attCtx.beginPath()
        attCtx.moveTo(centerX-(radius*0.5), centerY);
        attCtx.lineTo(centerX-(radius*0.3), centerY);
        attCtx.stroke();

        attCtx.beginPath()
        attCtx.moveTo(centerX+(radius*0.5), centerY);
        attCtx.lineTo(centerX+(radius*0.3), centerY);
        attCtx.stroke();

        
        attCtx.fillStyle = colors.orange;
        attCtx.beginPath();
        attCtx.moveTo(centerX,centerY - radius*0.75);
        attCtx.lineTo(centerX - (radius * 0.05), centerY - (radius*0.6));
        attCtx.lineTo(centerX + (radius * 0.05), centerY - (radius*0.6));
        attCtx.fill();



        attCtx.strokeStyle = colors.foreground;
        attCtx.lineWidth = 1;
        for(let i of [-90,-45,-30,-20,-10,0,10,20,30,45,90]) {
            let rads =  (Math.PI/180)
            attCtx.save();
            attCtx.translate(centerX, centerY)
            attCtx.rotate(i  * rads + bank)
            attCtx.beginPath();
            attCtx.moveTo(0, -1 * (radius * 0.94));
            attCtx.lineTo(0, -1 * (radius * 0.75));
            attCtx.stroke();
            attCtx.restore();
        }
    }

    function renderAltitude(altitude) {
        var centerX = altitudeCanvas.width / 2;
        var centerY = altitudeCanvas.height / 2;

        mainCircle(altCtx, centerX, centerY, radius)

        altCtx.lineWidth = 2;
        altCtx.strokeStyle = colors.foreground;
        for(let i = 0; i < 50; i++) {
            let rads = (360 / 50) * (Math.PI/180)
            altCtx.save();

            altCtx.translate(centerX, centerY)
            altCtx.rotate(i * rads)
            altCtx.beginPath();
            altCtx.moveTo(0,-1 * (radius-(0.06 * radius)));
            if(i % 5 == 0) {
                altCtx.lineTo(0, -1 * (radius-(0.15 * radius)));
            }
            else {
                altCtx.lineTo(0, -1 * (radius-(0.1 * radius)));
            }
            altCtx.stroke();
            altCtx.restore();
            
        }

        for(let i = 9; i >= 0; i--) {
            let rads = ((i*(360/10))-90) * (Math.PI / 180)
            let x = (radius * 0.75) * Math.cos(rads);
            let y = (radius * 0.75) * Math.sin(rads);
            altCtx.font = (radius*0.15)+"px "+ fontname;
            altCtx.textAlign = 'center';
            altCtx.fillStyle = colors.foreground;
            altCtx.fillText(i, centerX + x, centerY + y + ((radius*0.15)/2));
        }

        altCtx.strokeStyle = colors.border;
        altCtx.lineWidth = 1;
        
        /* 10000ft */
        altCtx.save();
        altCtx.translate(centerX, centerY);
        altCtx.rotate( ((altitude) * 360/100000) * (Math.PI / 180));
        altCtx.fillRect(-1,0,2, -1 * (radius * 0.9))
        altCtx.strokeRect(-1,0,2, -1 * (radius * 0.9))
        altCtx.beginPath();
        altCtx.moveTo(0,-1 * (radius * 0.9));
        altCtx.lineTo(-4,-1 * (radius*0.95))
        altCtx.lineTo(4,-1 * (radius*0.95))
        altCtx.fill();
        altCtx.restore();
        
        /* 1000ft */
        altCtx.save();
        altCtx.translate(centerX, centerY);
        altCtx.rotate( ((altitude%10000) * 360/10000) * (Math.PI / 180));
        altCtx.fillRect(-5,0,10, -1 * (radius * 0.6))
        //altCtx.strokeRect(-5,0,10, -1 * (radius * 0.6))
        altCtx.restore();

        /* 100ft */
        altCtx.save();
        altCtx.translate(centerX, centerY);
        altCtx.rotate( ((altitude%1000) * 360/1000) * (Math.PI / 180));
        altCtx.fillRect(-3,0,6, -1 * (radius * 0.75))
        //altCtx.strokeRect(-3,0,6, -1 * (radius * 0.75))
        altCtx.restore();

        /* inner circle */
        altCtx.beginPath();
        altCtx.arc(centerX, centerY, 0.08 * radius, 0, 2 * Math.PI, false);
        altCtx.fillStyle = colors.foreground;
        altCtx.fill();

    }

    function renderIAS(speed) {
        var centerX = iasCanvas.width / 2;
        var centerY = iasCanvas.height / 2;

        mainCircle(iasCtx, centerX, centerY, radius)

        let stallRads = ((config.speed.stall*(320/config.speed.maxdisp))-90) * (Math.PI / 180)
        let maxRads = ((config.speed.max*(320/config.speed.maxdisp))-90) * (Math.PI / 180)
        let maxdRads = ((config.speed.maxdisp*(320/config.speed.maxdisp))-90) * (Math.PI / 180)

        iasCtx.fillStyle = colors.green;
        iasCtx.beginPath()
        iasCtx.arc(centerX,centerY,radius*0.90,stallRads,maxRads);
        iasCtx.lineTo(centerX, centerY);
        iasCtx.fill();

        iasCtx.fillStyle = colors.red;
        iasCtx.beginPath()
        iasCtx.arc(centerX,centerY,radius*0.90,maxRads,maxdRads);
        iasCtx.lineTo(centerX, centerY);
        iasCtx.fill();

        iasCtx.fillStyle = colors.background;
        iasCtx.beginPath()
        iasCtx.arc(centerX, centerY, radius*0.87,0,2*Math.PI);
        iasCtx.fill();


        iasCtx.lineWidth = 2;
        iasCtx.strokeStyle = colors.foreground;
        for(let i = 0; i < config.speed.maxdisp; i++) {
            let rads = (320 / config.speed.maxdisp) * (Math.PI/180)
            iasCtx.save();

            iasCtx.translate(centerX, centerY)
            iasCtx.rotate(i * rads)
            iasCtx.beginPath();
            iasCtx.moveTo(0,-1 * (radius-(0.06 * radius)));
            if(i % 10 == 0) {
                iasCtx.lineTo(0, -1 * (radius-(0.15 * radius)));
            }
            else {
                iasCtx.lineTo(0, -1 * (radius-(0.1 * radius)));
            }
            iasCtx.stroke();
            iasCtx.restore();
            
        }

        for(let i = 0; i < config.speed.maxdisp; i++) {
            if(i % 20 == 0) {
                let rads = ((i*(320/config.speed.maxdisp))-90) * (Math.PI / 180)
                let x = (radius * 0.75) * Math.cos(rads);
                let y = (radius * 0.75) * Math.sin(rads);
                iasCtx.font = (radius*0.10)+"px "+ fontname;
                iasCtx.textAlign = 'center';
                iasCtx.fillStyle = colors.foreground;
                iasCtx.fillText(i, centerX + x, centerY + y + ((radius*0.10)/2));
            }
        }

        iasCtx.strokeStyle = colors.border;
        iasCtx.lineWidth = 1;
        
        iasCtx.save();
        iasCtx.translate(centerX, centerY);
        iasCtx.rotate(speed*(320 / config.speed.maxdisp) * (Math.PI/180))
        iasCtx.fillRect(-3,0,6, -1 * (radius * 0.75))
        //altCtx.strokeRect(-3,0,6, -1 * (radius * 0.75))
        iasCtx.restore();

        /* inner circle */
        iasCtx.beginPath();
        iasCtx.arc(centerX, centerY, 0.08 * radius, 0, 2 * Math.PI, false);
        iasCtx.fillStyle = colors.foreground;
        iasCtx.fill();


    }

    function renderVSpeed(vspeed) {
        let centerX = vspeedCanvas.width/2;
        let centerY = vspeedCanvas.height/2;
        mainCircle(vspeedCtx, centerX, centerY, radius);

        vspeedCtx.strokeStyle = colors.foreground;
        vspeedCtx.lineWidth = 2;
        for(let i of [-20, -10,-5,0,5,10,20]) {
            /* markings */
            vspeedCtx.save();
            vspeedCtx.translate(centerX, centerY);
            vspeedCtx.rotate(((i*320/40)+90) * (Math.PI/180));
            vspeedCtx.beginPath();

            vspeedCtx.moveTo(0, radius*0.96);
            vspeedCtx.lineTo(0, radius*0.8)            
            vspeedCtx.stroke();

            vspeedCtx.restore();

            /* number labels */
            let rads = ((i*320/40)-180) * (Math.PI/180);
            let x = (radius * 0.70) * Math.cos(rads);
            let y = (radius * 0.70) * Math.sin(rads);
            vspeedCtx.font = (radius*0.15)+"px "+ fontname;
            vspeedCtx.textAlign = 'center';
            vspeedCtx.fillStyle = colors.foreground;
            vspeedCtx.fillText(Math.abs(i), centerX + x, centerY + y + ((radius*0.10)/2));
        }

        vspeedCtx.font = (radius*0.08)+"px "+ fontname;
        vspeedCtx.fillText("100 FEET PER MINUTE", centerX - (radius * 0.3), centerY + (radius * 0.2))

        /* pointer */
        vspeedCtx.save();
        vspeedCtx.translate(centerX, centerY);
        vspeedCtx.rotate( (((vspeed/100)*320/40)-180) * (Math.PI/180));
        vspeedCtx.fillRect(0,-3,(radius * 0.75),6);
        vspeedCtx.restore();

        /* inner circle */
        vspeedCtx.beginPath();
        vspeedCtx.arc(centerX, centerY, 0.08 * radius, 0, 2 * Math.PI, false);
        vspeedCtx.fillStyle = colors.foreground;
        vspeedCtx.fill();

    }

    function renderHDG(hdg) {
        let centerX = hdgCanvas.width/2;
        let centerY = hdgCanvas.height/2;
        mainCircle(hdgCtx,centerX, centerY, radius);
        hdgCtx.strokeStyle = colors.foreground;
        hdgCtx.lineWidth = 2;
        for(let i = 0; i < 72; i++) {
            let rads = ((i*360/72)-hdg) * (Math.PI/180);
            hdgCtx.save();
            hdgCtx.translate(centerX, centerY);
            hdgCtx.rotate(rads);

            hdgCtx.beginPath();
            hdgCtx.moveTo(0,radius*-0.8);
            if(i % 2 == 0) {
                hdgCtx.lineTo(0,radius*-0.7);
            }
            else {
                hdgCtx.lineTo(0,radius*-0.75);
            }
            hdgCtx.stroke();

            if (i % 6 == 0) {
                hdgCtx.fillStyle = colors.foreground;
                hdgCtx.font = (radius * 0.15) + "px "+ fontname;
                hdgCtx.textAlign = 'center';
                hdgCtx.fillText((i/2), 0, radius * -0.82)
            }
            hdgCtx.restore();
        }

        
        hdgCtx.save();
        hdgCtx.fillStyle = colors.orange;
        hdgCtx.translate(centerX, centerY);
        hdgCtx.beginPath();
        hdgCtx.moveTo(radius*0.005,radius*-0.3);
        hdgCtx.lineTo(radius*-0.005,radius*-0.3);
        hdgCtx.lineTo(radius*-0.02, radius*-0.2);
        hdgCtx.lineTo(radius*-0.02, radius*-0.1);
        hdgCtx.lineTo(radius*-0.3, 0);
        hdgCtx.lineTo(radius*-0.3, radius*0.05);
        hdgCtx.lineTo(radius*-0.02, 0);
        hdgCtx.lineTo(radius*-0.02, radius*0.1);
        hdgCtx.lineTo(radius*-0.1, radius*0.15);
        hdgCtx.lineTo(radius*-0.1, radius*0.2);
        hdgCtx.lineTo(0, radius*0.17);
        hdgCtx.lineTo(radius*0.1, radius*0.2);
        hdgCtx.lineTo(radius*0.1, radius*0.15);
        hdgCtx.lineTo(radius*0.02, radius*0.1);
        hdgCtx.lineTo(radius* 0.02, 0);
        hdgCtx.lineTo(radius*0.3, radius*0.05);
        hdgCtx.lineTo(radius*0.3, 0);
        hdgCtx.lineTo(radius*0.02, radius*-0.1);
        hdgCtx.lineTo(radius*0.02, radius*-0.2);
        hdgCtx.fill();

        hdgCtx.fillStyle = colors.foreground;
        hdgCtx.beginPath();
        hdgCtx.moveTo(0,radius * -0.75);
        hdgCtx.lineTo(radius*-0.05, radius * -0.65);
        hdgCtx.lineTo(radius* 0.05, radius * -0.65);
        hdgCtx.fill();

        hdgCtx.strokeStyle = colors.foreground;
        hdgCtx.lineWidth = 2;
        hdgCtx.beginPath();
        hdgCtx.moveTo(0, radius * -0.6);
        hdgCtx.lineTo(0, radius * -0.35);
        hdgCtx.stroke();

        hdgCtx.beginPath();
        hdgCtx.moveTo(0, radius * 0.2);
        hdgCtx.lineTo(0, radius * 0.75);
        hdgCtx.stroke();
        

        hdgCtx.restore();

        
    }

    function renderTurnSlip() {
        let centerX = turnslipCanvas.width / 2;
        let centerY = turnslipCanvas.height / 2;
        mainCircle(tsCtx, centerX, centerY, radius);

        tsCtx.beginPath();
        tsCtx.arc(centerX, centerY, radius * 0.65, 0, 2 * Math.PI, false);
        tsCtx.fillStyle = colors.border;
        tsCtx.fill();

        
        tsCtx.fillStyle = colors.foreground;
        tsCtx.beginPath();
        tsCtx.arc(centerX, centerY-(2.1*radius), radius*2.35, (102*(Math.PI/180)), (78 *(Math.PI/180)), true);
        tsCtx.arc(centerX, centerY-(2.1*radius), radius*2.55, ( 78*(Math.PI/180)), (102*(Math.PI/180)), false);
        tsCtx.fill();

        tsCtx.fillStyle = colors.background;
        tsCtx.beginPath();
        tsCtx.arc(centerX, centerY + (radius * 0.35), radius*0.095, 0, 2 * Math.PI);
        tsCtx.fill();

        tsCtx.strokeStyle = colors.background;
        tsCtx.lineWidth = radius * 0.3;
        tsCtx.beginPath();
        tsCtx.arc(centerX, centerY, radius * 0.80, 0, 2 * Math.PI, false);
        tsCtx.fillStyle = colors.border;
        tsCtx.stroke();

        tsCtx.strokeStyle = colors.foreground;
        tsCtx.lineWidth = 7;
        for(let i of [0, 20, 160, 180]) {
            tsCtx.save();
            tsCtx.translate(centerX, centerY);
            tsCtx.rotate( i * (Math.PI/180) );

            tsCtx.beginPath();
            tsCtx.moveTo(radius*0.85,0);
            tsCtx.lineTo(radius*0.65,0);
            tsCtx.stroke();

            tsCtx.restore();
        }



        /* turn */
        tsCtx.fillStyle = colors.foreground;
        tsCtx.save();
        tsCtx.translate(centerX, centerY);
        tsCtx.rotate( 0 * (Math.PI/180) );

        tsCtx.beginPath();
        tsCtx.moveTo(radius*-0.1,radius*0.04);
        tsCtx.lineTo(radius*-0.63,radius*0.02);
        tsCtx.lineTo(radius*-0.63,0);
        tsCtx.lineTo(radius*-0.05,0)
        tsCtx.lineTo(radius*-0.05,radius*-0.04)

        tsCtx.lineTo(radius*-0.2,radius*-0.07)
        tsCtx.lineTo(radius*-0.01,radius*-0.07)
        tsCtx.lineTo(radius*-0.01,radius*-0.2)

        tsCtx.lineTo(radius*0.01,radius*-0.2)
        tsCtx.lineTo(radius*0.01,radius*-0.07)

        tsCtx.lineTo(radius*0.2,radius*-0.07)

        tsCtx.lineTo(radius*0.05,radius*-0.04)
        tsCtx.lineTo(radius*0.05,0)
        tsCtx.lineTo(radius*0.63,0);
        tsCtx.lineTo(radius*0.63,radius*0.02);
        tsCtx.lineTo(radius*0.1,radius*0.04);
        
        tsCtx.fill();

        tsCtx.restore();
        tsCtx.beginPath();
        tsCtx.arc(centerX, centerY, radius * 0.07, 0, 2 * Math.PI, false);
        tsCtx.fill();
    }

    function mainCircle(ctx, cx, cy, r) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = colors.background;
        ctx.fill();
        ctx.lineWidth = r * 0.07;
        ctx.strokeStyle = colors.border;
        ctx.stroke();
    }

    com1Dial.addEventListener("wheel", function(event) {
        testdata.Com_Active_Frequency_1 += (Math.round(event.deltaY) * 0.025);
        console.log(event.deltaY, testdata.Com_Active_Frequency_1)
    })

    let previusTouch;

    com1Dial.addEventListener("touchmove", function(event) {
        if(previusTouch == undefined || event.timestamp - previusTouch.timestamp > 2000) {
            previusTouch = event;
        }
        else {
            testdata.Com_Active_Frequency_1 += (Math.round((previusTouch.touches[0].clientY - event.touches[0].clientY)) * 0.025)
            previusTouch = event;
        }
        /*testdata.Com_Active_Frequency_1 += (Math.round(event.deltaY) * 0.025);
        console.log(event.deltaY, testdata.Com_Active_Frequency_1)*/
        console.log(event)
    })


    setInterval(function() {
        if(document.querySelector("#update").checked) {
            $.ajax({
                url: "http://192.168.1.120:8000/getall",
                dataType: "json",
                success: function( response ) {
                    renderAltitude(response.Indicated_Altitude);
                    renderAttitude(response.Plane_Pitch_Degrees, response.Plane_Bank_Degrees);
                    renderIAS(response.Airspeed_Indicated);
                    renderVSpeed(response.Vertical_Speed);
                    renderHDG(response.Heading_Indicator);
                    renderTurnSlip();
                    updateComNav(response);
                }
            });
            /*renderAltitude(testdata.Indicated_Altitude);
            renderAttitude(testdata.Plane_Pitch_Degrees, testdata.Plane_Bank_Degrees);
            renderIAS(testdata.Airspeed_Indicated);
            renderVSpeed(testdata.Vertical_Speed);
            renderHDG(testdata.Heading_Indicator);
            renderTurnSlip();
            updateComNav(testdata);*/

        }
    }, 100)

    
})();

