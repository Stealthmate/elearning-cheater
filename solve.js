function findAll(regexPattern, sourceString) {
    let output = []
    let match
    // make sure the pattern has the global flag
    let regexPatternWithGlobal = RegExp(regexPattern,"g")
    while (match = regexPatternWithGlobal.exec(sourceString)) {
        // get rid of the string copy
        delete match.input
        // store the match data
        output.push(match)
    }
    return output
}

function ansMultChoice(q) {
    let ans = $(q).find("answer")[0].innerHTML
    let cs = $(q).find("choice")
    for(let c of cs) {
        if(c.attributes["no"].value != ans) continue;
        let s = c.innerHTML;
        s = s.substring(11, s.length-5);
        return s;
    }
}

function ansFillIn(q) {
    return $(q).find("answer")[0].innerHTML;
}

function ansCloze(q) {
    let qt = $(q).find("questionText")[0].innerHTML;
    qt = qt.substring(14, qt.length - 5);
    let re = /\[([a-zA-Z0-9']+)\]/g;
    qt = qt.replace(re, "<span style=\"color: red; font-size: 20px;\">$1</span>");
    console.log(qt);
    return qt;
}

$("#theinput").bind("input propertychange", function() {
    let xmlDoc = $("#theinput").val();
    let $xml = $(xmlDoc);

    let qs = $xml.find("question")
    for (let q of qs) {
        let t = q.attributes["type"].value
        let res = "わからなかった😢"
        if(t == "multipleChoice" || t == "trueFalse"){
            res = ansMultChoice(q);
        } else if (t == "anaumeFilIn") {
            res = ansFillIn(q);
        } else if (t == "ClozeTest") {
            res = ansCloze(q);
        }

        $("#theoutput").append("<li>" + res + "</li>")
    }

});
