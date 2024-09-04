//server/cdn home path of the widget
//const cdnhome = "./widget/";
//console.log(document.currentScript.src);

let l = document.currentScript.src;
const cdnhome = l.substring(0, l.lastIndexOf("/")+1);
//console.log(cdnhome);

//WordClockWidget();

function fnToggleEngClock() {
    var e = document.getElementById("divTime");
    if (e.style.display === "none") {
      e.style.display = "inline";
    } else {
      e.style.display = "none";
    }
}

(async function WordClockWidget() {

    async function getConfig(lang) {
        //fetch request to read the config 
        //let result = await fetch(document.currentScript.dataset.config);

        //console.log(document.currentScript.dataset.lang); 
        //load config file based on the language instead of direct config file reference in data-config attribute
        try{
            let result = await fetch(cdnhome + "config-" + lang + ".json");
            let config = await result.json();
            return config;
        } catch {
            console.log("lang error");  
            return "";      
        }
    }

    async function importStyleFile() {
        // let csspath = "http://server/stylesheet.css";
        let csspath = cdnhome + "style.css";
        var newSS = document.createElement('link');
        newSS.rel = 'stylesheet';
        newSS.href = csspath;
        document.getElementsByTagName("head")[0].appendChild(newSS);
    }
    
    
    //get widget class
    const wc = "." + document.currentScript.dataset.class;
    //read the config file corresponding to the language selected
    const config = await getConfig(document.currentScript.dataset.lang);
    //    console.log(config);
    
    async function init() {
        importStyleFile();
        let widgethtml = `
            <div class="WordClockWidget">
                <div id="divTime" style="display: none;"></div>
                <div id="divTimeInLocal" onclick="fnToggleEngClock();" title=""></div>
                <span id="divTimeLabel">वेळ:</span> 
                <span id="divTimeInLocalWords"></span>
            </div>
            `;
        el = document.querySelector(wc);
        el.innerHTML = widgethtml; //config.lang;

        const RegionalNumberToRegionalWord = config.RegionalNumberToRegionalWord;
        const EnglishNumberToRegionalWord = config.EnglishNumberToRegionalWord;
        const EnglishNumberToRegionalNumber = config.EnglishNumberToRegionalNumber;
        const RegionalTimeLabel = config.RegionalTimeLabel;

        const QuarterPastLabel = config.QuarterPast;
        const HalfPastLabel = config.HalfPast;
        const QuarterToLabel = config.QuarterTo;

        const HourLabel = config.HourLabel;
        const MinuteLabel = config.MinuteLabel;
        
        const MidNightLabel = config.MidNight;
        const EarlyMorningLabel = config.EarlyMorning;
        const MorningLabel = config.Morning;
        const AfternoonLabel = config.Afternoon;
        const EveningLabel = config.Evening;
        const NightLabel = config.Night;

        const obj1 = (RegionalNumberToRegionalWord);
        const obj2 = (EnglishNumberToRegionalWord);      
        const obj3 = (EnglishNumberToRegionalNumber);


        function fnTimeInLocalWords(timestr) {
            ts = timestr.split(':');
            hh = ts[0];
            mm = ts[1];
            let str = '';
            if(mm == '00')
                str = obj2[hh];
            else if(mm == '15')
                str = QuarterPastLabel + ' ' + obj2[hh];
            else if(mm == '30')
                str = HalfPastLabel + ' ' + obj2[hh];
            else if(mm == '45')
                str = QuarterToLabel + ' ' + obj2[parseInt(hh)+1];
            else	
                str = obj2[hh] + ' ' +  HourLabel + ' ' + obj2[mm] + ' ' +  MinuteLabel + ' ';
            return str;
        }
        
        function fnTimeInLocal(timestr) {
            ts = timestr.split(':');
            let str = '';
            str = obj3[ts[0]] + ':' + obj3[ts[1]] + ':' + obj3[ts[2]];
            return str;
        }
        
        function fnGetSlot(hh) {
            //पहाटे चे सकाळ चे दुपार चे संध्याकाळ चे रात्री चे मध्य रात्री चे   
            if(hh >= 0 && hh <= 3)
                slot = MidNightLabel + ' ';
            else if(hh >= 4 && hh <= 7)
                slot = EarlyMorningLabel + ' ';
            else if(hh >= 8 && hh <= 11)
                slot = MorningLabel + ' ';
            else if(hh >= 12 && hh <= 16)
                slot = AfternoonLabel + ' ';
            else if(hh >= 17 && hh <= 19)
                slot = EveningLabel + ' ';
            else if(hh >= 20 && hh <= 23)
                slot = NightLabel + ' ';
            return slot;
        }
        
        //add a zero in front of numbers<10
        function fnAddZero(n) {
          if (n < 10) {
            n = "0" + n;
          }
          return n;
        }
        
        function startTime() {
            let today = new Date();
            let hh = today.getHours();
            if(hh>12) ampm="pm"; else ampm="am";
            let h = today.getHours() % 12 || 12; //12 hour format
            let m = today.getMinutes();
            let s = today.getSeconds();
            // add a zero in front of numbers<10
            h = fnAddZero(h);
            m = fnAddZero(m);
            s = fnAddZero(s);
            timestr = h + ":" + m + ":" + s;
            
            document.getElementById('divTimeLabel').innerHTML = RegionalTimeLabel + ":";
            document.getElementById('divTimeInLocal').innerHTML = fnTimeInLocal(timestr);
            document.getElementById('divTimeInLocalWords').innerHTML = fnGetSlot(hh) + fnTimeInLocalWords(timestr);	
            document.getElementById('divTime').innerHTML = h + ":" + m + ":" + s + " " + ampm;
            document.getElementById('divTimeInLocal').title = h + ":" + m + ":" + s + " " + ampm;
            
            t = setTimeout(function() {
            startTime()
            }, 500);
        }
        startTime();    


    }

    init();
    

})();
