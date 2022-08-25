// MPhil Dissertation
// Swarnendu Moitra**, Indranil Dutta
// Jadavpur University
// **smoitra.sll.rs@jadavpuruniversity.in

PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiments

Header(
    // Declare global variables to store the participant's ID and demographic information
    newVar("ID").global(),
    newVar("LANG").global(),
    newVar("NATIVE").global(),
    newVar("AGE").global(),
    newVar("GENDER").global(),
    newVar("HAND").global()
)
 // Add the particimant info to all trials' results lines
.log( "id"     , getVar("ID") )
.log( "lang" , getVar("LANG") )
.log( "native" , getVar("NATIVE") )
.log( "age"    , getVar("AGE") )
.log( "gender" , getVar("GENDER") )
.log( "hand"   , getVar("HAND") )

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'
Sequence( "consent","participants", "intro", "experiment", SendResults() , "end" )

CheckPreloaded();

// Ethics agreement: participants must agree before continuing
newTrial("ethics",
    newHtml("ethics_explanation", "ethics.html")
        .cssContainer({"margin":"1em"})
        .print()
    ,
    newHtml("form", `<div class='fancy'><input name='consent' id='consent' type='checkbox'><label for='consent'>Ich bin mindestens 18 Jahre alt und erkläre mich damit einverstanden, an der Studie teilzunehmen. Ich habe die <em>Information für Probanden</em> gelesen und verstanden. Meine Teilnahme ist freiwillig. Ich weiß, dass ich die Möglichkeit habe, meine Teilnahme an dieser Studie jederzeit und ohne Angabe von Gründen abzubrechen, ohne dass mir daraus Nachteile entstehen. Ich erkläre, dass ich mir der im Rahmen der Studie erfolgten Auszeichnung von Studiendaten und ihrer Verwendung in pseudo- bzw. anonymisierter Form einverstanden bin.</label></div>`)
        .cssContainer({"margin":"1em"})
        .print()
    ,
    newFunction( () => $("#consent").change( e=>{
        if (e.target.checked) getButton("go_to_info").enable()._runPromises();
        else getButton("go_to_info").disable()._runPromises();
    }) ).call()
    ,
    newButton("go_to_info", "Experiment starten")
        .cssContainer({"margin":"1em"})
        .disable()
        .print()
        .wait()
)


// Showing consent, stored in a html file that you can edit 
newTrial ( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.")
        .center()
        .print()
        .wait()
)
////////////////////////////////////////////////#

// Participant information: questions appear as soon as information is input
newTrial("participants",
    defaultText
        .cssContainer({"margin-top":"1em", "margin-bottom":"1em"})
        .print()
    ,
    newText("participant_info_header", "<div class='fancy'><h2>Demographic Information</h2><p>Your demographic data will not be used to identify your responses and will not be stored</p></div>")
    ,
    // Participant ID (6-place)
    newText("participantID", "<b>Please enter your email ID.</b><br>")
    ,
    newTextInput("input_ID")
        .length(20)
        .log()
        .print()
        .wait()
    ,
    // German native speaker question
    newText("<b>Are you a native Malayalam speaker</b>")
    ,
    newScale("input_lang",   "yes", "no")
        .radio()
        .log()
        .labelsPosition("right")
        .print()
        .wait()
    ,
    
    // Other native languages
    newText("<b>Do you speak any other languages?</b><br>(Please list them here)")
    ,
    newTextInput("input_native")
        .log()
        .print()
        .wait()
    ,
    // Age
    newText("<b>Age</b><br>")
    ,
    newTextInput("input_age")
        .length(2)
        .log()
        .print()
        .wait()
    ,
    // Gender
    newText("<b>Gender</b>")
    ,
    newScale("input_gender",   "female", "male", "other")
        .radio()
        .log()
        .labelsPosition("right")
        .print()
        .wait()
    ,
    // Handedness
    newText("<b>Handedness</b>")
    ,
    newScale("input_hand",   "right", "left", "both")
        .radio()
        .log()
        .labelsPosition("right")
        .print()
        .wait()
    ,
    // Clear error messages if the participant changes the input
    newKey("just for callback", "") 
        .callback( getText("errorage").remove() , getText("errorID").remove() )
    ,
    // Formatting text for error messages
    defaultText.color("Crimson").print()
    ,
    // Continue. Only validate a click when ID and age information is input properly
    newButton("Continue")
        .cssContainer({"margin-top":"1em", "margin-bottom":"1em"})
        .print()
        // Check for participant ID and age input
        .wait(
             newFunction('dummy', ()=>true).test.is(true)
            // ID
            .and( getTextInput("input_ID").testNot.text("")
                .failure( newText('errorID', "Please provide your email id") )
            // Age
            ).and( getTextInput("input_age").test.text(/^\d+$/)
                .failure( newText('errorage',"please enter your age"), 
                          getTextInput("input_age").text("")))  
        )
    ,
    // Store the texts from inputs into the Var elements
    getVar("ID")     .set( getTextInput("input_ID") ),
    getVar("GERMAN") .set( getScale("input_lang") ),
    
    getVar("NATIVE") .set( getTextInput("input_native") ),
    getVar("AGE")    .set( getTextInput("input_age") ),
    getVar("GENDER") .set( getScale("input_gender") ),
    getVar("HAND")   .set( getScale("input_hand") )
)


/////////////////////////////////////////////////






// Showing page with instructions, in a html file that you can edit 
// The audio file was uploaded to Resources
newTrial( "intro" ,
    newHtml("intro.html")
        .print()
    ,
    newButton("Continue.")
        .center()
        .print()
        .wait()
    ,
    newHtml("AudioInstructions.html")
        .print()
    ,
    newText("When you understand these instructions, please click the new Continue button that appears.")
        .center()
        .print()
    //,
    //newAudio("Instructions.mp3")
    //    .play()
    //    .wait()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
)


// Starting the experiment, by using data from csv file we made previously
Template ("extable.csv", row => 
  newTrial("experiment",
    fullscreen()
    ,
    // All the images will have the same size: 200px*200px
    defaultImage.size(300,150)
    ,
    newCanvas("images", 1100, 500)  // 500px height: we will print the button at the bottom
        .color("white")             // Use a white background
        .add(  0 , 0 , newImage("1", row.image1) )
        .add(900 , 0 , newImage("2", row.image2) )
        //.add(600 , 0 , newImage("3", row.image3) )
        //.add(900 , 0 , newImage("4", row.image4) )
        .print("center at 50vw","top at 2em")
    ,
    // These are the feedback tooltips, in case the mouse moves too early or click is too late
    newTooltip("earlyWarning", "STARTED TOO EARLY. You moved your mouse from the Go button before it was possible to guess the correct option. Please don't move your mouse until you're about to click.")
    ,
    newTooltip("slowClickWarning", "CLICKED TOO LATE. You took too long to click on your selection. Please try to click faster next time!")
    ,
    // Give 2s to preview the images
    newTimer(2000)
        .start()
        .wait()
    ,
    // This button is horizontally centered, at the bottom of the 1100px*500px surface:
    // that's where the cursor will be when we start tracking the mouse
    newButton("Go")
        .print( "center at 50%" , "bottom at 100%" , getCanvas("images") )
        .wait()
        .remove()
    ,
    newVar("isEarly", false).global()   // Global to access it in newTrial().log
    ,
    newVar("slowClick", false).global() // Global to access it in newTrial().log 
    ,
    // Launch timers to detect early movement and late clicks
    newTimer("earlyStart", (parseInt(row.NPTime) - 200) ).start()
    ,
    newTimer("timeLimit", (parseInt(row.audiodur) + 2000) ).start()
    ,
    // Start tracking mouse movements and clicks
    newMouseTracker("mouse")
        .log()
        // Check the earlyStart timer whenever the mouse moves:
        // set the "isEarly" Var element to true if the timer is still running
        //.callback( getTimer("earlyStart").test.running().success(getVar("isEarly").set(true)) )
        .start()
    ,
    // Play the audio description
    newAudio("description", row.audiofile).play()
    ,
    // Make the images clickable
    newSelector()
        .add( getImage("1") , getImage("2"))
        //.add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .log()
        .wait()
    ,
    // If the "timeLimit" timer has ended by the time an image is clicked, set "slowClick" to true
    getTimer("timeLimit").test.ended().success(getVar("slowClick").set(true))
    ,
    // Make sure the description is done playing before proceeding
    getAudio("description").wait("first")
    ,
    // Stop the mouse tracker to avoid massive resuls files
    getMouseTracker("mouse").stop()
    ,
    // Show feedback if necessary
    getVar("isEarly").test.is(true).success(
        getTooltip("earlyWarning")
            .print( "center at 50%", "middle at 50%" , getCanvas("images"))
            .wait()
    )
    ,
    getVar("slowClick").test.is(true).success(
        getTooltip("slowClickWarning")
            .print( "center at 50%", "middle at 50%" , getCanvas("images"))
            .wait()
    )
  )
  // Log the participant's id, passed as a parameter in the URL (?id=...)
  .log( "id"                , GetURLParameter("id") )
  // Log values from table and from Var elements
  .log( "Target"            , row.targetlocation )
  .log( "NPTime"            , row.NPTime )
  .log( "audiodur"          , row.audiodur )
  .log( "Item"          , row.audiodur )
  //Item
  .log( "EarlyStartMessage" , getVar("isEarly") )
  .log( "TooSlowMessage"    , getVar("slowClick") )
)


// The end of the experiment
newTrial("end",
    exitFullscreen()
    ,
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This is a dummy link, it won't actually validate submissions; use the link provided by your pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Thank You for your participation, Please click on the link for further instructions</a></p>")
        .center()
        .print()
    ,
    // Wait on this page forever
    newButton().wait()
)
.setOption("countsForProgressBar",false)
